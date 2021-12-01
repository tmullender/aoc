use std::{env, io};
use std::fs::File;
use std::path::Path;
use std::io::BufRead;

fn main() {
    let args: Vec<String> = env::args().collect();
    match args.len() {
        1 => println!("I need to know what day it is..."),
        _ => {
            match args[1].parse() {
                Ok(1) => day_one(&args[2..]),
                _ => println!("I haven't got that far yet")
            }
        }
    }
}

fn day_one(args: &[String]) {
    if args.len() < 1 {
        println!("I need an input file");
        return;
    }
    let mut count = 0;
    if let Ok(lines) = read_lines(&args[0]) {
        let mut previous = 10000;
        for line in lines {
            if let Ok(value) = line {
                let current = value.parse().unwrap();
                if current > previous {
                    count += 1
                }
                previous = current
            }
        }
    }

    println!("Result: {:?}", count)
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
    where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

