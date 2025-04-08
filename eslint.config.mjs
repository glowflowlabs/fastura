import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables starting with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Allow empty interfaces for component props patterns
      "@typescript-eslint/no-empty-object-type": "off",

      // Configure react-hooks rules
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "(useAsync|useAsyncCallback)",
        },
      ],
    },
  },
]

export default eslintConfig
