import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import HomePage from "@src/app/page"

test("HomePage", () => {
	render(<HomePage />)
	expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined()
})
