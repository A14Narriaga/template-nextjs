import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

import { createVitestConfig } from "./create-vitest-config"

export default defineConfig({
	test: createVitestConfig("e2e"),
	plugins: [react(), tsconfigPaths()]
})
