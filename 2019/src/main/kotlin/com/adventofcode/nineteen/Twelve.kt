package com.adventofcode.nineteen

import java.io.File
import kotlin.math.abs

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val regex = Regex("<x=(-?[0-9]*), y=(-?[0-9]*), z=(-?[0-9]*)>")
    val planets = mutableListOf<IntArray>()
    File(args[0]).forEachLine { line ->
        val positions = regex.matchEntire(line)?.groupValues?.drop(1)?.map { it.toInt() }
        planets.add(positions!!.toIntArray())
    }
    val velocities = Array(planets.size) { intArrayOf(0, 0, 0)}
    for (i in 1..1000) {
        updateVelocities(planets, velocities)
        for (j in planets.indices) {
            for (k in planets[j].indices) {
                planets[j][k] += velocities[j][k]
            }
        }
    }
    var energy = 0
    for (i in planets.indices) {
        energy += planets[i].map { abs(it) }.sum() * velocities[i].map { abs(it) }.sum()
    }
    println(energy)
}

fun updateVelocities(planets: MutableList<IntArray>, velocities: Array<IntArray>) {
    planets.mapIndexed { i, planet ->
        planet.mapIndexed { j, p -> calculateVelocity(planets, velocities, i, j, p) }
    }
}

fun calculateVelocity(planets: MutableList<IntArray>, velocities: Array<IntArray>, i: Int, j: Int, current: Int) {
    var count = 0
    for (k in planets.indices){
        if (planets[k][j] > current) {
            count++
        } else if (planets[k][j] < current) {
            count--
        }
    }
    velocities[i][j] += count
}
