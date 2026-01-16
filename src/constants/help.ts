import { version } from "../../package.json";

export const HELP_MSGS = [
  `tabash ${version}`,
  `A bash-like 'new tab' page for your browser.`,
  `Visit https://github.com/j-jiseophan/tabash for details.`,
  ``,
  `Commands:`,
  `\tls\t\t\t# List registered links`,
  `\t[key]=[url]\t\t# Register [url] with [key]`,
  `\t[key]\t\t\t# Open link`,
  `\techo $[key]\t\t# Print URL for [key]`,
  `\trm [key]\t\t# Unregister link for [key]`,
  `\tmv [from] [to]\t\t# Rename key from [from] to [to]`,
  `\tclear\t\t\t# Clear shell`,
  `\texport\t\t\t# Export links to JSON file`,
  `\timport\t\t\t# Import links from JSON file`,
  `\tg [keywords]\t\t# Search Google for [keywords]`,
  `\tset-wallpaper\t\t# Set custom wallpaper from image`,
];
