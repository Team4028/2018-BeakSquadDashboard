let usbConnect = document.getElementById('usbConnectBtn'),
  radioConnect = document.getElementById('radioConnectBtn'),
  buttonConnect = document.getElementById('reconnectBtn'),
  camera = document.getElementById('camera'),
  robotState = document.getElementById('robot-state');
let loginShown = true;

// Set function to be called on NetworkTables connect. Not implemented.
//NetworkTables.addWsConnectionListener(onNetworkTablesConnection, true);

// Set function to be called when robot dis/connects
NetworkTables.addRobotConnectionListener(onRobotConnection, false);

// Sets function to be called when any NetworkTables key/value changes
//NetworkTables.addGlobalListener(onValueChanged, true);

// Function for hiding the connect box
onkeydown = key => {
  if (key.key === 'Escape') {
    document.body.classList.toggle('login', false);
    loginShown = false;
  }
};

/**
 * Function to be called when robot connects
 * @param {boolean} connected
 */
function onRobotConnection(connected) {
  var state = connected ? 'Robot connected!' : 'Robot disconnected.';
  console.log(state);
  robotState.textContent = state;
  
  if (connected == false)
	{
		robotState.style.backgroundColor = "red";
	}
	else
	{
		robotState.style.backgroundColor = "green";
	}
  
  buttonConnect.onclick = () => {
    document.body.classList.toggle('login', true);
    loginShown = true;
  };
  if (connected) {
    // On connect hide the connect popup
    document.body.classList.toggle('login', false);
    loginShown = false;
  } else if (loginShown) {
    setLogin();
  }
}
function setLogin() {
  // Enable the USB and Radio Connection buttons
  usbConnect.disabled = radioConnect.disabled = false;
}
// On click try to connect and disable the input and the button
usbConnect.onclick = () => {
  ipc.send('connect', '172.22.11.2');
  usbConnect.disabled = radioConnect.disabled = true;
  //camera.style.backgroundImage = "url(http://172.22.11.2:1180/stream.mjpg)";
  camera.style.backgroundImage = "url('http://172.22.11.2:1180/stream.mjpg')";
  usbConnect.textContent = 'Connecting...';
};
radioConnect.onclick = () => {
  ipc.send('connect', '10.40.28.2');
  usbConnect.disabled = radioConnect.disabled = true;
  //camera.style.backgroundImage = "url(http://10.40.28.2:1180/stream.mjpg)";
  camera.style.backgroundImage = "url('http://10.40.28.2:1180/stream.mjpg')";
  radioConnect.textContent = 'Connecting...';
};

// Show login when starting
document.body.classList.toggle('login', true);
setLogin();
