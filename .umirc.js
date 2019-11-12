
// ref: https://umijs.org/config/
export default {
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: true,
			dynamicImport: false,
			title: 'signTool',
			dll: false,
		},
		],
	],
	proxy:{
		'/express':{
			target: 'http://127.0.0.1:3001/',
			pathRewrite:{'^/express':''},
			changeOrigin: true
		},
	},
	routes:[
			{
				path: '/',
				component: '../layouts/index',
				/*routes:[*/
					//{
						//path: '/',
						//component: './sign'
					//},
				/*]*/
			}
	]
}
