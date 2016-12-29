/*
 * PokemonApp.js 
 * Logic for PokemonApp
 */

//---------------- FUNCTIONS FOR GETTING THE DATA --------------------

//Given an id (number or name) make the proper URL for the Pokemon API
function constructPokeURL(id) {
	var url;
	
	url = "http://pokeapi.co/api/v2/pokemon/" + id + "/";
	
	return url;
}

// Use the pokemon API to get data about a given pokemon
function makePokemonRequest(url) {
	// Given a URL, make an http request to get Pokemon data

	var request, data, name, img_url;
	
	document.getElementById("data_message").innerHTML = "Retrieving data...";

	request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onload = function() {
		var data = JSON.parse(request.responseText);
		var pokemonData = {
			name: data.name, 
			img: data.sprites.front_default,
			weight: data.weight,
			hitpoints: data.stats[5].base_stat,
			speed: data.stats[0].base_stat,
			attack: data.stats[4].base_stat,
			defense: data.stats[3].base_stat,
			abilities: data.abilities
			};
		
		document.getElementById("data_message").innerHTML = "";
		updateDataAndImage(pokemonData);
	}
	request.send();
}

// Get the data about the pokemon then update the display
function getPokemonData() {
	var pokemonSelection, id;
	var url, pokemonData;
	
	//Get the pokemon name from drop-down menu and set ID
	pokemonSelection = document.getElementById("info-selection").value;
	if(pokemonSelection === "random") {
		// There are approx 700 different pokemon characters
		id = generateRandomNumber(1, 700); 
	} else {
		id = pokemonSelection;
	}

	// Construct the data URL and make the http request to get Pokemon data
	url = constructPokeURL(id);
	makePokemonRequest(url);
}

//---------------- FUNCTIONS FOR CHANGING WEB PAGE ---------------------


// Updates the display and the image of the Pokemon
function updateDataAndImage(data) {
	// Update the image
	document.getElementById("app-body-right-img").src = data.img;
	console.log
	// Update each of the items
	document.getElementById("info-name").innerHTML = capitalize(data.name);	
	document.getElementById("info-hitpoints").innerHTML = data.hitpoints;
	document.getElementById("info-weight").innerHTML = data.weight;
	document.getElementById("info-speed").innerHTML = data.speed;
	document.getElementById("info-attack").innerHTML = data.attack;
	document.getElementById("info-defense").innerHTML = data.defense;
	// Update the abilities list
	if(data.abilities) { // Check to see if abilities exist
		// Clear the current items in the ability list
		var abilityList = document.getElementById("ability-list");
		abilityList.innerHTML = "";
		// Loop over each of the abilities in the abilities array and add to list
		for(var i=0; i < data.abilities.length; i++) {
			var listItem = document.createElement("li");
			var listText =
			 	document.createTextNode(
			 		capitalize(data.abilities[i].ability.name)
			 	);
			listItem.appendChild(listText);	
			abilityList.appendChild(listItem);
		}
	}
	hideDisplays();
}



// A function to hide the information of unchecked items
function hideDisplays() {
	var hitpoints = document.getElementById("div-hitpoints");
	var weight = document.getElementById("div-weight");
	var speed = document.getElementById("div-speed");
	var attack = document.getElementById("div-attack");
	var defense = document.getElementById("div-defense");
	var abilities = document.getElementById("div-ability");
	
	
	if(document.getElementById("check-hitpoints").checked) {
	  hitpoints.className = "info-div";
	} else {
	  hitpoints.className = "hidden";
	}
	
	if(document.getElementById("check-weight").checked) {
	  weight.className = "info-div";
	} else {
	  weight.className = "hidden";
	}
	
	if(document.getElementById("check-speed").checked) {
	  speed.className = "info-div";
	} else {
	  speed.className = "hidden";
	}
	
	if(document.getElementById("check-attack").checked) {
	  attack.className = "info-div";
	} else {
	  attack.className = "hidden";
	}
	
	if(document.getElementById("check-defense").checked) {
	  defense.className = "info-div";
	} else {
	  defense.className = "hidden";
	}
	
	if(document.getElementById("check-abilities").checked) {
	  abilities.className = "info-div";
	} else {
	  abilities.className = "hidden";
	}
}

//---------------- UTILITY FUNCTIONS ---------------------

//Utility function to generate a random number
function generateRandomNumber(min, max) {
	return  Math.floor((max-min+1) * Math.random()) + min;
}

// A utility function to help capitalize the first letter of a word
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


