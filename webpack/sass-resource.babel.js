import path from "path";

const rootDir = path.join(__dirname, "..");
const scssDir = path.join(rootDir, 'src/scss');

const variable = path.join(scssDir, 'variable.scss');
const layout = path.join(scssDir, 'base/layout.scss');
const vendor = path.join(scssDir, 'vendor/bourbon/bourbon.scss');
const sassIconPath = path.join(scssDir, 'base/icons.scss');
const helpers = path.join(scssDir, 'helpers/index.scss');
const mixins = path.join(scssDir, 'mixins/index.scss');
const animation = path.join(scssDir, 'animation/index.scss');

export const resources = new Array().concat(
	variable,
	vendor,
	layout,
	sassIconPath,
	helpers,
	mixins,
	animation,
);

// export default resources;