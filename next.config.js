// next.config.js
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
	images: {
		domains: ['www.tailwind-kit.com'],
	},
	lessVarsFilePath: './src/shared/styles/antd.less',
  	lessVarsFilePathAppendToEndOfContent: true,


});
