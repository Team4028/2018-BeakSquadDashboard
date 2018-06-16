// Define UI elements
let ui = {
    robotState: document.getElementById('robot-state').firstChild,
	fmsDebugMsg: document.getElementById('fmsDebugMsg'),
	robotCodeBuild: document.getElementById('robotCodeBuild'),
	robotScanTime: document.getElementById('robotScanTime'),
	
	// auton selectors
	autoModeSelect: document.getElementById('auto-mode-select'),
	autoStartingSideSelect: document.getElementById('auto-starting-side-select'),
	
	// chassis
	leftChassisWheelTargetVel: document.getElementById('leftChassisWheelTargetVel'),
	leftChassisWheelActualVel: document.getElementById('leftChassisWheelActualVel'),
	rightChassisWheelTargetVel: document.getElementById('rightChassisWheelTargetVel'),
	rightChassisWheelActualVel: document.getElementById('rightChassisWheelActualVel'),
	
	// infeed arm diagram
	robotDiagram: {
        infeedRightArm: document.getElementById('infeed-right-arm'),
		infeedLeftArm: document.getElementById('infeed-left-arm'),
		cube: document.getElementById('cube-gamepiece'),
		jackState: document.getElementById('jackState'),
	    },
		
	// elevator
	elevatorHeightInches: document.getElementById('elevatorHeightInches'),
	elevatorHeightNU: document.getElementById('elevatorHeightNU'),
	elevatorState: document.getElementById('elevatorState'),
	elevatorInPosition: document.getElementById('elevatorInPosition'),
	climberServerOpen: document.getElementById('climberServerOpen'),
	robotPose: document.getElementById('robotPose'),
	chassisAngle: document.getElementById('chassisAngle'),
	//chassisRemainingPathLength: document.getElementById('chassisRemainingPathLength'),
	
	// carriage
	carriageInfeedPercentVBus: document.getElementById('carriageInfeedPercentVBus'),
	carriageOutfeedPercentVBus: document.getElementById('carriageOutfeedPercentVBus'),
	carriageState: document.getElementById('carriageState'),
	carriageSqueezed: document.getElementById('carriageSqueezed'),
	cubeInCarriage: document.getElementById('cubeInCarriage'),
	
	// infeed
	leftArmCurrentAngle: document.getElementById('leftArmCurrentAngle'),
	rightArmCurrentAngle: document.getElementById('rightArmCurrentAngle'),
	leftArmCurrentAngleNU: document.getElementById('leftArmCurrentAngleNU'),
	rightArmCurrentAngleNU: document.getElementById('rightArmCurrentAngleNU'),
	infeedArmsState: document.getElementById('infeedArmsState'),
	infeedArmsTargetSqueezeAngle: document.getElementById('infeedArmsTargetSqueezeAngle'),
	infeedWheelsPercentVBus: document.getElementById('infeedWheelsPercentVBus'),
	infeedArmsInPosition: document.getElementById('infeedArmsInPosition'),
	infeedWheelsState: document.getElementById('infeedWheelsState'),
	infeedArmsSafe: document.getElementById('infeedArmsSafe'),
	infeedArmsLeftHomed: document.getElementById('infeedArmsLeftHomed'),
	infeedArmsRightHomed: document.getElementById('infeedArmsRightHomed'),
};

// Key Listeners
// ========================================================================================
// header
// ========================================================================================
// robotState is in connection.js

NetworkTables.addKeyListener('/SmartDashboard/FMS Debug Msg', (key, value) => {
    ui.fmsDebugMsg.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Robot Build', (key, value) => {
    ui.robotCodeBuild.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Scan Time (2 sec roll avg)', (key, value) => {
    ui.robotScanTime.value = value;
});
// ========================================================================================
// auton mode
// ========================================================================================
// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/AUTON MODE: /options', (key, value) => {
    // Clear previous list
    while (ui.autoModeSelect.firstChild) {
        ui.autoModeSelect.removeChild(ui.autoModeSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.autoModeSelect.appendChild(option);
		
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoModeSelect.value = NetworkTables.getValue('/SmartDashboard/AUTON MODE: /selected');
});

