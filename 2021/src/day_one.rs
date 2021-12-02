pub fn run(args: &[String]) -> String {
    if args.len() < 1 {
        return String::from("I need an input file");
    }
    let mut count = 0;
    if let Ok(lines) = crate::file_reader::read_lines(&args[0]) {
        let values: Vec<i32> = lines.map(|line| line.unwrap().parse().unwrap()).collect();
        for n in 3..values.len() {
            if values[n] > values[n-3] {
                count += 1
            }
        }

    }

    format!("{}", count)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn example() {
        let args = [String::from("inputs/day-one-example.txt")];
        assert_eq!("5", run(&args))
    }

    #[test]
    fn unknown() {
        let args = [String::from("unknown")];
        assert_eq!("0", run(&args))
    }

    #[test]
    fn no_args() {
        let args = [];
        assert_eq!("I need an input file", run(&args))
    }
}