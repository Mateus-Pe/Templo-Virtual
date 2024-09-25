igrejaId = "" ;
nomeIgrejaVerificado = "";

$(document).ready(function() {
  cidade_id = window.sessionStorage.getItem("cidade_id");
  igrejaId = window.sessionStorage.getItem('feed_igreja_id');
  if(igrejaId != null && igrejaId != ''){
    evento_agenda();
    carregar_perfil();
    carregarIgreja();
    getComunidade();
  }
  //marker('-23.5909968','-48.0534713', null);

});

function posicaoScrollEspecifica(){
  
  agendaId = window.sessionStorage.getItem('feed_agenda_id');
  console.log(agendaId);
  if(agendaId != null && agendaId != ""){
    scroll = $('body .div_publicacao[data-feed="'+agendaId+'"]').position().top;
    console.log(scroll);
    $('body').scrollTop(scroll + parseInt($("#divPerfil").css("height")) + 5);
  }
  
}


// Função para carregar o perfil
function carregar_perfil(){
  var html = '';

    html += '<div class="perfil" style="width: 100%; background-color: lightgrey">';
    html +=   '<div class="div_imgFundo_perfil">';
    html +=     '<div class="imgFundo_perfil">';
    html +=       '<img class="img_fundo1" style="width: 100%; height: 250px;" src="">';
    html +=     '</div>';
    html +=   '</div>';
    html +=   '<div class="div_img_igreja">';
    html +=     '<div id="imagem_igreja" >';
    html +=       '<img class="img_igreja1" src="">';
    html +=   '</div>';
    html += '</div>';

    html += '<div class="div_publicacao">';
    html +=   '<div class="feed_principal">';
    html +=     '<div class="div_feed_secundario">';
    html +=       '<div>';
    html +=         '<div>';
    html +=           '<div style="top: 3rem; position: relative;">';
    html +=             '<h1 id="nome_da_igreja" class="nome_da_igreja">';
    html +=             '</h1>';
    html +=             '<span class="abrir_hora_fixo">';
    html +=               '<span id="horarios_fixos">';
    html +=                 'Ver horários fixos';
    html +=               '</span>';
    html +=               '<span class="fa-regular fa-clock icone_editar ion_map">';
    html +=               '</span>';
    html +=             '</span>';
    html +=            '</div>';
    html +=             '<div class="a_div_perfil">';
    html +=               '<span class="abrir_map">';
    html +=                 '<span id="localizacao" data-lat="" data-long="" >';
    html +=                   'Ver no mapa';
    html +=                 '</span>';
    html +=                 '<span class="fa-solid fa-location-dot ion_local icone_editar ion_map">';
    html +=                 '</span>';
    html +=                '</span>';
    html +=                '<span id="endereco_da_igreja" class="endereco_igreja">';
    html +=                 '';
    html +=                '</span>';
    html +=                '<div class="contatos">';
    html +=                 '<span id="whatsapp_txt" class="contato"></span>';
    html +=                 '<span id="facebook_txt" class="contato"></span>';
    html +=                 '<span id="instagram_txt" class="contato"></span>';
    html +=                 '<span id="email_txt" class="contato"></span>';
    html +=                '</div>';
    html +=               '</div>';
    html +=              '</div>';
    html +=             '</div>';
    html +=            '</div>';
    html +=           '</div>';
    html +=         '</div>';

    html +=         '<div>'
    html +=           '<div style="width: 100%; height: 20px; background-color: darkred; color: white; align-items: center; display: flex; justify-content: center; font-size: 13px; font-family: exo;" >';
    html +=             '<span>';
    html +=               'COMUNIDADES RELACIONADAS';
    html +=             '</span>';
    html +=           '</div>';
    html +=           '<div class="div_comunidade">';
    html +=           '</div>';
    html +=         '</div>';
    $("#divPerfil").html(html);

    eventoPerfil();
    modalHorariosFixos();
    modalVisualizarPerfil();
    modalVisualizarImgFundo();
    
}



