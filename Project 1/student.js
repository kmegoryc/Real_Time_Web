/// SOCKET STUFF
var socket = io.connect();

socket.on('connect', function() {
    //whenever someone connects, they request data
    socket.emit('connected');
    console.log("Device connected");
});


var studentmodules = []; //empty array for student modules
//var moduleArray = [];
//var values = [];

function init() {

	//get all of the current data from server/json 
    socket.on('getArray', function(data){

    	var objectString = ""; //initialize module type string
      	studentmodules = data;
      
      	
      	for (var i = 0; i < studentmodules.length; i++) {

			var type = studentmodules[i].type;
			var title = studentmodules[i].title;
			var startvalue = studentmodules[i].startvalue;
			var endvalue = studentmodules[i].endvalue;
			var option1 = studentmodules[i].option1;
			var option2 = studentmodules[i].option2;
	      	
		    if ((type == "Slider") && (startvalue) && (endvalue)){ 
				objectString = '<input id="' + i + '" class="mdl-slider mdl-js-slider" type="range" min="' +  startvalue + '" max="' +  endvalue + '" value="0" tabindex="0">'
			}

			else if (type == "Slider") {
				objectString = '<input id="' + i + '" class="mdl-slider mdl-js-slider" type="range" min="0" max="10" value="5" tabindex="0">'
			}

			else if ((type == "Button") && (option1) && (option2)) {
				objectString = '<button id="' + i + '" class="ui toggle button active">' + option1 + '</button>'
			}

			else {
				console.log("an invalid combination of parameters in the teacher's form were mistakenly sent to the server");
				return
			}

			//+= will add to the html div, not replace
			document.getElementById('modules-container').innerHTML += ('<div class="module"><h3 class="ui header">' + title + '</h3>' + '<div class="module-container">' + objectString + '</div></div>');
			
			/*var trigger = document.getElementById(i);
			moduleArray.push(trigger);*/
			
		} //end of for

		componentHandler.upgradeDom();

    });

	//somebody subitted a word and the array was updated
	socket.on('allModules', function(data){

	    //override words array with new data
	    var objectString = ""; //module type string
	    modules = data; //this is an array of objects - override modules array with updated data
	    var endIndex = modules.length-1
	    var end = modules[endIndex] //identifies last element of the array
	    //console.log('received new array' + modules)

	    var type = end.type
		var title = end.title
		var startvalue = end.startvalue
		var endvalue = end.endvalue
		var option1 = end.option1
		var option2 = end.option2
	     	
	    if ((type == "Slider") && (startvalue) && (endvalue)){ 
			objectString = '<input id="' + endIndex + '"class="mdl-slider mdl-js-slider" type="range" min="' +  startvalue + '" max="' +  endvalue + '" value="0" tabindex="0">'
		}

		else if (type == "Slider") {
			objectString = '<input id="' + endIndex + '"class="mdl-slider mdl-js-slider" type="range" min="0" max="10" value="5" tabindex="0">'
		}

		else if ((type == "Button") && (option1) && (option2)) {
			objectString = '<button id="' + endIndex + '"class="ui toggle button active">' + option1 + '</button>'
		}

		else {
			console.log("an invalid combination of parameters in the teacher's form were mistakenly sent to the server");
			return
		}

		//+= will add to the html div, not replace
		document.getElementById('modules-container').innerHTML += ('<div class="module"><h3 class="ui header">' + title + '</h3>' + '<div class="module-container">' + objectString + '</div></div>');

		componentHandler.upgradeDom();
	});
}

/*checkModules();

function checkModules(){

	for (var i = 0; i < moduleArray.length; i++) {
		var k = document.getElementById(i);
		values[i] = k.value;
	}

	socket.emit('moduleDataChanged', 
	{
		'data': values
	});

	console.log(values);
}

function draw() {
	checkModules();
}*/


// add event listener to detect when the page loaded
window.addEventListener("load", init);