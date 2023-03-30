#!/bin/sh
# Inject env variables insinde nginx.conf.template
# To avoid injection, use ${DOLLAR}DONT_INJECT_ME
# Start nginx when the config file is genereated
export DOLLAR='$'
envsubst < nginx.conf.${MODE}.template > /etc/nginx/nginx.conf
nginx -g "daemon off;"