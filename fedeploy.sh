#!/bin/bash

cd ~/projects/rates-fe
git stash
git pull origin master
mv build /var/www/ratespal.me
rm -rf public_html
mv build public_html


