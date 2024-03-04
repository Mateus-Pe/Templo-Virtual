var myJson; 

var myJsonPesq;

var de;

var ate;

var maxRegs = 5;

var countRegs;

var select = document.getElementById('eventos');


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

document.getElementById('filtro').addEventListener('click', function() {
  document.querySelector('#input_pesq').style.display = 'none';
  document.querySelector('#header').style.display = 'flex';
  document.querySelector('#filtros_selects').style.display = 'grid';
});

document.getElementById('fecha_filtro').addEventListener('click', function(){
  document.querySelector('#header').style.display = 'none';
  document.querySelector('#filtros_selects').style.display = 'none';
  document.querySelector('#input_pesq').style.display = 'flex';
});


select.addEventListener('click', function() {
  window.location.href = 'tipo-evento.html';
});


const slider = document.getElementById('slider');
const horarioInicio = document.getElementById('horarioInicio');
const horarioFim = document.getElementById('horarioFim');

noUiSlider.create(slider, {
    start: [0, 24], // Valores iniciais dos pontos de início e fim
    connect: true, // Conecta os pontos de início e fim com uma barra
    range: {
        'min': 0,
        'max': 24
    },
    step: 1 // Passo de 1 hora
});

// Atualiza os valores dos horários conforme os pontos de início e fim são movidos
slider.noUiSlider.on('update', function(values) {
    horarioInicio.textContent = formatarHorario(values[0]);
    horarioFim.textContent = formatarHorario(values[1]);
});

// Função para formatar o horário exibindo minutos com dois dígitos
function formatarHorario(valor) {
    const horas = Math.floor(valor);
    const minutos = Math.round((valor % 1) * 60);
    return pad(horas) + ':' + pad(minutos);
}

// Função auxiliar para adicionar um zero à esquerda, se necessário
function pad(num) {
    return (num < 10 ? '0' : '') + num;
}


document.querySelectorAll('.select_item').forEach(item => {
  item.addEventListener('click', event => {
      // Remove a classe 'selected' de todas as outras divs
      document.querySelectorAll('.select_item').forEach(div => {
          div.classList.remove('selected');
      });

      // Adiciona a classe 'selected' à div clicada
      item.classList.add('selected');
  });
});