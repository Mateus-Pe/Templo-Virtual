var paroquia_id = '';
var myJson; 

var myJsonPesq; 

var igrejaId = null;

var matriz = null;

var status_matriz_inicial = 0;

alteracao_matriz = false;


$(document).ready(function() {

  paroquia_id = window.sessionStorage.getItem('paroquia_id');  

  existeMatriz();
  getCidades();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  
  if(igrejaId != null && igrejaId != ''){
    carregarIgreja(igrejaId);
  }
  else{
    verificarNome()
  }
  

});



$('#btn_salvar').click(function(e){

  
  nomeAbreviado = igreja_desc_resumida_new($('#nome_instituicao').val());
 
    
    if($('#nome_instituicao').val() == ''){
      $('.cadastro__alert').text('Para prosseguir coloque uma instituição');
    }
    else if($('#cep_instituicao').val() == ''){
        $('.cadastro__alert').text('Para prosseguir coloque o CEP');
      }
    else if($('#cidade_instituicao').val() == ''){
      $('.cadastro__alert').text('Para prosseguir coloque a cidade');
    }
    else if($('#bairro_instituicao').val() == ''){
      $('.cadastro__alert').text('Para prosseguir coloque o bairro');
    }
    else if($('#logradouro_instituicao').val() == ''){
        $('.cadastro__alert').text('Para prosseguir coloque um logradouro');
    }
    else if($('#numero_instituicao').val() == ''){
        $('.cadastro__alert').text('Para prosseguir coloque o número');
    }
      
    else{
      if(igrejaId != null && igrejaId != ''){
        atualizar();
      }
      else{
        salvar();
      }
      
    // window.location = 'lista-igreja.html';
    }     
}); 



    $(document).ready(function() {
        $('#cep_instituicao').mask('00000000');
    });



$('.tab_input').keyup(function (e) {
  if (e.which == 13){
    proximo = parseInt($(this).attr('tabindex')) + 1;
    $('.div_form').show();
    $('[tabindex=' + proximo + ']').focus();
  }
});



/*$('.adicionar_input').focus(function(e) {
  desabilita_campos($(this).parent());
});*/


/*$('.adicionar_input').blur(function(e) {
  habilita_campos();
});*/



function desabilita_campos(elemento){
  $('.div_form').hide();
  elemento.show();
  

}

function habilita_campos(){
  $('.div_form').show();
 
}


$('#cidade_instituicao').focus(function(e) {
  
  $('.div_form').hide();
  $('#div_cidade_instituicao').show();  
  $('#divLista').show();
 

  
});







function getCidades(){

  $.ajax({

      type: "GET",

      url: "https://pedeoferta.com.br/oferta/welcome/get_cities",

      cache: false,

      data: { 'importancia': '12'},

      dataType: 'json',

      success: function (data) {
        
        myJson = data;
        myJsonPesq = data;

        montaCidades(data);
        
        configurarEventos();

      }

  });

}

function montaCidades(data){

  $('.cadastro .container .lista').html('');



  var rows = JSON.parse(data.length);



  html = "";

  for (var i = 0; i < rows; i++) {

    html +=      '<div class="divPesq" data-id="'+data[i].id+'" data-name="'+data[i].nickname+'" style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkred;">';

         

    

                   

                    

    html +=       '<div style="margin-top: 10px;">' +

                     '<span style="font-size:1.4rem;">'+ data[i].nickname +' - '+data[i].uf+ '</span>'+

                  '</div>' +

                                      

                    

                 '</div>';



    //$('.cadastro .container .lista').append(html);
    $('.lista').show();


  }
  $('.cadastro .container .lista').html(html);
};




$('#cidade_instituicao').keyup(function (e) {





  if($('#cidade_instituicao').val().length >= 2){

    myJson = myJsonPesq.filter(function(a, b) {

        return a['name'].toLowerCase().indexOf($('#cidade_instituicao').val().toLowerCase()) >= 0;

    });

    
      $('html,body').scrollTop(0);

  }else{
    myJson = myJsonPesq;
  }



  $('#divLista').hide();

  montaCidades(myJson);// this.value);

  configurarEventos();

  

  

});


$('#cep_instituicao').keyup(function (e) {
  if (e.which == 13){
    //obj = mock_cep($('#cep_instituicao').val());
    url = "http://viacep.com.br/ws/"+$('#cep_instituicao').val()+"/json/";
   
    $.ajax({
      method: "GET",
      url: url
      
    })
    .done(function (ret) {
        
      if(ret != null){

        if(ret.erro){
          $('#cidade_instituicao').focus();
        }
        else{
          monta_endereco_cep(ret);
        }
        
  
      }else{
        $('#cidade_instituicao').focus();
        
      }    
    });
  

    
  }  
});


