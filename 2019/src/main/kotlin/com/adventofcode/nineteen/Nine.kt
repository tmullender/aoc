package com.adventofcode.nineteen

import java.io.File
import java.util.*
import java.util.concurrent.atomic.AtomicLong

class IntCodeComputer(val buffer: MutableMap<Long, Long>, var index: Long, val inputs: Queue<Long>) {

    var offset = 0L

    constructor(buffer: MutableMap<Long, Long>, input: Int) : this(buffer, 0, LinkedList()){
        this.inputs.add(input.toLong())
    }

    fun compute(): Boolean {
        while (index < buffer.size) {
            val command = buffer[index].toString().padStart(5, '0')
            println("$index Command [$index]: $command inputs: $inputs")
            when (command.substring(3).toInt()) {
                1 -> {
                    buffer[buffer[index+ 3]!!] = getValue(command[2], index + 1) + getValue(command[1], index + 2); index += 4
                }
                2 -> {
                    buffer[buffer[index + 3]!!] = getValue(command[2], index + 1) * getValue(command[1], index + 2); index += 4
                }
                3 -> {
                    buffer[buffer[index + 1]!!] = inputs.poll(); index += 2
                }
                4 -> {
                    inputs.add(getValue(command[2], index + 1)); index +=2;
                }
                5 -> {
                    if (getValue(command[2], index + 1) != 0L) index = getValue(command[1], index + 2) else index += 3
                }
                6 -> {
                    if (getValue(command[2], index + 1) == 0L) index = getValue(command[1], index + 2) else index += 3
                }
                7 -> {
                    buffer[buffer[index + 3]!!] = if (getValue(command[2], index + 1) < getValue(command[1], index + 2)) 1 else 0L; index += 4
                }
                8 -> {
                    buffer[buffer[index + 3]!!] = if (getValue(command[2], index + 1) == getValue(command[1], index + 2)) 1 else 0L; index += 4
                }
                9 -> {
                    offset += getValue(command[2], index + 1); index += 2
                }
                99 -> {
                    println("${inputs.peek()}"); index = 0; return true
                }
            }
        }
        return false
    }

    fun getValue(mode: Char, i: Long): Long {
        when(mode) {
            '0' -> return buffer.getOrDefault(buffer[i], 0L)
            '1' -> return buffer.getOrDefault(i, 0L)
            '2' -> return buffer.getOrDefault(buffer[i]!! + offset, 0L)
        }
        throw IllegalArgumentException()
    }
}

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val memory = File(args[0]).readText().trim().split(",").map { it.toLong() }
    val boost = IntCodeComputer(memory.mapIndexed{ idx, value -> idx.toLong() to value }.toMap().toSortedMap().toMutableMap(), 1)
    boost.compute()

    println("Outputs: ${boost.inputs}")
}

