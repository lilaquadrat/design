/** @type {import('stylelint').Config} */
export default {
	"extends": [
		"stylelint-config-html",
		"stylelint-config-recommended-vue"
	],
	"plugins": [
		"stylelint-order"
	],
	"overrides": [
		{
			"files": ["*.vue", "**/*.vue"],
			"customSyntax": "postcss-html"
		}
	],
	"overrides": [
		{
			"files": ["*.less", "**/*.less"],
			"customSyntax": "postcss-less"
		}
	],
	"rules": {
		'media-query-no-invalid': null
	}
}