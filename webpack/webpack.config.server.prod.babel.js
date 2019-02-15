import merge from "webpack-merge";
import baseConfig from "./webpack.config.server";

export default merge(baseConfig, {mode: "production"});