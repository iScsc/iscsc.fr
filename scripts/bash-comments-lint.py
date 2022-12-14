#!/usr/bin/env python3
import logging, sys, re, os

LINE_LENGTH = 80

def lint(line):
    new_line = ""
    end_of_line = ""

    # Getting rid of the new line
    if line[-1] == "\n":
        end_of_line = "\n"

    core = " ".join(re.findall("\w+", line))
    start = "# "
    place = LINE_LENGTH - (len(start) + 1 + len(core) + 1)
    before = "-"*(place//2) + " "
    after = " " + "-"*((place+1)//2)
    new_line = start + before + core + after + end_of_line

    line = line.replace("\n","(NEW LINE)")
    new_line = new_line.replace("\n","(NEW LINE)")
    print("linter suggestion: \n"
          "```\n"
          f"-{line}\n"
          f"+{new_line}\n"
          "```")
    ask_user = input("Approve change? (y/n)")
    return False if ask_user=="n" else new_line.replace("(NEW LINE)", "\n")


def main(script):
    write = False
    datas = []
    with open(script, "r", encoding="utf-8") as file:
        datas = file.readlines()
        for n, line in enumerate(datas):
            if re.search("^# -",line):
                new_line = lint(line)
                if new_line:
                    write = True
                    datas[n] = new_line
    if write:
        with open(script, "w", encoding="utf-8") as file:
            file.writelines(datas)


if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s [%(levelname)s]: %(message)s", level=logging.INFO)
    try:
        file = sys.argv[1]
    except IndexError:
        logging.error("Please provide exactly one argument")
        exit(1)
    if not os.path.exists(file) or os.path.islink(file) or os.path.isdir(file):
        logging.error("'%s' seems not to be a file (symlink forbidden)", file)
        exit(1)
    try:
        main(file)
    except KeyboardInterrupt:
        print()
        logging.error("Detected CTRL+C, exiting...")

