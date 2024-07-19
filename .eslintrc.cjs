module.exports = {
    root: true,
    env: { browser: true, es6: true },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "2021", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "quotes": ["warn", "double"],
    },
  }