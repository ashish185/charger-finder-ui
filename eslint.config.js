import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["dist/**", ".next", "node_modules/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
      },
    },

    plugins: {
      import: importPlugin,
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./jsconfig.json",
        },
        node: true,
      },
    },

    rules: {
      // Logic & Safety
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],

      // Best Practices
      "no-var": "error",
      "prefer-const": "error",
      curly: ["error", "all"],

      // Import validation
      "import/no-unresolved": "error",
    },
  },
];
