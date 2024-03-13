export function toPascalCase(str: string) {
  return str.replace(/(^\w|_+\w)/g, function (match) {
    return match.toUpperCase().replace(/_+/g, '');
  });
}
