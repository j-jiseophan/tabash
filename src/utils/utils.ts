import Bowser from "bowser";

export const rem2px = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const browserName = Bowser.getParser(window.navigator.userAgent)
  .getBrowserName()
  .replace(" ", "");

export const removeProtocol = (url: string) =>
  url.replace(/^http(s?):\/\//i, "");

export const parseQueryString = ()=>{
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params
}