export function warn (componentName, message) {
  console.warn(`[MTD warn][${componentName}]: ${message}`);
}

export function error (componentName, message) {
  console.error(`[MTD error][${componentName}]: ${message}`);
}

export function deprecated (componentName, propName, message) {
  console.warn(`[MTD deprecated warn][${componentName}]: props \`${propName}\` now is deprecated, ${message}`);
}

export function deprecatedMethod (componentName, methodName, message) {
  console.warn(`[MTD deprecated warn][${componentName}]: methods \`${methodName}\` now is deprecated, ${message}`);
}
