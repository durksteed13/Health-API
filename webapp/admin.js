// admin functionality
// all get and loading functions
async function getAPIs() {
	const result = await axios({
        method: 'get',
       	url: "http://localhost:3000/adminapi",
	});
	return result.data;
}

async function loadAPIparams() {
	const result = await axios({
        method: 'get',
       	url: "http://localhost:3000/adminparam",
	});
	return result.data;
}

async function loadAPIs() {
	let listofapi = await getAPIs();
	let htmltoadd = '';
	for(let i = 0; i < listofapi.length; i++) {
		htmltoadd += `<option value="${listofapi[i].id}">${listofapi[i].name}</option>`;
	}
	$('.apilist').append(htmltoadd);
}

async function loadAPIparameters() {
	let listofparam = await loadAPIparams();
	let htmltoadd = '';
	for(let i = 0; i < listofparam.length; i++) {
		htmltoadd += `<option value="${listofparam[i].id}">${listofparam[i].api_used} | ${listofparam[i].param} (${listofparam[i].name})</option>`;
	}
	$('.paramlist').append(htmltoadd);
}

// all handler functions

async function handleAdminNewApi() { // add new api
	let name = $('#apiName').val();
	let url = $('#apiURL').val();
	buildNewAPIForm(event);
	const result = await axios({
        method: 'post',
		url: "http://localhost:3000/adminapi",
		data: {
			name: name,
			url: url
		  }   
	});
}

async function handleAdminNewApiParameter() { // add new parameters
	let api_used = $( "#selectedAPIparam option:selected" ).text();
	let param = $('#apiParameter').val()
	let name = $('#apiParametername').val()
	buildNewParam(event);
	const result = await axios({
        method: 'post',
		url: "http://localhost:3000/adminparam",
		data: {
			api_used: api_used,
			param: param,
			name: name
		  }   
	});
	
}

async function handleDeleteAPI() { // deletes all APIs and it's corresponding parameters
	let apiname = $( "#apitodelete option:selected" ).text();
	const result = await axios({
        method: 'delete',
		url: `http://localhost:3000/adminapi/${apiname}`,
	});
	buildDeleteAPI(event);
}

async function handleDeleteParam() { // deletes specific parameter
	let paramname = $( "#paramtodelete" ).val();
	const result = await axios({
        method: 'delete',
		url: `http://localhost:3000/adminparam/${paramname}`,
	});
	buildDeleteParam(event);
}

// load and display api functionalities
function buildCurrentAPIForm(event) {
	setDefaultColor();
	$(".apiHandler").html(`<div>
	<div class='selection-container'>Current APIs</div>
	<select id="list-api" class="apilist" multiple="multiple">
	</select>
</div>`);
loadAPIs();
	setCurrentTabColor(event.currentTarget);
}

function buildNewAPIForm(event) {
	setDefaultColor();
	$(".apiHandler").html(`<div>
	<div class='selection-container'>Add New API</div>
	<form>
		<input type="text" id="apiName" name="apiName" style="margin: auto;" placeholder="API Name" autocomplete="off"><br>
		<input type="text" id="apiURL" name="apiURL" style="margin: auto;" placeholder="API URL" autocomplete="off"><br>
		<input type="button" value="Submit" class="green-dark is-large" id="admin-api-submit"
			onclick="handleAdminNewApi()" style="margin: auto;">
	</form>
</div>`);
setCurrentTabColor(event.currentTarget);
}

function buildNewParam(event) {
	setDefaultColor();
	$(".apiHandler").html(`<div>
	<div class='selection-container'>Add New API Parameter</div>
	<select class="apilist" id="selectedAPIparam">
	<option value="" disabled selected>Select an API</option>
	</select>
	<input type="text" id="apiParameter" name="apiParameter" style="margin: auto;" placeholder="API Parameter"><br>
	<input type="text" id="apiParametername" name="apiParametername" style="margin: auto;" placeholder="API Name"><br>
	<input type="submit" value="Submit" class="green-dark is-large" id="admin-apiparam-submit"
		onclick="handleAdminNewApiParameter()" style="margin: auto;">
</div>`);
loadAPIs();
setCurrentTabColor(event.currentTarget);
}

function buildDeleteAPI(event) {
	setDefaultColor();
	$(".apiHandler").html(`<div>
	<div class='selection-container'>Delete API and Parameters</div>
	<select class="apilist" id="apitodelete">
	<option value="" disabled selected>Select an API</option>
	</select>
	<input type="submit" value="Delete" class="red-light is-large" id="apidelete" onclick="handleDeleteAPI()"
		style="margin: auto;">
</div>`);
loadAPIs();
setCurrentTabColor(event.currentTarget);
}

function buildDeleteParam(event) {
	setDefaultColor();
	$(".apiHandler").html(`<div>
	<div class='selection-container'>Delete API Parameter</div>
	<select class="paramlist" id="paramtodelete">
	<option value="" disabled selected>Select a Parameter</option>
	</select>
	<input type="submit" value="Delete" class="red-light is-large" id="paramdelete"
		onclick="handleDeleteParam()" style="margin: auto;">
</div>`);
loadAPIparameters();
setCurrentTabColor(event.currentTarget);
}

// Set colors
function setDefaultColor() {
	$('.adminNavButton').css('background-color', '#EF2F5F');
}

function setCurrentTabColor(targetToChange) {
	$(targetToChange).css('background-color', '#F24C75');

}

$(document).ready(function() {
	var role = localStorage.getItem('role');
	if(role == 1) {
		$('body').css("visibility", "visible");
	} else {
		window.location.replace("index.html");
	}
	$('#nav-id').append("<button class='red-dark btn adminid' onclick='' style='margin-left: 10px;'>Admin Panel</button>");
	loadAPIs();
	loadAPIparameters();
	$('#first-selection').click();
});