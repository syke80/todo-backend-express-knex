import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginJest from 'eslint-plugin-jest';

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node
    } },
  {
    files: ["**/*.test.js"],
    plugins: { jest: eslintPluginJest },
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.jest
    }, 
  },

]);
