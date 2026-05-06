type WebExtensionGlobal = typeof globalThis & {
  browser?: typeof chrome;
  chrome?: typeof chrome;
};

const webExtensionGlobal = globalThis as WebExtensionGlobal;

export const webExtensionApi =
  webExtensionGlobal.browser ?? webExtensionGlobal.chrome ?? null;
