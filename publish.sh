# exit when any command fails
set -e

BUILD_NUMBER="0.0.1-$(date +%s)"

npm install
npm run build

ls dist

# Upload javascript package to NPM
#echo "registry=https://npm.infra.wish.com/" > ~/.npmrc
#echo "//npm.infra.wish.com/:_authToken=\"$GITLAB_NPM_TOKEN\"" >> ~/.npmrc

#VERSION_LINE="\"version\": \""$BUILD_NUMBER"\","
#sed -i -e 's#"version".*#'"$VERSION_LINE"'#g' package.json
#sed -i -e 's#"version".*#'"$VERSION_LINE"'#g' $WISH_DESIGN_VUE_HOME/package.json
#npm publish --registry https://npm.infra.wish.com --verbose
