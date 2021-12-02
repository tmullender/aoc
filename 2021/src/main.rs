use std::env;

mod day_one;
mod day_two;
mod file_reader;

fn main() {
    let args: Vec<String> = env::args().collect();
    let result = run(&args);
    println!("{:?}", result)
}

fn run(args: &Vec<String>) -> String {
    match args.len() {
        1 => String::from("I need to know what day it is..."),
        _ => {
            match args[1].parse() {
                Ok(1) => day_one::run(&args[2..]),
                Ok(2) => day_two::run(&args[2..]),
                _ => String::from("I haven't got that far yet")
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_run() {
        for n in 1..3 {
            let args = vec![String::from("aoc"), format!("{}", n)];
            assert_eq!("I need an input file", run(&args))
        }
    }

    #[test]
    fn missing_args() {
        let args = vec![String::from("aoc")];
        assert_eq!("I need to know what day it is...", run(&args))
    }

    #[test]
    fn test_main() {
        main()
    }
}


