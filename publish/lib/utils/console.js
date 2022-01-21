"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.error = error;
exports.deprecated = deprecated;
exports.deprecatedMethod = deprecatedMethod;
function warn(componentName, message) {
  console.warn("[MTD warn][" + componentName + "]: " + message);
}

function error(componentName, message) {
  console.error("[MTD error][" + componentName + "]: " + message);
}

function deprecated(componentName, propName, message) {
  console.warn("[MTD deprecated warn][" + componentName + "]: props `" + propName + "` now is deprecated, " + message);
}

function deprecatedMethod(componentName, methodName, message) {
  console.warn("[MTD deprecated warn][" + componentName + "]: methods `" + methodName + "` now is deprecated, " + message);
}