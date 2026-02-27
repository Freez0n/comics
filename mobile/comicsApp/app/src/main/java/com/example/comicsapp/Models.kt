package com.example.comicsapp

data class ComicEvent(
    val id: Int,
    val title: String,
    val universe: String,
    val event_date: String,
    val main_image: String,
    val card_desc: String,
    val blocks: List<ComicBlock>? = null
)

data class ComicBlock(
    val block_type: String,
    val content: String
)