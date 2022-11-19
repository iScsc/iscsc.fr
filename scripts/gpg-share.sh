#!/usr/bin/env bash


# TODO: documentation
log_error () {
  echo -e "${0}: \e[91merror\e[0m: $1"
}


# TODO: documentation
log_success () {
  echo -e "${0}: \e[92msuccess\e[0m: $1"
}


# TODO: documentation
log_warning () {
  echo -e "${0}: \e[93mwarning\e[0m: $1"
}


# TODO: documentation
log_info () {
  echo -e "${0}: \e[96minfo\e[0m: $1"
}


DEPENDENCIES=(
  npm
  gpg
  tar
)

USAGE="gpg-share [-h]"


# TODO: documentation
check_dependencies () {
  error=0
  for dependency in "${DEPENDENCIES[@]}"; do
    [ ! $(which $dependency 2> /dev/null) ] && {
      error=1
      log_warning "'$dependency' is required"
    }
  done

  [ "$error" -eq 1 ] && {
    log_error "one or more dependencies are missing"
    exit 1
  }
}


# TODO: documentation
check_pwd () {
  root="$(dirname $(realpath $(dirname "$0")))"
  [ "$root" != "$(pwd)" ] && {
    log_error "the script should be run from the root of the repo"
    log_error "expected '$root'"
    log_error "found '$(pwd)'"
    exit 1
  }
}


# TODO: documentation
check_file () {
  [ -z "$1" ] && {
    log_error "Please give a file to share as the first argument"
    exit 1
  }

  [ ! -f "$1" ] && {
    log_error "$1: No such file or directory"
    exit 1
  }
}


# TODO: documentation
check_users() {
  [ "${#users[@]}" -eq 0 ] && {
    log_error "Please give at least one gpg id after the first argument"
    exit 1
  }

  # check if each of the "user" is in the keyring
  invalid=0
  for _user in "${users[@]}";
  do
      user=$(echo -n "$_user")
      nb_ids=$(gpg --quiet --list-keys "$user" 2> /dev/null | grep "^uid" | wc -l)
      case "$nb_ids" in
        0 ) log_warning "'$user' not found in the keyring..."; invalid=1 ;;
        1 )
          id=$(gpg --quiet --list-keys "$user" | grep uid -B1 | head -n 1 | awk '{print $1}');
          log_success "key $id found for '$user'"
          ;;
        * ) log_warning "too many ids found for '$user' in keyring ($nb_ids)"; invalid=1 ;;
      esac
  done
  [ "$invalid" -eq 1 ] && {
    log_error "one or more users are invalid for the keyring"
    exit 1
  }
}


# TODO: documentation
encrypt () {
  for _user in "${users[@]}";
  do
      user=$(echo -n "$_user")
      log_info "encrypting '$file' for '$user' inside '$DUMP_DIR'..."
      output=$(echo "$DUMP_DIR/$file.$user.asc" | sed 's/\s\+/-/g')
      gpg --verbose --recipient "$user" --encrypt --armor --output "$output" "$file"
  done
  log_success "all encrypted file have been saved inside '$DUMP_DIR'"
}


# TODO: documentation
archive () {
  log_info "storing files in archive"
  # subshell here to avoid archiving the paths to the .asc files
  (
    cd "$DUMP_DIR"
    tar cvf "$ARCHIVE" $(find . -type f)
  )
  cp "$DUMP_DIR/$ARCHIVE" .
}


# parse the arguments.
OPTIONS=$(getopt -o h --long help -n 'gpg-share' -- "$@")
if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi
eval set -- "$OPTIONS"


usage () {
  echo "Usage: $USAGE"
  echo "Type -h or --help for the full help."
  exit 0
}


help () {
  echo "gpg-share:"
  echo "     TODO."
  echo ""
  echo "Usage:"
  echo "     $USAGE"
  echo ""
  echo "Options:"
  echo "     -h/--help               shows this help."
  exit 0
}


main () {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -h | --help ) help ;;
      -- ) shift; break ;;
      * ) break ;;
    esac
  done

  echo "ACTUAL STUFF COMING SOON!"
  exit 0

  check_dependencies
  check_pwd

  # get the version
  VERSION=$(npm pkg get version | sed 's/"//g')

  # build the archive name
  ARCHIVE="keys-${VERSION}.tar"

  file="$1"; shift 1
  check_file "$file"

  if [ -n "$USER_FILE" ]; then
    check_file "$USER_FILE"
    readarray users < "$USER_FILE"
  else
    users=($@)
  fi

  check_users

  DUMP_DIR=$(mktemp -u "/tmp/gpg-share-XXXXXX")
  mkdir -p "$DUMP_DIR"

  encrypt
  archive
}


main "$@"
