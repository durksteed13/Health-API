var loginForm = "<div class='card-dynamic' style='height: 350px; max-height: 350px;'><div class='card-title red-light'><h2 class='is-indent-max'>Login</h2><button onclick='closePopup()' class='is-light red-light is-right-indent no-hover'>X</button></div><div class='message-container red-light'></div><div class='card-content'><form class='popup-form' method='post'><input required name='username' type='username' placeholder='username' class='red-light'><input required name='password' type='password' placeholder='password' class='red-light'><div id='btn-wrapper'><button type='button' id='btn-popup' class='red-dark is-large' onclick='handleLogIn()'>Login</button></div></form></div></div>";
var signupForm = "<div class='card-dynamic-tall' style='height: 475px; max-height: 475px;'><div class='card-title red-light'><h2 class='is-indent-max'>Sign Up</h2><button onclick='closePopup()' class='is-light red-light is-right-indent no-hover'>X</button></div><div class='message-container red-light'></div><div class='card-content'><form class='popup-form'><input required name='name' type='name' placeholder='name' class='red-light' method='post'><input required name='email' type='email' placeholder='email address' class='red-light'><input required name='username' type='username' placeholder='username' class='red-light'><input required name='password' type='password' placeholder='password' class='red-light'><div id='btn-wrapper'><button type='button' id='btn-popup' class='red-dark is-large' onclick='handleSignUp()'>Sign Up</button></div></form></div></div>";
var apis = [];
var saved = 0;

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
        url: '/users',
        data: {
          username : insertUserName,
          name : data[0]['value'],
          email : data[1]['value'],
          password : data[3]['value']
        },
      });
	var success = result['data']['success'];
    if(success) {
    	localStorage.setItem('needs', "login");
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
       	url: "/users/"+insertUserName,
       	data: {
       		username : insertUserName,
       		password : data[1]['value']
       	},
    });

    var success = result['data']['success'];
    if(success) {
    	var username = result['data']['result'][0]['username'];
    	var userID = result['data']['result'][0]['id'];
    	var role = result['data']['result'][0]['role'];
    	var name = result['data']['result'][0]['name'];

    	localStorage.setItem('loggedIn', true);
    	localStorage.setItem('username', username);
    	localStorage.setItem('id', userID);
    	localStorage.setItem('role', role);
    	localStorage.setItem('name', name);
    	location.reload();
    } else {
    	$('.message-container').prepend("<div class='red-light'>Invalid username or password, please try again<div>");
    }
}

function handleLogOut() {
	localStorage.clear();
	location.reload();
}

function checkLogIn() {
	if(localStorage.getItem('loggedIn')) {
		$(".btn").remove();
		$("#sign-up-link").remove();
		// $('#welcome').append("Welcome back, " + localStorage.getItem('name') + "!");
		var role = localStorage.getItem('role');
		loadSearches();
		if(role == 1) {
			$('#landing-navigation-container').append("<a href='admin'><button id='btn-log' class='is-light red-light user-btn' onclick=''>Admin Page</button></a>");
		}
	} else {
		$(".user-btn").remove();
		$('#welcome').remove();
	}
}

async function loadAPI() {
	const result = await axios({
        method: 'get',
       	url: "/api",
    });
    result['data'].forEach(api => {
    	apis.push(api['name']);
    	var apiName = api['name'];
    	$('#api-selector').append("<option value='"+apiName+"'>"+apiName+"</option>");
    });
}

async function saveSearch() {
	var selectedAPI = $('#api-selector option:selected' ).text();
	var selectedParam = $('#param-selector option:selected' ).text();
	const result = await axios({
        method: 'post',
       	url: "/usersStore/"+localStorage.getItem('id'),
       	data: {
       		userID : localStorage.getItem('id'),
       		apiName : selectedAPI,
       		paramName : selectedParam
       	}
    });
    loadSearches();
    loadSaved();
    $('save-option').empty();
}

