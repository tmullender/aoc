package com.adventofcode.nineteen

import java.io.File
import java.lang.IllegalArgumentException
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val memory = File(args[0]).readText().trim().split(",").map { it.toInt() }.toMutableList()
    var input = 5
    var i = 0
    while (i < memory.size) {
        val command = memory[i].toString().padStart(5, '0')
        println("Command [$i]: $command")
        when (command.substring(3).toInt()) {
            1 -> { memory[memory[i + 3]] = getValue(command[2], memory, i + 1) + getValue(command[1], memory, i + 2); i += 4 }
            2 -> { memory[memory[i + 3]] = getValue(command[2], memory, i + 1) * getValue(command[1], memory, i + 2); i += 4 }
            3 -> { memory[memory[i + 1]] = input; i += 2}
            4 -> { input = getValue(command[2], memory, i + 1); i += 2 }
            5 -> { if (getValue(command[2], memory, i + 1) != 0) i = getValue(command[1], memory, i + 2) else i += 3 }
            6 -> { if (getValue(command[2], memory, i + 1) == 0) i = getValue(command[1], memory, i + 2) else i += 3 }
            7 -> { memory[memory[i + 3]] = if (getValue(command[2], memory, i + 1) < getValue(command[1], memory, i + 2)) 1 else 0; i += 4 }
            8 -> { memory[memory[i + 3]] = if (getValue(command[2], memory, i + 1) == getValue(command[1], memory, i + 2)) 1 else 0; i += 4 }
            99 -> { println("$input"); i += 1; exitProcess(0) }
        }
    }
}

private fun getValue(mode: Char, memory: MutableList<Int>, i: Int): Int {
    when(mode) {
        '0' -> return memory[memory[i]]
        '1' -> return memory[i]
    }
    throw IllegalArgumentException()
}