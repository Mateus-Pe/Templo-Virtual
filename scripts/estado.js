var origem = "";


$(document).ready(function() {
  acesso_page();

  origem = sessionStorage.getItem('origem') || "";
  console.log("Origem: " + origem);
});



$('.UF').click(function(e){
  window.sessionStorage.setItem("uf", this.id);
  if (origem === "feed" || origem === "administrar-igreja") {
    window.location = "cidade.html";
  }


});



$('#btnVoltar').click(function(e){

  location.reload();

});



function getCidades(){

    $.ajax({

        type: "GET",

        url: "https://pedeoferta.com.br/oferta/welcome/get_cities_pdo",

        cache: false,

        dataType: 'json',

        success: function (data) {

          myJson = data;
          myJsonPesq = data;

          montaCidades(data);

          configurarEventos();

        }

    });

}

function noResults(){

  var resultHtml = '<h3 style="color: darkgray">No momento não existem ofertas cadastradas para este produto.<br>Fique atento as promoções semanais ;)</h3> ';

  $('main .container').append(resultHtml);

}



function montaCidades(data){

    $('.vitrine-geral .container .lista').html('');



    var rows = JSON.parse(data.length);



    

    for (var i = 0; i < rows; i++) {

      html =      '<div class="pesq" data-id="'+data[i].id+'" data-name="'+data[i].nickname+'"  style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid rgb(100,50,150);">';

           

      

                     

                      

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
    window.location = "segmento.html";

  });

  

}







$('#search-market').keyup(function (e) {

  if (e.which == 13) {

    window.sessionStorage.setItem('cidade_id', myJson[0].id);
    window.sessionStorage.setItem("cidade_nome", myJson[0].nickname);
    window.location = "segmento.html";

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

function acesso_page(){
$.ajax({

    url: "https://www.pedeoferta.com.br/oferta/welcome/acesso_page",

    type: 'POST',

    data: {page: 'estado', cidade_id: window.sessionStorage.getItem("cidade_id"), 'key': window.sessionStorage.getItem("key"), session_id: window.sessionStorage.getItem("session_id")} })

  .done(function(ret) {

     console.log('acesso_page');



  });

}