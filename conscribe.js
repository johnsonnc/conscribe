/**
 * Conscribe.js
 * Used to merge JSON Schema(ish) files with MD
 */

var fs = require("fs");

var schema;
// read in JSON file...
var schema_file = __dirname + '/test/schema.json';
var examples;
var data = fs.readFileSync(schema_file, 'utf8');

 schema = JSON.parse(data);




var examples_files = __dirname + '/test/examples.md';
 
examples = fs.readFileSync(examples_files,'utf8');

var output = examples;
 
var schem = schema.channels;



var pDCount = 0;
function propertiesDescptRecursive(args,head){

	var r = "";
	var required;
	for (var i in args){
		if(args[i].required === true){
			required = "required";
		}else{
			required = "optional";
		}
		r += "**" + head + "." + i + "** : *("+ required + ", " + args[i].type +")* " + args[i].desc + "\n\n";
		if(args[i].properties !== undefined && args[i].properties !==null){
			r += propertiesDescptRecursive(args[i].properties,head+"."+i);
		}
	}
	return r;
}

function propertiesRecursive(args,head){
	pDCount = pDCount +  1;
	var count = pDCount;
	var r = "";
	var tab = "\t\t";
	while(count > 0){
		
		tab += "\t";
		count =count -1;
	}

	var required;
	for (var i in args){
		if(args[i].required === true){
			required = "required";
		}else{
			required = "optional";
		}
		r += tab + i + " : "+ required + ", " + args[i].type +", " + "\n";
		if(args[i].properties !== undefined && args[i].properties !==null){
			r += "{\n";
			r += propertiesRecursive(args[i].properties,head+"."+i);
			r+= tab+"\n},";
		}
	}
	pDCount = pDCount -1;
	return r;
}

for(var i in schem){

	var composedString = "";
	var tempString = "";
	composedString += "## " + i + "\n\n";
	composedString += "**Purpose** : " + schem[i].purpose + "\n\n";
	composedString += "**Response Channel** : " + schem[i].resultChannel + "\n\n";
	composedString += "**Payload** : \n\n";
	composedString += "\t {\n";
	for (var x in schem[i].payload){
		composedString += "\t\t" + x + " : ";
		if(schem[i].payload[x].properties !== undefined && schem[i].payload[x].properties !== null){
			composedString += "{\n";
			composedString += propertiesRecursive(schem[i].payload[x].properties, x);
			composedString += "\t\t} ";
		}

		if(schem[i].payload[x].required === true){
			var required = "required";
		}else{
			var required = "optional";
		}
		composedString += required + ", " + schem[i].payload[x].type + "\n";


		tempString += "**"+ x + "** : " + "*("+required+", "+schem[i].payload[x].type+")* " + schem[i].payload[x].description+"\n\n";
		if(schem[i].payload[x].properties !== undefined && schem[i].payload[x].properties !== null){
			tempString += propertiesDescptRecursive(schem[i].payload[x].properties, x);
		}
	}
	composedString += "\t }\n\n";
	composedString += tempString;
	var searchString = "<" +i + ">";
	output = output.replace(searchString, composedString);
}
//
//console.dir(output);
fs.writeFileSync("output.md",output);