var fs = require("fs");

var dataUnparsed  = fs.readFileSync("voyages_with_people.json", {encoding: "utf8"});
data = JSON.parse(dataUnparsed);

var mutatedData = [];

for (var i = 0; i < data.length; i++){
	
	// Checking for equal ID's
	var j = 0;
	var people = {};
	var idIsEqual = true;
	while (idIsEqual == true ) {
		if (data[i].Number == data[(i+j)].Number) {

			var onbcategory = data[(i+j)].onbcategory;

			if (onbcategory != "") {

				people[onbcategory] = {I: "", II: "", III: "", IV: "", V: "", VI: ""};

				people[onbcategory].I = data[(i+j)].I;
				people[onbcategory].II = data[(i+j)].II;
				people[onbcategory].III = data[(i+j)].III;
				people[onbcategory].IV = data[(i+j)].IV;
				people[onbcategory].V = data[(i+j)].V;
				people[onbcategory].VI = data[(i+j)].VI;
			}

			j++;
		} else {
			idIsEqual = false;
		}
	}

	var tempData = {};

	var keys = Object.keys(data[i]);
	var declineKeys = {
		"onbcategory": "onbcategory",
		"I": "I",
		"II": "II",
		"III": "III",
		"IV": "IV",
		"V": "V",
		"VI": "VI"
	}

	for (var k = 0; k < keys.length; k++){
		var currentKey = keys[k];
		if(currentKey != declineKeys[currentKey]) {
			tempData[currentKey] = data[i][currentKey];
		} 
	}

	tempData.people = people;
	mutatedData.push(tempData);

	i += j; 
}

var stringifiedJSON = JSON.stringify(mutatedData); 

console.log(stringifiedJSON);