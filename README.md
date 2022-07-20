# VDesk

## Web Environment

Run `ng serve -c vgen-prod`
### DEBUG
    run commandline linux and type the command:  google-chrome --kiosk-printing --kiosk --window-position=0,0 --no-first-ru--no-default-browser-check --disable-translate http://localhost:4200
    Now your browser is enabled to print in the kiosk mode.
    
    
## Mobile Environment @DEPRECATED
Run `tns run android --clean --bundle --env.environment="vgen-prod"`
for debug run `tns debug android --clean --bundle --env.uglify --env.environment="xxxxxx-prod" --no-hmr`(replace xxxxx with a specific environment)

## RELEASE APK  @DEPRECATED
> When it is launch:
> - delete all file to folder dist based on `build` parameter;
> - update the version app to AndroidManifest.xml(Android Version)
> - compile the package(Android Version) 
> - copy the apk generate to folder based on `build` parameter

> Build all environment for Android
  Run `npm run tns-build-all`
---------------------------------------------------------------------------------
> Build specific environment( replace xxxxx with environment name) for Android
  Run `npm run tns-build-env env=xxxxxx`
---------------------------------------------------------------------------------

  If you're not all in, please read the wiki from devops.
---------------------------------------------------------------------------------
### @deprecated Specify a brand 
Run `tns build android --release  --env.uglify --env.snapshot --env.environment="vgen-prod" --copy-to dist/android/vgen-release-x.x.x.apk  --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`

----
----


### Nativescript APPSYNC   @DEPRECATED

 Run `nativescript-app-sync release vdesk-android android -d Production --mandatory --description "YOUR DESCRIPTION" -t {last_version_released}`
