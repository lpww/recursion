getElementsByClassName = function(className, target){ 
  //Store found elements
  var result = [];

  //If no target element is passed, search the entire document
  if(target === undefined){
    var searching = document.childNodes;
  
  } else {
    var searching = target;
  
  }
 
  //Loop through children
  for(var i = 0; i < searching.length; i++){
    //If classname is found, push the element to results array
    if(searching[i].className !== undefined && searching[i].className.indexOf(className) > -1){
      result.push(searching[i]);
    
    } 

    //Can this function on any children of the element
    result.push(getElementsByClassName(className, searching[i].childNodes));
  
  }
  
  //Result contains many nested arrays, use flatten to return single array with results
  return _.flatten(result);
};
