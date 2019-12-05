package com.adventofcode.nineteen

fun main() {
    var count = 0
    for (x in 245182..790572) {
        val digits = x.toString().toCharArray().map { it.toInt() - 48 }
        if (isIncreasing(digits) && hasDouble(digits)) {
            count++
        }
    }
    println(count)
}

fun isIncreasing(digits: List<Int>): Boolean {
    return digits[5] >= digits[4] &&
            digits [4] >= digits[3] &&
            digits [3] >= digits[2] &&
            digits [2] >= digits[1] &&
            digits [1] >= digits[0]
}

fun hasDouble(digits: List<Int>): Boolean {
    return (digits[0] == digits[1] && digits[1] != digits[2]) ||
            (digits[0] != digits[1] && digits[1] == digits[2] && digits[2] != digits[3]) ||
            (digits[1] != digits[2] && digits[2] == digits[3] && digits[3] != digits[4]) ||
            (digits[2] != digits[3] && digits[3] == digits[4] && digits[4] != digits[5]) ||
            (digits[3] != digits[4] && digits[4] == digits[5])
}
