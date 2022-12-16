#!/usr/bin/env python3
import logging, sys, re, os, argparse

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
    parser = argparse.ArgumentParser()
    logging.basicConfig(format="%(asctime)s [%(levelname)s]: %(message)s", level=logging.INFO)

    parser.add_argument(
            "file",
            help="the path to the file to format",
    )
    args = parser.parse_args()

    if not os.path.exists(args.file) or os.path.islink(args.file) or os.path.isdir(args.file):
        logging.error("'%s' seems not to be a file (symlink forbidden)", args.file)
        exit(1)
    try:
        main(args.file)
    except KeyboardInterrupt:
        print()
        logging.error("Detected CTRL+C, exiting...")

