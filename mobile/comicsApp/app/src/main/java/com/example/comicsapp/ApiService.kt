package com.example.comicsapp

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path

interface ComicsApi {
    @GET("/api/events")
    suspend fun getEvents(): List<ComicEvent>

    @GET("/api/events/{id}")
    suspend fun getEventDetails(@Path("id") id: Int): ComicEvent

    companion object {
        //IP
        private const val BASE_URL = "http://192.168.0.128:3000/"

        fun create(): ComicsApi {
            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ComicsApi::class.java)
        }
    }
}