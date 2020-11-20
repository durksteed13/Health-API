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
	buildNewAPIForm();
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
	buildNewParam();
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
	buildDeleteAPI();
}

async function handleDeleteParam() { // deletes specific parameter
	let paramname = $( "#paramtodelete" ).val();
	const result = await axios({
        method: 'delete',
		url: `http://localhost:3000/adminparam/${paramname}`,
	});
	buildDeleteParam();
}

// load and display api functionalities
function buildCurrentAPIForm() {
	$(".apiHandler").html(`<div>
	<h1>Current APIs</h1>
	<select class="apilist" multiple="multiple">
	</select>
</div>`);
loadAPIs();
}

function buildNewAPIForm() {
	$(".apiHandler").html(`<div>
	<h1>Add New API</h1>
	<form>
		<label for="apiName">API Name</label><br>
		<input type="text" id="apiName" name="apiName" style="margin: auto;"><br>
		<label for="apiURL">API URL</label><br>
		<input type="text" id="apiURL" name="apiURL" style="margin: auto;"><br><br>
		<input type="button" value="Submit" class="green-dark is-large" id="admin-api-submit"
			onclick="handleAdminNewApi()" style="margin: auto;">
		<!-- setting type to button instead of submit fixes axios problem -->
	</form>
</div>`);
}

function buildNewParam() {
	$(".apiHandler").html(`<div>
	<h1>Add New API Parameter</h1>
	<select class="apilist" id="selectedAPIparam">
	</select>
	<label for="apiParameter">API Parameter</label><br>
	<input type="text" id="apiParameter" name="apiParameter" style="margin: auto;"><br>
	<label for="apiParametername">API name</label><br>
	<input type="text" id="apiParametername" name="apiParametername" style="margin: auto;"><br><br>
	<input type="submit" value="Submit" class="green-dark is-large" id="admin-apiparam-submit"
		onclick="handleAdminNewApiParameter()" style="margin: auto;">
</div>`);
loadAPIs();
}

function buildDeleteAPI() {
	$(".apiHandler").html(`<div>
	<h1>Delete API and it's parameters</h1>
	<select class="apilist" id="apitodelete">
	</select>
	<input type="submit" value="Delete" class="red-light is-large" id="apidelete" onclick="handleDeleteAPI()"
		style="margin: auto;">
</div>`);
loadAPIs();
}

function buildDeleteParam() {
	$(".apiHandler").html(`<div>
	<h1>Delete an API parameter</h1>
	<select class="paramlist" id="paramtodelete">
	</select>
	<input type="submit" value="Delete" class="red-light is-large" id="paramdelete"
		onclick="handleDeleteParam()" style="margin: auto;">
</div>`);
loadAPIparameters();
}

$(document).ready(function() {
	loadAPIs();
	loadAPIparameters();
	var role = localStorage.getItem('role');
	if(role == 1) {
		$('body').css("visibility", "visible");
	} else {
		window.location.replace("index.html");
	}
});