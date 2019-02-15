import defaultConfig from "./default";
import env from "./enviroment";

export const config = {
	server: defaultConfig.server,
	webpack: defaultConfig.webpack,
	development: env.development,
	production: env.production,
	staticPublicPath: "http://localhost:7000/"
};
