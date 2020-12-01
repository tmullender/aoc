package com.adventofcode.nineteen

import java.io.File
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val input = File(args[0]).readText().trim().split(",").map { it.toInt() }
    for (j in 0..99) {
        for (k in 0..99) {
            val memory = input.toMutableList()
            memory[1] = j
            memory[2] = k
            for (i in 0..memory.size step 4) {
                when (memory[i]) {
                    1 -> memory[memory[i + 3]] = memory[memory[i + 1]] + memory[memory[i + 2]]
                    2 -> memory[memory[i + 3]] = memory[memory[i + 1]] * memory[memory[i + 2]]
                    99 -> if (memory[0] == 19690720) { println("$j & $k => memory[0]=${memory[0]}"); exitProcess(0) }
                }
            }
        }
    }
}