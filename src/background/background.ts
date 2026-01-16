chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open-command-palette") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    try {
      await chrome.tabs.sendMessage(tab.id, { action: "toggle-palette" });
    } catch {
      // Content script not loaded yet, inject it first
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content/commandPalette.js"],
      });
      // Try again after injection
      await chrome.tabs.sendMessage(tab.id, { action: "toggle-palette" });
    }
  }
});
