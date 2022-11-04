#!/bin/sh

if [ "$#" != "1" ]; then
	echo "[-] Exactly one argument is needed."
	echo '[?] Example: `./bump.sh 0.2.6`'
	exit 1
fi

for package in semver git npm; do
	if [ ! -f "/usr/bin/$package" ]; then
		echo "[-] `$package` is needed to bump version"
		exit 1
	fi
done

if [ ! "$1" = "$(/usr/bin/semver $1)" ]; then
	echo "[-] $1 is not a valid version number according to semver"
	exit 1
fi

if [ -n "$(git status -s --untracked-files=no)" ]; then
	echo "[-] git working directory isn't clean"
	exit 1
fi

current=$(npm pkg get version | sed 's/"//g')

echo "[+] Current version is '${current}'"

if [ ! $(semver "$1" -r ">$current") ]; then
	echo "[-] '$1' <= '$current', '$1' isn't accepted as new version."
	exit 1
fi

echo "[+] '$1' > '$current', '$1' is accepted as new version."
echo '[+] Bumping `frontend`'
cd frontend
npm version "$1" --no-git-tag-version
echo '[+] Bumping `backend`'
cd ../backend
npm version "$1" --no-git-tag-version

echo '[+] Commiting `frontend` and `backend` bump'
git commit -m "Bump frontend and backend versions to $1"

echo '[+] Bumping `root`'
cd ..
npm version "$1" -m "Bump to version %s"
