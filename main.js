const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1400,
        height: 900,

        minWidth: 1100,
        minHeight: 700,

        show: false,

        title: "ELAMAR ERP",

        icon: path.join(__dirname, "src", "icon.png"),

        backgroundColor: "#0f172a",

        autoHideMenuBar: true,

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            nodeIntegration: false,

            contextIsolation: true,

            sandbox: true,

            webSecurity: true,

            devTools: true

        }

    });

    Menu.setApplicationMenu(null);

    mainWindow.loadFile(path.join(__dirname, "src", "index.html"));

    mainWindow.once("ready-to-show", () => {

        mainWindow.show();

    });

    mainWindow.on("closed", () => {

        mainWindow = null;

    });

}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (BrowserWindow.getAllWindows().length === 0) {

            createWindow();

        }

    });

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});

app.on("web-contents-created", (event, contents) => {

    contents.setWindowOpenHandler(() => {

        return { action: "deny" };

    });

});
