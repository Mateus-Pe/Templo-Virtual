var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('.div_bottom_fixa').outerHeight();
var isVisible = true;

$(document).ready(function () {
  //solução provisória
    window.sessionStorage.setItem('cidade_id', 9240);
    window.sessionStorage.setItem("cidade_nome", "Itapetininga");
    eventos_principal();
});

function eventos_principal(){
    $.ajax({
      method: "POST",
      url: "https://flavorosa.com.br/templo/index.php/welcome/get_eventos_principal",
     
    })
    .done(function(ret) {
      var html = '';
      var obj = jQuery.parseJSON(ret);
      $.each(obj.eventos_agenda_principal, function (k, evento) {
        var eventType = evento.evento_nome.toLowerCase();
        
        html += '<div id="'+eventType+'" class="div_evento">';
        html +=     '<div id="evento">';
        html +=         evento.evento_nome;
        html +=     '</div>';
        html +=     '<div id="horizontal_eventos">';

        $.each(evento.agendas, function (k, agenda) {
        html +=        '<div id="agenda" class="agenda" data-agenda_id="'+agenda.agenda_id+'">';
        html +=             '<div class="div_principal_eventos">';
        html +=               '<div class="div_agenda">'
        html +=                   '<span class="span_agenda span_agenda_left">';
        html +=                       dateText(splitDateTime(agenda.agenda_horario).date);
        html +=                   '</span>';
        html +=                   '<span class="span_agenda span_agenda_right">';
        html +=                       timeFormat(splitDateTime(agenda.agenda_horario).time, ':', true);
        html +=                   '</span>';
        html +=               '</div>'
        html +=               '<img id="div_img" src="'+agenda.agenda_img+'">';
        html +=               '<div id="nome_evento_outros">';
        html +=                   '<span class="span_nome_evento_outros">';
        html +=                     agenda.agenda_evento_outro;
        html +=                   '</span>';
        html +=               '</div>';
        html +=             '</div>';
        html +=             '<div id="descricao">';
        html +=                 '<span class="span_nome_igreja">';
        html +=                     agenda.igreja_nome;
        html +=                 '</span>';
        html +=             '</div>';
        html +=         '</div>';
        });
        html +=      '</div>';
        html +=      '<div class="div_ver_mais_white">';
        html +=         '<span>';
        html +=             'Ver mais';
        html +=         '</span>';
        html +=      '</div>';
        html += '</div>';
        
        
      });
      $("#eventos").html(html);
      configurarEventos();
    });
}


function configurarEventos(){
  $(".div_ver_mais_white").click(function(){
    location.href = "calendario-feed.html";
  });

  $('.agenda').click(function(e){
    getAgendaById($(this).data('agenda_id'))
    $("#modalPublicacaoEvento").show();
  });
}

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
            $('.div_bottom_fixa').removeClass('faixa-down').addClass('faixa-up');
            isVisible = false;
        }
    } else {
        // Rolagem para cima
        if (st < lastScrollTop) {
            $('.div_bottom_fixa').removeClass('faixa-up').addClass('faixa-down');
            isVisible = true;
        }
    }

    lastScrollTop = st;
}

window.addEventListener('scroll', () => {
  const fadeBox = document.querySelector('.fade-box');
  const scrollPosition = window.scrollY; // Distância da rolagem
  const fadeThreshold = 350; // Ajuste para o momento de começar a "sumir"

  // Calcular opacidade baseada na rolagem
  let opacity = 1 - scrollPosition / fadeThreshold;
  if (opacity < 0) opacity = 0; // Não deixar a opacidade negativa
  if (opacity > 1) opacity = 1; // Nem maior que 1

  fadeBox.style.opacity = opacity;
});

$('.filterSelect').click(function () {
  var selectedType = $(this).text().toLowerCase().trim(); // Obter o texto clicado, ex: "missas"
  var target = document.getElementById(selectedType); // Pegar o elemento correspondente pelo ID
  var targetPosition = target.offsetTop;
  var offset = 50;

  if (target) {
      // Scroll suave até o elemento
      target.scrollIntoView({
          top: targetPosition - offset,
          behavior: 'smooth', // Suaviza o movimento
          //block: 'start', // Alinha o elemento no topo
      });
  } else {
      console.warn('Nenhum evento correspondente encontrado.');
  }
});

$('#pesquisar').click(function(e){
  window.location = 'pesquisa.html'
});

$('#calendario').click(function(e){
  window.location = 'calendario-feed.html'
});

$('#feed').click(function(e){
  window.location = 'feed.html'
});

