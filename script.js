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
    xhr.onload = function(){
      /*if(this.status == 422){
        console.log("422 Unprocessable Entity");
      }*/
      if(this.status == 200){
        var responseData = JSON.parse(xhr.responseText);
        console.log(responseData);

        var temp = [];
        for (var i = 0; i < responseData.results.length; ++i) {
          if(Object.keys(responseData.results[i]).length > 7){
            temp.push(responseData.results[i]);
          }
        }
        var newObject = { temp };

        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        $('.loaded').append(template({objects:newObject.temp}));
      }
    }
    xhr.onerror = function(){
      console.log(this.status);
    }
    xhr.send();
};