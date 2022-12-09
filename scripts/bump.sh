#!/bin/sh

DEPENDENCIES=(
	semver
	git
	npm
)

# ----------- Basic Checking -----------

# check that current directory is repo root
check_pwd () {
	root="$(dirname $(realpath $(dirname "$0")))"
	[ "$root" != "$(pwd)" ] && {
		echo "[!] the script should be run from the root of the repo"
		echo "[-] expected '$root'"
		echo "[-] found '$(pwd)'"
		exit 1
	}
	[ -n "$DRY_RUN" ] && echo "[i] Current directory is repo's root OK"
}

# Check that 1 arg has been supplied
check_arg () {
	if [ "${NB_ARGS}" -ne "1" ]; then
		echo "[-] Exactly one argument is needed, got ${NB_ARGS}."
		echo '[?] Example: `./bump.sh 0.2.6`'
		echo "[?] see https://github.com/iScsc/iscsc.fr/wiki/Version-bump-procedure#automatic-version-bump for full documentation"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && echo "[i] Only argument has been given OK"
}

# Check that required binaries are installed
check_dependencies () {
	for package in ${DEPENDENCIES[@]}; do
		if [ ! $(which $package) ]; then
			echo "[-] All of '${DEPENDENCIES[@]}' are needed to bump version"
			exit 1
		fi
	done
	[ -n "$DRY_RUN" ] && echo "[i] Dependencies: '${DEPENDENCIES[@]}' are installed on the system OK"
}

# Check that supplied version is semantically correct
check_version_semantics () {
	if [ "${NEW_VERSION}" != "$(semver ${NEW_VERSION})" ]; then
		echo "[-] ${NEW_VERSION} is not a valid version number according to semver"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && echo "[i] Provided version '${NEW_VERSION}' is semantically correct OK"
}

# Check that git working directory is clean...
check_clean_git_working_dir () {
	if [ -n "$(git status --short --untracked-files=no)" ]; then
		echo "[-] git working directory isn't clean"
		exit 1
	fi
	[ -n "$DRY_RUN" ] && echo "[i] git working directory is clean OK"
}

# Variables
NB_ARGS="$#"

# Run all checks
check_pwd
check_arg
NEW_VERSION="$1"; shift 1;

check_dependencies
check_version_semantics
check_clean_git_working_dir

# ----------- Variable definition -----------

# Define needed variables
CURRENT_VERSION=$(npm pkg get version | sed 's/"//g')
BUMP_BRANCH="${NEW_VERSION}-version-bump"
ISCSC_REMOTE=$(git remote -v | grep 'git@github.com:iScsc/iscsc.fr.git' | awk '{print $1}' | head --lines 1)

# ----------- Advanced checking ----------
# ----------- Version checking -----------

# Check if targeted version is > than current
check_version_greater () {
	echo "[+] Current version is '${CURRENT_VERSION}'"
	if [ ! $(semver "${NEW_VERSION}" -r ">${CURRENT_VERSION}") ]; then
		echo "[-] '${NEW_VERSION}'<='${CURRENT_VERSION}', '${NEW_VERSION}' isn't accepted as new version."
		exit 1
	fi
}

# Run check
check_version_greater
echo "[+] '${NEW_VERSION}'>'${CURRENT_VERSION}', '${NEW_VERSION}' is accepted as new version."

# ----------- Git setup -----------

# ...and checkout on main to create a version bump branch
echo "[+] Checkout on ${ISCSC_REMOTE}/main"
[ -z "$DRY_RUN" ] && git checkout ${ISCSC_REMOTE}/main
echo "[+] switching to ${BUMP_BRANCH}"
[ -z "$DRY_RUN" ] && git switch -c ${BUMP_BRANCH}

# ----------- Version Bump -----------
# ---- Bump frontend and backend -----

echo '[+] Bumping `frontend`'
(
	cd frontend
	[ -z "$DRY_RUN" ] && npm version "${NEW_VERSION}" --no-git-tag-version
)
echo '[+] Bumping `backend`'
(
	cd backend
	[ -z "$DRY_RUN" ] && npm version "${NEW_VERSION}" --no-git-tag-version
)

echo '[+] Commiting `frontend` and `backend` bump'
[ -z "$DRY_RUN" ] && { git commit -m "Bump frontend and backend versions to ${NEW_VERSION}" || exit 1; }

# ------ Bump root and push ------

echo '[+] Bumping `root`'
[ -z "$DRY_RUN" ] && { npm version "${NEW_VERSION}" -m "Bump to version %s" || exit 1; }

echo '[+] Pushing branch and new version tag'
echo "[~] pushing to \`${ISCSC_REMOTE}\` please type your passphrase/password if required:"
[ -z "$DRY_RUN" ] && { git push ${ISCSC_REMOTE} ${BUMP_BRANCH} v${CURRENT_VERSION} || echo "[-] push failed, you can push with \`git push ${ISCSC_REMOTE} ${BUMP_BRANCH} v${CURRENT_VERSION}\`"; }

echo '[!] `npm install` has been run during the bump, you MUST review the changes during PR review to ensure package.json and package-lock.json where compatible!!!'

