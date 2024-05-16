#!/bin/bash
set -e

# Set flags
while getopts d:b: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
        p) path=${OPTARG};;
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
cd $path

# run git scripts
git status
git pull origin $branch

# build & restart app
pnpm install
pm2 restart ms-azmirizkifar-betest

echo -e "\n"
echo "🚀 Application deployed!"
echo -e "\n"
echo "============================================================================="