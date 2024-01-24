//SETA A LOCALIZACAO
var geocoder;

var infowindow;

/*if(window.sessionStorage.getItem("Latitude") == null || window.sessionStorage.getItem("Latitude") == '')

	navigator.geolocation.getCurrentPosition(onSuccess, onError);



function onSuccess(position) {

  window.sessionStorage.setItem("Latitude", position.coords.latitude);

  window.sessionStorage.setItem("Longitude", position.coords.longitude); 


  console.log(position.coords.latitude);
  
  location.reload(); 

};







function onError(error) {

    console.log('codigo: ' + error.code + '\n' +

        'messagem: ' + error.message + '\n');

}*/



function initMap() {

        directionsDisplay = new google.maps.DirectionsRenderer();

        geocoder = new google.maps.Geocoder;

        infowindow = new google.maps.InfoWindow;



      
        if(window.sessionStorage.getItem("Latitude") != null){
          coordenadas = ''+window.sessionStorage.getItem("Latitude")+','+window.sessionStorage.getItem("Longitude");
          //coordenadas = '-23.6029417,-48.0633432';
          geocodeLatLng(geocoder, infowindow, coordenadas);
        }

        



        

      }



  function geocodeLatLng(geocoder, infowindow, coordenadas) {
    if(window.sessionStorage.getItem("cidade_id") == null || window.sessionStorage.getItem("cidade_id") == ''){
        $.ajax({
            type: "GET",
            url: "https://pedeoferta.com.br/oferta/welcome/get_cities_pdo",
            cache: false,
            dataType: 'json',

            success: function (data) {
                console.log(data);
                var input = coordenadas;

                var latlngStr = input.split(',', 2);

                var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

                geocoder.geocode({'location': latlng}, function(results, status) {

                  if (status === 'OK') {

                    if (results[1]) {

                      console.log(results[1].formatted_address.toLowerCase());
                      var rows = JSON.parse(data.length);

                      for (var i = 0; i < rows; i++) {
                        if(results[1].formatted_address.toLowerCase().indexOf(data[i].name) > 0){
                          window.sessionStorage.setItem("cidade_id", data[i].id);
                          window.sessionStorage.setItem("cidade_nome", data[i].nickname);
                          console.log(data[i].id);
                          break;
                        }
                      }
                      
                      //window.sessionStorage.setItem("endereco_info", results[1].formatted_address); 
                                  

                    } else {

                      console.log('No results found');

                    }

                  } else {

                   console.log('Geocoder failed due to: ' + status);

                  }

                });
                },

             

            error: function (xhr, ajaxOptions, thrownError) {
                console.log('Erro ao buscar as categorias');
            }

          });
       

       }

      }



function marker(lat, lng, img){

     var myLatLng = {lat: lat, lng: lng};

     /*var icon = {

      url: img, // url

      scaledSize: new google.maps.Size(60, 60), // scaled size

      origin: new google.maps.Point(0,0), // origin

      anchor: new google.maps.Point(0, 0) // anchor

    };*/



        var map = new google.maps.Map(document.getElementById('map'), {

          zoom: 14,

          center: myLatLng

        });



        var marker = new google.maps.Marker({

          position: myLatLng,

          //icon: icon,

          map: map,

          title: ''

        });

} 



 