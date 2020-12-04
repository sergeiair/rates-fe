#!/bin/bash

cd ~/projects/rates-fe
git stash
git pull origin master
rm -rf /var/www/ratespal.me/build/
cp build /var/www/ratespal.me/
cd /var/www/ratespal.me/
rm -rf public_html
mv build public_html


