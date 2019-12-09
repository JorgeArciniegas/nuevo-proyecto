# VDesk

## Web Environment

Run `ng serve -c vgen`
### DEBUG
    run commandline linux and type the command:  google-chrome --kiosk-printing --kiosk --window-position=0,0 --no-first-ru--no-default-browser-check --disable-translate http://localhost:4200
    Now your browser is enabled to print in the kiosk mode.
    
    
## Mobile Environment

Run `tns run android --bundle --env.environment="vgen"`


## RELEASE APK

Run `tns build android --release  --env.uglify --env.snapshot --env.environment="vgen-prod" --copy-to dist/android/vgen-release-x.x.x.apk  --key-store-path vgen.keystore --key-store-alias vgen --key-store-password 123456a --key-store-alias-password 123456a`

> Change the `x.x.x` on vgen-release-x.x.x.apk with actual version 
