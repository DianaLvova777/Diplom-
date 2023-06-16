const path = require('path')

module.exports = {
  sections: [
    {
      name: "Сервис взаимодействия с апи",
      content: "./src/common/api.service.js",
      defaultExample: false
    },
    {
      name: 'Страницы',
      sections: [
        {
          components: './src/views/*.vue'
        }
      ]
    },
    {
      name: 'Компоненты',
      components: './src/components/**/*.vue'
    }
  ],

  pagePerSection: true,
  simpleEditor: false,
	template: {
		title: 'Fitfi',
		lang: 'ru',
		trimWhitespace: true,
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width,initial-scale=1.0'
				},
				{
					name: 'format-detection',
					content: 'telephone=no'
				}
			]
		}
	},
	defaultExample: false,
	getComponentPathLine: () => '',
	version: '0.1.1',
	usageMode: 'expand',
	exampleMode: 'expand',
	styleguideDir: 'docs',
	displayOrigins: false,
  codeSplit: true
}
