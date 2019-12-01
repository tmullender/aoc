package com.adventofcode.nineteen

import java.io.File
import kotlin.math.floor

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("I need an input")
        return
    }
    var total = 0
    File(args[0]).forEachLine { total += fuel(
        it.toDouble(),
        0.0
    )
    }
    println("Total: $total")
}

private fun fuel(weight: Double) = floor(weight / 3).toInt() - 2

private fun fuel(weight: Double, accumulator: Double) : Int {
    val f = fuel(weight)
    if (f <= 0) {
        return accumulator.toInt();
    }
    return fuel(f.toDouble(), accumulator + f)
}
