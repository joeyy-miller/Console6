/*_______/\\\\\__________/\\\\\\\\\\\__________________/\\\____________/\\\\\_        
  _____/\\\///\\\______/\\\/////////\\\______________/\\\/_________/\\\\////__       
   ___/\\\/__\///\\\___\//\\\______\///_____________/\\\/________/\\\///_______      
    __/\\\______\//\\\___\////\\\__________________/\\\/________/\\\\\\\\\\\____     
     _\/\\\_______\/\\\______\////\\\_____________/\\\/_________/\\\\///////\\\__    
      _\//\\\______/\\\__________\////\\\________/\\\/__________\/\\\______\//\\\_   
       __\///\\\__/\\\_____/\\\______\//\\\_____/\\\/____________\//\\\______/\\\__  
        ____\///\\\\\/_____\///\\\\\\\\\\\/____/\\\/_______________\///\\\\\\\\\/___ 
         ______\/////_________\///////////_____\///___________________\/////////_____

    (c)2018 iJD Software. MIT License. Open-Source. Welcome to Console 6. GUI. 
*/

/*****************************
    K e r n e l   S p a c e
*****************************/
var dev_mode = true;
/**************************
  Lightening  Kernel 1.0,3
**************************/
let kernel = (function() {

	// Private Variables
		// Private Variables
	let _background = "", // Path to background.
		_boot_bg = "",
	    _power = false; // System power status. false = off, true = on.

	return {

		// Public Variables
		version : '0.3x', // kernel version

		// Get functions
		get power() 
		{ /* Turns system on or off */
			if(_power == false) { // System off, so turn on.

				this.boot;
				
			} else { // System is on, turn off.

				this.shutdown;

			}
		},

		get boot() {
			_power = true;
			document.getElementById("indicator").style.color = "#9ed62a";
			sys.boot;
		},

		get shutdown() {
			_power = false;
			document.getElementById("indicator").style.color = "#ce2732";
			sys.clear;
		},

		set backColor(color_) 
		{
			document.getElementById("screen").style.background = color_;
		},

		set backgroundPicture(image) 
		{
			document.getElementById("screen").style.backgroundImage = image;
		},

		set screenHMTL (html) 
		{
			document.getElementById("screen").innerHTML = html;
		},

		get panic() {/* Calls system panic. */
		},

		set pause(value)
		{
			setTimeout(function() { value.exe },value.timeout);
		},

		// Info funcitons
		get powerSts() { // Return the status of the power
			return _power;
		}

		// Set functions
	}
})();
function power() { kernel.power; } // Binds power
var screen = document.getElementById('screen');

/*************************************
    	U s e r   S p a c e
*************************************/

/***************************
 iJD Console 6 UI Controller
****************************/
let user_interface = (function() {

	// Private Variables
	    // Boot time spacing
	let BOOT_STAGE1 = 200,
		BOOT_STAGE2 = 1000,
		BOOT_STAGE3 = 4800,
		BOOT_STAGE4 = 5000,

		// Desktop time spacing
		DESKTOP_STAGE1 = 500,
		DESKTOP_STAGE2 = 1200,

		// Display statuses. True = visible. False = hidden.
		info_drop = false,

		DESKTOP_ITEMS = ["Terminal","launch('terminal')","About","launch('about')","Shutdown","launch('shutdown')"];

	return {

		version : '0.1', //@ Display Driver Version

		get boot() { // What to show while booting up.
			if (dev_mode) { user_interface.desktop() } else {
			/* Stage 1 */
			kernel.pause = { exe: "kernel.backColor = '#fff'", timeout: BOOT_STAGE1};

			/* Stage 2 */
			setTimeout(function() {kernel.backgroundPicture = 'url("sys/styles/boot.jpg")';},BOOT_STAGE2);

			/* Stage 3 */
			setTimeout(function() {kernel.backgroundPicture = 'none';},BOOT_STAGE3);
			setTimeout(function() {kernel.backColor = '#fff';},BOOT_STAGE3);

			/* Stage 4 */
			setTimeout(function() {kernel.backgroundPicture = 'url("sys/styles/wallpaper_blur.jpg")';},BOOT_STAGE4);
			setTimeout(function() {kernel.screenHMTL = '<div id="login-title">Welcome.</div><input class="welcome-input" type="text" placeholder="Enter username."><input class="welcome-input" type="password" placeholder="Enter password."><button onclick="sys.login;" id="login-button">Login <i class="fas fa-sign-in-alt"></i></button>';},BOOT_STAGE4);
			}
		},

		get clear() { //@ Clears the screen for shutdown
			kernel.screenHMTL = '';
			kernel.backgroundPicture = 'none';
			kernel.backColor = '#000';
		},

		get desktop() { //@ Show the desktop

			/* Stage 1 */
			setTimeout(function() {kernel.backColor = '#fff';},DESKTOP_STAGE1);
			setTimeout(function() {kernel.screenHTML = '';},DESKTOP_STAGE1);

			/* Stage 2 */
			var i_menu = "";
			var len = (DESKTOP_ITEMS.length);
			for (var i = 0; i < len;i++) {
				i_menu += '<li id="item_' + DESKTOP_ITEMS[i] + '" onclick="' + DESKTOP_ITEMS[i + 1] + '">' + DESKTOP_ITEMS[i] + "</li>";
				i++;
			}
			setTimeout(function() {kernel.screenHMTL = '<div id="top-bar"><a onclick="user_interface.info" id="info"><i class="fas fa-info"></i></a><span class="mono"> consoleOS 6</span><a id="time"></a></div><ul id="info-dropdown" style="visibility:hidden;">'+ i_menu + "</ul>";},DESKTOP_STAGE2);
			setTimeout(function() {kernel.backgroundPicture = 'url("sys/styles/wallpaper.jpg")';time();},DESKTOP_STAGE2);
		},

		get info() {
			if (info_drop){
				info_drop = false;
				document.getElementById('info-dropdown').style.visibility = "hidden";
			}
			else {
				info_drop = true;
				document.getElementById('info-dropdown').style.visibility = "visible";
			}
		},

		get getTime() { //@ Logic for getting time information
			var today = new Date();
		    var h = today.getHours();
		    var m = today.getMinutes();
		    var s = today.getSeconds();
		    if (m < 10) {m = "0" + m};
		    if (s < 10) {s = "0" + s};
		    if (h < 1) {h = "12"} // 0 hours or 12 am
		    if (h > 12) {h-=12;s += " pm"}else{s+=" am"};
			return h + ":" + m + ":" + s;
		}
	}
})(); 

