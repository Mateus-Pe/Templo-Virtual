var players = {};
var tokenFacebook = 'EAAEIeuHKBCEBO8jzZAHRCtg9mSqlonmZCWwyZCKDbAAkbijbZBZAFTn11H6IRmDgZBESStqNtckm0zT1h1WkebbFMkQbsA8xckjs0HqNlWZB8acIUnjD2IcnXkHlEtZAB9ac070iMBEmZAhYuVTqhPDwZBZBbkYuSx2NoalcW9Xa1cgPSygId51npXjuKFjc1ZA05dSI3vhBsDkW8A7jRCCQCf5qoH6opvfTynVtLZCEm7DmyJlwryv4wN35u';

$(document).ready(function () {
  
  //navigator.geolocation.getCurrentPosition(function(data){console.log(data)})
  $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
  cidade_id = window.sessionStorage.getItem("cidade_id");
  window.sessionStorage.setItem('igreja_id','');

  if(cidade_id == null || cidade_id == ''){
    cidade_id = '9240';
    window.sessionStorage.setItem("cidade_nome", "Itapetininga");
    $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
  }

  if(cidade_id != null && cidade_id != ''){
      //get_paroquias(cidade_id);
  }
  evento_agenda();
  opcoesOrigemMenu()
});

window.onload = function() {
  var descricao = "Descrição da publicação";
  var url = window.location.href; 
  var imageUrl = "URL_da_Imagem.jpg";

  //atualizarMetaTagsOG(description, url, imageUrl);
};

function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://flavorosa.com.br/templo/index.php/welcome/get_feed",
      data: {
        cidade_id : cidade_id
    }
    })
    .done(function(ret) {
      var html = '';
      var classVideo = 0;
      var obj = jQuery.parseJSON(ret);

     // html = '<div style="width: 100%; height: 20px; background-color: lightgray; color: white; text-align: center; margin-top: 10px; margin-bottom: 10px;">Eventos de "cidade"</div>'
      $("#divFeed").append(html);
      $.each(obj.lista_feed_cidade, function (k, lpp) {
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });
      

      html = '<div style="width: 100%; height: 65px; background-color: darkred; color: gold; align-items: center; display: flex; justify-content: center; margin-bottom: 6px; border-top: 1px solid darkred; border-bottom: 1px solid darkred">Outros eventos da região</div>'
      $("#divFeed").append(html);
      $.each(obj.lista_feed_regiao, function (k, lpp) {
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });
      

      configurarEventos();
      //iniciarIntersectionObserver();
      compartilha();
      
    });
}


function configurarEventos(){
  $(".perfil_div").click(function(){
    window.sessionStorage.setItem('feed_igreja_id',$(this).data("igreja_id"));
    location.href = "perfil-igreja.html";
  });

 /* $(window).scroll(function() {
    //if(($(window).scrollTop() % 500)== 0){
      if(sessionStorage.getItem('arrayOfertaAcesso') != null && sessionStorage.getItem('arrayOfertaAcesso') != ''){
        arrayOfertaAcesso = JSON.parse(sessionStorage.getItem('arrayOfertaAcesso')); 
      }else{
        arrayOfertaAcesso = [];
      }
     console.log($(window).scrollTop());
     console.log(JSON.parse(sessionStorage.getItem('arrayOfertaAcesso')));
    
      
     $('.div_publicacao').each(function(){
        if($(this).position().top < $(window).scrollTop() && jQuery.inArray($(this).data('oferta_cod'), arrayOfertaAcesso) == -1){
          arrayOfertaAcesso.push($(this).data('oferta_cod'));
          acesso_oferta();
          //sessionStorage.setItem('arrayOfertaAcesso', JSON.stringify(arrayOfertaAcesso));
          
          //console.log($(this).data('oferta_cod'));
        }
     });
    //}
    });*/
}


$('#cidade_nome').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'estado.html?req=feed';
});


$('.page-menu--toggle').click(function(e){

  e.preventDefault();

  if($(this).hasClass('page-menu__hamburger--open')){

      
      $('.mobile-nav').css('display', 'none');
      $('#add').css('bottom', '10px');
      
  }
  else{

    $('.mobile-nav').css('display', 'block');
    $('#add').css('bottom', 'calc(10px + var(--nav-height))');

  }

  $(this).toggleClass('page-menu__hamburger--open');

  $('.page-menu').toggleClass('disabled');

  $('body').css('overflow', '');

  $('html').toggleClass('no-scroll');

  $('main').toggleClass('no-scroll');

  $('#divFeed').toggleClass('no-scroll');

  $('body').toggleClass('no-scroll');


  efeitoBlur()

});

