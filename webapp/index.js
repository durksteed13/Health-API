var loginForm = "<div class='card-dynamic' style='height: 350px; max-height: 350px;'><div class='card-title red-light'><h2 class='is-indent-max'>Login</h2><button onclick='closePopup()' class='is-light red-light is-right-indent no-hover'>X</button></div><div class='message-container red-light'></div><div class='card-content'><form class='popup-form' method='post'><input required name='username' type='username' placeholder='username' class='red-light'><input required name='password' type='password' placeholder='password' class='red-light'><div id='btn-wrapper'><button type='button' id='btn-popup' class='red-dark is-large' onclick='handleLogIn()'>Login</button></div></form></div></div>";
var signupForm = "<div class='card-dynamic-tall' style='height: 475px; max-height: 475px;'><div class='card-title red-light'><h2 class='is-indent-max'>Sign Up</h2><button onclick='closePopup()' class='is-light red-light is-right-indent no-hover'>X</button></div><div class='message-container red-light'></div><div class='card-content'><form class='popup-form'><input required name='name' type='name' placeholder='name' class='red-light' method='post'><input required name='email' type='email' placeholder='email address' class='red-light'><input required name='username' type='username' placeholder='username' class='red-light'><input required name='password' type='password' placeholder='password' class='red-light'><div id='btn-wrapper'><button type='button' id='btn-popup' class='red-dark is-large' onclick='handleSignUp()'>Sign Up</button></div></form></div></div>";

function signUpForm() {
	$(".popup-display").append(signupForm);
	$(".popup-display").css("height", "100%");
	$(".popup-overlay").css("height", "100%");
	$('.message-container').prepend("<div class='red-light'>Please fill all the inputs to create and account. Thank you for chosing HealthAPI!<div>");
}

function loadLoginForm() {
	$(".popup-display").append(loginForm);
	$(".popup-display").css("height", "100%");
	$(".popup-overlay").css("height", "100%");
	$('.message-container').prepend("<div class='red-light'>Please enter your username and password<div>");
}

async function handleSignUp() {
	$('.message-container').empty();
	data = $('.popup-form').serializeArray();
	if(data[0]['value'] === "" || data[1]['value'] === "" || data[2]['value'] === "" || data[3]['value'] === "") {
		$('.message-container').prepend("<div class='red-light'>All fields are required, please fill every input<div>");
		return false;
	}
	if(!(data[1]['value'].includes('@'))) {
		$('.message-container').prepend("<div class='red-light'>Please enter a valid email<div>");
		return false;
	}
	var insertUserName = data[2]['value'];
	const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: {
          username : insertUserName,
          name : data[0]['value'],
          email : data[1]['value'],
          password : data[3]['value']
        },
      });
	var success = result['data']['success'];
	console.log(success);
	if(success) {
		//append cookie and redirect
		document.cookie = "username="+insertUserName;
		location.reload();
	} else {
		$('.message-container').prepend("<div class='red-light'>Username already taken, please try another username<div>");
	}
}

async function handleLogIn() {
	$('.message-container').empty();
	data = $('.popup-form').serializeArray();
	var insertUserName = data[0]['value'];
	if(insertUserName === "" || data[1]['value'] === "") {
		$('.message-container').prepend("<div class='red-light'>All fields are required, please fill every input<div>");
		return false;
	}
	const result = await axios({
        method: 'post',
       	url: "http://localhost:3000/users/"+insertUserName,
       	data: {
       		username : insertUserName,
       		password : data[1]['value']
       	},
    });
	var success = result['data']['success'];
	if(success) {
		//append cookie and redirect
		document.cookie = "username="+insertUserName;
		location.reload();
	} else {
		$('.message-container').prepend("<div class='red-light'>Invalid username or password, please try again<div>");
	}
}

function handleLogOut() {
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	location.reload();
}

function checkLogIn() {
	if(document.cookie.includes("username")) {
		$(".btn").remove();
		$("#sign-up-link").remove();
	} else {
		$(".user-btn").remove();
	}
}

async function loadAPI() {
	const result = await axios({
        method: 'get',
       	url: "http://localhost:3000/api",
    });
    result['data'].forEach(api => {
    	var apiName = api['name'];
    	$('#api-selector').append("<option value='"+apiName+"'>"+apiName+"</option>");
    });
}

$('#api-selector').change(async function () {
	$('#param-selector').empty();
	$('#param-selector').removeClass("is-disabled");
  	var selected = $('#api-selector option:selected' ).text();
  	const result = await axios({
        method: 'post',
       	url: "http://localhost:3000/api",
       	data: {
       		api : selected
       	}
    });
    // $('#param-selector').append("<option value='' disabled selected>Select API Search Parameters</option>");
  	result['data'].forEach(param => {
  		var paramName = param['name'];
  		$('#param-selector').append("<option value='"+paramName+"'>"+paramName+"</option>");
  	});
});

async function handleAPISubmit() {
	$('#data-container').empty();
	var selectedAPI = $('#api-selector option:selected' ).text();
	var selectedParam = $('#param-selector option:selected' ).text();
	const result = await axios({
        method: 'get',
       	url: "http://localhost:3000/apilink",
       	params: {
       		apiName : selectedAPI,
       		paramName : selectedParam
       	}
    });
    const APIResult = await axios({
        method: 'get',
       	url: result['data']
    });
   	$('#data-container').append(JSON.stringify(APIResult['data']));
}

$(document).ready(function() {
	checkLogIn();
	loadAPI();
});