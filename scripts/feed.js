var players = {};

evento_agenda();
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
          $("#divHistoria").append(html);
          readyVideo(classVideo);
        }
        html = montaHtml(lpp);
        $("#divHistoria").append(html);
      });
      

      configurarEventos();
      iniciarIntersectionObserver();
      
    });
}

function montaHtml(linha){
  
     var html = "";
     
        html += '<div class="div_publicacao">';
        html += '<div class="feed_principal">';
        html += '<div class="div_feed_secundario">';
        html += '<div>';
        html += '<div>';
        html += '<a class="div_perfil" >';
        html += '<div class="perfil_div" data-igreja_id = "'+linha.igreja_id+'">';
        html += '<img class="img_igreja" src="'+linha.igreja_logo+'">';
        html += '<span class="nome_igreja">';
        html += linha.igreja_nome;
        html += '</span>';
        html += '</div>';
        html += '</a>';
        html += '</div>';
        html += '<div class="div_layout_feed">';
        html += '<a class="a_img_layout">';
        html += '<img class="img_layout_feed" src="'+linha.agenda_img+'">';
        html += '</a>';
        html += '<div class="div_descricao">';
        html += '<span class="span_descricao">';
        html += linha.descricao_evento;
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

        
      return html;
}

function montaHtmlVideo(classVideo){
  var html = '';
     
     
        html += '<div class="div_publicacao">';
        html += '<div class="feed_principal">';
        html += '<div class="div_feed_secundario">';
        html += '<div>';
        html += '<div>';
        html += '<a class="div_perfil" >';
        html += '<div class="perfil_div" data-igreja_id = "1">';
        html += '<img class="img_igreja" src="/imgs/imgs-igreja/igreja.png">';
        html += '<span class="nome_igreja">';
        html += 'Nossa Senhora de Fátima Socorro';
        html += '</span>';
        html += '</div>';
        html += '</a>';
        html += '</div>';
        html += '<div class="div_layout_feed">';
        html += '<a class="a_img_layout">';
        html += '<div id="video_'+ classVideo +'" class="video-hover-trigger"></div>';
        html += '</a>';
        html += '<div class="div_descricao">';
        html += '<span class="span_descricao">';
        html += 'Fique a seguir com o video';
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

        
      
      return html;
}

function configurarEventos(){
  $(".perfil_div").click(function(){
    window.sessionStorage.setItem('igreja_id',$(this).data("igreja_id"));
    location.href = "perfil-igreja.html";
  });

  $(window).scroll(function() {
    //if(($(window).scrollTop() % 500)== 0){
      /*if(sessionStorage.getItem('arrayOfertaAcesso') != null && sessionStorage.getItem('arrayOfertaAcesso') != ''){
        arrayOfertaAcesso = JSON.parse(sessionStorage.getItem('arrayOfertaAcesso')); 
      }else{
        arrayOfertaAcesso = [];
      }
     console.log($(window).scrollTop());
     console.log(JSON.parse(sessionStorage.getItem('arrayOfertaAcesso')));*/
    
      
     $('.div_publicacao').each(function(){
        if($(this).position().top < $(window).scrollTop() && jQuery.inArray($(this).data('oferta_cod'), arrayOfertaAcesso) == -1){
          arrayOfertaAcesso.push($(this).data('oferta_cod'));
          acesso_oferta();
          //sessionStorage.setItem('arrayOfertaAcesso', JSON.stringify(arrayOfertaAcesso));
          
          //console.log($(this).data('oferta_cod'));
        }
     });
    //}
    });
}


$('#cidade_nome').click(function () {
  //sessionStorage.setItem('origem', 'feed');
  window.location = 'estado.html?req=feed';
});


$(document).ready(function () {
  //navigator.geolocation.getCurrentPosition(function(data){console.log(data)})
  $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
  cidade_id = window.sessionStorage.getItem("cidade_id");
  window.sessionStorage.setItem('igreja_id','');

  if(cidade_id != null && cidade_id != ''){
      //get_paroquias(cidade_id);
  }
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
      width: '390',
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
