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
    xhr.open('GET', 'https://api.discogs.com/database/search?q=' + title + '&sort_order=desc', true);
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
        if(xhr.status == 500){
          console.log("500 Internal Server Error");
        }
        if(xhr.status == 422){
          console.log("422 Unprocessable Entity");
        }
        if(xhr.status == 405){
          console.log("405 Method Not Allowed");
        }
        if(xhr.status == 404){
          console.log("404 Not Found");
        }
        if(xhr.status == 403){
          console.log("403 Forbidden");
        }
        if(xhr.status == 401){
          console.log("401 Unauthorized");
        }
        if(xhr.status == 204){
          console.log("204 No Content");
        }
        if(xhr.status == 201){
          console.log("201 Continue");
        }
      }
    }
    // xhr.onload = function(){
    //   if(this.status == 200){
    //     var responseData = JSON.parse(xhr.responseText);
    //     console.log(responseData);

    //     var temp = [];
    //     if (responseData.results.length !== 0) {
    //         for (var i = 0; i < responseData.results.length; ++i) {
    //             if(Object.keys(responseData.results[i]).length > 7){
    //                 temp.push(responseData.results[i]);
    //             }
    //         }
    //         var newObject = { temp };
    //         var source   = $("#entry-template").html();
    //         var template = Handlebars.compile(source);
    //         $('.loaded').append(template({objects:newObject.temp}));
    //     } else {
    //         var newDiv = document.createElement("div");
    //         newDiv.className = "panel-danger text-center";
    //         newDiv.innerHTML = "<span class='text-center'>Sorry, we haven't information corresponding your request :(</span>";
            
    //         var beforeDiv = document.getElementById("header");
    //         document.body.insertBefore(newDiv, beforeDiv);
    //     }
        
    //   }
    // }
    /*xhr.onerror = function(){
      console.log(this.status);
    }*/
    xhr.send();
};