#!/bin/sh

DEPENDENCIES=(
	semver
	git
	npm
)

# Variables
NB_ARGS="$#"

# ------------------------------- Tool functions -------------------------------

log_any () {
	echo -e "[\e[$1m$2\e[0m] $3"
}

log_error   () { log_any "31" "!" "$1"; }
log_ok      () { log_any "32" "i" "$1"; }
log_warning () { log_any "33" "~" "$1"; }
log_hint    () { log_any "34" "?" "$1"; }
log_info    () { log_any "35" "+" "$1"; }
log_normal  () { log_any "36" "-" "$1"; }

# -------------------------------- Basic Checks --------------------------------

# check that current directory is repo root
check_pwd () {
	root="$(dirname $(realpath $(dirname "$0")))"
	[ "$root" != "$(pwd)" ] && {
		log_error "the script should be run from the root of the repo"
		log_normal "expected '$root'"
		log_normal "found '$(pwd)'"
		exit 1
	}
	[ -n "$DRY_RUN" ] && log_ok "Current directory is repo's root OK"
}

# Check that 1 arg has been supplied
check_arg () {
	local nb_args="$1"
	if [ "${nb_args}" -ne "1" ]; then
		log_normal "Exactly one argument is needed, got ${nb_args}."
		log_hint 'Example: `./bump.sh 0.2.6`'
		log_hint "see https://github.com/iScsc/iscsc.fr/wiki/Version-bump-procedure#automatic-version-bump for full documentation"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "Only argument has been given OK"
}

# Check that required binaries are installed
check_dependencies () {
	for package in ${DEPENDENCIES[@]}; do
		if [ ! $(which $package) ]; then
			log_normal "All of '${DEPENDENCIES[@]}' are needed to bump version"
			exit 1
		fi
	done
	[ -n "$DRY_RUN" ] && log_ok "Dependencies: '${DEPENDENCIES[@]}' are installed on the system OK"
}

# Check that git working directory is clean...
check_clean_git_working_dir () {
	if [ -n "$(git status --short --untracked-files=no)" ]; then
		log_normal "git working directory isn't clean"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "git working directory is clean OK"
}

# Run all basic checks
check_pwd
check_arg "${NB_ARGS}"
check_dependencies
check_clean_git_working_dir

# ---------------------------- Variables definition ----------------------------

# Define needed variables
NEW_VERSION="$1"; shift 1;
CURRENT_VERSION=$(npm pkg get version | sed 's/"//g')
BUMP_BRANCH="${NEW_VERSION}-version-bump"
ISCSC_REMOTE=$(git remote -v | grep 'git@github.com:iScsc/iscsc.fr.git' | awk '{print $1}' | head --lines 1)

# ------------------------------ Advanced checks -------------------------------

# Check that supplied version is semantically correct
check_version_semantics () {
	local version="$1"
	if [ "${version}" != "$(semver ${version})" ]; then
		log_normal "${version} is not a valid version number according to semver"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "Provided version '${version}' is semantically correct OK"
}

# Check that targeted version is > than current
check_version_greater () {
	log_info "Current version is '${CURRENT_VERSION}'"
	if [ ! $(semver "${NEW_VERSION}" -r ">${CURRENT_VERSION}") ]; then
		log_normal "'${NEW_VERSION}'<='${CURRENT_VERSION}', '${NEW_VERSION}' isn't accepted as new version."
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "'${NEW_VERSION}' is greater than older version OK"
}

# Check that iScsc/iscsc.fr is in git remotes list
check_iscsc_remote () {
	local remote="$1"
	if [ -z "$remote" ]; then
		log_normal "'iScsc/iscsc.fr' remote is not in remote list"
		exit 1
	fi
	log_ok "'iScsc/iscsc.fr' is in remote list as '$remote' OK"
}

# Run all advanced checks
check_version_semantics "${NEW_VERSION}"
check_version_greater
check_iscsc_remote "${ISCSC_REMOTE}"

log_info "'${NEW_VERSION}'>'${CURRENT_VERSION}', '${NEW_VERSION}' is accepted as new version."
# --------------------------------- Git setup ----------------------------------

# ...and checkout on main to create a version bump branch
log_info "Checkout on ${ISCSC_REMOTE}/main"
[ -z "$DRY_RUN" ] && git checkout ${ISCSC_REMOTE}/main || exit 1
log_info "switching to ${BUMP_BRANCH}"
[ -z "$DRY_RUN" ] && git switch -c ${BUMP_BRANCH}

# -------------------------------- Version Bump --------------------------------
# ------------------------- Bump frontend and backend --------------------------

log_info 'Bumping `frontend`'
(
	cd frontend
	[ -z "$DRY_RUN" ] && npm version "${NEW_VERSION}" --no-git-tag-version
)
log_info 'Bumping `backend`'
(
	cd backend
	[ -z "$DRY_RUN" ] && npm version "${NEW_VERSION}" --no-git-tag-version
)

log_info 'Commiting `frontend` and `backend` bump'
[ -z "$DRY_RUN" ] && { git commit -m "Bump frontend and backend versions to ${NEW_VERSION}" || exit 1; }

# ----------------------------- Bump root and push -----------------------------

log_info 'Bumping `root`'
[ -z "$DRY_RUN" ] && { npm version "${NEW_VERSION}" -m "Bump to version %s" || exit 1; }

log_info 'Pushing branch and new version tag'
log_warning "pushing to \`${ISCSC_REMOTE}\` please type your passphrase/password if required:"
[ -z "$DRY_RUN" ] && { git push ${ISCSC_REMOTE} ${BUMP_BRANCH} v${CURRENT_VERSION} || log_normal "push failed, you can push with \`git push ${ISCSC_REMOTE} ${BUMP_BRANCH} v${CURRENT_VERSION}\`"; }

log_error '`npm install` has been run during the bump, you MUST review the changes during PR review to ensure package.json and package-lock.json where compatible!!!'

