export class StringUtil {
  static snakeToCamel(str: string) {
    return str.replace(
      /([-_][a-z])/g,
      (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    );
  }
}