function efeitoBlur(){
  
  $('main').toggleClass('is-blur');

  $('.show-search').toggleClass('is-blur');

  $('.categories').toggleClass('is-blur');

  $('.options').toggleClass('is-blur');

  $('.search-market').toggleClass('is-blur');

  $('#divCidadeNome').toggleClass('is-blur');



}


/*

function iniciarIntersectionObserver() {
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  const videos = document.querySelectorAll('.video-hover-trigger');

  videos.forEach(video => {
    observer.observe(video);
  });
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    const videoId = entry.target.id;

    if (entry.isIntersecting) {
      if (videoId.startsWith('video_') && players[videoId]) {
        // Se o elemento é um vídeo do YouTube e o player está definido
        players[videoId].playVideo();
      } else if (videoId === 'meuVideo') {
        // Se o elemento é um vídeo local
        const meuVideo = document.getElementById('meuVideo');
        meuVideo.play();
      }
    } else {
      if (videoId.startsWith('video_') && players[videoId]) {
        // Se o elemento é um vídeo do YouTube e o player está definido
        players[videoId].pauseVideo();
      } else if (videoId === 'meuVideo') {
        // Se o elemento é um vídeo local
        const meuVideo = document.getElementById('meuVideo');
        meuVideo.pause();
      }
    }
  });
}

function readyVideo(classVideo) {
  // Crie um novo player
  players['video_' + classVideo] = new YT.Player('video_' + classVideo, {
      height: '315',
      width: '100%',
      videoId: 'ABzDOSQkhTM', // ID do vídeo do YouTube que deseja incorporar
      playerVars: {
          'autoplay': 0, // Configuração para não reproduzir automaticamente
          'controls': 1 // Mostrar controles de vídeo
      },
      events: {
          'onReady': function(event) {
              // O player está pronto, você pode fazer algo aqui se precisar
          },
          'onStateChange': function(event) {
              // Verifica se o vídeo está pronto para ser reproduzido
              if (event.data == YT.PlayerState.PLAYING) {
                  // Vídeo está sendo reproduzido
                  console.log('Vídeo iniciado!');
              }
          }
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var meuVideo = document.getElementById('meuVideo');

  // Função para iniciar a reprodução do vídeo local
  function playLocalVideo() {
    meuVideo.play().catch(function(error) {
      // Tratar erro de reprodução
      console.error('Erro ao reproduzir vídeo local:', error.message);
    });
  }

  // Adicionar evento de clique para iniciar a reprodução do vídeo quando o usuário interagir com a página
  document.addEventListener('click', function() {
    playLocalVideo();
  });

  // Adicionar evento de clique no próprio vídeo para pausá-lo ou reproduzi-lo
  meuVideo.addEventListener('click', function() {
    if (meuVideo.paused) {
      playLocalVideo();
    } else {
      meuVideo.pause();
    }
  });
});
*/

