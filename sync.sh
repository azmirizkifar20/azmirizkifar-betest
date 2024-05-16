#!/bin/bash
set -e

# Set flags
while getopts d:b: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
    esac
done

echo "============================================================================="
echo -e "\n"
# Adding ssh key to agent
echo "Adding identity ..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github

echo -e "\n"
echo "Deploying to server ..."
echo -e "\n"

# Move to projecet dir
cd /var/www/html/ms-azmirizkifar-betest

# run git scripts
git status
git pull origin $branch

# build & restart app
npm install
pm2 restart dev-gateway

echo -e "\n"
echo "🚀 Application deployed!"
echo -e "\n"
echo "============================================================================="