igrejaId = "" ;
nomeIgrejaVerificado = "";


$(document).ready(function() {
  getFeed();
  carregar_perfil();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  if(igrejaId != null && igrejaId != ''){
    carregarIgreja();
    getComunidade();
  }
  

  $('#nome_igreja').on('input', verificarNomeIgreja);
});




// Função para carregar o perfil
function carregar_perfil(){
  var html = '';

    html += '<div class="perfil" style="width: 100%; height: 70%;">';
    html += '<div class="div_imgFundo_perfil">';
    html += '<div class="imgFundo_perfil">';
    html += '</div>';
    html += '</div>';
    html += '<div id="imagem_igreja" class="div_img_igreja">';
    html += '<img class="img_igreja1" src="https://www.pedeoferta.com.br/mercado/img/igreja/missa.png">';
    html += '</div>';
    html += '<div class="div_publicacao">';
    html += '<div class="feed_principal">';
    html += '<div class="div_feed_secundario">';
    html += '<div>';
    html += '<div>';
    html += '<a class="a_div_perfil">';
    html += '<div>';
    html += '<h1 id="nome_da_igreja" class="nome_da_igreja">';
    html += '</h1>';
    html += '</div>';
    html += '<span class="abrir_map">';
    html += '<span id="localizacao" data-lat="-23.6029417" data-long="-48.0633432" >';
    html += 'Ver no mapa';
    html += '</span>';
    html += '<span class="material-symbols-outlined icone_editar ion_map">';
    html += 'location_on';
    html += '</span>';
    html += '</span>';
    html += '<span id="endereco_da_igreja" class="endereco_igreja">';
    html += 'Rua da igreja, 78, Vila Santana, Sorocaba';
    html += '</span>';
    html += '<div class="contatos">';
    html += '<span id="whatsapp_txt" class="contato"></span>';
    html += '<span id="facebook_txt" class="contato"></span>';
    html += '<span id="instagram_txt" class="contato"></span>';
    html += '<span id="email_txt" class="contato"></span>';
    html += '</div>';
    html += '</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $("#divPerfil").html(html);

    eventoPerfil();
    modalVisualizarPerfil();
    modalVisualizarImgFundo();
}


function getFeed(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_feed",
   
  })
  .done(function(ret) {
   
    var obj = jQuery.parseJSON(ret);
    var html = '';
   
    console.log(obj);
    $.each(obj.lista_feed, function (k, lpp) {
      html += '<div class="div_publicacao">';
      html += '<div class="feed_principal">';
      html += '<div class="div_feed_secundario">';
      html += '<div>';
      html += '<div>';
      html += '<a class="div_perfil" >';
      html += '<div class="perfil_div" data-igreja_id = "'+lpp.igreja_id+'">';
      html += '<img class="img_igreja" src="'+lpp.igreja_logo+'">';
      html += '<span class="nome_igreja">';
      html += lpp.igreja_nome;
      html += '</span>';
      html += '</div>';
      html += '</a>';
      html += '</div>';
      html += '<div class="div_layout_feed">';
      html += '<a class="a_img_layout">';
      html += '<img class="img_layout_feed" src="'+lpp.agenda_img+'">';
      html += '</a>';
      html += '<div class="div_descricao">';
      html += '<span class="span_descricao">';
      html += lpp.descricao_evento;
      html += '</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="div_rodape_feed">';
      html += '<div class="rodape_feed_botao">';
      html += '<span class="material-symbols-outlined span_rodape_botao">';
      html += 'share';
      html += '</span>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    });
   

    $("#divFeed").html(html);

    configurarEventos();
});
}


function getComunidade(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja_by_id_completo",
    data: {igreja_id: igrejaId}
  })
  .done(function(ret) {

    var obj = jQuery.parseJSON(ret);

    var html = '';
    html += '<section class="regular slider">';

    $.each(obj.lista_igreja, function (k, lpp) {

        html += '<a data-evento_cod="'+lpp.igreja_id+'" class="produtos_perfil"><div class="divPerfilEC" style="opacity: 0.5;height: 90px; display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center; gap:"18px";">';
            html += '<div style="display: grid;">';
        html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.igreja_logo+'" style="height:50px"/></div>';
              html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;">'+lpp.igreja_desc+'</span></div>';
            html += '</div></a>';
    });
    html += '</section>';

    $("#divHistoria").html(html);

    slick();
    $('#carregando').hide();
    $('.produtos_perfil').click(function(e){

      var perfilId = $(this).data('evento_cod');
      window.sessionStorage.setItem('igreja_id', perfilId); 
      location.reload();
      
      $('.divPerfilEC').removeClass('perfil_ec_selected');
      $(this).children().addClass('perfil_ec_selected');
                  
      atual_evento_cod = $(this).data('evento_cod');
      console.log(atual_evento_cod);
    });
  });
}

