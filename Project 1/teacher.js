/// SOCKET STUFF
var socket = io.connect();

socket.on('connect', function() {
    //whenever someone connects, they request data
    //socket.emit('connected');
    console.log("Device connected");
});

/*var values = [];
var mywords = []; //empty array for words*/

// put all javascript in the init function 
function init() {

	// form for teacher's purposes
	var formbutton = document.getElementById('formbutton'); //hide/show module options
	var form = document.getElementById('form'); //add module form
	var submitbutton = document.getElementById('submit'); //submit module specifications

	submitbutton.addEventListener("click", addModule);
	formbutton.addEventListener("click", showAndHideForm);

	/*socket.on('studentData', function(data){
		console.log(data);
		values = data;
	});*/
	
	function addModule() {

		//passed to student
		var type = document.getElementById('moduletype').value; //type entered
		var title = document.getElementById('moduletitle').value; //title entered
		var startvalue = document.getElementById('startvalue').value; //slider
		var endvalue = document.getElementById('endvalue').value; //slider
		var option1 = document.getElementById('option1').value; //button toggle
		var option2 = document.getElementById('option2').value; //button toggle

		//send data to server
		if (((type == "Slider") && (title)) || ((type == "Button") && (option1) && (option2))) {
			showAndHideFormMessage("success");
			socket.emit('dataEntered', 
			{
				'type': type,
				'title': title,
				'startvalue': startvalue,
				'endvalue': endvalue,
				'option1': option1,
				'option2': option2
			});
		}
		else {
			showAndHideFormMessage("fail");
			console.log("data not entered correctly")
		}
	}

	function showAndHideForm() {
		/*Hide and Show Editing Options*/
		if (form.style.display == "none") {
			form.style.display = "block";
			formbutton.innerHTML = '<i class="chevron up icon"></i> Hide Module Editing Options';
		}
		else {
			form.style.display = "none";
			formbutton.innerHTML = '<i class="chevron down icon"></i> Show Module Editing Options';
		}
	}

	function showAndHideFormMessage(status){
		var formMessage = document.getElementById('formMessage');
		if (status == "success") {
			formMessage.innerHTML = '<div class="ui success message"><div class="header">Form Completed</div><p>Students can now provide feedback on this newly created module.</p></div>';
		}
		else {
			formMessage.innerHTML = '<div class="ui error message"><div class="header">Action Forbidden</div><p>Please fill in all the necessary fields.</p>';
		}
	}
	
	/*//get all of the current data from server/json 
    socket.on('getArray', function(data){

    	var objectString = ""; //module type string
      	mywords = data;
      
      	
      	for (var i = 0; i < mywords.length; i++) {

			var type = mywords[i].type;
			var title = mywords[i].title;
			var startvalue = mywords[i].startvalue;
			var endvalue = mywords[i].endvalue;
			var option1 = mywords[i].option1;
			var option2 = mywords[i].option2;
	      	
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
				console.log("error sending data");
				return
			}

			//+= will add to the html div, not replace
			document.getElementById('modules').innerHTML += ('<div class="module"> <h3 class="ui header">' + title + '</h3>' + '<div class="module-container">' + objectString + '</div></div>');
			
			
		} //end of for

		componentHandler.upgradeDom();

    });

	//somebody subitted a word and the array was updated
	socket.on('allWords', function(data){

	    //override words array with new data
	    var objectString = ""; //module type string
	    words = data; //this is an array of objects
	    var end = words[words.length-1] //identifies end of array
	    //console.log('received new array' + modules)

	    var type = end.type
		var title = end.title
		var startvalue = end.startvalue
		var endvalue = end.endvalue
		var option1 = end.option1
		var option2 = end.option2
	     	
	    if ((type == "Slider") && (startvalue) && (endvalue)){ 
			objectString = '<input class="mdl-slider mdl-js-slider" type="range" min="' +  startvalue + '" max="' +  endvalue + '" value="0" tabindex="0">'
		}

		else if (type == "Slider") {
			objectString = '<input class="mdl-slider mdl-js-slider" type="range" min="0" max="10" value="5" tabindex="0">'
		}

		else if ((type == "Button") && (option1) && (option2)) {
			objectString = '<button class="ui toggle button active">' + option1 + '</button>'
		}

		else {
			console.log("error sending data");
			return
		}

		//+= will add to the html div, not replace
		document.getElementById('modules').innerHTML += ('<div class="module"> <h3 class="ui header">' + title + '</h3>' + objectString);

	});*/
	
}

/*function checkModules(){

	for (var i = 0; i < values.length; i++) {
		var k = document.getElementById(i);
		k.value = values[i];
	}

	console.log(values);
}

function draw() {
	checkModules();
}*/

// add event listener to detect when the page loaded
window.addEventListener("load", init);