import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'com.vgen.vdesk',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  webpackConfigPath: 'webpack.config.js',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  nsext: '.tns',
  webext: '',
  shared: true,
} as NativeScriptConfig
