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

USAGE="gpg-share [-h] -f FILE {-u USER} {-U USER_FILE}"


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
    usage
    exit 1
  }

  [ ! -f "$1" ] && {
    log_error "$1: No such file or directory"
    exit 1
  }
}


# TODO: documentation
check_users() {
  users=("$@")
  [ "${#users[@]}" -eq 0 ] && {
    log_error "Please give at least one gpg id after the first argument"
    usage
    exit 1
  }

  # check if each of the "user" is in the keyring
  invalid=0
  for user in "${users[@]}";
  do
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
  file="$1"
  directory="$2"
  shift 2
  users=("$@")
  for user in "${users[@]}";
  do
      log_info "encrypting '$file' for '$user' inside '$directory'..."
      output=$(echo "$directory/$file.$user.asc" | sed 's/\s\+/-/g')
      gpg --verbose --recipient "$user" --encrypt --armor --output "$output" "$file"
  done
  log_success "all encrypted file have been saved inside '$directory'"
}


# TODO: documentation
archive () {
  directory="$1"
  name="$2"
  log_info "storing files in archive"
  # subshell here to avoid archiving the paths to the .asc files
  (
    cd "$directory"
    tar cvf "$name" $(find . -type f)
  )
  cp "$directory/$name" .
}


# parse the arguments.
OPTIONS=$(getopt -o hu:U:f: --long help,user:,users:,file -n 'gpg-share' -- "$@")
if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi
eval set -- "$OPTIONS"


usage () {
  echo "Usage: $USAGE"
  echo "Type -h or --help for the full help."
  exit 0
}


help () {
  echo "gpg-share:"
  echo "     a script to share a secret file with others using pgp public keys."
  echo "     it should guide you when you make mistakes, e.g. providing a non-existing file."
  echo ""
  echo "Usage:"
  echo "     $USAGE"
  echo ""
  echo "Options:"
  echo "     -h/--help               shows this help."
  echo "     -f/--file               the secret file to share."
  echo "     -u/--user               a single user id in the keyring."
  echo "                               can be used multiple times."
  echo "                               supports multi-word ids inside quotes, e.g. \"John Smith\"."
  echo "     -U/--users              the path to a file containing pgp ids."
  echo "                               should contain exactly one valid pgp id per line."
  echo "                               can be used multiple times."
  exit 0
}


main () {
  users=()
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -h | --help ) help ;;
      -f | --file ) file="$2"; shift 2;;
      -u | --user ) users+=("$2"); shift 2;;
      -U | --users ) 
        check_file "$2"
        readarray new_users < "$2"
        shift 2
        for new_user in "${new_users[@]}"; do
          users+=("$(echo -n "$new_user")")
        done;;
      -- ) shift; break ;;
      * ) break ;;
    esac
  done

  check_dependencies
  check_pwd

  check_file "$file"

  check_users "${users[@]}"

  archive_directory=$(mktemp -u "/tmp/gpg-share-XXXXXX")
  mkdir -p "$archive_directory"

  encrypt "$file" "$archive_directory" "${users[@]}"

  repo_version=$(npm pkg get version | sed 's/"//g')
  archive_name="keys-${repo_version}.tar"
  archive "$archive_directory" "$archive_name"
}


main "$@"