// screen.insertAdjacentHTML('beforeend', '<div id="two">two</div>');



let sys = (function() {
	// Private Variables

	return {
		get login() {
			user_interface.desktop; // Load in desktop.
		},

		get boot() {
			user_interface.boot;
		},

		get clear() {
			user_interface.clear;
		}
	}
	
})();


/******************
 Misc Funcitons 
 *****************/

/* Time Controller
#      Controls the time refresh. Recursive function. 
*/
var TIME_DELAY = 500; // 500 ms clock refresh rate
function time() {

    document.getElementById('time').innerHTML = user_interface.getTime;

    if (kernel.powerSts)
    {
    	setTimeout(time, TIME_DELAY);
    }
 	else 
 	{
		document.getElementById("time").innerHTML = '';
 	}
}


/* Keydown Event
    Listener event that runs whenver a key is pressed to check if an action 
   	needs to be performed.
*/
var ENTER_KEY = 13;
document.onkeydown = function(evt) {
	evt = evt || window.event;
	
	var isEnter = false;
	if ("key" in evt) { isEnter = (evt.key == "Enter");
	} else { isEnter = (evt.keyCode == ENTER_KEY); }
	if (isEnter) {
		power();
	}
}

/* 
	X WINDOW SYSTEM
	                  */
function launch(window_name) {

	switch(window_name) {
		case "terminal":
				windowCreate(150,300,"normal","Terminal","<b>Terminal interface will go here.</b><br>(c) iJD.");
				document.getElementById("item_Terminal").style.borderColor = "#f00";
			break;
		case "about":
				windowCreate(200,400,"normal","About",'<b style="font-family:monospace;">consoleOS 6</b> developed by <i>i</i>JD. Full 16-bit color. Graphical User Interface.<br>Version ' + kernel.version +' Developed in California.');
			break;
		case "shutdown":

			break;
		default:

			break;
	}
}

function windowCreate(x_size,y_size,type,name,contents) {

	var SCREEN_MARGIN = 8;

	switch (type) {
		case "normal":
			var remove = "$('#" + name + "').remove();windowDelete('" + name + ');";';
			$('#info-dropdown').after('<div><div id="' + name + '" class="window_normal" style="height:' + x_size + 'px;width: ' + y_size +'px;"><div class="window-topbar">'+ name +'<div class="btn-light"><a class="btn-close" onclick="' + remove +'">X</a></div></div><div class="window-contents"' + contents + '</div></div></div>');
			$('#' + name ).draggable({
			  containment: [SCREEN_MARGIN, SCREEN_MARGIN, (800 - y_size), (600 - x_size)]
			});
			break;
		case "yes/no":

			break;
		default:

			break;
	}
}

function windowDelete(name) {
	switch(window_name) {
		case "terminal":
				windowCreate(150,300,"normal","Terminal","<b>Terminal interface will go here.</b><br>(c) iJD.");
				document.getElementById("item_Terminal").style.borderColor = "#f00";
			break;
		case "about":
				windowCreate(200,400,"normal","About",'<b style="font-family:monospace;">consoleOS 6</b> developed by <i>i</i>JD. Full 16-bit color. Graphical User Interface.<br>Version ' + kernel.version +' Developed in California.');
			break;
		case "shutdown":
				power();
			break;
		default:

			break;
	}
}