const { app, BrowserWindow } = require("electron");
const path = require("path");
const process = require("process");
// const { startServer } = require(path.join(__dirname, "../server/app.js"));

const launchWindow = async (app) => {
  // start api
  // await startServer();

  // create window
  const mainWindow = new BrowserWindow({
    title: "Todo app",
    show: false,
    width: 1200,
    height: 800,
    icon: app.isPackaged
      ? undefined
      : path.join(__dirname, "../assets/win/icon.png"),
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "../build/index.html")}`
      : "http://localhost:3000"
  );

  mainWindow.once("ready-to-show", () => {
    // mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on("close", () => {
    app.quit();
  });
};

const startApp = async () => {
  try {
    await app.whenReady();
    await launchWindow(app);
    console.log("app running");
  } catch (e) {
    console.log("e", e);
  }
};

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

startApp();
