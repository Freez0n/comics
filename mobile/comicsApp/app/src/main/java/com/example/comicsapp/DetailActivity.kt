package com.example.comicsapp

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import coil.load
import kotlinx.coroutines.launch

class DetailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        val id = intent.getIntExtra("ID", 0)
        val container = findViewById<LinearLayout>(R.id.detailContainer)
        val title = findViewById<TextView>(R.id.detailTitle)
        val mainImg = findViewById<ImageView>(R.id.detailMainImg)

        lifecycleScope.launch {
            try {
                val event = ComicsApi.create().getEventDetails(id)
                title.text = event.title
                mainImg.load(event.main_image)
                event.blocks?.forEach { block ->
                    if (block.block_type == "text") {
                        val tv = TextView(this@DetailActivity).apply {
                            text = block.content
                            textSize = 16f
                            setPadding(0, 20, 0, 20)
                            setTextColor(android.graphics.Color.BLACK)
                        }
                        container.addView(tv)
                    } else {
                        val iv = ImageView(this@DetailActivity).apply {
                            layoutParams = LinearLayout.LayoutParams(-1, 600).apply {
                                setMargins(0, 30, 0, 30)
                            }
                            scaleType = ImageView.ScaleType.CENTER_CROP
                            load(block.content)
                            setBackgroundResource(R.drawable.comic_card_bg)
                            setPadding(0,0,15,15)
                        }
                        container.addView(iv)
                    }
                }
            } catch (e: Exception) { e.printStackTrace() }
        }
    }
}