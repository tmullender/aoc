package com.adventofcode.nineteen

import java.io.File
import java.util.*

class Amplifier(val buffer: MutableList<Int>, var index: Int, val inputs: Queue<Int>) {

    constructor(buffer: MutableList<Int>, input: Int) : this(buffer, 0, LinkedList()){
        this.inputs.add(input)
    }

    fun compute(): Boolean {
        val offset = 0
        while (index < buffer.size) {
            val command = buffer[index].toString().padStart(5, '0')
            println("Command [$index]: $command inputs: $inputs")
            when (command.substring(3).toInt()) {
                1 -> {
                    buffer[buffer[index+ 3]] = getValue(command[2], buffer, offset, index + 1) + getValue(command[1], buffer, offset, index + 2); index += 4
                }
                2 -> {
                    buffer[buffer[index + 3]] = getValue(command[2], buffer, offset, index + 1) * getValue(command[1], buffer, offset, index + 2); index += 4
                }
                3 -> {
                    buffer[buffer[index + 1]] = inputs.poll(); index += 2
                }
                4 -> {
                    inputs.add(getValue(command[2], buffer, offset, index + 1)); index +=2; return false
                }
                5 -> {
                    if (getValue(command[2], buffer, offset, index + 1) != 0) index = getValue(command[1], buffer, offset, index + 2) else index += 3
                }
                6 -> {
                    if (getValue(command[2], buffer, offset, index + 1) == 0) index = getValue(command[1], buffer, offset, index + 2) else index += 3
                }
                7 -> {
                    buffer[buffer[index + 3]] = if (getValue(command[2], buffer, offset, index + 1) < getValue(command[1], buffer, offset, index + 2)) 1 else 0; index += 4
                }
                8 -> {
                    buffer[buffer[index + 3]] = if (getValue(command[2], buffer, offset, index + 1) == getValue(command[1], buffer, offset, index + 2)) 1 else 0; index += 4
                }
                99 -> {
                    println("${inputs.peek()}"); index = 0; return true
                }
            }
        }
        return false
    }
}

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val memory = File(args[0]).readText().trim().split(",").map { it.toInt() }
//    val phases = listOf(1, 2, 3, 4, 5)
    val phases = listOf(9, 8, 7, 6, 5)
    var max = 0
//    val permutations = listOf(phases)
    val permutations = permute(phases)
    for (permutation in permutations) {
        val amplifiers = Array(5) { Amplifier(memory.toMutableList(), permutation[it]) }
        var i = 0
        var input = 0
        var amplifier: Amplifier
        while(true) {
            amplifier = amplifiers[i]
            amplifier.inputs.add(input)
            if (amplifier.compute()) {
                break
            }
            input = amplifier.inputs.poll()
            i++
            if (i == 5){
                i = 0
            }
        }
        if (amplifier.inputs.peek() > max) {
            max = amplifier.inputs.poll()
            println("Max increased to $max, phase: $permutation")
        }
    }
    println("Max: $max")
}

private fun <T> permute(input: List<T>): List<List<T>> {
    if (input.size == 1) return listOf(input)
    val perms = mutableListOf<List<T>>()
    val toInsert = input[0]
    for (perm in permute(input.drop(1))) {
        for (i in 0..perm.size) {
            val newPerm = perm.toMutableList()
            newPerm.add(i, toInsert)
            perms.add(newPerm)
        }
    }
    return perms
}

private fun getValue(mode: Char, memory: MutableList<Int>, offset: Int, i: Int): Int {
    when(mode) {
        '0' -> return memory[memory[i]]
        '1' -> return memory[i]
        '2' -> return memory[i+offset]
    }
    throw IllegalArgumentException()
}