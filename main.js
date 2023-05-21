"use strict";

const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron"); //create three constants, which are all imported from electron module
const path = require("path"); //allows to work with directory and files
const url = require("url"); //allows to work with url
const remote = require("electron"); // importing remote to access windows functions

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  
  // different size window
  // Final commit
  // mainWindow = new BrowserWindow();
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800});
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800, maxWidth:2200, maxHeight:1500});

  // Positioning the window
  // mainWindow = new BrowserWindow({minWidth:1200, minHeight:800, x:20, y:20});

  // Frameless application(body on CSS app need to be deleted in order to work)
  // mainWindow = new BrowserWindow({frame: false});
  // mainWindow = new BrowserWindow({transparent: true});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"), // patht to the index in order to load it to main window
      slashes: true, // add forwards slash to the url
      protocol: "file:", //tells that the file is loaded from local file system
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null; //when closed is called the window is ensured to be closed
  });

  const getWindow = () => remote.BrowserWindow.getFocusedWindow(); //function to get window current state

  //minimize if maximized
  function maximizeWindow() {
    const window = getWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
  }
  //Template for menu items
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Download",
          click: () => {
            exportList(); //call function to export list in menu item
          },
        },
      ],
    },
    {
      label: "Window",
      submenu: [
        {
          role: "Minimize",
        },
        {
          role: "Close",
        },
        {
          label: "Maximize/Restore down",
          click: maximizeWindow,
        },
        {
          label: "Kiosk Mode",
          click: function () {
            mainWindow.setKiosk(true);
          },
        },
        {
          label: "Exit Kiosk Mode",
          click: function () {
            mainWindow.setKiosk(false);
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template); //creates menu from template object
  Menu.setApplicationMenu(menu); // set the menu

  //Options come up once right button is clicked
  mainWindow.webContents.on("context-menu", (event, params) => {
    const contextMenuTemplate = [
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
    ];
    const contextMenu = Menu.buildFromTemplate(contextMenuTemplate); //creating an event listener, which is activate when right click happens. (Context menu).
    contextMenu.popup();
  });

  //Download function
  function exportList() {
    let data = "";
    const groceryList = []; // Your groceryList data here

    groceryList.forEach((item) => {
      data += `Item Description: ${item.item_name} - Quantity: ${item.quantity}\n`;
    });

    let fileName = "grocery-list.txt";
    let contentType = "text/plain";
    let filePath = dialog.showSaveDialogSync(mainWindow, {
      defaultPath: fileName,
      filters: [
        {
          name: "Text Files",
          extensions: ["txt"],
        },
      ],
    });
  }
}

app.on("ready", createWindow); //When app is ready, it will create the window

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
