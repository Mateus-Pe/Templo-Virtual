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
        
        html += '<div id="div_evento" class="div_evento">';
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

$('#pesquisar').click(function(e){
  window.location = 'pesquisa.html'
});

$('#calendario').click(function(e){
  window.location = 'calendario-feed.html'
});

$('#feed').click(function(e){
  window.location = 'feed.html'
});

