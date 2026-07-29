import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Enforce 300-line file size limit (blank lines and comments excluded).
  {
    rules: {
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
  // Data files are exempt from line limits.
  {
    files: ["src/lib/benchmarkData.ts", "src/lib/encryptionData.ts", "src/lib/consumerData.ts", "src/lib/negotiationData.ts", "src/lib/digital2dozen.ts"],
    rules: {
      "max-lines": "off",
    },
  },
]);

export default eslintConfig;