function slick() {
  $(".regular").slick({
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2
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

      console.log("Dados da igreja recebidos:", ret);
      
      if(obj.status == '1'){
        $('#whatsapp_txt').val(obj.igreja.igreja_whats);
        $('#facebook_txt').val(obj.igreja.igreja_face);
        $('#instagram_txt').val(obj.igreja.igreja_instagram);
        $('#email_txt').val(obj.igreja.igreja_email);
        $('#txt_desc_resumida').val(obj.igreja.igreja_desc_resumida);
        $("#nome_da_igreja").text(obj.igreja.igreja_nome);
        $("#endereco_da_igreja").text(obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade);
        atualizarContatos();
        alterar_desc_resumida();

        nomeIgrejaVerificado = obj.igreja.igreja_nome;

        var nomeIgreja = obj.igreja.igreja_nome;
        $('#nome_igreja').val(nomeIgreja);
        
      }

    });
}


  
  function abreviarNomeIgreja(nome) {
    var palavras = nome.split(' ');
    var nomeAbreviado = '';

    for (var i = 0; i < palavras.length; i++) {
        if (nomeAbreviado.length + palavras[i].length <= 15) {
            nomeAbreviado += palavras[i] + ' ';
        } else {
            nomeAbreviado = nomeAbreviado.trim() + ' ' + (palavras[i][0] || '') + '.';
            for (var j = i + 1; j < palavras.length; j++) {
                nomeAbreviado += ' ' + (palavras[j][0] || '') + '.';
            }
            break;
        }
    }

    // Remover os pontos no final se não houverem mais palavras
    nomeAbreviado = nomeAbreviado.trim().replace(/\.$/, '');

    return nomeAbreviado.trim();
}




function marker(lat, lng, img) {
  var myLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng
  });
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: ''
  });

  // Ajuste o modal para exibir com base na posição clicada
  var modal = document.querySelector('#modal_addproduto');
  $(modal).css('display', 'block');
}


function eventoPerfil(){
  $("#localizacao").click(function(e) {
    var lat = $(this).data('lat');
    var lng = $(this).data('long');
    marker(lat, lng, '');
   $('#modal_addproduto').show(); 
  });
  $(".modal_close").click(function(e) {
   $('#modal_addproduto').hide(); 
  });
}



//menu

$('.page-menu--toggle').click(function(e){

  e.preventDefault();

  if($(this).hasClass('page-menu__hamburger--open')){

      
      $('.mobile-nav').css('display', 'none');
      $('#imagem_igreja').css('top', '2.6rem');
      $('.div_btn-salvar').css('bottom', '30px');
      
  }
  else{

    $('.mobile-nav').css('display', 'block');
    $('#imagem_igreja').css('top', '2.49rem');
    $('.div_btn-salvar').css('bottom', '0px');

  }

  $(this).toggleClass('page-menu__hamburger--open');

  $('.page-menu').toggleClass('disabled');

  $('body').toggleClass('disabled');

  $('body').toggleClass('no-scroll');


  efeitoBlur()

});







function efeitoBlur(){

  $('main').toggleClass('is-blur');

  $('.show-search').toggleClass('is-blur');

  $('.categories').toggleClass('is-blur');

  $('.options').toggleClass('is-blur');

  $('.search-market').toggleClass('is-blur');

  $('.menu_ligado').toggleClass('is-blur');


}



//Verifica o item clicado no sidemenu

$('.mobile-nav__items li a').click(function(){

  var classeItemMenu = $(this).attr('class');



  if(classeItemMenu == 'mobile-nav__link-produtos'   ||

     classeItemMenu == 'mobile-nav__link-categorias' ||

     classeItemMenu == 'mobile-nav__link-mercados'){

      setStorageMenu(classeItemMenu);

      window.location = 'vitrine-geral.html';

  }

});



function setStorageMenu(item_menu) {

  sessionStorage.setItem("item_menu", item_menu);

}

/*
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('header').outerHeight();
var isVisible = true;

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > headerHeight) {
        // Rolagem para baixo
        if (isVisible) {
            $('header').removeClass('header-down').addClass('header-up');
            isVisible = false;
        }
    } else {
        // Rolagem para cima
        if (st < lastScrollTop) {
            $('header').removeClass('header-up').addClass('header-down');
            isVisible = true;
        }
    }

    lastScrollTop = st;
}
*/

function toggleDivVisibility(value, targetDiv) {
  if (value.trim() !== "") {
      targetDiv.show();
      targetDiv.css("display", "flex");

  } else {
      targetDiv.hide();
      targetDiv.css("display", "none");
  }
}


const imagens = {
  whatsapp: './imgs/whatsapp.png',
  facebook: './imgs/facebook.png',
  instagram: './imgs/instagram.png',
  email: './imgs/email.png',
};

function atualizarContatos() {
  const contatos = [
    { tipo: 'whatsapp', valor: $('#whatsapp_txt').val().trim() },
    { tipo: 'facebook', valor: $('#facebook_txt').val().trim() },
    { tipo: 'instagram', valor: $('#instagram_txt').val().trim() },
    { tipo: 'email', valor: $('#email_txt').val().trim() }
  ];

  $('.contatos').empty();

  contatos.forEach(contato => {
    if (contato.valor !== '') {
      const divContato = $('<div class="contato"></div>');
      const imgContato = $('<img src="' + imagens[contato.tipo] + '">');
      divContato.append(imgContato);
      const spanContato = $('<span></span>');
      spanContato.text(contato.valor);
      divContato.append(spanContato);

      $('.contatos').append(divContato);
    }
  });
}

function modalVisualizarPerfil(){
  $('.img_igreja1').click(function(){
    var imgSrc = $(this).attr('src');
  
    $('#imagem').attr('src', imgSrc);
  
    $('#modal_visualizar_img').show();
   

    
  });
  
  $('.modal_close').click(function() {
    $('#modal_visualizar_img').hide();
    $('#imagem').attr('src', '');
  });
  
}

function modalVisualizarImgFundo(){
  $('.imgFundo_perfil').click(function(){
    var imgSrc = $(this).attr('src');
  
    $('#imagem').attr('src', imgSrc);
  
    $('#modal_visualizar_img').show();
    
  });
  
  $('.modal_close').click(function() {
    $('#modal_visualizar_img').hide();
    $('#imagem').attr('src', '');
  });
  
}
