import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";

const runSetWallpaper = ({
  updateShellState,
  args,
  setCustomWallpaper,
}: ProgramProps) => {
  const stream = getStream(updateShellState);

  if (!setCustomWallpaper) {
    stream.writeStderr("set-wallpaper: internal error");
    return;
  }

  // --reset 옵션으로 기본 배경으로 복구
  if (args[0] === "--reset") {
    setCustomWallpaper(null);
    stream.writeStdout("Wallpaper reset to default.");
    return;
  }

  // 파일 선택 다이얼로그 열기
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      stream.writeStderr("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomWallpaper(dataUrl);
      stream.writeStdout(`Wallpaper set: ${file.name}`);
      stream.writeStdout("To reset, run: set-wallpaper --reset");
    };
    reader.onerror = () => {
      stream.writeStderr("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  input.click();
};

const setWallpaper: Program = { name: "set-wallpaper", run: runSetWallpaper };

export default setWallpaper;