function evento_agenda(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_feed",
    data: { feed_igreja_id : igrejaId,
            regiao_id : cidade_id,
            cidade_id : cidade_id
    }
   
  })
  .done(function(ret) {
    var html = '';
    var classVideo = 0;
    var obj = jQuery.parseJSON(ret);

    html = '<div style="width: 100%; height: 20px; background-color: lightgray; color: white; text-align: center; margin-top: 10px; margin-bottom: 10px;">Eventos de "igreja"</div>'
    $("#divFeed").append(html);
    $.each(obj.lista_feed_igreja, function (k, lpp) {
      html = montaHtml(lpp, k);
      $("#divFeed").append(html);
    });


    html = '<div style="width: 100%; height: 20px; background-color: lightgray; color: white; text-align: center; margin-top: 10px; margin-bottom: 10px;">Eventos de "paroquia"</div>'
      $("#divFeed").append(html);
      $.each(obj.lista_feed_paroquia, function (k, lpp) {
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });


    html = '<div style="width: 100%; height: 20px; background-color: lightgray; color: white; text-align: center; margin-top: 10px; margin-bottom: 10px;">Eventos de "cidade"</div>'
      $("#divFeed").append(html);
      $.each(obj.lista_feed_cidade, function (k, lpp) {
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });

      html = '<div style="width: 100%; height: 20px; background-color: lightgray; color: white; text-align: center; margin-top: 10px; margin-bottom: 10px;">Eventos de "região"</div>'
      $("#divFeed").append(html);
      $.each(obj.lista_feed_regiao, function (k, lpp) {
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });
    

   // configurarEventos();
    //iniciarIntersectionObserver();
    posicaoScrollEspecifica();
    compartilha();
    
  });
}


function compartilha() {
  var buttons = document.querySelectorAll('.span_rodape_botao');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var postagem = this.closest('.div_publicacao');
      var compartilhamentoMenu = postagem.querySelector('.compartilhamento');
      var imagemUrl = postagem.querySelector('.img_layout_feed').getAttribute('src');
      var postId = extrairIdDaImagem(imagemUrl);

      if (postId) {
        var nomeInstituicao = postagem.querySelector('.nome_igreja').innerText;
        var timestamp = Date.now();
        var parametros = "?a="+encodeURIComponent(nomeInstituicao)+"&c="+imagemUrl+"&timestamp="+timestamp;
        var postUrl = 'http://pedeoferta.com.br/site/servitus/compartilha.html'+parametros;
        console.log('Link compartilhado:', postUrl);
        
        // Abre um menu de compartilhamento com opções para WhatsApp, Facebook e Instagram
        var compartilhamentoMenu = postagem.querySelector('.compartilhamento');
        compartilhamentoMenu.style.display = 'flex';

        var whatsappButton = compartilhamentoMenu.querySelector('.btn-whatsapp');
        var facebookButton = compartilhamentoMenu.querySelector('.btn-facebook');
        var instagramButton = compartilhamentoMenu.querySelector('.btn-instagram');

        whatsappButton.addEventListener('click', function() {
          abrirLinkParaWhatsApp(postUrl);
        });

        facebookButton.addEventListener('click', function() {
          abrirLink('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(postUrl));
        });

        instagramButton.addEventListener('click', function() {
          abrirLink('https://www.instagram.com/' + encodeURIComponent(postUrl));
        });

        // Alternar a visibilidade dos botões de compartilhamento
        toggleShareButtons(compartilhamentoMenu);
        hideShareButtonsFromOtherPosts(compartilhamentoMenu);
      } else {
        console.error('Erro ao obter o ID da publicação.');
      }
    });
  });
}

function toggleShareButtons(compartilhamentoMenu) {
  compartilhamentoMenu.offsetHeight;
  // Alterna a classe 'show' para controlar a exibição dos botões
  compartilhamentoMenu.classList.toggle('show_compartilha');
  // Atualiza o estilo de exibição dos botões
  var shareButtons = compartilhamentoMenu.querySelectorAll('.btn-compartilhar');
  shareButtons.forEach(function(button) {
    if (compartilhamentoMenu.classList.contains('show_compartilha')) {
      button.style.display = 'flex'; // Exibe os botões
    } else {
      button.style.display = 'none'; // Oculta os botões
    }
  });
}


