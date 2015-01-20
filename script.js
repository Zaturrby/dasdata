var fs = require("fs");

var dataUnparsed  = fs.readFileSync("eriksgoedeversie.json", {encoding: "utf8"});
data = JSON.parse(dataUnparsed);

var mutatedData = [];
var i = 0;
while (i < data.length){
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

			if (data[(i+j)]) {
				// nothing
			} else {
				idIsEqual = false;
			}

		} else {
			idIsEqual = false;
		}
	}

	// Constructing the tempData set
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

	// adding year to tempData

	// console.log(String.charAt);

	// tempData.year = 


	// pushing the result
	mutatedData.push(tempData);

	// Making sure used array items are skipped
	i += j; 
}


var stringifiedJSON = JSON.stringify(mutatedData); 
fs.writeFileSync("voyages_with_people_concatted.json", stringifiedJSON);

console.log("done");