function compartilha() {
  var buttons = document.querySelectorAll('.span_rodape_botao');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var postagem = this.closest('.div_publicacao');
      var compartilhamentoMenu = postagem.querySelector('.compartilhamento');
      var imagemUrl = postagem.querySelector('.img_layout_feed').getAttribute('src');
      var postId = postagem.getAttribute('data-feed'); // Extrai o ID diretamente da div da postagem

      if (postId) {
        var nomeInstituicao = postagem.querySelector('.nome_igreja').innerText;
        var dataFeed = postagem.getAttribute('data-feed');
        console.log(dataFeed);
        var timestamp = Date.now();
        //var parametros = "?a="+encodeURIComponent(nomeInstituicao)+"&c="+imagemUrl+"&timestamp="+timestamp;
        var postUrl = 'https://flavorosa.com.br/site/new8/compartilha.html?a='+encodeURIComponent(nomeInstituicao)+'&b='+dataFeed+'&c='+imagemUrl+'';
        //console.log('Link compartilhado:', postUrl);
        
        // Abre o menu de compartilhamento
        compartilhamentoMenu.style.display = 'flex';

        var whatsappButton = compartilhamentoMenu.querySelector('.btn-whatsapp');
        var facebookButton = compartilhamentoMenu.querySelector('.btn-facebook');
        var instagramButton = compartilhamentoMenu.querySelector('.btn-instagram');

        whatsappButton.addEventListener('click', function() {
          abrirLinkParaWhatsApp(imagemUrl); // Abre o WhatsApp diretamente no app se disponível
        });

        facebookButton.addEventListener('click', function() {
          abrirLinkParaFacebook(imagemUrl);
          //loginWithFacebook(); // Abre o Facebook diretamente no app se disponível
            /*FB.ui({
              method: 'share',
              href: 'https://53c5-170-245-17-160.ngrok-free.app/teste10.html?a=https://flavorosa.com.br/templo/img/layout/5_lote_media.webp&b=teste', // URL que você deseja compartilhar
          }, function(response){
              if (response && !response.error_message) {
                  alert('Compartilhado com sucesso!');
              } else {
                  alert('Erro ao compartilhar.');
              }
          });*/
        });

        //instagramButton.addEventListener('click', function() {
          //abrirLinkParaInstagram(imagemUrl); // Avisa o usuário sobre o compartilhamento no Instagram
        //});

        // Alternar a visibilidade dos botões de compartilhamento
        toggleShareButtons(compartilhamentoMenu, event);
        hideShareButtonsFromOtherPosts(compartilhamentoMenu);
      } else {
        console.error('Erro ao obter o ID da publicação.');
      }
    });
  });
}


function abrirLinkParaInstagram(imageUrl) {
  alert("Por favor, baixe a imagem e compartilhe manualmente no Instagram.");
  window.location.href = imageUrl; // Isso abrirá a imagem no navegador para o usuário baixar
}

function abrirLinkParaFacebook(imageUrl) {
  var facebookAppUrl = 'fb://feed?link=' + encodeURIComponent(imageUrl);
  var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(imageUrl);

  // Tenta abrir o app Facebook
  var startTime = Date.now();
  console.log("aqui");
  // Tenta abrir o app com o deep link
  window.location.href = facebookAppUrl;

  // Verifica se o app foi aberto (espera 1500ms)
  setTimeout(function() {
    var elapsedTime = Date.now() - startTime;
    console.log("ta");
    console.log(elapsedTime);
    // Se o tempo de resposta for muito curto (não mais que 1,5 segundos), significa que o app não foi aberto
    if (elapsedTime < 1600) {
      console.log("ta aqui");
      // Caso não tenha aberto o app, abre o link no navegador
      window.open(facebookUrl, '_blank');
    }
  }, 1500); // O tempo aqui deve ser o suficiente para um app ou navegador tentar abrir
}


function abrirLinkParaWhatsApp(imageUrl) {
  var whatsappUrl = 'https://api.whatsapp.com/send/?text=' + encodeURIComponent(imageUrl);
  window.open(whatsappUrl, '_blank');
}



function toggleShareButtons(compartilhamentoMenu, event) {
  event.preventDefault();
  compartilhamentoMenu.offsetHeight;
  // Alterna a classe 'show' para controlar a exibição dos botões
  compartilhamentoMenu.classList.toggle('show_compartilha');
  // Atualiza o estilo de exibição dos botões
  var shareButtons = compartilhamentoMenu.querySelectorAll('.btn-compartilhar');
  shareButtons.forEach(function(button) {
    if (compartilhamentoMenu.classList.contains('show_compartilha')) {
      $(".btn-compartilhar").css('display', 'flex');
      $(".compartilhamento").css('display', 'flex');
    } else {
      // Animação para ocultar suavemente
      $(".btn-compartilhar").fadeOut(600, function() {
        $(this).css('display', 'none'); // Certifique-se de que o display seja 'none' após a animação
      });
      $(".compartilhamento").fadeOut(600, function() {
        $(this).css('display', 'none'); // Certifique-se de que o display seja 'none' após a animação
      });
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





/*function abrirLink(url) {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Se estiver em um dispositivo móvel, tentamos abrir o link diretamente
    window.location.href = url;
  } else {
    // Se estiver em um computador, abrimos o link em uma nova aba do navegador
    window.open(url, '_blank');
  }
}*/


/*function extrairIdDaImagem(imagemUrl) {
  // Extrai o ID da imagem do URL
  var idMatch = imagemUrl.match(/\/(\d+)\.jpg$/);
  if (idMatch) {
    return idMatch[1];
  } else {
    return null;
  }
}*/

$('#filtro').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'pesquisa.html';
});

$('#calendario-feed').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'calendario-feed.html';
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('.header1').outerHeight();
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
            $('.header1').removeClass('header-down').addClass('header-up');
            isVisible = false;
        }
    } else {
        // Rolagem para cima
        if (st < lastScrollTop) {
            $('.header1').removeClass('header-up').addClass('header-down');
            isVisible = true;
        }
    }

    lastScrollTop = st;
}


