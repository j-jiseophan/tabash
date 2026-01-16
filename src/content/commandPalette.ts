interface Link {
  name: string;
  url: string;
}

const STORAGE_KEY = "links";

class CommandPalette {
  private overlay: HTMLDivElement | null = null;
  private input: HTMLInputElement | null = null;
  private list: HTMLDivElement | null = null;
  private links: Link[] = [];
  private selectedIndex = 0;
  private filteredLinks: Link[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    await this.loadLinks();
    this.setupKeyboardShortcut();
    this.setupMessageListener();
  }

  private setupMessageListener() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "toggle-palette") {
        this.toggle();
      }
    });
  }

  private async loadLinks() {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      this.links = (result[STORAGE_KEY] as Link[]) || [];
    } catch {
      // fallback to localStorage for new tab page
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      this.links = savedLinks ? JSON.parse(savedLinks) : [];
    }
  }

  private setupKeyboardShortcut() {
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      }
    });
  }

  private toggle() {
    if (this.overlay) {
      this.close();
    } else {
      this.open();
    }
  }

  private async open() {
    await this.loadLinks();
    this.createOverlay();
    this.filteredLinks = [...this.links];
    this.selectedIndex = 0;
    this.renderList();
    this.input?.focus();
  }

  private close() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
      this.input = null;
      this.list = null;
    }
  }

  private createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.id = "tabash-command-palette-overlay";
    this.overlay.innerHTML = `
      <style>
        @keyframes tabash-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tabash-scale-in {
          from { opacity: 0; transform: scale(0.98) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        #tabash-command-palette-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          padding-top: 12vh;
          z-index: 2147483647;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
          animation: tabash-fade-in 0.12s ease-out;
        }
        #tabash-command-palette {
          width: 640px;
          max-width: 90vw;
          max-height: 480px;
          background: linear-gradient(135deg, rgba(30, 30, 32, 0.98) 0%, rgba(24, 24, 26, 0.98) 100%);
          border-radius: 12px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 8px 40px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(255, 90, 95, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: tabash-scale-in 0.15s cubic-bezier(0.2, 0, 0, 1);
        }
        .tabash-search-container {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
        }
        .tabash-search-icon {
          width: 18px;
          height: 18px;
          opacity: 0.4;
        }
        #tabash-palette-input {
          flex: 1;
          padding: 0;
          font-size: 15px;
          font-weight: 400;
          background: transparent;
          border: none;
          color: #ffffff;
          outline: none;
          font-family: inherit;
          box-sizing: border-box;
        }
        #tabash-palette-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }
        #tabash-palette-list {
          overflow-y: auto;
          flex: 1;
          padding: 8px;
        }
        #tabash-palette-list::-webkit-scrollbar {
          width: 6px;
        }
        #tabash-palette-list::-webkit-scrollbar-track {
          background: transparent;
        }
        #tabash-palette-list::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .tabash-palette-item {
          padding: 10px 12px;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          margin: 2px 0;
          transition: all 0.1s ease;
        }
        .tabash-palette-item.selected {
          background: linear-gradient(135deg, rgba(255, 90, 95, 0.2) 0%, rgba(255, 90, 95, 0.1) 100%);
          box-shadow: 0 0 0 1px rgba(255, 90, 95, 0.3);
        }
        .tabash-item-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .tabash-item-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tabash-item-name {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tabash-item-url {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tabash-item-shortcut {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .tabash-kbd {
          padding: 3px 6px;
          font-size: 11px;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.5);
        }
        .tabash-palette-empty {
          padding: 40px 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.35);
          font-size: 14px;
        }
        .tabash-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
        }
        .tabash-footer-actions {
          display: flex;
          gap: 16px;
        }
        .tabash-footer-action {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      </style>
      <div id="tabash-command-palette">
        <div class="tabash-search-container">
          <svg class="tabash-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            id="tabash-palette-input"
            type="text"
            placeholder="Search links..."
            autocomplete="off"
          />
        </div>
        <div id="tabash-palette-list"></div>
        <div class="tabash-footer">
          <span>tabash</span>
          <div class="tabash-footer-actions">
            <div class="tabash-footer-action">
              <span class="tabash-kbd">↵</span>
              <span>Open</span>
            </div>
            <div class="tabash-footer-action">
              <span class="tabash-kbd">esc</span>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    document.body.appendChild(this.overlay);

    this.input = this.overlay.querySelector("#tabash-palette-input");
    this.list = this.overlay.querySelector("#tabash-palette-list");

    this.input?.addEventListener("input", () => this.onInputChange());
    this.input?.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  private onInputChange() {
    const query = this.input?.value.toLowerCase() || "";
    this.filteredLinks = this.links.filter((link) =>
      link.name.toLowerCase().includes(query)
    );
    this.selectedIndex = 0;
    this.renderList();
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = Math.min(
        this.selectedIndex + 1,
        this.filteredLinks.length - 1
      );
      this.renderList();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
      this.renderList();
      return;
    }
    if (e.key === "Enter" && this.filteredLinks.length > 0) {
      e.preventDefault();
      this.goToLink(this.filteredLinks[this.selectedIndex]);
      return;
    }
  }

  private renderList() {
    if (!this.list) return;

    if (this.filteredLinks.length === 0) {
      this.list.innerHTML = `<div class="tabash-palette-empty">No links found</div>`;
      return;
    }

    this.list.innerHTML = this.filteredLinks
      .map(
        (link, index) => `
        <div class="tabash-palette-item ${index === this.selectedIndex ? "selected" : ""}" data-index="${index}">
          <div class="tabash-item-content">
            <span class="tabash-item-name">${this.escapeHtml(link.name)}</span>
            <span class="tabash-item-url">${this.escapeHtml(link.url)}</span>
          </div>
        </div>
      `
      )
      .join("");

    this.list.querySelectorAll(".tabash-palette-item").forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.getAttribute("data-index") || "0", 10);
        this.goToLink(this.filteredLinks[index]);
      });
      item.addEventListener("mouseenter", () => {
        const index = parseInt(item.getAttribute("data-index") || "0", 10);
        this.selectedIndex = index;
        this.renderList();
      });
    });

    const selectedElement = this.list.children[this.selectedIndex] as HTMLElement;
    selectedElement?.scrollIntoView({ block: "nearest" });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  private goToLink(link: Link) {
    this.close();
    window.location.href = `https://${link.url}`;
  }
}

new CommandPalette();
