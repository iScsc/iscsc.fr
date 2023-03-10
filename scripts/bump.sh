#!/bin/sh

DEPENDENCIES=(
	semver
	git
	npm
)

# Variables
NB_ARGS="$#"
USAGE="bump.sh [-h] -p|-m|-M"

# ------------------------------- Tool functions -------------------------------

log_any () {
	echo -e "[\e[$1m$2\e[0m] $3"
}

log_error   () { log_any "31" "-" "$1"; }
log_ok      () { log_any "32" "+" "$1"; }
log_warning () { log_any "33" "~" "$1"; }
log_hint    () { log_any "34" "?" "$1"; }
log_info    () { log_any "35" "i" "$1"; }

break_down_version () {
    echo ${1//./ }
}

# -------------------------------- Basic Checks --------------------------------

# Check that current directory is repo root
check_pwd () {
	root="$(dirname $(realpath $(dirname "$0")))"
	[ "$root" != "$(pwd)" ] && {
		log_error "the script should be run from the root of the repo"
		log_error "expected '$root'"
		log_error "found '$(pwd)'"
		exit 1
	}
	[ -n "$DRY_RUN" ] && log_ok "Current directory is repo's root OK"
}

# Check that 1 arg has been supplied
check_arg () {
	local nb_args="$1"
	if [ "${nb_args}" -ne "1" ]; then
		log_error "Exactly one argument is needed, got ${nb_args}."
		usage
	fi
	[ -n "$DRY_RUN" ] && log_ok "Only argument has been given OK"
}

# Check that required binaries are installed
check_dependencies () {
	for package in ${DEPENDENCIES[@]}; do
		if [ ! $(which $package) ]; then
			log_error "All of '${DEPENDENCIES[@]}' are needed to bump version"
			exit 1
		fi
	done
	[ -n "$DRY_RUN" ] && log_ok "Dependencies: '${DEPENDENCIES[@]}' are installed on the system OK"
}

# Check that git working directory is clean...
check_clean_git_working_dir () {
	if [ -n "$(git status --short --untracked-files=no)" ]; then
		log_error "git working directory isn't clean"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "git working directory is clean OK"
}

# ------------------------------ Advanced checks -------------------------------

# Check that supplied version is semantically correct
check_version_semantics () {
	local version="$1"
	if [ -z "${version}" ]; then
		log_error "You provided a wrong argument, version can't be computed"
		usage
		exit 1
	fi
	if [ "${version}" != "$(semver ${version})" ]; then
		log_error "${version} is not a valid version number according to semver"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "Provided version '${version}' is semantically correct OK"
}

# Check that last tag and current version are consistent
check_version_and_tag_consistency () {
	local json_version="$1"
	tagged_commit=$(git rev-list --tags --max-count=1)
	tag_version=$(git describe --tags $tagged_commit)

	if [ "$json_version" != "$tag_version" ]; then
		log_error "tag '$tag_version' is not consistent with project version '${json_version}' !!!"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "tag and project version are consistent OK"
}

# Check that targeted version is > than current
check_version_greater () {
	log_info "Current version is '${CURRENT_VERSION}'"
	if [ ! $(semver "${NEW_VERSION}" -r ">${CURRENT_VERSION}") ]; then
		log_error "'${NEW_VERSION}'<='${CURRENT_VERSION}', '${NEW_VERSION}' isn't accepted as new version."
		exit 1
	fi
	[ -n "$DRY_RUN" ] && log_ok "'${NEW_VERSION}' is greater than older version OK"
}

# Check that iScsc/iscsc.fr is in git remotes list
check_iscsc_remote () {
	local remote="$1"
	if [ -z "$remote" ]; then
		log_error "'iScsc/iscsc.fr' remote is not in remote list"
		exit 1
	fi
	log_ok "'iScsc/iscsc.fr' is in remote list as '$remote' OK"
}

# --------------------------------- Git setup ----------------------------------

git_setup () {
	local iscsc_remote="$1"
	local bump_branch="$2"
	# ...and checkout on main to create a version bump branch
	# (working dir is empty check passed)
	log_info "Checkout on ${iscsc_remote}/main"
	[ -z "$DRY_RUN" ] && git checkout ${iscsc_remote}/main
	log_info "switching to ${bump_branch}"
	[ -z "$DRY_RUN" ] && git switch -c ${bump_branch}
}

# -------------------------------- Version Bump --------------------------------
# ------------------------- Bump frontend and backend --------------------------

bump_modules () {
	local new_version="$1"
	log_info 'Bumping `frontend`'
	(
		cd frontend
		[ -z "$DRY_RUN" ] && npm version "${new_version}" --no-git-tag-version
	)
	log_info 'Bumping `backend`'
	(
		cd backend
		[ -z "$DRY_RUN" ] && npm version "${new_version}" --no-git-tag-version
	)
}

# ----------------------------- Bump root and push -----------------------------

bump_root () {
	local new_version="$1"
	log_info 'Bumping `root`'
	[ -z "$DRY_RUN" ] && { npm version "${new_version}" --no-git-tag-version || exit 1; }
	[ -z "$DRY_RUN" ] && { git commit -m "Bump to version ${new_version}" || exit 1; }
}

# -- Help and usage --

usage () {
	echo "Usage: $USAGE"
	echo "Type -h or --help for the full help."
	echo "See https://github.com/iScsc/iscsc.fr/wiki/Version-bump-procedure#automatic-version-bump for full documentation"
	exit 0
}

help () {
	echo "bump.sh:"
	echo "     a script to easily bump the version of the iScsc website project."
	echo "     it should guide you when you make mistakes, e.g. providing less or more than 1 argument."
	echo ""
	echo "Usage:"
	echo "     $USAGE"
	echo ""
	echo "Options:"
	echo "     -h/--help                shows this help."
	echo "     -p/--patch               bump to patch version (1.2.3 --> 1.2.4)."
	echo "     -m/--minor               bump to minor version (1.2.3 --> 1.3.0)."
	echo "     -M/--major               bump to major version (1.2.3 --> 2.0.0)."
	exit 0
}

# -------------------------------- Main Section --------------------------------

main () {
	# Run all basic checks
	check_pwd
	check_arg "${NB_ARGS}"
	check_dependencies
	check_clean_git_working_dir

	# Define version variables
	NEW_VERSION=""
	CURRENT_VERSION=$(npm pkg get version | sed 's/"//g')

	# Extract new version from arguments
	while [[ $# -gt 0 ]]; do
		case "$1" in
			-h | --help ) help ;;
			-p | --patch ) NEW_VERSION=$(bump_patch ${CURRENT_VERSION}; shift 1;;
			-m | --minor ) NEW_VERSION=$(bump_minor ${CURRENT_VERSION}; shift 1;;
			-M | --major ) NEW_VERSION=$(bump_major ${CURRENT_VERSION}; shift 1;;
			-- ) shift; break ;;
			* ) break ;;
		esac
	done

	# Define git variables
	BUMP_BRANCH="${NEW_VERSION}-version-bump"
	ISCSC_REMOTE=$(git remote -v | grep 'git@github.com:iScsc/iscsc.fr.git' | awk '{print $1}' | head --lines 1)

	# Run all advanced checks
	check_version_semantics "${NEW_VERSION}"
	check_version_and_tag_consistency "${CURRENT_VERSION}"
	check_version_greater
	check_iscsc_remote "${ISCSC_REMOTE}"

	log_info "'${NEW_VERSION}'>'${CURRENT_VERSION}', '${NEW_VERSION}' is accepted as new version."

	# Setup git branch
	git_setup ${ISCSC_REMOTE} ${BUMP_BRANCH}

	# Bump
	bump_modules ${NEW_VERSION}
	bump_root ${NEW_VERSION}

	# Try to push bump refs
	log_info 'Pushing branch and bump commit'
	log_warning "pushing to \`${ISCSC_REMOTE}\` please type your passphrase/password if required:"
	PUSH_COMMAND="git push ${ISCSC_REMOTE} ${BUMP_BRANCH} v${CURRENT_VERSION}"
	[ -z "$DRY_RUN" ] && { $PUSH_COMMAND || log_error "push failed, you can push with \`${PUSH_COMMAND}\`"; }

	log_hint '`npm install` has been run during the bump, you MUST review the changes during PR review to ensure package.json and package-lock.json where compatible!!!'
}

# parse the arguments.
OPTIONS=$(getopt -o hpmM --long help,patch,minor,major -n 'bump' -- "$@")
if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi
eval set -- "$OPTIONS"

main "$@"
