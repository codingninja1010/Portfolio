import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  // JavaScript/JSX files
  {
    extends: [js.configs.recommended],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // React JSX runtime does not require React in scope
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",
      // We don't use prop-types in this project
      "react/prop-types": "off",
      // Allow custom attributes used by cmdk and toast
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "cmdk-input-wrapper",
            "cmdk-group",
            "cmdk-group-heading",
            "cmdk-input",
            "cmdk-item",
            "toast-close",
          ],
        },
      ],
      // Softer unused vars with ignore pattern for underscore
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
  // TypeScript/TSX files (kept for future use)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  }
);

