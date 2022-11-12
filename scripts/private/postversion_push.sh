#!/bin/sh

BRANCH=$(git branch --show-current)
CURRENT_VERSION=$(npm pkg get version | sed 's/\"//g')
REMOTE='git@github.com:iScsc/iscsc.fr.git'

echo "[~] pushing to \`${REMOTE}\` please type your passphrase/password if required:"
git push ${REMOTE} ${BRANCH} v${CURRENT_VERSION} || echo "[-] push failed, you can push with \`git push ${REMOTE} ${BRANCH} v${CURRENT_VERSION}\`"
