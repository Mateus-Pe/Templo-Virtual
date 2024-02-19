var geocoder;

initialize(); 

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng)
}

function errorFunction(){
  alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();



}

function codeLatLng(lat, lng) {

  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    //console.log(results);
      if (results[1]) {
      var indice=0;
      for (var j=0; j<results.length; j++)
      {
          if (results[j].types[0]=='locality')
          {
              indice=j;
              break;
          }
      }
      alert('The good number is: '+j);
      console.log(results[j].formatted_address);
      for (var i=0; i<results[j].address_components.length; i++)
          {
              if (results[j].address_components[i].types[0] == "locality") {
                      //this is the object you are looking for City
                      city = results[j].address_components[i];
                  }
              if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                      //this is the object you are looking for State
                      region = results[j].address_components[i];
                  }
              if (results[j].address_components[i].types[0] == "country") {
                      //this is the object you are looking for
                      country = results[j].address_components[i];
                  }
          }

          //city data
          alert(city.long_name + " || " + region.long_name + " || " + country.short_name)


          } else {
            alert("No results found");
          }
      //}
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}