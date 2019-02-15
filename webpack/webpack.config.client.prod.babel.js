import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import CleanPlugin from "clean-webpack-plugin";
import baseConfig from "./webpack.config.client";

const vendor = [
	'react',
	'react-dom'
];

const config = {
	mode: 'production',
	devtool: 'source-map',
	entry: {vendor},

	output: {
		filename: '[name].min.js',
		chunkFilename: '[name].min.js'
	}
};

export default merge(baseConfig, config);