function hideShareButtonsFromOtherPosts(currentCompartilhamentoMenu) {
  var allCompartilhamentoMenus = document.querySelectorAll('.compartilhamento');
  allCompartilhamentoMenus.forEach(function(compartilhamentoMenu) {
    if (compartilhamentoMenu !== currentCompartilhamentoMenu) {
      compartilhamentoMenu.classList.remove('show_compartilha');
      var shareButtons = compartilhamentoMenu.querySelectorAll('.btn-compartilhar');
      shareButtons.forEach(function(button) {
        button.style.display = 'none';
      });
    }
  });
}


function abrirLink(url) {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Se estiver em um dispositivo móvel, tentamos abrir o link diretamente
    window.location.href = url;
  } else {
    // Se estiver em um computador, abrimos o link em uma nova aba do navegador
    window.open(url, '_blank');
  }
}

function abrirLinkParaWhatsApp(url) {
  var whatsappLink = 'whatsapp://send?text=' + encodeURIComponent(url);
  var whatsappWebLink = 'https://web.whatsapp.com/send?text=' + encodeURIComponent(url);
  
  // Verifica se o navegador suporta o protocolo whatsapp://
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    window.open(whatsappLink, '_blank');
  } else {
    // Se não suportar, abre o link para o WhatsApp Web
    window.open(whatsappWebLink, '_blank');
  }
}


function extrairIdDaImagem(imagemUrl) {
  // Extrai o ID da imagem do URL
  var idMatch = imagemUrl.match(/\/(\d+)\.jpg$/);
  if (idMatch) {
    return idMatch[1];
  } else {
    return null;
  }
}




function getComunidade(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja_by_id_completo",
    data: {igreja_id: igrejaId}
  })
  .done(function(ret) {

    var obj = jQuery.parseJSON(ret);
    console.log(obj);

    var html = '';

    $.each(obj.lista_igreja, function (k, lpp) {

        html += '<div class="comunidade_select" data-igreja_id="'+lpp.igreja_id+'">';
              html += '<img  src="'+lpp.igreja_logo+'">';
              html += '<span>'+lpp.igreja_nome+'</span>';
        html += '</div>';
    });

    $(".div_comunidade").html(html);

    $('#carregando').hide();
    $('.produtos_perfil').click(function(e){

      var perfilId = $(this).data('evento_cod');
      window.sessionStorage.setItem('igreja_id', perfilId); 
      location.reload();
                  
      atual_evento_cod = $(this).data('evento_cod');
      console.log(atual_evento_cod);
    });

    $('.comunidade_select').click(function () {
      window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
      window.location = 'perfil-igreja.html';
      
    });
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
        $("#nome_igreja_fixo").text(obj.igreja.igreja_nome);
        $("#endereco_da_igreja").text(obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade);
        $(".img_igreja1").attr('src', obj.igreja.igreja_logo_url);
        $(".img_fundo1").attr('src', obj.igreja.igreja_fundo_url);
        $("#horario_fixo").html(obj.igreja.igreja_horario_fixo);
        $("#localizacao").data('lat',obj.igreja.endereco_latitude);
        $("#localizacao").data('long',obj.igreja.endereco_longitude);
        atualizarContatos();

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
  var icon = {

    url: img, // url

    scaledSize: new google.maps.Size(60, 60), // scaled size

    origin: new google.maps.Point(0,0), // origin

    anchor: new google.maps.Point(0, 0) // anchor

  };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
  });
  var marker = new google.maps.Marker({
      position: myLatLng,
      //icon: icon,
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
   $('body').css('overflow', 'hidden');
  });
  $(".modal_close").click(function(e) {
   $('#modal_addproduto').hide();
   $('body').css('overflow', 'auto');
  });
}

function modalHorariosFixos(){

  $("#horarios_fixos").click(function(e){
    $("#modal_horarios_fixos").show();
  });
  
  $("#close_horarios").click(function(e){
    $("#modal_horarios_fixos").hide();
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


var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('#div_nome_igreja_fixo').outerHeight();
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
            $('#div_nome_igreja_fixo').removeClass('header-down').addClass('header-up');
            isVisible = false;
        }
    } else {
        // Rolagem para cima
        if (st < lastScrollTop) {
            $('#div_nome_igreja_fixo').removeClass('header-up').addClass('header-down');
            isVisible = true;
        }
    }

    lastScrollTop = st;
}


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

  $('.img_fundo1').click(function(){
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

$('#voltar_feed').click(function(){
  window.location = 'feed.html';
});
