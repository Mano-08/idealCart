export function findWebsite(url: string) {
  const amazon = /^https:\/\/www\.amazon\./;
  if (amazon.test(url)) return "amazon";
  else return "other";
}
