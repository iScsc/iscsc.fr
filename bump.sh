#!/bin/sh

if [ -z "$1" ]; then
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

current=$(npm pkg get version | sed 's/"//g')

echo "[+] Current version is '${current}'"

if [ ! $(semver "$1" -r ">$current") ]; then
	echo "[-] '$1' <= '$current', '$1' isn't accepted as new version."
	exit 1
fi

echo "[+] '$1' > '$current', '$1' is accepted as new version."
cd frontend
npm version "$1" --no-git-tag-version
cd ../backend
npm version "$1" --no-git-tag-version
cd ..
npm version "$1" -m "Bump to version %s"
