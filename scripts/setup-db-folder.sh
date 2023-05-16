#!/bin/sh

log_any () {
	echo -e "[\e[$1m$2\e[0m] $3"
}

log_error   () { log_any "31" "-" "$1"; }
log_ok      () { log_any "32" "+" "$1"; }
log_warning () { log_any "33" "~" "$1"; }
log_hint    () { log_any "34" "?" "$1"; }
log_info    () { log_any "35" "i" "$1"; }

check_pwd () {
  root="$(dirname $(realpath $(dirname "$0")))"
  [ "$root" != "$(pwd)" ] && {
    log_error "the script should be run from the root of the repo"
    log_error "expected '$root'"
    log_error "found '$(pwd)'"
    exit 1
  }
}

setup_folder () {
    local folder="$1"

    mkdir -p $folder/dev
    mkdir $folder/prod
    chmod -R 774 $folder
    log_info "sudo permission needed to chown newly created '$folder'"
    sudo chown -R :root $folder
}

main () {
    check_pwd

    MONGODB_FOLDER="mongodb"
    if [ ! -d "$MONGODB_FOLDER" ]; then
        setup_folder "$MONGODB_FOLDER"
        exit 0
    else
        log_error "'$MONGODB_FOLDER' folder already exists, please deal with it manually"
    fi
}

main "$@"