function monta_endereco_cep(obj){

  cidade = obj.localidade +" - "+obj.uf;
   $('#cidade_instituicao').val(cidade) .prop('disabled', true);
  $('#bairro_instituicao').val(obj.bairro) .prop('disabled', true);
  $('#logradouro_instituicao').val(obj.logradouro) .prop('disabled', true);
  $('.div_form').show();

  $('#numero_instituicao').focus();

}
function mock_cep(cep){
  var enderecos = [{
    "cep": "18076010",
    "cidade": "Sorocaba - SP",
    "logradouro": "Carlos Smith",
    "bairro": "Maria Antonia Prado"
  },
  {
    "cep": "18215100",
    "cidade": "Itapetininga - SP",
    "logradouro": "João Maurício",
    "bairro": "Monte Santo"
  },
  {
    "cep": "12345678",
    "cidade": "Nothing hills",
    "logradouro": "Wall street",
    "bairro": "brookling"
  }]

  //console.log(enderecos);

  objReturn = null;
  jQuery.each( enderecos, function( i, obj ) {
    if(cep == obj.cep){
      objReturn = obj;
    }
  });

    return objReturn;


}

function salvar(){
  descricaoResumida = igreja_desc_resumida_new($('#nome_instituicao').val());

  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/incluir_igreja",
    data: {
      endereco_cep : $('#cep_instituicao').val(),
      endereco_logradouro: $('#logradouro_instituicao').val(),
      endereco_numero: $('#numero_instituicao').val(),
      endereco_bairro: $('#bairro_instituicao').val(),
      endereco_cidade: $('#cidade_instituicao').val(),
      endereco_cidade_id: $('#cidade_id_instituicao').val(),
      igreja_nome : $('#nome_instituicao').val(),
      igreja_logo_url : "/img/SPA.jpg",
      igreja_matriz : "0",
      paroquia_id : paroquia_id,
      igreja_desc_resumida: descricaoResumida
     
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      if(obj.status == '1'){
        
        if($('#chk_matriz').is(':checked')){
          igrejaId = obj.igreja_id;
           atualizar_matriz();
        }
        else{
          window.location = "lista-igreja.html";
        }  
      }
      
    });
    console.log(descricaoResumida);
}

function configurarEventos(){


  $( ".divPesq" ).on( "click", function() {
    $('#divLista').hide();
    $('#cidade_instituicao').val($(this).data('name'));
    $('#cidade_id_instituicao').val($(this).data('id'));
    habilita_campos()
    $('#bairro_instituicao').focus();

  });
}

function carregarIgreja(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_igreja_by_id",
    data: {
      igreja_id : igrejaId
     
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      
      if(obj.status == '1'){
        $('#nome_instituicao').val(obj.igreja.igreja_nome);
        $('#logradouro_instituicao').val(obj.igreja.igreja_endereco_logradouro).prop('disabled', true);
        $('#numero_instituicao').val(obj.igreja.igreja_endereco_numero).prop('disabled', true);
        $('#bairro_instituicao').val(obj.igreja.igreja_endereco_bairro).prop('disabled', true);
        $('#cidade_instituicao').val(obj.igreja.igreja_endereco_cidade).prop('disabled', true);
        $('#cep_instituicao').val(obj.igreja.igreja_endereco_cep).prop('disabled', true);
        verificarNome();
      
      }
       
    });
}

function atualizar(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_igreja",
    data: {
      igreja_id : igrejaId,
      igreja_nome : $('#nome_instituicao').val()
     
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      
      if(obj.status == '1'){
        window.sessionStorage.setItem('igreja_id', '');
        
        if($('#chk_matriz').is(':checked')){
          if(status_matriz_inicial == 1){
            window.location = "lista-igreja.html";
          }
            
          else{
            atualizar_matriz();
          }
        }
        else{
          window.location = "lista-igreja.html";
        }  
      
      
      }
       
    });
}

function existeMatriz(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/existe_matriz",
    data: { paroquia_id: paroquia_id },
    
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      
      if(obj.status == '1'){
        if(obj.matriz != null && obj.matriz != '' && obj.matriz.igreja_nome != ''){
          matriz = obj.matriz.igreja_nome;
          if(igrejaId != null && igrejaId == obj.matriz.igreja_id){
            $('#chk_matriz').prop('checked',true);
            alteracao_matriz = true;
            status_matriz_inicial = 1;
          }
        } 
        else{
          $('#chk_matriz').prop('checked',true);
        } 

        verificarNome();

      }
       
    });
}
$('#chk_matriz').click(function (e) {
  
  if($('#chk_matriz').is(':checked')){
    
    if(matriz != null){
      
      texto_modal = "<p> A Matriz atual é a <b>"+ matriz +"</b>.</p><br>";
      texto_modal += "<p> Deseja tornar a <b>"+ $('#nome_instituicao').val() +"</b> Matriz? </p>";
      
      $('#texto_confirmacao').html(texto_modal);
    }
    else{

      texto_modal = "<p>Deseja tornar a <b>"+ $('#nome_instituicao').val()+"</b> Matriz?</p>";
      
      $('#texto_confirmacao').html(texto_modal);
    }  
    $('#modalConfirmacao').show();
  }

  
});

$('#nome_instituicao').on('input', function(){
  verificarNome()

});



