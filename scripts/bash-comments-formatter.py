#!/usr/bin/env python3
import logging, sys, re, os, argparse

DEFAULT_LINE_LENGTH = 80
ASK_CONFIRMATION=True

def lint(n, line):
    end_of_line = ""

    # Getting rid of the new line
    if line[-1] == "\n":
        end_of_line = "\n"

    # The core message
    core = " ".join(re.findall("\w+", line))
    # Start of the line
    start = "# "
    # Remaining characters to fill with '-'
    place = LINE_LENGTH - (len(start) + 1 + len(core) + 1)
    if place < 2:
        logging.warning("line:%s '%s'", n, line.strip("\n"))
        logging.warning("line-length=%s, too few characters to format line, skipping", LINE_LENGTH)
        return False

    # '-' before core message
    before = "-"*(place//2) + " "
    # '-' after core message
    after = " " + "-"*((place+1)//2)
    # new line assembling
    new_line = start + before + core + after + end_of_line

    # Replacing '\n' by '(NEW LINE)' for proper display
    line = line.replace("\n","(NEW LINE)")
    new_line = new_line.replace("\n","(NEW LINE)")
    print(f"line:{n} formatter suggestion: \n"
          "```\n"
          f"-{line}\n"
          f"+{new_line}\n"
          "```"
    )
    ask_user = input("Approve change? (y/n)") if ASK_CONFIRMATION else "y"
    return False if ask_user=="n" else new_line.replace("(NEW LINE)", "\n")


def main(script):
    write = False
    datas = []
    with open(script, "r", encoding="utf-8") as file:
        datas = file.readlines()
        for n, line in enumerate(datas):
            if re.search("^# -",line):
                new_line = lint(n, line)
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
    parser.add_argument(
            "--line-length",
            "-l",
            type=int,
            default=DEFAULT_LINE_LENGTH,
            help=f"the total line length (default to {DEFAULT_LINE_LENGTH})",
            dest="LINE_LENGTH",
    )
    parser.add_argument(
            "--yes",
            "-y",
            action="store_true",
            help="automatic yes to formatting confirmation",
            dest="YES",
    )
    args = parser.parse_args()
    LINE_LENGTH = args.LINE_LENGTH
    ASK_CONFIRMATION = not args.YES

    if not os.path.exists(args.file) or os.path.islink(args.file) or os.path.isdir(args.file):
        logging.error("'%s' seems not to be a file (symlink forbidden)", args.file)
        exit(1)
    try:
        main(args.file)
    except KeyboardInterrupt:
        logging.error("Detected CTRL+C, exiting...")

