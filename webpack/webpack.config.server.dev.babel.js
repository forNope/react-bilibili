import { cloneDeep } from "lodash";
import merge from "webpack-merge";
import baseConfig from "./webpack.config.server";
import { config as appConfig } from "../src/app/config";

const {host, port} = appConfig.webpack.server;

baseConfig.externals = undefined;
console.log(baseConfig);
export default merge(baseConfig, {mode: "development"});