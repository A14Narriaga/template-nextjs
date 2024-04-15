import { InlineConfig } from "vitest"

export const createVitestConfig = (testingType: string): InlineConfig => ({
	environment: "jsdom",
	root: "./",
	globals: true,
	isolate: false,
	passWithNoTests: true,
	include: [
		`tests/${testingType}/**/*.test.ts`,
		`tests/${testingType}/**/*.test.tsx`
	],
	coverage: {
		provider: "istanbul",
		reporter: ["text", "json", "html"],
		reportsDirectory: `tests/coverage/${testingType}`,
		include: ["src/**/*.ts", "src/**/*.tsx"],
		exclude: ["src/config", "src/**/index.ts"]
	}
})
