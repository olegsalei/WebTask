(function() {
    $.ajax({
        url: 'https://api.discogs.com/database/search?q=Nirvana&key=gkBgtDWOpHTsEJulHJja&secret=HDHRcjWlagqyjsGamTTPJSNlnUgKUkyV ',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data){
            console.log(data.data);
          
      },
      error: function(err){
        console.log(err);
      }
    });



})();