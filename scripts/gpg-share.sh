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
  7zz
)


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


check_dependencies

# get the version
VERSION=$(npm pkg get version | sed 's/"//g')

# build the archive name
ARCHIVE="keys-${VERSION}.7z"


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
  users=($@)

  [ "${#users[@]}" -eq 0 ] && {
    log_error "Please give at least one gpg id after the first argument"
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


file="$1"; shift 1
check_file "$file"

users=($@)
check_users "${users[@]}"


# TODO: documentation
encrypt () {
  for user in "${users[@]}";
  do
      log_info "encrypting '$file' for '$user'..."
      gpg --verbose --recipient "$user" --encrypt --armor --output "$file.$user.asc" "$file"
  done
}


# TODO: documentation
archive () {
  log_info "storing files in archive"
  7zz a "$ARCHIVE" $(echo "${users[@]}" | tr ' ' '\n' | sed "s/\(.*\)/$file.\1.asc/")
  log_info "content of the archive"
  7zz l "$ARCHIVE"
}


encrypt
archive
