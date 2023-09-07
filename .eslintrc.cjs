module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { sourceType: "module" },
  rules: {
    "no-unused-vars": "off",
  },
};
