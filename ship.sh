#!/usr/bin/env bash
set -eu

echo "---------------------- Building Server. --------------------------------------"
cd server
yarn build

echo "---------------------- Building front. ---------------------------------------"
cd ../front
yarn build --fix --skip-plugin @vue/cli-plugin-pwa,pwa
cd ..

echo "---------------------- Copying static assets to /server/dist. ----------------"
DATE=`date '+%Y-%m-%d %H:%M:%S'`
rm -R $PWD/server/dist/front-end
mkdir $PWD/server/dist/front-end
cp -a $PWD/front/dist/. $PWD/server/dist/front-end

# echo "---------------------- Pushing to GIT. ---------------------------------------"
# git add .
# MSG="=> deployed: $DATE"
# git commit -m "$1 $MSG"
# git push

# echo "---------------------- shiping the mevn'z -------------------------------------"
# ssh hamishclulee@welcomeqr.codes 'cd /var/www/welcomeqr.codes && sudo git reset --hard && sudo git pull && sudo systemctl restart welcomeqr.service'

echo "---------------------- Deploy complete. Have a nice day. ----------------------"
