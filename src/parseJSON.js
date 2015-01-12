//remove '' marks from json.

//find the data type: boolean/string/number ? return data mnus outside '' 
//|| array ? remove '' marks, _.each passing element through the parser (recusive call), return array 
//|| object ? remove '' marks, _.each passing key and element through parser (recursive call), return object 

var parseJSON = function(json) {
  var jsonType;

  //Error handling
  if(json === '' || json == ""){
    throw new Error("Syntax Error: unexpected end of input")
  }

  //If boolean
  if(json === 'true'){
    return true;
  }

  if(json === 'false'){
    return false;
  }

  //If null or undefined
  if(json === 'null' || json === 'undefined'){
    return null;
  }

  //If string
  if(json[0] === '"' || json[0].match(/[a-z]/i)){
    jsonType = json.split('');
    
    if(jsonType[0] === '"'){
      jsonType.shift();
      jsonType.pop();
    }
    
    return jsonType.join('');
  }

  //If array
  if(json[0] === '['){
    if(json[1] === ']'){
      return [];
    }
    
    jsonType = json.split('');
    jsonType.shift();
    jsonType.pop(); 
    jsonType = jsonType.join('');
    jsonType = jsonType.split(',');

    return _.map(jsonType, function(element, index){
        return parseJSON(element.trim());
    });
  }

  //If object
  if(json[0] === '{'){
    var result = {};

    if(json[1] === '}'){
      return result;
    }

    jsonType = json.split('');
    jsonType.shift();
    jsonType.pop(); 
    jsonType = jsonType.join('');
    jsonType = jsonType.split(',');

    _.each(jsonType, function(value){
      value = value.split(':');
      result[parseJSON(value[0].trim())] = parseJSON(value[1].trim());
    });

    return result;
   
  }

  //If number
  if(json[0].match(/[0-9]/)){
    return parseInt(json);
  }

};