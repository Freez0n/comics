package com.example.comicsapp

import android.view.*
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import coil.load

class EventAdapter(
    private val events: List<ComicEvent>,
    private val onClick: (ComicEvent) -> Unit
) : RecyclerView.Adapter<EventAdapter.VH>() {

    class VH(v: View) : RecyclerView.ViewHolder(v) {
        val img: ImageView = v.findViewById(R.id.imgEvent)
        val title: TextView = v.findViewById(R.id.txtTitle)
        val uni: TextView = v.findViewById(R.id.txtUniverse)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.item_event, parent, false)
        return VH(v)
    }

    override fun onBindViewHolder(holder: VH, position: Int) {
        val item = events[position]
        holder.title.text = item.title
        holder.uni.text = item.universe.uppercase()
        holder.img.load(item.main_image) // Загрузка по ссылке
        holder.itemView.setOnClickListener { onClick(item) }
    }

    override fun getItemCount() = events.size
}