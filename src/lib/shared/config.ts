/** biome-ignore-all lint/correctness/noUnusedVariables: temp */
import { createEnv } from "@t3-oss/env-nextjs";
import ms, { type StringValue } from "ms";
import { z } from "zod";

/** Parse a human-readable time string (e.g. "5m", "10s") into milliseconds */
const msMs = z
	.string()
	.transform((val) => ms(val as StringValue))
	.refine((val) => !Number.isNaN(val), {
		message: "Invalid time string (e.g. '5m', '10s')",
	});

/** Same but outputs seconds */
const msSec = z
	.string()
	.transform((val) => ms(val as StringValue) / 1000)
	.refine((val) => !Number.isNaN(val), {
		message: "Invalid time string (e.g. '5m', '10s')",
	});

export const config = createEnv({
	server: {
		// Runtime
		NODE_ENV: z
			.enum(["production", "development", "test"])
			.default("development"),
	},

	client: {
		// App
		NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),

		// CDN
		NEXT_PUBLIC_CDN_URL: z.string().default("/"),
	},

	experimental__runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
	},
});
