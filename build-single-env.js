const { version } = require('./package.json');
const { resolve } = require('path');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require("child_process");

// accept parameter from terminal
let ItemArgs = Array();
try {
  process.argv.forEach((val, index, arry) => {
    let items = val.split('=');
    if (items[0] && items[1]) {
      ItemArgs[items[0]] = items[1];
    }
  })
  if (!ItemArgs['env']) {
    throw "The env parameter must be present to run these command! Check and try again."
  };

  //PATH
  const resDirectoryPath = resolve(__dirname, 'App_Resources', 'Android', 'src', 'main');
  const xmlConfigStringsPath = resolve(__dirname, 'App_Resources', 'Android', 'src', 'main', 'res', 'values', 'strings.xml');
  const settingsJsonPath = resolve(__dirname, 'App_Resources', 'Android', 'settings.json');

  //DYNAMIC PATH
  const brandName = (!ItemArgs['env'].includes('staging')) ? ItemArgs['env'] : '';
  const brandForPath = (brandName.includes('vgen')) ? 'develop' : brandName.substring(0, brandName.indexOf('-prod'));
  const resBrandDirectoryPath = resolve(__dirname, 'src', 'app', 'themes', 'skins', brandForPath, 'App_Resources', 'Android', 'src', 'main');

  let builderString = `tns build android --release --env.uglify --env.snapshotInDocker --env.environment="${ItemArgs['env']}" --copy-to dist/android/${brandForPath}-${version}.apk --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`;

  // only the prod environment can be used to generate an .apk file 
  if (brandName !== '' && brandName.includes('-prod')) {

    // copy the App_Resoruces for specific environment
    replaceDirectory(resBrandDirectoryPath, resDirectoryPath);
    // update appID an xmlConfigString based on env parameter
    updateAppId(brandForPath,settingsJsonPath);
    updateConfigStrings(brandForPath, xmlConfigStringsPath);

    console.log('START BUILDER NATIVESCRIPT');
    console.log(builderString);
    const e = execSync(builderString);
    console.log(`finish data ... ${e}`);
  } else {
    console.log(`Build can't start for environment like ${ItemArgs['env']}. Maybe you try run a staging or not -prod environment?`)
  }
} catch (error) {
  console.error('Error: ',error);
}


// update appId with the correct environment name.
function updateAppId(brandPath,settingsJsonPath) {
  var settingsJson = require(settingsJsonPath);
  settingsJson.appId = 'com.' + brandPath.replace("-", "_") + '.vdesk';
  try {
    fs.writeFileSync(settingsJsonPath, JSON.stringify(settingsJson));
    console.log("Update AppId successfully completed")
  } catch (error) {
    console.error('Error updateAppId: ',error);
  }
}

// update configString based on env parameter
function updateConfigStrings(brandPath, stringsPath) {
  const xmlConfigStrings = `<resources>
  <string name="app_name">${brandPath}</string>
  <string name="title_activity_kimera">${brandPath}-${version}</string>
  <string name="version">${version}</string>
  </resources>`;
  try {
    fs.writeFileSync(stringsPath, `<?xml version="1.0" encoding="utf-8"?>\n${xmlConfigStrings}`);
    console.log(`Update ${stringsPath}  successfully completed`)
  } catch (error) {
    console.error('Error updateConfigStrings: ',error);
  }
}

// copy entire directory with file file evironment to App_Resouces directory
function replaceDirectory(srcPath, destPath) {
  try {
    fs.copySync(srcPath, destPath, { overwrite: true });
    console.log(`Copy from ${srcPath} to ${destPath} successfully completed`)
  } catch (error) {
    console.error('Error replaceDirectory: ',error);
  }
}

