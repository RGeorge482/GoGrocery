"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

 app.on("ready", () => {
  
  // window displayed
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
  });

  // different size window
  // mainWindow = new BrowserWindow();
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800});
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800, maxWidth:2200, maxHeight:1500});

  // Positioning the window
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800, x:20, y:20});

  // Frameless application(body on CSS app need to be deleted in order to work)
  // mainWindow = new BrowserWindow({frame: false});
  // mainWindow = new BrowserWindow({transparent: true});

  // electron Kiosk application mode
  // mainWindow = new BrowserWindow({ kiosk: true });
  // const remote = require("electron").remote;
  // function toggleKiosk() {
  //   const button = document.getElementById("kiosk");
  //   const win = remote.getCurrentWindow();
  //   if (win.isKiosk()) {
  //     win.setKiosk(false);
  //     button.innerText = "Enter kiosk mode";
  //   } else {
  //     win.setKiosk(true);
  //     button.innerText = "Exit kiosk mode";
  //   }
  // }

 

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});