//teste compartilhamento

// ngrok http 3001


/*$('#shareBtn').click(function() {
  FB.ui({
      method: 'share',
      href: 'https://88f2-170-245-17-160.ngrok-free.app/teste.html?a=https://flavorosa.com.br/templo/img/layout/5_lote_media.webp', // URL que você deseja compartilhar
  }, function(response){
      if (response && !response.error_message) {
          alert('Compartilhado com sucesso!');
      } else {
          alert('Erro ao compartilhar.');
      }
  });
});*/

function opcoesOrigemMenu(){
  const origem = window.sessionStorage.getItem('feed-origem-igreja');
  console.log(origem);
  if(origem == "igrejas"){
    $("#backLista").css('display', '');
  }
}



// - - - - - - - - - - - -- - - - - - - - -- - - - - -



window.fbAsyncInit = function() {
  FB.init({
      appId      : '290798843855905', // Substitua pelo seu appId
      cookie     : true,
      xfbml      : true,
      version    : 'v11.0'
  });
};

//$('#shareBtn').click(function() {
  //testeCompartilhamento();
//});

$('#compartilhaFace').click(function() {
  testeCompartilhamento();
});

function loginWithFacebook() {
  const clientId = '290798843855905';
  const redirectUri = 'https://88f2-170-245-17-160.ngrok-free.app/feed.html';
  const state = 'xyz123';
  const authUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  window.location.href = authUrl;
}

function testeCompartilhamento(){

  $.ajax({
    url: 'https://graph.facebook.com/v11.0/me/feed',
    type: 'POST',
    data: {
        access_token: tokenFacebook,
        message: 'Sua mensagem aqui'
    },
    success: function(response) {
        console.log('Publicação criada com sucesso!', response);
    },
    error: function(error) {
        console.error('Erro ao criar publicação', error);
    }
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const code = getQueryParam('code');

if (code) {
  // Agora você deve trocar o código por um token de acesso
  fetchAccessToken(code);
}



function fetchAccessToken(code) {
  const clientId = '290798843855905';
  const clientSecret = '457576dfb7884d973b09a8826af28436';
  const redirectUri = 'https://88f2-170-245-17-160.ngrok-free.app/feed.html';

  $.ajax({
      url: `https://graph.facebook.com/v11.0/oauth/access_token`,
      type: 'GET',
      data: {
          client_id: clientId,
          redirect_uri: redirectUri,
          client_secret: clientSecret,
          code: code
      },
      success: function(data) {
          if (data.access_token) {
              // Armazene o token de acesso, por exemplo, em localStorage
              //localStorage.setItem('fb_access_token', data.access_token);
              tokenFacebook = data.access_token;
              console.log('Access token:', data.access_token);
              // Redirecionar ou realizar outra ação após o login
          } else {
              console.error('Erro ao obter token de acesso:', data);
          }
      },
      error: function(xhr, status, error) {
          console.error('Erro na requisição:', error);
      }
  });
}







// Função para publicar no Facebook
function postToFacebook() {
    // 1. Carregar a imagem para o Facebook
    $.ajax({
        url: `https://graph.facebook.com/v11.0/me/photos`,
        type: 'POST',
        data: {
            access_token: tokenFacebook,
            url: 'https://flavorosa.com.br/templo/img/layout/3_lote_media.webp', // URL da imagem
            caption: 'Esta é a minha mensagem com uma imagem!' // Legenda da imagem
        },
        success: function (response) {
            console.log('Publicação de imagem realizada com sucesso!', response);
        },
        error: function (error) {
            console.error('Erro ao publicar imagem:', error);
        }
    });
}