function verificarNome(){
  var nomeInst = $('#nome_instituicao').val();

  if (nomeInst.trim() === '' || alteracao_matriz){
    $('#chk_matriz').prop('disabled', true);
  }
  else{
    $('#chk_matriz').prop('disabled', false);
  }
};




$('#confirmarTransicao').click(function (e) {
  $('#chk_matriz').prop('checked',true);
  $('#modalConfirmacao').hide();
  
});
$('#cancelarTransicao').click(function (e) {
  $('#chk_matriz').prop('checked',false);
  $('#modalConfirmacao').hide();
});

function atualizar_matriz(){
  if(igrejaId != null){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_matriz",
      data: {
        igreja_id : igrejaId,
        paroquia_id: paroquia_id
       
      }
    })
      .done(function (ret) {
        var obj = jQuery.parseJSON(ret);
        if(obj.status == '1'){
          window.location = "lista-igreja.html";
        }
        
      });
  }
}

function igreja_desc_resumida_old(nome) {
  var palavrasARemover = [
    "santuário", "santuario","paróquia",  "paroquia", "catedral", "comunidade",
    "basílica", "basilica","capéla","capela", "igreja", "templo",
    "oratório","oratorio",  "mosteiro", "matriz"
  ];

  var preposicoes = ["de", "da", "das", "do", "dos"];
//NOSSA SENHORA DO PERPETUO SOCORRO
  var partesNome = nome.split(" ");

  console.log(partesNome);
  var palavrasParaMaior = partesNome.filter(function(palavra) {
    return palavra.toLowerCase() !== "nossa" && palavra.toLowerCase() !== "senhora";
  });

  palavrasParaMaior = palavrasParaMaior.filter(function(palavra) {
    return palavra.toLowerCase() !== "são";
  });

  console.log('<br>');
  console.log(palavrasParaMaior);

  if (palavrasParaMaior.length > 0) {
    palavrasParaMaior.pop();
  }

  console.log('<br>');
  console.log(palavrasParaMaior);

  var palavrasNaoConsideradas = palavrasARemover.concat(preposicoes);

  console.log('<br>');
  console.log(palavrasNaoConsideradas);

  var maiorPalavra = "";
  for (var i = 0; i < palavrasParaMaior.length; i++) {
    var palavra = palavrasParaMaior[i];
    if (!palavrasNaoConsideradas.includes(palavra.toLowerCase()) && palavra.length > maiorPalavra.length) {
      maiorPalavra = palavra;
    }
  }

  var nomeAbreviado = "";

  for (var i = 0; i < partesNome.length; i++) {
    var palavra = partesNome[i];

    if (!palavrasARemover.includes(palavra.toLowerCase()) && !preposicoes.includes(palavra.toLowerCase())) {

      if (i < partesNome.length - 1 && palavra.toLowerCase() === "nossa" && partesNome[i + 1].toLowerCase() === "senhora") {
        nomeAbreviado += "N.S.";
        i++; 
      } else if (palavra.toLowerCase() === "são") {
        nomeAbreviado += "S.";
      } else if (i === partesNome.length - 1 || palavra === maiorPalavra) {
        nomeAbreviado += palavra;
      } else {
        nomeAbreviado += palavra.charAt(0).toUpperCase() + ".";
      }

      if (i < partesNome.length - 1) {
        nomeAbreviado += " ";
      }
    }
  }

  nomeAbreviado = nomeAbreviado.replace(/\.\s+/g, ".");

  console.log('<br>');
  console.log(nomeAbreviado);

  return  nomeAbreviado;
}


function igreja_desc_resumida_new(nome) {
  var palavrasARemover = [
    "santuário", "santuario","paróquia",  "paroquia", "catedral", "comunidade",
    "basílica", "basilica","capéla","capela", "igreja", "templo",
    "oratório","oratorio",  "mosteiro", "matriz","de", "da", "das", "do", "dos"
  ];

 
  var partesNome = nome.split(" ");

  var palavrasNecessarias = partesNome.filter(function(palavra) {
    return !palavrasARemover.includes(palavra.toLowerCase());
  }); 

  console.log('<br>');
  console.log(palavrasNecessarias);

  var nomeAbreviado = "";
  var strPalNec = palavrasNecessarias.join(" ");

  if(strPalNec.length < 20){
    nomeAbreviado = strPalNec;
  }
  else{
    for (var i = 0; i < partesNome.length; i++) {
      var palavra = partesNome[i];
  
      if (!palavrasARemover.includes(palavra.toLowerCase())) {
  
        if (palavra.toLowerCase() === "nossa") {
          nomeAbreviado += "N.";
        }  
        else if (palavra.toLowerCase() === "senhora" || palavra.toLowerCase() === "santo" || palavra.toLowerCase() === "são" )  {
            nomeAbreviado += "S.";  
        }else{
          nomeAbreviado += " ";
          nomeAbreviado += palavra;
        }  
        
          
        
      }
    }
  }
  

  nomeAbreviado = nomeAbreviado.replace(/\.\s+/g, ".");

  console.log('<br>');
  console.log(nomeAbreviado);

  return  nomeAbreviado;
}