// Update ui when value chgs from robot
NetworkTables.addKeyListener('/SmartDashboard/AUTON MODE: /selected', (key, value) => {
    ui.autoModeSelect.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoModeSelect.onchange = function() {
    NetworkTables.putValue('/SmartDashboard/AUTON MODE: /selected', this.value);
};

// ========================================================================================
// auton starting side
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/AUTON STARTING SIDE: /options', (key, value) => {
    // Clear previous list
    while (ui.autoStartingSideSelect.firstChild) {
        ui.autoStartingSideSelect.removeChild(ui.autoStartingSideSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.autoStartingSideSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoStartingSideSelect.value = NetworkTables.getValue('/SmartDashboard/AUTON STARTING SIDE: /selected');
});

// Update ui when value chgs from robot
NetworkTables.addKeyListener('/SmartDashboard/AUTON STARTING SIDE: /selected', (key, value) => {
    ui.autoStartingSideSelect.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoStartingSideSelect.onchange = function() {
    NetworkTables.putValue('/SmartDashboard/AUTON STARTING SIDE: /selected', this.value);
};

// ========================================================================================
// Chassis
// =======================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Chassis: Left Wheel Target Velocity', (key, value) => {
    ui.leftChassisWheelTargetVel.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Chassis: Left Velocity', (key, value) => {
    ui.leftChassisWheelActualVel.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Chasiss: Right Wheel Target Velocity', (key, value) => {
    ui.rightChassisWheelTargetVel.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Chassis: Right Velocity', (key, value) => {
    ui.rightChassisWheelActualVel.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Chassis: Robot Pose', (key, value) => {
    ui.robotPose.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Chassis: Angle', (key, value) => {
    ui.chassisAngle.value = value;
});

//NetworkTables.addKeyListener('/SmartDashboard/Chassis: Robot Pose', (key, value) => {
//    ui.chassisRemainingPathLength.value = value;
//});

// ========================================================================================
// Elevator Group Box
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Elevator:Position(in)', (key, value) => {
    ui.elevatorHeightInches.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Elevator:Position', (key, value) => {
    ui.elevatorHeightNU.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Elevator:State', (key, value) => {
    ui.elevatorState.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Elevator:IsInPosition', (key, value) => {
    //ui.elevatorInPosition.value = value;
	
	if (value == false)
	{
		ui.elevatorInPosition.style = "background-color:red;";
	}
	else
	{
		ui.elevatorInPosition.style = "background-color:green;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/Is Climber Servo Open?:', (key, value) => {
    //ui.climberServerOpen.value = value;
	
	if (value == false)
	{
		ui.climberServerOpen.style = "background-color:red;";
	}
	else
	{
		ui.climberServerOpen.style = "background-color:green;";
	}
});

// ========================================================================================
// Infeed Group Box
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Left Current Angle', (key, value) => {
    ui.leftArmCurrentAngle.value = value;
	
	
    // Calculate visual rotation of arm
    var armAngle = value - 90;
    // Rotate the arm in diagram to match real arm
	ui.robotDiagram.infeedLeftArm.style.transform = `rotate(${armAngle}deg)`;
	
	//ui.robotDiagram.cube.style.transform = `rotate(${armAngle}deg)`;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Right Current Angle:', (key, value) => {
    ui.rightArmCurrentAngle.value = value;
	
    // Calculate visual rotation of arm
    var armAngle = -value + 90;
    // Rotate the arm in diagram to match real arm
	ui.robotDiagram.infeedRightArm.style.transform = `rotate(${armAngle}deg)`;
	
	//ui.robotDiagram.cube.style.transform = `rotate(${armAngle}deg)`;
	
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Left Current PositionNU', (key, value) => {
    ui.leftArmCurrentAngleNU.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Right Current PositionNU:', (key, value) => {
    ui.rightArmCurrentAngleNU.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:State', (key, value) => {
    ui.infeedArmsState.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Target Squeeze Angle', (key, value) => {
    ui.infeedArmsTargetSqueezeAngle.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedWheels:%VBus', (key, value) => {
    ui.infeedWheelsPercentVBus.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:InPosition?', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.infeedArmsInPosition.style = "background-color:red;";
	}
	else
	{
		ui.infeedArmsInPosition.style = "background-color:green;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedWheels:State', (key, value) => {
    ui.infeedWheelsState.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Are Safe?', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.infeedArmsSafe.style = "background-color:red;";
	}
	else
	{
		ui.infeedArmsSafe.style = "background-color:green;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Left Homed?', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.infeedArmsLeftHomed.style = "background-color:red;";
	}
	else
	{
		ui.infeedArmsLeftHomed.style = "background-color:green;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/InfeedArms:Right Homed?', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.infeedArmsRightHomed.style = "background-color:red;";
	}
	else
	{
		ui.infeedArmsRightHomed.style = "background-color:green;";
	}
});
// ========================================================================================
// Carriage Group Box
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Carriage: Wheels Feed In %VBus', (key, value) => {
    ui.carriageInfeedPercentVBus.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Carriage: Wheels Feed Out %VBus', (key, value) => {
    ui.carriageOutfeedPercentVBus.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/State: Carriage', (key, value) => {
    ui.carriageState.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Carriage: Is Squeezed', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.carriageSqueezed.style = "background-color:red;";
	}
	else
	{
		ui.carriageSqueezed.style = "background-color:green;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/Carriage: Is Cube In Carriage?', (key, value) => {
    //ui.infeedArmsInPosition.value = value;
	
	if (value == false)
	{
		ui.cubeInCarriage.style = "background-color:red;";
		ui.robotDiagram.cube.style = "fill:black";
	}
	else
	{
		ui.cubeInCarriage.style = "background-color:green;";
		ui.robotDiagram.cube.style = "fill:yellow";
	}
	
});

NetworkTables.addKeyListener('/SmartDashboard/Carriage: Is Squeezed', (key, value) => {
	if (value == false)
	{
		ui.robotDiagram.jackState.value = "Open"
	}
	else
	{
		ui.robotDiagram.jackState.value = "Closed"
	}
});
// ========================================================================================
// misc 
// ========================================================================================
addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})