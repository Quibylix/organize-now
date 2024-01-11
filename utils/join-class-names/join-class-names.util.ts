export type ClassNames =
  | string
  | undefined
  | {
      [key: string]: boolean | undefined;
    };

export function joinClassNames(...classNames: ClassNames[]) {
  return classNames
    .map(className => {
      if (className === undefined) {
        return "";
      }

      if (typeof className === "string") {
        return className;
      }

      return Object.keys(className)
        .filter(key => className[key])
        .join(" ");
    })
    .join(" ")
    .trim();
}
