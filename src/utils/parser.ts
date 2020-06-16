export const tokenize = (command: string) => {
  return command
    .split(" ")
    .filter((token) => token !== " ")
    .map((token) => token.trim());
};
