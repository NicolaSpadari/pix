export default defineNuxtConfig({
	modules: [
		// "nuxt-security",
		// "nuxt-zero-js",
		"@nuxt/eslint",
	],
	app: {
		head: {
			title: "Pix",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1"
		}
	},
	routeRules: {
		"/": {
			proxy: "/api/500"
		},
		"/*": {
			proxy: "/api/**"
		}
	},
	eslint: {
		config: {
			standalone: false
		}
	},
});
