const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let menuTemplate = [
  {
    label: 'Application',
    submenu: [
      {
        label: "About",
        click: () => {
          openAboutWindow()
        }
      }
    ]
  },
  {
    label: 'Index',
    submenu: [
      {
        label: "Index2",
        click: () => {
          openIndex2Window()
        }
      }
    ]
  }
]

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow
const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  let menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

};

const openAboutWindow = () => {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 400,
    height: 200
  })

  aboutWindow.loadFile(
    path.join( __dirname, 'about.html'),
 );
  aboutWindow.setMenu(null);
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })

}

const openIndex2Window = () => {

  let index2Window = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
    height: 500
  })

  index2Window.loadFile(
    path.join( __dirname, 'index2.html'),
 );
 //index2Window.setMenu(null);
 index2Window.once('ready-to-show', () => {
  index2Window.show()
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
