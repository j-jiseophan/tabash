type WebExtensionGlobal = typeof globalThis & {
  browser?: typeof chrome;
  chrome?: typeof chrome;
};

const webExtensionGlobal = globalThis as WebExtensionGlobal;
const webExtensionApi =
  webExtensionGlobal.browser ?? webExtensionGlobal.chrome ?? null;

webExtensionApi?.commands.onCommand.addListener(async (command) => {
  if (command === "open-command-palette") {
    const [tab] = await webExtensionApi.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) return;

    try {
      await webExtensionApi.tabs.sendMessage(tab.id, { action: "toggle-palette" });
    } catch {
      // Content script not loaded yet, inject it first
      await webExtensionApi.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content/commandPalette.js"],
      });
      // Try again after injection
      await webExtensionApi.tabs.sendMessage(tab.id, { action: "toggle-palette" });
    }
  }
});
