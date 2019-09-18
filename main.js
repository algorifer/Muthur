const {app, BrowserWindow, webFrame, Menu} = require('electron');

require('electron').protocol.registerSchemesAsPrivileged([
  {scheme: 'js', privileges: {standard: true, secure: true}}
]);

app.win = null;

app.on(`ready`, () => {
  app.win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#eeeeee',
    // icon: path.join(__dirname, { darwin: 'icon.icns', linux: 'icon.png', win32: 'icon.ico' }[process.platform] || 'icon.ico'),
    icon: 'icon.png',
    resizable: true,
    frame: process.platform !== 'darwin',
    skipTaskbar: process.platform === 'darwin',
    autoHideMenuBar: process.platform === 'darwin',
    webPreferences: {
      zoomFactor: 1.0,
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  app.win.loadFile('public/index.html');

  app.win.on('closed', () => {
    win = null;
    app.quit();
  });

  app.on('window-all-closed', () => {
    app.quit();
  });

  app.on('activate', () => {
    if (app.win === null) {
      createWindow();
    } else {
      app.win.show();
    }
  });
});

app.inspect = function() {
  app.win.toggleDevTools();
};

app.toggleMenubar = function() {
  app.win.setMenuBarVisibility(!app.win.isMenuBarVisible());
};

app.toggleFullscreen = function() {
  app.win.setFullScreen(!app.win.isFullScreen());
};

app.toggleVisible = function() {
  if (process.platform === 'darwin') {
    if (isShown && !app.win.isFullScreen()) {
      app.win.hide();
    } else {
      app.win.show();
    }
  } else {
    if (!app.win.isMinimized()) {
      app.win.minimize();
    } else {
      app.win.restore();
    }
  }
};

app.injectMenu = function(menu) {
  try {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  } catch (err) {
    console.warn('Cannot inject menu.');
  }
};

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 720,
//     webPreferences: {
//       nodeIntegration: true
//     },
//     icon: 'icon.png'
//   });

//   mainWindow.loadFile('public/index.html');

//   mainWindow.on('closed', function() {
//     mainWindow = null;
//   });
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', function() {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', function() {
//   if (mainWindow === null) createWindow();
// });
