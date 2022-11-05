#!/bin/sh

# ----------- Basic Checking -----------

# Check that 1 arg has been supplied
if [ "$#" != "1" ]; then
	echo "[-] Exactly one argument is needed."
	echo '[?] Example: `./bump.sh 0.2.6`'
	exit 1
fi

# Check that required binaries are installed
for package in semver git npm; do
	if [ ! -f "/usr/bin/$package" ]; then
		echo "[-] `$package` is needed to bump version"
		exit 1
	fi
done

# Check that supplied version is semantically correct
if [ ! "$1" = "$(/usr/bin/semver $1)" ]; then
	echo "[-] $1 is not a valid version number according to semver"
	exit 1
fi

# Check that git working directory is clean...
if [ -n "$(git status -s --untracked-files=no)" ]; then
	echo "[-] git working directory isn't clean"
	exit 1
fi

# ----------- Variable definition -----------

# Define needed variables
CURRENT=$(npm pkg get version | sed 's/"//g')
NEW_VERSION=$1
BUMP_BRANCH="${NEW_VERSION}-version-bump"
ISCSC_REMOTE=$(git remote -v | grep 'git@github.com:iScsc/iscsc.fr.git' | awk '{print $1}' | head --lines 1)

# ----------- Version checking -----------

# Check if targeted version is > than current
echo "[+] Current version is '${CURRENT}'"
if [ ! $(semver "${NEW_VERSION}" -r ">$CURRENT") ]; then
	echo "[-] '${NEW_VERSION}'<='$CURRENT', '${NEW_VERSION}' isn't accepted as new version."
	exit 1
fi
echo "[+] '${NEW_VERSION}'>'$CURRENT', '${NEW_VERSION}' is accepted as new version."

# ----------- Git setup -----------

# ...and checkout on main to create a version bump branch
echo "[+] Checkout on ${ISCSC_REMOTE}/main"
git checkout ${ISCSC_REMOTE}/main
echo "[+] switching to ${BUMP_BRANCH}"
git switch -c ${BUMP_BRANCH}

# ----------- Version Bump -----------

echo '[+] Bumping `frontend`'
cd frontend
npm version "${NEW_VERSION}" --no-git-tag-version
echo '[+] Bumping `backend`'
cd ../backend
npm version "${NEW_VERSION}" --no-git-tag-version

echo '[+] Commiting `frontend` and `backend` bump'
git commit -m "Bump frontend and backend versions to ${NEW_VERSION}"

echo '[+] Bumping `root`'
cd ..
npm version "${NEW_VERSION}" -m "Bump to version %s"
