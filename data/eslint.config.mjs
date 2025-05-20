/* eslint-disable no-magic-numbers */
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        languageOptions: {
            globals: { ...globals.browser, $: "readonly" },
        },
        rules: {
            "max-len": ["warn", { code: 110 }], // 110 char limit on all lines of code
            "semi": ["warn", "always"], // Semicolons at the end
            "indent": ["warn", 4, { "SwitchCase": 1 }], // 4 space indentations only
            "quotes": ["warn", "double", { "avoidEscape": true }], // All quotes must be double
            "eqeqeq": ["warn", "always"], // Use === instead of ==
            "camelcase": ["warn", { properties: "always" }], // camelCase only, no underscores
            "object-curly-spacing": ["warn", "always"], // Curly brackets must have space
            "array-bracket-spacing": ["warn", "never"], // Square brackets must not have space
            "no-trailing-spaces": "warn", // Cannot have trailing spaces
            "eol-last": ["warn", "always"], // Must have a trailing line at the end
            "no-undef": "error", // Cannot have undeclared variables
            "no-redeclare": "warn", // Cannot redeclare variables
            "no-empty": "warn", // Cannot have empty blocks, i.e. if () {}
            "no-use-before-define": "error", // Cannot use a variable before its declaration
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Cannot have unused variables
            // "no-magic-numbers": ["warn", { "ignore": [0, 1, -1], "ignoreArrayIndexes": true,
            //     "enforceConst": true, "detectObjects": true }], // Cannot have magic numbers
            "spaced-comment": ["warn", "always", { "markers": ["/"] }], // Must have space after double slash
            "no-var": "warn", // Disallow the use of var
            "prefer-const": "warn", // Prefer const over let if not reassigned
        },
        extends: ["js/recommended"],
    },
    pluginReact.configs.flat.recommended,
]);
