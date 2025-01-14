var myJson;

var myJsonPesq; 

var de;

var ate;

var maxRegs = 20;

var countRegs;



$(document).ready(function() {

  getCidades(); 

  var searchParams = new URLSearchParams(window.location.search);
  origem = searchParams.get("req");
  console.log("Origem: " + origem);

});



$('#search').blur(function(e){

  desabilitarBusca();

});



$('#btnVoltar').click(function(e){

  location.reload();

});



function getCidades(){

    $.ajax({

        type: "GET",

        url: "https://flavorosa.com.br/oferta/welcome/get_cities_pdo",

        cache: false,

         data: {uf: window.sessionStorage.getItem("uf")} ,

        dataType: 'json',

        success: function (data) {

          myJson = data;
          myJsonPesq = data;

          montaCidades(data);

          $('#carregando').hide();

          configurarEventos();

        }

    });

}

function montaCidades(data){

    $('.vitrine-geral .container .lista').html('');



    var rows = JSON.parse(data.length);



    

    for (var i = 0; i < rows; i++) {

      html =      '<div class="pesq" data-id="'+data[i].id+'" data-name="'+data[i].nickname+'"  style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkred;">';

           

      

                     

                      

      html +=       '<div style="margin-top: 10px;">' +

                       '<span style="font-size:1.4rem;">'+ data[i].nickname +'</span>'+

                    '</div>' +

                                        

                      

                   '</div>';



      $('.vitrine-geral .container .lista').append(html);

    }

};



function configurarEventos(){



  $('.pesq').click(function(){
    console.log($(this).data('id'));
    window.sessionStorage.setItem('cidade_id', $(this).data('id'));
    window.sessionStorage.setItem("cidade_nome", $(this).data('name'));
    
    
    if (origem === "feed" || origem === "administrar-igreja") {
      window.location = origem + ".html";
    } else {
      window.location = "estado.html";
    }

  });

  

}







$('#search-market').keyup(function (e) {

  if (e.which == 13) {

    window.sessionStorage.setItem('cidade_id', myJson[0].id);
    window.sessionStorage.setItem("cidade_nome", myJson[0].nickname);
    window.location = "administrar-igreja.html";

  }





  if($('#search-market').val().length >= 3){

    myJson = myJsonPesq.filter(function(a, b) {

        return a['name'].toLowerCase().indexOf($('#search-market').val().toLowerCase()) >= 0;

    });

    
      $('html,body').scrollTop(0);

  }else{
    myJson = myJsonPesq;
  }





  montaCidades(myJson);// this.value);

  configurarEventos();

  

  

});