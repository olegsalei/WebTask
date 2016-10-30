'use strict';

$(document).ready(function(){
    
/*
    timer = setTimeout(function run(){
      $(".loaded-info").remove();
      addNewDiv();
      repoSearch(language, repository);
      timer = setTimeout(run, 30000);
    }, 30000);
  });
  */

  $("#search-form").on('submit', function(event){
    event.preventDefault();
    alert("Good");
    var author = $("#author").val();
    var title = $("#title").val();

    alert(author + "  " + title);
    search(title, author);  
  });

  function stopTimer(){
    if(timer){
      clearTimeout(timer);
      timer = null;
    }
  };

  
});

function search(title, author){
    alert("In function");
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.discogs.com/database/search?q=' + title + '&author=' + author + '&key=gkBgtDWOpHTsEJulHJja&secret=HDHRcjWlagqyjsGamTTPJSNlnUgKUkyV', true);
    xhr.onload = function(){
      console.log("Goos");
      alert(this.status);
      /*if(this.status == 422){
        console.log("422 Unprocessable Entity");
      }
      if(this.status == 400){
        console.log("400 Bad Request");
      }*/
      if(this.status == 200){
        var responseData = JSON.parse(xhr.responseText);
        console.log(responseData);

        //var source = $("#repos-entry-template").html();
        //var template = Handlebars.compile(source);
        //$('.loaded-info').append(template({objects:responseData.items}));
      }
    }
    xhr.onerror = function(){
      console.log(this.status);
    }
    xhr.send();
  };