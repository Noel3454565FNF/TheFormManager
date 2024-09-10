const { app, BrowserWindow } = require('electron');
const http = require('http');
const { exec } = require('child_process');

// Declare the variable for the BrowserWindow
let mainWindow, mainWindow2;


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Create a new BrowserWindow when Electron is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    x: 300,
    y: 300,
    center: true,
    backgroundColor: "black",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow2 = new BrowserWindow({
    width: 200,
    height: 200,
    x: 800,
    y: 300,
    center: true,
    closable: false,
    backgroundColor: "black",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load an HTML file into the window
  mainWindow.loadFile('index.html');
  mainWindow2.loadFile('in.html');  
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from the Node.js HTTP server\n');
});

// Listen on a specific port, e.g., 3000
server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// Function to send a web request
function sendWebRequest() {
  const options = {
    hostname: 'localhost', // Target server's hostname
    port: 8080,            // Target server's port
    path: '/test',         // Target server's path
    method: 'POST',        // HTTP method (GET/POST/PUT/DELETE)
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Data to send in the body of the request (if needed)
  const postData = JSON.stringify({
    message: 'Hello from Electron and Node.js!',
    success: true,
  });

  const req = http.request(options, (res) => {
    let responseData = '';

    // Collect response data
    res.on('data', (chunk) => {
      responseData += chunk;
    });

    // Log the full response when received
    res.on('end', () => {
      console.log('Response from the server:', responseData);
    });
  });

  // Handle request error
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write data to request body (for POST/PUT requests)
  req.write(postData);

  // End the request
  req.end();
}

start();
function start()
{
  console.log("booting-up...");
  startAsync();
}

async function startAsync() {
  await wait(3000);
  console.log("boot-up!");
  createWindow();
  
  setTimeout(sendWebRequest, 3000);

}
// Call the sendWebRequest function after Electron is ready

// Quit the app when all windows are clo  sed (standard for Electron apps)

// Activate the app when it is opened again on macOS



// exec('powershell -Command "electron ."', (error, stdout, stderr) => {
//   if (error) {
//       console.error(`Error: ${error.message}`);
//       return;
//   }
//   if (stderr) {
//       console.error(`Stderr: ${stderr}`);
//       return;
//   }
//   console.log(`Output: ${stdout}`);
// });