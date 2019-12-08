package com.adventofcode.nineteen

import java.io.File
import kotlin.time.times

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val pixels = File(args[0]).readText().trim().toCharArray()
    val layers = countPixels(pixels)
    val message = CharArray(150) {'0'}
    for (i in 0..149) {
        var j = i
        while (pixels[j] == '2') {
            j += 150
        }
        message[i] = pixels[j]
    }
    val result = String(message)
    println("P1")
    println("25 6")
    for (x in 0..5) {
        println(result.substring(x*25, x*25 + 25))
    }
    val layer = layers.values.sortedBy { it['0'] }.first()
    println(layer['1']?.times(layer['2']!!))
}

private fun countPixels(pixels: CharArray): MutableMap<Int, MutableMap<Char, Int>> {
    val layers = mutableMapOf<Int, MutableMap<Char, Int>>()
    var counts = mutableMapOf<Char, Int>()
    for (i in pixels.indices) {
        if (counts.isNotEmpty() && i % 150 == 0) {
            layers[layers.size] = counts
            counts = mutableMapOf()
        }
        val char = pixels[i]
        if (char in counts) {
            counts[char] = counts[char]!! + 1
        } else {
            counts[char] = 1
        }
    }
    return layers
}

