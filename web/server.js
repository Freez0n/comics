if (!Object.hasOwn) {
    Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src *; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; connect-src *;");
    next();
});

const db = mysql.createPool({
    host: 'localhost', user: 'root', password: '1996', database: 'comics_db'
});

app.get('/api/events', (req, res) => {
    db.query('SELECT * FROM events ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;
    db.query('SELECT * FROM events WHERE id = ?', [eventId], (err, eventRes) => {
        if (err || eventRes.length === 0) return res.status(404).json({error: 'Not found'});
        db.query('SELECT * FROM event_blocks WHERE event_id = ? ORDER BY sort_order ASC', [eventId], (err, blockRes) => {
            res.json({ ...eventRes[0], blocks: blockRes });
        });
    });
});

app.post('/api/events', (req, res) => {
    const { id, title, universe, event_date, card_desc, main_image, blocks } = req.body;
    if (id) {
        db.query('UPDATE events SET title=?, universe=?, event_date=?, card_desc=?, main_image=? WHERE id=?', 
        [title, universe, event_date, card_desc, main_image, id], () => saveBlocks(id, blocks, res));
    } else {
        db.query('INSERT INTO events (title, universe, event_date, card_desc, main_image) VALUES (?,?,?,?,?)',
        [title, universe, event_date, card_desc, main_image], (err, result) => {
            if (err) return res.status(500).json(err);
            saveBlocks(result.insertId, blocks, res);
        });
    }
});

function saveBlocks(eventId, blocks, res) {
    db.query('DELETE FROM event_blocks WHERE event_id = ?', [eventId], () => {
        if (!blocks || blocks.length === 0) return res.json({success: true});
        const values = blocks.map((b, i) => [eventId, b.type, b.content, i]);
        db.query('INSERT INTO event_blocks (event_id, block_type, content, sort_order) VALUES ?', [values], () => res.json({success: true}));
    });
}

app.delete('/api/events/:id', (req, res) => {
    db.query('DELETE FROM events WHERE id = ?', [req.params.id], () => res.json({success: true}));
});

// API: Логин
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, resl) => {
        if (resl && resl.length > 0) res.json({success: true});
        else res.status(401).json({success: false});
    });
});

app.listen(3000, () => console.log('Сервер запущен: http://localhost:3000'));