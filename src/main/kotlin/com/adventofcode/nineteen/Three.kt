package com.adventofcode.nineteen

import java.io.File

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val input = File(args[0]).readLines()
    val coordinates = Array(2){ _ -> mutableMapOf("0,0" to -1)}
    for (line in input.indices) {
        var x = 0
        var y = 0
        var step = 0
        val instructions = input[line].trim().split(",")
        for (instruction in instructions) {
            val distance = instruction.substring(1).toInt()
            when(instruction[0]){
                'D' -> {
                    for (i in 1..distance) {
                        step++
                        y--
                        coordinates[line]["$x,$y"] = step
                    }
                }
                'L' -> {
                    for (i in 1..distance) {
                        step++
                        x--
                        coordinates[line]["$x,$y"] = step
                    }
                }
                'R' -> {
                    for (i in 1..distance) {
                        step++
                        x++
                        coordinates[line]["$x,$y"] = step
                    }
                }
                'U' -> {
                    for (i in 1..distance) {
                        step++
                        y++
                        coordinates[line]["$x,$y"] = step
                    }
                }
            }
        }
    }
    val intersects = coordinates[1].keys.intersect(coordinates[0].keys)
    var shortest = Int.MAX_VALUE
    for (point in intersects){
        if (point == "0,0") {
            continue
        }
        val steps = coordinates[0][point]!! + coordinates[1][point]!!
        if (steps < shortest) {
            shortest = steps
        }
    }
    println("Shortest: $shortest")
}

