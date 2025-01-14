var paroquia_id = '';
var myJson; 
var myJsonPesq; 
var igrejaId = null;


$(document).ready(function() {
  paroquia_id = window.sessionStorage.getItem('paroquia_id');  
  getCidades();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  $('#cep_instituicao').mask('00000000');
});


$('#btn_salvar').click(function(e){
  nomeAbreviado = igreja_desc_resumida($('#nome_instituicao').val());

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
  else{
    apiGeoLocation();
  }
});


$("#voltar").click(function(e){
  window.location = 'lista-igreja.html';
});


$('.tab_input').keyup(function (e) {
  if (e.which == 13){
    proximo = parseInt($(this).attr('tabindex')) + 1;
    $('.div_form').show();
    $('[tabindex=' + proximo + ']').focus();
  }
});


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

      url: "https://flavorosa.com.br/templo/index.php/welcome/get_cidades_temp",

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
  var rows = data.length;
  html = "";

  for (var i = 0; i < rows; i++) {

    html +=      '<div class="divPesq" data-id="'+data[i].id+'" data-name="'+data[i].nickname+'" style="max-height:40px;margin-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkred;">';

    html +=         '<div style="margin-top: 10px;">' +

                      '<span style="font-size:1.4rem;">'+ data[i].nickname +' - '+data[i].uf+ '</span>'+

                    '</div>' +

                 '</div>';

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
  montaCidades(myJson);// this.value);
  configurarEventos();
});


$('#cep_instituicao').keyup(function (e) {
  if (e.which == 13){
  ajaxCep();
  }
});

$('#cep_instituicao').blur(function (e) {
  ajaxCep();
});


function ajaxCep(){
  //obj = mock_cep($('#cep_instituicao').val());
  if ($('#cep_instituicao').val().length == 8){

  
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
}


function monta_endereco_cep(obj){
  cidade = obj.localidade +" - "+obj.uf;
  objCidade = myJson.filter(function(a, b) {
    return a['name'].toLowerCase().indexOf(obj.localidade.toLowerCase()) >= 0;
  });
  if(objCidade.length > 0){
    $('#cidade_id_instituicao').val(objCidade[0].id);
    $('#cidade_instituicao').val(cidade).prop('disabled', true);
    $('#bairro_instituicao').val(obj.bairro).prop('disabled', true);
    $('#logradouro_instituicao').val(obj.logradouro).prop('disabled', true);
    $('.div_form').show();
    $('#numero_instituicao').focus();
  }
  else{
    $('#cep_instituicao').val("");
    $('#cep_instituicao').focus("");
    //alert("Esta Localidade ainda não existe no Servitus");
  }
}


/*function mock_cep(cep){
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


}*/

function salvar(objGeo){
  descricaoResumida = igreja_desc_resumida($('#nome_instituicao').val());

  $.ajax({
    method: "POST",
    url: "https://flavorosa.com.br/templo/index.php/welcome/incluir_igreja",
    data: {
      endereco_cep : $('#cep_instituicao').val(),
      endereco_logradouro: $('#logradouro_instituicao').val(),
      endereco_numero: $('#numero_instituicao').val(),
      endereco_bairro: $('#bairro_instituicao').val(),
      endereco_cidade: $('#cidade_instituicao').val(),
      endereco_cidade_id: $('#cidade_id_instituicao').val(),
      endereco_latitude: objGeo.lat,
      endereco_longitude: objGeo.lng,
      igreja_nome : $('#nome_instituicao').val(),
      igreja_logo_url : "",
      igreja_matriz : "0",
      paroquia_id : paroquia_id,
      igreja_desc_resumida: descricaoResumida
     
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      if(obj.status == '1'){
        window.sessionStorage.setItem('igreja_desc', descricaoResumida);
        window.sessionStorage.setItem('igreja_id', obj.igreja_id);
        window.location = "configurar-perfil-igreja.html";
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


function igreja_desc_resumida(nome) {
  var palavrasARemover = [
    "santuário", "santuario","paróquia",  "paroquia", "catedral", "comunidade",
    "basílica", "basilica","capéla","capela", "igreja", "templo",
    "oratório","oratorio",  "mosteiro", "matriz","de", "da", "das", "do", "dos"
  ];

  var partesNome = nome.split(" ");
  var palavrasNecessarias = partesNome.filter(function(palavra) {
    return !palavrasARemover.includes(palavra.toLowerCase());
  }); 

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
  return  nomeAbreviado;
}


function apiGeoLocation(){
  //obj = mock_cep($('#cep_instituicao').val());
    url = "https://maps.googleapis.com/maps/api/geocode/json";
    
    $.ajax({
      method: "GET",
      url: url,
      data: {address:getAddress(),
             key : 'AIzaSyBjVDWPYDC5zoxBw0zW4bdnnaelnyCWdkw'
      }
      
    })
    .done(function (ret) {
      objGeo = {};  
      if(ret != null){
        console.log(ret);
        
        objGeo.lat =  ret.results[0].geometry.location.lat;
        objGeo.lng =  ret.results[0].geometry.location.lng;
      }else{
        objGeo.lat =  '';
        objGeo.lng =  '';
      }   
      salvar(objGeo); 
    });
}


function getAddress(){
  address = '';
  address += $('#logradouro_instituicao').val();
  if($('#numero_instituicao').val() != ''){
    address += ' '+ $('#numero_instituicao').val();
  }
  address += ', '+$('#bairro_instituicao').val();
  address += ', '+$('#cidade_instituicao').val();
  return address;
}