import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
	routeRules: {
		"/**": {
			cache: process.env.NODE_ENV === "production" ? { maxAge: 60 } : undefined,
			cors: true
		},
	}
});
