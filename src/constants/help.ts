import { version } from "../../package.json";

export const HELP_MSGS = [
  `tabash ${version}`,
  `a bash-like 'new tab' page for browser.`,
  `Visit https://github.com/jshan2017/tabash for details.`,
  `📕`,
  `ls # list registered  links`,
  `[key]=[url] # list [url] with [key]`,
  `[key] # open link`,
  "echo $[key] # print url for [key]",
  "rm [key] # unregister link for [key]",
  "mv [origin] [dest] # rename key from [origin] to [dest]",
  "clear # clear shell",
  "export # export links to json file",
  "g [keyywords] # search google for [keyywords]",
  "tire install [name] # install package from tire",
];
