var players = {};



$(document).ready(function () {
  //navigator.geolocation.getCurrentPosition(function(data){console.log(data)})
  $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
  cidade_id = window.sessionStorage.getItem("cidade_id");
  window.sessionStorage.setItem('igreja_id','');

  if(cidade_id != null && cidade_id != ''){
      //get_paroquias(cidade_id);
  }
  evento_agenda();
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
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_feed",
     
    })
    .done(function(ret) {
      var html = '';
      var classVideo = 0;
      var obj = jQuery.parseJSON(ret);
      $.each(obj.lista_feed, function (k, lpp) {
        
        classVideo ++;
        html = montaHtmlVideo(classVideo);
        if(classVideo < 2){
          //$("#divHistoria").append(html);
          //readyVideo(classVideo);
        }
        html = montaHtml(lpp, k);
        $("#divHistoria").append(html);
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

$('#filtro').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'pesquisa.html';
});

$('#calendario-feed').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'calendario-feed.html';
});