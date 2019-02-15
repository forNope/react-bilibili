import path from "path";
import fs from "fs";
import { server } from "universal-webpack/config";
import { cloneDeep } from "lodash";
import settings from "./universal-webpack-settings.json";
import config from "./webpack.config.babel";

const serverConfig = cloneDeep(config);

serverConfig.entry = {
	main: path.join(config.context, './src/server'),
};

serverConfig.module.rules[0].options = {
	configFile: 'tsconfig/tsconfig.server.json',
	instance: 'server-loader'
};

const nodeModules = {};
const modulePath = path.join(config.context, 'node_modules');

// fs
// 	.readdirSync(modulePath)
// 	.filter(item => ['react', '.bin'].indexOf(item) === -1)
// 	.forEach(mod => nodeModules[mod] = 'commonjs ' + mod);
// serverConfig.externals = nodeModules;
// serverConfig.node = {};
// serverConfig.node.fs = 'empty';
// serverConfig.node.net = 'empty';

export default server(serverConfig, settings);