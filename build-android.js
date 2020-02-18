const { version } = require('./package.json');
const { resolve } = require('path');
const fs = require('fs');
const { execSync } = require("child_process");
const path = require('path');
const parser = require('xml2json');

// avanzamneto di versione nel manifest android
let xmlData;
// xml option
var options = {
  object: false,
  reversible: true,
  coerce: true,
  sanitize: true,
  trim: true,
  arrayNotation: false
};

const manifestAndroid = resolve(__dirname, 'App_Resources', 'Android', 'src', 'main', 'AndroidManifest.xml');
// read file and save the version change to variable
fs.readFile(manifestAndroid, function (err, file) {
  const elem = JSON.parse(parser.toJson(file, options));
  console.log(`ANDROID VERSION CHANGE FROM ${elem.manifest['android:versionName']} to ${version}`);
  elem.manifest['android:versionName'] = version;
  xmlData = parser.toXml(JSON.stringify(elem));
});

// write data to xml
setTimeout(() => {
  fs.writeFileSync(manifestAndroid, xmlData);
  startBuild();
}, 1000);

// Start the builds for all brands - only production
function startBuild() {
  // clear dist folder by old version build
  const folder_to_save_build = resolve(__dirname, 'dist', 'android');
  fs.readdir(folder_to_save_build, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(folder_to_save_build, file), err => {
        if (err) throw err;
      });
    }
  });

  const folder = resolve(__dirname, 'src', 'environments');
  const builder_String = "tns build android --release  --env.uglify --env.snapshot ";
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      try {
        if (file) {
          const nameEnv = file.split('.');
          if (nameEnv.length === 3 && !nameEnv[1].includes('staging')) {
            console.log(`FILE NAME: ${file}`);
            console.log(`Name environment: ${nameEnv[1]}`);
            let tmpString = builder_String;
            tmpString += `--env.environment="${nameEnv[1]}-prod-release"  --copy-to dist/android/${nameEnv[1]}-${version}.apk --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`;
            console.log('START BUILDER NATIVESCRIPT');
            const e = execSync(tmpString);
            console.log(`finish data ... ${e}`);
          }
        }
      } catch (err) {
        console.log('ERROR BUILD BRAND');
        console.error(err);
      }
    });
  });
}
