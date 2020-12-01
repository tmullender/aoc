package com.adventofcode.nineteen

import java.io.File
import java.util.concurrent.atomic.AtomicLong

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    val memory = File(args[0]).readText().trim().split(",").map { it.toInt() }
    val phases = listOf(9, 8, 7, 6, 5)
    var max = 0L
    val permutations = permute(phases)
    for (permutation in permutations) {
        val amplifiers = Array(5) { IntCodeComputer(memory.mapIndexed{ idx, value -> idx.toLong() to value.toLong() }.toMap().toMutableMap(), permutation[it]) }
        var i = 0
        var input = 0L
        var amplifier: IntCodeComputer
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