$('#api-selector').change(async function () {
	$('#param-selector').empty();
	$('#param-selector').removeClass("is-disabled");
  	var selected = $('#api-selector option:selected' ).text();
  	const result = await axios({
        method: 'post',
       	url: "/api",
       	data: {
       		api : selected
       	}
    });
    // $('#param-selector').append("<option value='' disabled selected>Select API Search Parameters</option>");
  	result['data'].forEach(param => {
  		var paramName = param['name'];
  		$('#param-selector').append("<option value='"+paramName+"'>"+paramName+"</option>");
  	});
  	if(localStorage.getItem('loggedIn')) {
		$('#savebutton-container').empty();
  		$('#savebutton-container').append("<div id='save-option' class='is-blue' onclick='saveSearch()'>Save This Search</div>");
  	}
});

async function handleAPISubmit() {
	$('#data-container').empty();
	$('#data-search').empty();
	var selectedAPI = $('#api-selector option:selected' ).text();
	var selectedParam = $('#param-selector option:selected' ).text();
	$('#data-search').append("Data from " + selectedAPI + ", " + selectedParam);
	const result = await axios({
        method: 'get',
       	url: "/apilink",
       	params: {
       		apiName : selectedAPI,
       		paramName : selectedParam
       	}
    });
    const APIResult = await axios({
        method: 'get',
       	url: result['data']
    });
   	$('#data-container').append(JSON.stringify(APIResult['data'], undefined, 2));
}

async function handleSearchSubmit(url, selectedAPI, selectedParam) {
	$('#data-container').empty();
	$('#data-search').empty();
	$('#data-search').empty();
	$('#data-search').append("Data from " + selectedAPI + ", " + selectedParam);
	const APIResult = await axios({
        method: 'get',
       	url: url
    });
   	$('#data-container').append(JSON.stringify(APIResult['data'], undefined, 2));
}

async function handleSearchDelete(id) {
	const APIResult = await axios({
        method: 'delete',
       	url: "/usersSearchesDelete/"+id,
       	data : {
       		searchID: id
       	}
    });
    loadSearches();
    loadSaved();
}

async function loadSearches() {
	$('#saves').empty();
	const result = await axios({
        method: 'post',
       	url: "/usersSearches/" + localStorage.getItem('id'),
       	data: {
       		userID : localStorage.getItem('id')
       	}
    });
    saved = result['data'].length;
    result['data'].forEach(search => {
    	var api = search['api'];
    	var param = search['param'];
    	var url = search['url'];
    	var id = search['id'];
    	$('#saves').append(`<div class='search-option'><div class='search-option-desc'>`+param+` from `+api+`</div><div class='search-btn' onclick='handleSearchSubmit("`+url+`", "`+api+`", "`+param+`")'>Get Data</div><div class='search-delete-btn' onclick='handleSearchDelete(`+id+`)'>x</div><div>`);
    });
}

function loadSelect() {
	$('#landing-wrapper').css('height', '185px');
	$('#search-container').css("visibility", "visible");
	$('#search-container').css("height", "auto");
	$('#search-container').css("overflow", "normal");
	$('#save-container').css("visibility", "hidden");
	$('#save-container').css("height", "1px");

	$("#btn-log-save").removeClass("red-dark");
	$("#btn-log-save").addClass("red-light");
	$("#btn-log-save").addClass("is-light");

	$("#btn-log-select").addClass("red-dark");
	$("#btn-log-select").addClass("red-light");
	$("#btn-log-select").removeClass("is-light");
}

function loadSaved() {
	if(saved > 3) {
    	$('#landing-wrapper').css('height', 'auto');
    }
	$('#search-container').css("visibility", "hidden");
	$('#search-container').css("height", "1px");
	$('#save-container').css("visibility", "visible");
	$('#save-container').css("height", "auto");
	$('#save-container').css("overflow", "normal");
	$("#btn-log-select").removeClass("red-dark");
	$("#btn-log-select").addClass("red-light");
	$("#btn-log-select").addClass("is-light");

	$("#btn-log-save").addClass("red-dark");
	$("#btn-log-save").addClass("red-light");
	$("#btn-log-save").removeClass("is-light");
}

$(document).ready(function() {
	checkLogIn();
	loadAPI();
	if(localStorage.getItem('needs') === 'login') {
		localStorage.clear();
		$('#btn-log').click();
	}
});