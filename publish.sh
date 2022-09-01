# exit when any command fails
set -e

#eval $(ssh-agent -s)
#ssh-add /root/.ssh/id_rsa
#BRANCH_NAME="$(date +%s)"
#git checkout -b $BRANCH_NAME
#git pull --rebase origin master

BUILD_NUMBER="0.0.1-$(date +%s)"

npm install
npm run build

# Upload javascript package to NPM
echo "registry=https://npm.infra.wish.com/" > ~/.npmrc
echo "//npm.infra.wish.com/:_authToken=\"$GITLAB_NPM_TOKEN\"" >> ~/.npmrc

VERSION_LINE="\"version\": \""$BUILD_NUMBER"\","
sed -i -e 's#"version".*#'"$VERSION_LINE"'#g' package.json
sed -i -e 's#"version".*#'"$VERSION_LINE"'#g' $WISH_DESIGN_VUE_HOME/package.json
npm publish --registry https://npm.infra.wish.com --verbose

#cd $WISH_DESIGN_VUE_HOME

#git add -A
#git commit -m "[gitlab] wish-design-vue v${BUILD_NUMBER}"
#echo "Checking out branch $BRANCH_NAME"
 
#echo "Pushing to origin/master"
#git pull --rebase origin master
#git push origin $BRANCH_NAME:master

#echo "Creating tag ($TAG_NAME)"
#TAG_NAME="v${BUILD_NUMBER}"
#git tag $TAG_NAME

#echo "Pushing to tag ($TAG_NAME) to origin"
#git push origin --tags
