// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var result = '';

	if(typeof obj === 'boolean'){
		return obj.toString();
	}

	if(typeof obj === 'string'){
		return '"' + obj + '"';
	}

	if(typeof obj === 'number'){
		return obj.toString();
	}

	if(obj === null){
		return 'null';
	}

	if(obj.length !== undefined){
		result = '[';
		for(var i = 0; i < obj.length; i++){
			if(typeof obj[i] === 'object'){
				result += stringifyJSON(obj[i]);
				if(i < obj.length - 1){
					result += ',';
				}
			} else if(typeof obj[i] !== 'function' && typeof obj[i] !== 'undefined'){
				result += stringifyJSON(obj[i]);
				if(i < obj.length - 1){
					result += ',';
				}
			}
		}
		return result + ']';
	}

	if(obj.length === undefined){
		result = '{';

		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				if(typeof obj[key] === 'object'){
					result += '"' + key + '":' + stringifyJSON(obj[key]) + ',';
				} else if(typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined'){
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