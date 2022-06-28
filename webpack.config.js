const { join, relative, resolve, sep, dirname } = require('path');
const webpack = require("@nativescript/webpack");
const { AngularWebpackPlugin } = require("@ngtools/webpack");
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = (env) => {
	
	/* const { 
		appPath = 'src',
		appResourcesPath = 'App_Resources'
	} = env; */
	
	const {
		// The 'appPath' and 'appResourcesPath' values are fetched from
		// the nsconfig.json configuration file
		// when bundling with `tns run android|ios --bundle`.
		appPath = 'src',
		appResourcesPath = 'App_Resources',
		appResourcesFullPath,
		appFullPath,
		entryPath,
		// You can provide the following flags when running 'tns run android|ios'
		snapshot, // --env.snapshot,
		production, // --env.production
		uglify, // --env.uglify
		report, // --env.report
		sourceMap, // --env.sourceMap
		hiddenSourceMap, // --env.hiddenSourceMap
		hmr, // --env.hmr,
		unitTesting, // --env.unitTesting
		testing, // --env.testing
		verbose, // --env.verbose
		ci, // --env.ci
		externals,
		entries,
		dist,
		nativescriptTarget,
		sourceMapFilename,
		snapshotInDocker, // --env.snapshotInDocker
		skipSnapshotTools, // --env.skipSnapshotTools
		compileSnapshot // --env.compileSnapshot
	} = env;
	
	const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
	if (!platform) {
		throw new Error('You need to provide a target platform!');
	}

	const hashSalt = Date.now().toString();
	const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
	webpack.Utils.platform.addPlatform('web',platform);

	console.log(webpack, env, platform,  webpack.Utils.platform.getAbsoluteDistPath());
	const projectRoot = webpack.Utils.project.getProjectRootPath();
	const tsConfigTnsName = 'tsconfig.tns.json';

  	const tsConfigTnsPath = resolve(projectRoot, tsConfigTnsName);
	const entryModule = `${resolve(projectRoot, appPath, 'main.tns.ts')}`;
	const compilerOptions = webpack.Utils.tsconfig.readTsConfig(tsConfigTnsPath); 
	console.log(appPath, appResourcesFullPath);
	const copyIgnore = { ignore: [`${relative(appPath, webpack.Utils.platform.getAbsoluteDistPath())}/**`] };
	const copyTargets = [
		{ from: 'assets/**', noErrorOnMissing: true },
		{ from: 'fonts/**', noErrorOnMissing: true},
		{ from: "**/*.jpg", noErrorOnMissing: true },
		{ from: "**/*.png", noErrorOnMissing: true },
		{ from: `${appPath}/assets/i18n`, to: `${dist}/assets/i18n`, context: projectRoot }
	];

	
	webpack.init(env);

	new CopyWebpackPlugin({patterns: copyTargets});

	webpack.chainWebpack(config=> {
		config.plugin('DefinePlugin').tap(args => {
			Object.assign(args[0], {
				'global.TNS_WEBPACK': 'true',
				'global.isAndroid': platform === 'android',
				'global.isIOS': platform === 'ios',
				"process.env": {
					environment: (env && Object.prototype.hasOwnProperty.call(env, 'environment')) ? JSON.stringify(env.environment) : undefined
				}
			})
			return args;
		// process: 'global.process'
		})
	})
	console.log(webpack);
	
	// Default destination inside platforms/<platform>/...
	/*const dist = webpack.Utils.platform.getDistPath(); /* resolve(
		projectRoot,
		webpack.Utils.projectRoot.getAppPath(platform, projectRoot)
	); */


	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	// console.log(env.externals);
	// webpack.mergeWebpack(config);
	// console.log(config);
	
	return  webpack.resolveConfig();
};


