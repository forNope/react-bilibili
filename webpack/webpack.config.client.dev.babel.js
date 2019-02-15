import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import baseConfig from "./webpack.config.client";
import { config as appConfig } from "../src/app/config";

const {host, port} = appConfig.webpack.server;

const config = {
	mode: "development",
	devtool: 'cheap-module-eval-source-map',
	performance: {
		hints: false
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			},
		})
	],

	devServer: {
		contentBase: path.join(baseConfig.context, 'static'),
		compress: true,
		port,
		proxy: {
			"/":`${host}:${port}`
		},
		stats: "errors-only",
	}
};

export default merge(baseConfig, config);