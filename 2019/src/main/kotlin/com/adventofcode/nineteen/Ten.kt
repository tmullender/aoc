package com.adventofcode.nineteen

import java.io.File
import kotlin.math.atan2

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    var y = 0
    val asteroids = mutableMapOf<Pair<Int, Int>, Int>()
    File(args[0]).forEachLine {
        for ((i, c) in it.toCharArray().withIndex()) {
            if (c == '#') {
                asteroids[Pair(i, y)] = 0
            }
        }
        y++
    }
    val location = Pair(11, 19)
    var vaporised = 0
    val counts = asteroids.keys.map { Pair(it, calculateAngle(it, location)) }.groupBy { it.second }.map { it.key to it.value.toMutableList() }.toMap().toMutableMap()
    findFewestBlocked(asteroids)
    while(vaporised < 201){
        for(angle in counts.keys.sorted().reversed()) {
            val asteroidList = counts[angle]!!
            if (asteroidList.isNotEmpty() && asteroidList.first().first.first > location.first) {
                asteroidList.sortWith(compareBy({ it.first.first - location.first }, { it.first.second - location.second }))
            } else {
                asteroidList.sortWith(compareBy({ location.first - it.first.first }, {  location.second - it.first.second }))
            }
            if (asteroidList.isNotEmpty()) {
                val removed = asteroidList.removeAt(0)
                vaporised++
                if (vaporised == 201){
                    println("$vaporised : $removed")
                    break
                }
            }
        }
    }
}

private fun findFewestBlocked(asteroids: MutableMap<Pair<Int, Int>, Int>) {
    var min = Int.MAX_VALUE;
    for (asteroid in asteroids.keys) {
        val blocked = countBlocked(asteroids.keys, asteroid)
        asteroids[asteroid] = blocked
        if (blocked < min) {
            min = blocked
        }
    }
    println(asteroids.size - min - 1)
}

fun countBlocked(asteroids: MutableSet<Pair<Int, Int>>, asteroid: Pair<Int, Int>): Int {
    val counts = asteroids.map { calculateAngle(it, asteroid) }.groupBy { it }.map { it.key to it.value.size }.toMap()
    return counts.values.sum() - counts.size
}

fun calculateAngle(a: Pair<Int, Int>, b: Pair<Int, Int>): Double {
    if (a == b){
        return Double.MAX_VALUE
    }
    val dx = a.first - b.first
    val dy = a.second - b.second
    val angle = atan2(dx.toDouble(), dy.toDouble()) - Math.PI
    return if (angle > 0) angle else angle + 2*Math.PI
}

