function getQuery(){
  if(document.location.search.length == 0) return '';
  var params = document.location.search.substr(1);
  params = "{\"" + 
    params.replace( /\&/gi, "\",\"" ).replace( /\=/gi, "\":\"" ) +
    "\"}";
  return JSON.parse( params );  
}

function saveFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}