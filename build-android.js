const { version } = require('./package.json');
const { resolve } = require('path');
const fs = require('fs');
const { execSync } = require("child_process");
const path = require('path');
const parser = require('xml2json');


startBuild();
// Start the builds for all brands - only production
function startBuild() {
  const xmlFile = resolve(__dirname, 'App_Resources', 'Android', 'src', 'main', 'res', 'values', 'strings.xml');
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

  const folder = resolve(__dirname, 'src', 'environments');
  const builder_String = "tns build android --release --env.uglify --env.snapshot ";
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      try {
        if (file) {
        
          const nameEnv = file.split('.');
          if (nameEnv.length === 3 && !nameEnv[1].includes('staging')) {
            // CONFIGURAZIONE MANIFEST ANDROID
            const xmlDataBrand =`<resources>
            <string name="app_name">${nameEnv[1]}</string>
            <string name="title_activity_kimera">${nameEnv[1]}-${version}</string>
            <string name="version">${version}</string>
            </resources>`;
            console.log(`WRITE FILE CONFIG FOR  ${nameEnv[1]}`);
            fs.writeFileSync(xmlFile, `<?xml version="1.0" encoding="utf-8"?>${xmlDataBrand}`);
            console.log('---------------------------');

            console.log(`FILE NAME: ${file}`);
            console.log(`Name environment: ${nameEnv[1]}`);
            let tmpString = builder_String;
            tmpString += `--env.environment="${nameEnv[1]}-prod" --copy-to dist/android/${nameEnv[1]}-${version}.apk --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`;
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
