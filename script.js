'use strict';

$(document).ready(function(){
  $("#search-form").on('submit', function(event){
    event.preventDefault();
    var title = $("#title").val();
    $(".loaded").remove();
    addNewDiv();

    search(title);  
  });
});

function addNewDiv(){
    var newDiv = document.createElement("div");
      newDiv.className = "container-fluid loaded";
        newDiv.innerHTML = "";

    var beforeDiv = document.getElementById("header");
    document.body.insertBefore(newDiv, beforeDiv);
}

function search(title){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.discogs.com/database/search?q=' + title + '&sort_order=desc&key=gkBgtDWOpHTsEJulHJja&secret=HDHRcjWlagqyjsGamTTPJSNlnUgKUkyV', true);
    xhr.onreadystatechange = function(onEvent) {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var responseData = JSON.parse(xhr.responseText);
           console.log(responseData);

          var temp = [];
          if (responseData.results.length !== 0) {
              for (var i = 0; i < responseData.results.length; ++i) {
                  if(Object.keys(responseData.results[i]).length > 7){
                      temp.push(responseData.results[i]);
                  }
              }
              var newObject = { temp };
              var source   = $("#entry-template").html();
              var template = Handlebars.compile(source);
              $('.loaded').append(template({objects:newObject.temp}));
          } else {
              var newDiv = document.createElement("div");
              newDiv.className = "panel-danger text-center";
              newDiv.innerHTML = "<span class='text-center'>Sorry, we haven't information corresponding your request :(</span>";
              
              var beforeDiv = document.getElementById("header");
              document.body.insertBefore(newDiv, beforeDiv);
          }
        }
      } else{
        if(xhr.status >= 500){
          console.log("Server Error");
        }
        if(xhr.status <500 && xhr.status >=400){
          console.log("Client Error ");
        }
        if(xhr.status <400 && xhr.status >=300){
          console.log("Redirection");
        }
        if(xhr.status <300 && xhr.status >200){
          console.log("Success");
        }
        if(xhr.status <200 && xhr.status >=100){
          console.log("Informational");  
        }
      }
    }
    xhr.send();
}