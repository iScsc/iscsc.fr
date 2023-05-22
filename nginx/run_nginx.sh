#!/bin/sh
# Inject env variables insinde nginx.conf.template
# To avoid injection, use ${DOLLAR}DONT_INJECT_ME
# Start nginx when the config file is genereated
export DOLLAR='$'

NGINX_CONF_TEMPLATE=nginx.conf.${MODE}.template
if [ ! -f "$NGINX_CONF_TEMPLATE" ]; then
    echo "nginx template: '$NGINX_CONF_TEMPLATE' not found, exiting"
    exit 1
fi

envsubst < "$NGINX_CONF_TEMPLATE" > /etc/nginx/nginx.conf
nginx -g "daemon off;"