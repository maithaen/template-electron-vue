import { ipcMain } from 'electron'
export function registerIpcHandlers(): void {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Add more handlers here as your app grows
}
