const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("ELAMAR", {

    appName: "ELAMAR ERP",

    version: "1.0.0",

    platform: process.platform

});