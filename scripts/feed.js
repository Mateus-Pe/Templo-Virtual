evento_agenda();
function evento_agenda(){
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
        html += '<a class="div_perfil">';
        html += '<img class="img_igreja" src="'+lpp.igreja_logo+'">';
        html += '<span class="nome_igreja">';
        html += lpp.igreja_nome;
        html += '</span>';
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
     

      $("#divHistoria").html(html);

     
  });
}