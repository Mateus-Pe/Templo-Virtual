var myJson; 

var myJsonPesq;

var de;

var ate;

var maxRegs = 5;

var countRegs;



$(document).ready(function() {

  getMercados();  

});



$('#search').blur(function(e){

  desabilitarBusca();

});



$('#btnVoltar').click(function(e){

  location.reload();

});



function getMercados(){

    $.ajax({

        type: "POST",

        url: "https://www.pedeoferta.com.br/oferta/index.php/welcome/get_ecs_mobile",

        data: {'cidade_id': window.sessionStorage.getItem("cidade_id")  },

        cache: false,

        dataType: 'json',

        success: function (data) {

          myJson = data;
          myJsonPesq = data;

          montaMercados(data);
          configurarEventos();

        }

    });

    //pegar de um arquivo json

}



function montaMercados(data){

    $('.vitrine-geral .container .lista').html('');



    var rows = JSON.parse(data.length);



     de = maxRegs+1;

    countRegs = rows;

    if(rows < maxRegs)

      ate = rows;

    else

      ate = maxRegs;

    for (var i = 0; i < ate; i++) {

         html =      '<div class="pesq" data-ec_url="'+data[i].ec_url+'" style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid rgb(100,50,150);">';
           
      
                     
                      
      html +=       '<div style="margin-top: 10px;">' +
                       '<span style="font-size:1.4rem;">'+ data[i].label +'</span>'+
                    '</div>' +
                                        
                      
                   '</div>';



      $('.vitrine-geral .container .lista').append(html);

    }

};



function configurarEventos(){



  $('.pesq').click(function(){

    window.location = "vitrine-geral.html?m="+$(this).data('ec_url');

  });

  

}



function setSessionCarrinho(ec_cod, carrinho_cod, oferta_cod){

  sessionStorage.setItem('ec_cod', ec_cod);

  sessionStorage.setItem('carrinho_cod', carrinho_cod);

  sessionStorage.setItem('oferta_cod', oferta_cod);

}



$('#search-market').keyup(function (e) {

  if (e.which == 13) {

    $.ajax({

     method: "POST",

     url: "https://www.pedeoferta.com.br/oferta/welcome/get_ec_by_desc",

     data: { pesquisa: $('#search-market').val().toUpperCase()

           }   

    })

    .done(function(ret) {
      var ec = 0;
      var obj = jQuery.parseJSON(ret);

      //console.log(obj);

      if(obj.status == 1)
        ec = obj.ec.ec_url;
      
      window.location = "vitrine-geral.html?m="+ec;                 

    

    });

  }





  if($('#search-market').val().length >= 3){

      myJson = myJsonPesq.filter(function(a, b) {

        return a['label'].toLowerCase().indexOf($('#search-market').val().toLowerCase()) >= 0;

    });

      /*myJson = myJson.sort(function(a, b) {

        if(b['label'].toLowerCase().indexOf($('#search-market').val().toLowerCase()) >= 0) {

          return 1;

        } else {

          if(a['label'].toLowerCase().indexOf($('#search-market').val().toLowerCase()) >= 0) {

            return -1;

          }else{

            return 0;

          }

        }

      

      });*/

      $('html,body').scrollTop(0);

  }





  montaMercados(myJson);// this.value);

  configurarEventos();

  

  

});



function montaMercados(data){

    $('.vitrine-geral .container .lista').html('');

    //alert(data.length);

    var rows = JSON.parse(data.length);



     de = maxRegs+1;

    countRegs = rows;

    if(rows < maxRegs)

      ate = rows;

    else

      ate = maxRegs;

    for (var i = 0; i < ate; i++) {

         html =      '<div class="pesq" data-ec_url="'+data[i].ec_url+'" style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkred;">';
           
      
                     
                      
      html +=       '<div style="margin-top: 10px;">' +
                       '<span style="font-size:1.4rem;">'+ data[i].label +'</span>'+
                    '</div>' +
                                        
                      
                   '</div>';


      $('.vitrine-geral .container .lista').append(html); 

    }

};





$(window).scroll(function() {

  if ($(window).scrollTop() >= (($(document).height() - $(window).height()) - $('.lista').innerHeight())) {

    /*sortResults('ordem', true);

    var teste = myJson.filter(function (i,n){

        return n.oferta_cod==151;

    });

    console.log(teste);*/

     

    

    if(countRegs > ate){

      ate = ate + maxRegs;

      appendMercados(myJson, de,  ate);

      configurarEventos();

      de = ate + 1;

      

    }

  }

});



 



function appendMercados(data, de, ate){

    

    var rows = JSON.parse(data.length);

    var html = '';



    if(rows < ate)

      ate = rows;

    



    for (var i = de; i < ate; i++) {

       html =      '<div class="pesq" data-ec_url="'+data[i].ec_url+'" style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkred;">';
           
      
                     
                      
      html +=       '<div style="margin-top: 10px;">' +
                       '<span style="font-size:1.4rem;">'+ data[i].label +'</span>'+
                    '</div>' +
                                        
                      
                   '</div>';



      $('.vitrine-geral .container .lista').append(html); 

      

    }



};

$('#eventos').click(function(e){

    window.location.href = "tipo-evento.html";
  
  });