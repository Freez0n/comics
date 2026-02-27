package com.example.comicsapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val rv = findViewById<RecyclerView>(R.id.recyclerView)
        rv.layoutManager = LinearLayoutManager(this)

        val api = ComicsApi.create()

        lifecycleScope.launch {
            try {
                val data = api.getEvents()
                rv.adapter = EventAdapter(data) { event ->
                    val i = Intent(this@MainActivity, DetailActivity::class.java)
                    i.putExtra("ID", event.id)
                    startActivity(i)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}