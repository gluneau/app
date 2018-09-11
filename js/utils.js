function getQuery(){
  if(document.location.search.length == 0) return '';
  var params = document.location.search.substr(1);
  params = "{\"" + 
    params.replace( /\&/gi, "\",\"" ).replace( /\=/gi, "\":\"" ) +
    "\"}";
  return JSON.parse( params );  
}