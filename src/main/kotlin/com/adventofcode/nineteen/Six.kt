package com.adventofcode.nineteen

import java.io.File

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val orbits = mutableMapOf<String, MutableSet<String>>()
    File(args[0]).forEachLine { 
        val orbit = it.split(")")
        if (orbit[0] !in orbits) {
            orbits[orbit[0]] = mutableSetOf(orbit[1])
        } else {
            orbits[orbit[0]]?.add(orbit[1])
        }
    }
    val count = countOrbits("COM", orbits, 0)
    val paths = mutableMapOf<String, MutableList<String>>();
    buildPaths("COM", orbits, paths)
    val san = paths["SAN"]
    val you = paths["YOU"]
    while (you?.get(0)?.equals(san?.get(0))!!){
        you?.removeAt(0)
        san?.removeAt(0)
    }
    println("Count: $count")
    println("Path: ${san?.size?.plus(you?.size)}")
}

fun buildPaths(obj: String, orbits: MutableMap<String, MutableSet<String>>, paths: MutableMap<String, MutableList<String>>) {
    if (obj !in paths) {
        paths[obj] = mutableListOf()
    }
    orbits[obj]?.forEach() {
        paths[it] = paths[obj]!!.toMutableList()
        paths[it]?.add(obj)
        buildPaths(it, orbits, paths)
    }

}

fun countOrbits(obj: String, orbits: MutableMap<String, MutableSet<String>>, layer: Int): Int {
    return if (obj in orbits) {
        layer + orbits[obj]!!.fold(0) { x, y -> x + countOrbits(y, orbits, layer+1) }
    } else {
        layer
    }
}

