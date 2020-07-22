import { ipcRenderer } from "electron"
import { GLOBAL_STATUS } from "@/enum/ipc";

export function openDevTools() {
  document.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.keyCode === 123) {
      ipcRenderer.send(GLOBAL_STATUS.CONSOLE)
    }
  })
}
