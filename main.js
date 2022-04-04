// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");
const config = require("./package.json");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: "100%",
    height: "100%",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: __dirname + "/lpu-live.ico",
    name: "LPU Live",
  });

  // and load the index.html of the app.
  mainWindow.maximize();
  mainWindow.loadURL("https://lpkia.ac.id/");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  // createMenu();
  const menuItemps = [
    {
      label: "Main",
      submenu: [
        {
          label: "Jalur Seleksi",
          click: function openUMS() {
            // mainWindow.loadURL("https://pmb.lpkia.ac.id/?_ga=2.234500503.809721969.1648184583-938927083.1648184583/");
            shell.openExternal("https://pmb.lpkia.ac.id/jalur-seleksi");
          },
        },
        {
          label: "Login / Registration",
          click: function openMyClass() {
            shell.openExternal("https://pmb.lpkia.ac.id/login");
          },
        },
      ],
    },
    {
      label: "Forward",
      accelerator: "CmdOrCtrl+]",
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const wc = focusedWindow.webContents;
          if (wc && wc.canGoForward()) wc.goForward();
        }
      },
    },
    {
      label: "Back",
      accelerator: "CmdOrCtrl+[",
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const wc = focusedWindow.webContents;
          if (wc && wc.canGoBack()) wc.goBack();
        }
      },
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About",
          click: function about() {
            const options = {
              title: "About",
              message: "An Desktop App build of LPKIA Live Registration Web",
              detail: `LPKIA Live Registration - v${config.version}`,
              icon: "./icons/logo.png",
            };
            dialog.showMessageBox(null, options, (response) => {
              if (response === "Visit Source Code") {
                shell.openExternal(
                  "https://github.com/readloud/lpkia-live"
                );
              }
            });
          },
        },
        {
          label: "Developer by readloud",
          click: function madeBy() {
            shell.openExternal("https://github.com/readloud");
          },
        },
        {
          label: "Found a Bug !!",
          click: function openIssue() {
            shell.openExternal(
              "https://github.com/readloud/lpkia-live/issues/new"
            );
          },
        },
        {
          label: "Check for Update ..",
          click: function openIssue() {
            shell.openExternal(
              "https://github.com/readloud/lpkia-live/releases"
            );
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectall" },
      ],
    },
    {
      label: "Exit",
      role: "quit",
    },
  ];
  const menuStrip = Menu.buildFromTemplate(menuItemps);
  Menu.setApplicationMenu(menuStrip);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
