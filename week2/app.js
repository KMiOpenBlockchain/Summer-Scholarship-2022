/*********************************************************************************
* The MIT License (MIT)                                                          *
*                                                                                *
* Copyright (c) 2022 KMi, The Open University UK                                 *
*                                                                                *
* Permission is hereby granted, free of charge, to any person obtaining          *
* a copy of this software and associated documentation files (the "Software"),   *
* to deal in the Software without restriction, including without limitation      *
* the rights to use, copy, modify, merge, publish, distribute, sublicense,       *
* and/or sell copies of the Software, and to permit persons to whom the Software *
* is furnished to do so, subject to the following conditions:                    *
*                                                                                *
* The above copyright notice and this permission notice shall be included in     *
* all copies or substantial portions of the Software.                            *
*                                                                                *
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR     *
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,       *
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL        *
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER     *
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  *
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN      *
* THE SOFTWARE.                                                                  *
*                                                                                *
**********************************************************************************/

const STORE_NAME = 'TikTokFileHashes';


/**
 * Initialise page - load any stored data from browser storage.
 */
function initApp() {

	/** load any stored hashes onto the screen **/
	if (window.localStorage.getItem(STORE_NAME)) {
		loadStoredData();
	} else {
		// setup an empty hash store
		window.localStorage.setItem(STORE_NAME, '[]');
	}
}

/**
 * Load a TikTok movie file and hash it
 */
function hashFile() {
	var filefield = document.getElementById('movieFile');
	if (filefield) {
		var file = filefield.files[0];
		if (file) {
			var reader = new FileReader();

			reader.addEventListener("load", async () => {
				let stringToHash = reader.result;
				const result = ethers.utils.hashMessage(stringToHash);
				document.getElementById('fileHash').value = result;
				document.getElementById("hashName").value = file.name;
			}, false);

			reader.addEventListener('error', () => {
				console.error(`Error occurred reading file: ${file.name}`);
			});

			reader.readAsBinaryString(file);
		} else {
			alert("Please select a file first");
		}
	} else {
		alert("Please select a file first");
	}
}

/*** LOCAL DATA STORAGE FUNCTIONS ***/

/**
 * Load any previously stored local data
 */
function loadStoredData() {

	var storedDataTable = document.getElementById("storedDataTable");
	// empty any old data on screen
	storedDataTable.innerHTML = "";

	var dataDetailsArray = JSON.parse(window.localStorage.getItem(STORE_NAME));
	if (!dataDetailsArray) {
		dataDetailsArray = [];
	}

	var count = dataDetailsArray.length;
	for (var i=0; i<count; i++) {
		var next = dataDetailsArray[i];

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = storedDataTable.insertRow(i);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var dateColumn = row.insertCell(0);
		var nameColumn = row.insertCell(1);
		var hashColumn = row.insertCell(2);

		// Add some text to the new cells:
		dateColumn.innerHTML = (new Date(next.date)).toLocaleDateString('en-GB')+" - "+(new Date(next.date)).toLocaleTimeString('en-GB');
		nameColumn.innerHTML = next.name;
		hashColumn.innerHTML = next.hash;
	}

}

/**
 * Clear Store
 */
function clearDataStore() {
	if (window.confirm("Do you really want to delete all your stored data?")) {
	  	window.localStorage.setItem(STORE_NAME, '[]');
	  	loadStoredData();
	}
}

/**
 * Store current hash details
 */
function storeData() {

	// Get the input to store
	var hash = 	document.getElementById("fileHash").value;
	if (hash == "") {
		alert("Please hash a file first");
		return;
	}

	var name = 	document.getElementById("hashName").value;
	name = name.trim();
	if (name == "") {
		alert("Please give your hash a name you can recognise later");
		return;
	}

	// Store the details into the Browser local storage
	if (!window.localStorage.getItem(STORE_NAME)) {
		window.localStorage.setItem(STORE_NAME, []);
	}

	const dataDetailsArray = JSON.parse(window.localStorage.getItem(STORE_NAME));
	let newItem = {};
	newItem.date = new Date().getTime();
	newItem.name = name;
	newItem.hash = hash;
	dataDetailsArray.push(newItem);

	window.localStorage.setItem(STORE_NAME, JSON.stringify(dataDetailsArray));

	// clear fields for next go
	document.getElementById('fileHash').value = "";
	document.getElementById("hashName").value = "";
	document.getElementById("movieFile").value = "";

	// reload stored data so new entry appears on screen
	loadStoredData();
}
