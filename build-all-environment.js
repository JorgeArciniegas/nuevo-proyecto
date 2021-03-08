const { resolve } = require('path');
const path = require('path');
const fs = require('fs');
const { execSync } = require("child_process");

// PATH
const environmentFolder = resolve(__dirname, 'src', 'environments');
const folderToSaveBuildAndroid = resolve(__dirname, 'dist', 'android');


buildAllAndroid(folderToSaveBuildAndroid);

// build all environment for Android SO
function buildAllAndroid(){
  fs.readdir(environmentFolder, (err, files) => {
    console.log('START BUILDER NATIVESCRIPT ANDROID FOR ALL ENVIRONMENT');
    try {
      clearDist(folderToSaveBuildAndroid);
      files.forEach(file => {
        if (file) {
          const nameEnv = file.split('.');
          if (nameEnv.length === 3 && !nameEnv[1].includes('staging')) {
            console.log(`Build for environment "${nameEnv[1]}" started. Waiting.....`)
            //start the specific routine
            execSync(`node ./build-single-env.js env=${nameEnv[1]}-prod`,{stdio:'inherit'});
            console.log(`Build for environment "${nameEnv[1]}" successiful completed.`)
          }
        }
      })
    }
    catch (err) {
      console.log(`ERROR BUILD BRAND`);
      console.error(err);
    }
  });
  console.log("Script terminated!")
}


// clear dist folder by old version build
function clearDist(folder){
  try {
      var files = fs.readdirSync(folder);
      for (const file of files) {
          fs.unlinkSync(path.join(folder, file));
      }
      console.log(`Clear dist folder complete. path: ${folder}`)
  } catch (error) {
      console.log(error);
  }
}

