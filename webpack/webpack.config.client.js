import path from "path";
import { client } from "universal-webpack/config";
import { cloneDeep } from "lodash";
import settings from "./universal-webpack-settings.json";
import config from "./webpack.config.babel";

const clientConfig = cloneDeep(config);

clientConfig.entry = {
	main: path.join(config.context, './src/client'),
};

clientConfig.module.rules[0].options = {
	configFile: 'tsconfig/tsconfig.client.json',
	instance: 'client-loader'
};

export default client(clientConfig, settings)
