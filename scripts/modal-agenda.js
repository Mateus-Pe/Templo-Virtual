function getAgendaById(agenda_id){
    $('body').css('overflow', 'hidden');
	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_by_agenda_id",
	   data: {  'agenda_id': agenda_id
			 }
	 })
	  .done(function(ret) {
      var obj = jQuery.parseJSON(ret);
      console.log(obj);
      htmlEvents = '';
      html =  '<div class="div_perfil" >'+
                  '<span id="back_modal" class="material-symbols-outlined">arrow_back</span>'+
                  '<div class="perfil_div" data-igreja_id="'+obj.agenda.agenda_igreja_id+'">'+
                    '<img class="img_igreja" src="' + obj.agenda.igreja_logo_url + '">'+
                    '<span class="nome_igreja">'+
                      obj.agenda.igreja_nome+
                    '</span>'+
                  '</div>'+
                  '<div style="border: 1px solid black; align-items: center; display: grid; padding-right: 10px; padding-left: 10px; font-family: exo;">'+
                    '<span id="dia_evento" style="font-size: 1.2rem; color: white; display: flex; justify-content: center;">'+
                      dateText(splitDateTime(obj.agenda.data_inicio_evento).date)+
                    '</span>'+
                    '<span id="hora_evento" style="font-size: 1.2rem; color: white; display: flex; justify-content: center;">'+
                      timeFormat(splitDateTime(obj.agenda.data_inicio_evento).time, ':', true)+
                    '</span>'+
                  '</div>'+
                '</div>'+

              '<div class="feed_principal">'+
                '<div class="div_img_layout">'+
                    '<img id="visualiza_layout_feed" src="'+obj.agenda.agenda_img+'">'+
                '</div>'+
              '</div>'+
              '<div id="divFixa"></div>';

          $("#modalPublicacaoEvento").html(html);

        htmlEvents = '<div id="horizontal_eventos">';
          $.each(obj.eventos_igreja, function (k, ei) {
            htmlEvents +=        '<div id="agenda" class="agenda_events" data-agenda_id="'+ei.agenda_id+'">';
            htmlEvents +=             '<div class="div_principal_agendas">';
            htmlEvents +=             '<div class="div_agenda">'
            htmlEvents +=                 '<span class="span_agenda span_agenda_left">';
            htmlEvents +=                     dateText(splitDateTime(ei.agenda_horario).date);
            htmlEvents +=                 '</span>';
            htmlEvents +=                 '<span class="span_agenda span_agenda_right">';
            htmlEvents +=                     timeFormat(splitDateTime(ei.agenda_horario).time, ':', true);
            htmlEvents +=                 '</span>';
            htmlEvents +=             '</div>'
            htmlEvents +=                 '<img id="div_img" src="'+ei.agenda_img+'">';
            htmlEvents +=               '<div id="nome_igreja_desc">';
            htmlEvents +=                   '<span>';
            htmlEvents +=                     ei.igreja_desc_resumida;
            htmlEvents +=                   '</span>';
            htmlEvents +=               '</div>';
            htmlEvents +=             '</div>';
            htmlEvents +=         '</div>';
        });
      htmlEvents +=      '</div>';
      htmlEvents +=      '<div class="div_ver_mais" data-igreja_id="'+obj.agenda.agenda_igreja_id+'">';
      htmlEvents +=         '<span>';
      htmlEvents +=             'Ver mais';
      htmlEvents +=         '</span>';
      htmlEvents +=      '</div>';
        
        $("#divFixa").html(htmlEvents);

        $('.div_ver_mais').click(function () {
          window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
          window.location = 'perfil-igreja.html';
          
        });

        $('.perfil_div').click(function () {
          window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
          window.location = 'perfil-igreja.html';
          
        });

        $(".agenda_events").click(function(e){
          getAgendaById($(this).data('agenda_id'));
        });

        $("#back_modal").click(function(e){
            $("#modalPublicacaoEvento").hide();
            $('body').css('overflow', 'auto');
        });
	  });
}
