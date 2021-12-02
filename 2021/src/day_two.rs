pub fn run(args: &[String]) -> String {
    if args.len() < 1 {
        return String::from("I need an input file");
    }
    let mut horizontal = 0;
    let mut vertical = 0;
    if let Ok(lines) = crate::file_reader::read_lines(&args[0]) {
        for line in lines {
            if let Ok(value) = line {
                let split: Vec<&str> = value.split(" ").collect();
                match split[0] {
                    "forward" => horizontal += split[1].parse::<i32>().unwrap(),
                    "down" => vertical += split[1].parse::<i32>().unwrap(),
                    "up" => vertical -= split[1].parse::<i32>().unwrap(),
                    _ => println!("Unknown instruction: {:?}", split[0])
                }
            }
        }
    }
    return format!("{} * {} = {}", horizontal, vertical, horizontal * vertical);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn no_args() {
        let args = [];
        assert_eq!("I need an input file", run(&args))
    }

    #[test]
    fn example() {
        let args = [String::from("inputs/day-two-example.txt")];
        assert_eq!("15 * 10 = 150", run(&args))
    }

}