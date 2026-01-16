export interface ThemecontextValue {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<boolean>;
  customWallpaper: string | null;
  setCustomWallpaper: (url: string | null) => void;
}
