import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            ".github/",
            "node_modules/",
            "playwright-report/",
            "test-results/",
            "README.md",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["tests/**/*.ts"],
        ...playwright.configs["flat/recommended"],
        rules: {
            "playwright/missing-playwright-await": "error",
        },
    },
    {
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double", { avoidEscape: true }],
            "comma-dangle": ["error", "always-multiline"],
        },
    },
);
