module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
    globals: {
        wp: "readonly"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        "no-console": "warn",
        "no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "react/prop-types": "off"
    }
};
