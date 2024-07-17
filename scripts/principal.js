$(document).ready(function () {
    eventos_principal();
  });

function eventos_principal(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_eventos_principal",
     
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
        html +=        '<div id="agenda" class="agenda">';
        html +=             '<div>';
        html +=                 '<img id="div_img" src="'+agenda.agenda_img+'">';
        html +=             '</div>';
        html +=             '<div id="descricao">';
        html +=                 '<span class="span_nome_igreja">';
        html +=                     agenda.igreja_nome;
        html +=                 '</span>';
        html +=                 '<span class="span_agenda">';
        html +=                     formata_dia(agenda.agenda_horario) +' ás '+ formata_hora(agenda.agenda_horario);
        html +=                 '</span>';
        html +=             '</div>';
        html +=         '</div>';
        });

        html +=      '</div>';
        html += '</div>';
        
        
      });
      $("#eventos").html(html);
    });
}