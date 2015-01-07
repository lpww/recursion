// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	//Store JSOn string
	var result = '';

	//Format for boolean base case
	if(typeof obj === 'boolean'){
		return obj.toString();
	}

	//Format for string base case
	if(typeof obj === 'string'){
		return '"' + obj + '"';
	}

	//Format for number base case
	if(typeof obj === 'number'){
		return obj.toString();
	}

	//Format for null base case
	if(obj === null){
		return 'null';
	}

	//Format for function and undefined base cases
	if(typeof obj === 'function' || typeof obj === 'undefined'){
		return undefined;
	}

	//Format array elements
	if(obj.length !== undefined){
		result = '[';

		for(var i = 0; i < obj.length; i++){
			if(typeof obj[i] !== 'function' && typeof obj[i] !== 'undefined'){
				result += stringifyJSON(obj[i]);
				if(i < obj.length - 1){
					result += ',';
				}
			}
		}
		return result + ']';
	}

	//Format object elements
	if(obj.length === undefined){
		result = '{';

		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				if(typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined'){
					result += '"' + key + '":' + stringifyJSON(obj[key]) + ',';
				}
			}
		}

		if(result.length > 1){
			return result.slice(0,-1) + '}';
		} else {
			return result + '}';
		}
	 
	}
};