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
  var nomeAbreviado = abreviarNomeInstituicao($('#nome_instituicao').val());
 
    
    if($('#nome_instituicao').val() == ''){
      $('.cadastro__alert').text('Para prosseguir coloque uma instituição');
    }
    else if($(nomeAbreviado).val() != ''){
     alert(abreviarNomeInstituicao(nomeAbreviado));
      
      if($('#cep_instituicao').val() == ''){
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
      paroquia_id : paroquia_id
     
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

function abreviarNomeInstituicao(nome) {
  if (nome.length > 20) {
      var partesNome = nome.split(" ");
      var nomeAbreviado = "";
      var caracteresAbreviados = 0;
      var tamanhoMaximo = 20;

      // Encontra a maior palavra do nome e seu tamanho
      var maiorPalavra = "";
      var tamanhoMaiorPalavra = 0;
      for (var i = 0; i < partesNome.length; i++) {
          if (partesNome[i].length > tamanhoMaiorPalavra) {
              maiorPalavra = partesNome[i];
              tamanhoMaiorPalavra = partesNome[i].length;
          }
      }
      console.log("Tamanho da maior palavra:", tamanhoMaiorPalavra);

      for (var i = 0; i < partesNome.length - 1; i++) {
          var palavra = partesNome[i];
          var tamanhoPalavra = palavra.length;

          if (i === partesNome.length - 1) { // Penúltima palavra não será abreviada
              nomeAbreviado += palavra + " ";
              continue;
          }

          if (palavra !== maiorPalavra) { // Abrevia todas as palavras menos a maior
              nomeAbreviado += palavra.charAt(0).toUpperCase() + ".";
              caracteresAbreviados += 2; // Conta a abreviação e o ponto
          } else { // Abrevia a maior palavra limitando seu tamanho
            var diferencaTamanho = tamanhoMaximo - caracteresAbreviados - 1; // Calcula a diferença de tamanho
            var letrasRemovidas = tamanhoMaiorPalavra - diferencaTamanho; // Calcula a quantidade de letras a serem removidas da maior palavra
            
            // Verifica se há letras para serem removidas
            if (letrasRemovidas > 0) {
                var abreviacao = Math.max(tamanhoMaiorPalavra - letrasRemovidas - 1, 1); // Limita a abreviação ao tamanho máximo permitido para a maior palavra
                var palavraAbreviada = palavra.substring(0, abreviacao) + ".";
                nomeAbreviado += palavraAbreviada;
                caracteresAbreviados += abreviacao + 1; // Atualiza a contagem de caracteres abreviados, incluindo o ponto
                console.log("Tamanho da maior palavra após a abreviação:", tamanhoMaiorPalavra - letrasRemovidas);
                console.log("Quantidade de letras removidas da maior palavra:", letrasRemovidas);
            }
            else {
                nomeAbreviado += palavra + " "; // Não é necessário abreviar a maior palavra
                console.log("Nenhuma letra precisa ser removida da maior palavra.");
            }
          }

          if (caracteresAbreviados >= tamanhoMaximo) {
              break; // Interrompe o loop se exceder o limite de caracteres
          }
      }

      // Adiciona a última palavra sem abreviação
      nomeAbreviado += partesNome[partesNome.length - 1];

if (nomeAbreviado.length > tamanhoMaximo) {
    // Trunca o nome abreviado para o limite máximo de caracteres
    nomeAbreviado = nomeAbreviado.substring(0, tamanhoMaximo);

    // Verifica se a maior palavra precisa ser abreviada para ajustar ao limite de caracteres
    if (maiorPalavra.length > 20) {
        var abreviacaoMaiorPalavra = Math.max(maiorPalavra.length - (tamanhoMaximo - 4), 1); // Limita a abreviação da maior palavra ao tamanho máximo permitido
        var indexMaiorPalavra = nomeAbreviado.lastIndexOf(maiorPalavra); // Encontra o índice da última ocorrência da maior palavra no nome abreviado
        nomeAbreviado = nomeAbreviado.substring(0, indexMaiorPalavra + abreviacaoMaiorPalavra) + "..."; // Abrevia a maior palavra
    }
}

return nomeAbreviado.trim();
  } else {
      return nome;
  }
}

// Exemplo de uso
var nomeInstituicao = "Santuário Nacional de Nossa Senhora Aparecida";
var nomeAbreviado = abreviarNomeInstituicao(nomeInstituicao);
console.log("Nome abreviado:", nomeAbreviado);
console.log("Número de caracteres no nome abreviado:", nomeAbreviado.length);



$('#nome_instituicao').keyup(function() {
  var nomeInstituicao = $(this).val();
  var nomeAbreviado = abreviarNomeInstituicao(nomeInstituicao);
  console.log(nomeAbreviado);
});