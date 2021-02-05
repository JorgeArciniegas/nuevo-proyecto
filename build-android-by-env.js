const { version } = require('./package.json');
const { resolve } = require('path');
const fs = require('fs');
const { execSync } = require("child_process");
const path = require('path');
const parser = require('xml2json');

let ItemArgs = Array();
process.argv.forEach(function (val, index, array) {
  try {
    let items = val.split('=');
    if (items[0] && items[1]) {
      ItemArgs[items[0]] = items[1];
    }
  } catch (e) { }
});


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


let builder_String = "tns build android --release --env.uglify --env.snapshot ";
builder_String += `--env.environment="${ItemArgs['env']}" --copy-to dist/android/${ItemArgs['env']}-${version}.apk --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`;


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
  fs.writeFileSync(manifestAndroid, `<?xml version="1.0" encoding="utf-8"?>${xmlData}`);
  startBuild();
}, 1000);

// Start the builds for all brands - only production
function startBuild() {
  // clear dist folder by old version build
  const folder_to_save_build = resolve(__dirname, 'dist', 'android');
  fs.readdir(folder_to_save_build, (err, files) => {
    if (!err) {
      for (const file of files) {
        fs.unlink(path.join(folder_to_save_build, file), err => {
          if (err) throw err;
        });
      }
    }
  });
  try {
    console.log('START BUILDER NATIVESCRIPT');
    console.log(builder_String);
    const e = execSync(builder_String);
    console.log(`finish data ... ${e}`);
  }
  catch (err) {
    console.log('ERROR BUILD BRAND');
    console.error(err);
  }
 
} 
