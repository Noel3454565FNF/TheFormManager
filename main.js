const { elec, BrowserWindow } = require('electron');
const http = require('http');
const { exec, spawn } = require('child_process');
const path = require('path');
const url = require('url');
const express = require("express");
const app = express();
const aaa = require("node:os");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
// Declare the variable for the BrowserWindow
// const mainWindow = null;
// const mainWindow2 = null;
const currentOrder = null;
let Persistent, mainWindow, mainWindow2, InputWindow;
let userInf;

app.use(cors());

function wait(ms) {
  
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Create a new BrowserWindow when is ready
function loadYON() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    x: 300,
    y: 300,
    center: true,
    backgroundColor: "black",
    titleBarStyle: "hidden",
    show: true,
    title: "no",
    alwaysOnTop: true,
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
    backgroundColor: "black",
    titleBarStyle: "hidden",
    show: true,
    alwaysOnTop: true,
    title: "yes",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load an HTML file into the window
  mainWindow.loadFile('NO.html');
  mainWindow2.loadFile('YES.html'); 
 
}

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Service A is running on http://localhost:${port}`);
});

app.post('/yes', (req, res) => {
  res.sendStatus(200);
  const lol = req.body;
  console.log(lol.data1);
  sendWebRequest('yes', 'yes')
  also("UnspawnYON")
});
app.post('/no', (req, res) => {
  res.sendStatus(200);
   const lol = req.body;
   console.log(lol.data1);
  sendWebRequest('no', 'no')
  also("UnspawnYON")
});
app.post('/input', (req, res) => {
  console.log(req.body);
  res.json({ message: "OK" });
  sendWebRequest('input', req.body.data2)
  also("UnspawnI")
});
app.post('/UnityOrder', (req, res) => {
console.log(req.body.order);
res.send("hey..");
if (req.body.order == 'YesOrNo')
{
  also("spawnYON");
}
if (req.body.order == "Input")
{
  also("spawnI");
}
if (req.body.order == "Remove")
{
  also("remove");
}
if (req.body.order == "Test")
{
  also("test");
}
if (req.body.order == "UnspawnYON")
{
  also("UnspawnYON");
}
if (req.body.order == "winCrash" && userInf != "Noel3" || req.body.order == "Wincrash" && userInf != "Noel3")
{
  spawn('BSDO.exe');
  print("CRASHED HAHAHA >:3");
  print("don't cheat lmao.");
  print("i can do worse that that.");
  //He is always watching.
}
});


async function also(ord)
{
  if (ord == "remove")
  {

  }
  if (ord == "spawnYON")
  {
    loadYON();
    console.log("yes");
  }
  if (ord == "UnspawnYON")
  {
    mainWindow.close();
    mainWindow2.close();
  }
  if (ord == "spawnI")
  {
    spawnI();
  }
  if (ord == "UnspawnI")
  {
    unspawnI();
  }
}


function spawnI()
{
  InputWindow = new BrowserWindow({
    width: 200,
    height: 200,
    x: 600,
    y: 300,
    center: true,
    backgroundColor: "black",
    titleBarStyle: "hidden",
    show: true,
    alwaysOnTop: true,
    title: "Input here",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  InputWindow.loadFile("INPUT.html");
  InputWindow.eventNames
}

function unspawnI()
{
  InputWindow.close();
}

// Function to send a web request
function sendWebRequest(path, content) {
  const options = {
    hostname: 'localhost', // Target server's hostname
    port: 8080,            // Target server's port
    path: '/' + path,         // Target server's path
    method: 'POST',        // HTTP method (GET/POST/PUT/DELETE)
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Data to send in the body of the request (if needed)
  const postData = JSON.stringify({
    message: content,
    FromUnity: true,
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
  userInf = aaa.userInfo();
   console.log(userInf.username);
}


function createWindow()
{
  Persistent = new BrowserWindow({
    width: 0,
    height: 0,
    x: 300,
    y: 300,
    center: true,
    backgroundColor: "black",
    titleBarStyle: "hidden",
    show: true,
    title: "Im always Watching.",
    autoHideMenuBar: true,
    opacity: 0,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

}


async function startAsync() {
  await wait(3000);
  // lol = new Electron.BaseWindow({
  //   width: 200, 
  //   height: 200,
  //   title: "test",
  // }),  
  console.log("boot-up!");
  createWindow();
  //also("spawnYON").then();
  //setTimeout(sendWebRequest, 3000);

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