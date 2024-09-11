var searchParams = new URLSearchParams(window.location.search);
descricao = searchParams.get("a");
dataFeed = searchParams.get("b");
imagem = searchParams.get("c");
console.log(descricao);
console.log(imagem);
console.log(dataFeed);
atualizarMetaTagsOG(descricao,imagem);

function atualizarMetaTagsOG(description, imageUrl) {
  var ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  var ogImageTag = document.querySelector('meta[property="og:image"]');

  if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', description);
  }
  //if (ogUrlTag) {
      //ogUrlTag.setAttribute('content', url);
  //}
  if (ogImageTag) {
      ogImageTag.setAttribute('content', imageUrl);
  }
}

function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_feed",
     
    })
    .done(function(ret) {
      var html = '';
      var classVideo = 0;
      var obj = jQuery.parseJSON(ret);
      
        html = montaHtml(lpp, k);
        $("#divFeed").append(html);
      });
}



function montaHtml(linha) {
    var html = "";
  
    html += '<div data-feed="' + linha.agenda_id + '" class="div_publicacao">';
    html += '<div class="feed_principal">';
    html += '<div class="div_feed_secundario">';
    html += '<div>';
    html += '<div style="display: flex; justify-content: space-between;">';
    html += '<a class="div_perfil" >';
    html += '<div class="perfil_div" data-igreja_id = "' + linha.igreja_id + '">';
    html += '<img class="img_igreja" src="' + linha.igreja_logo + '">';
    html += '<span class="nome_igreja">';
    html += linha.igreja_nome;
    html += '</span>';
    html += '</div>';
    html += '</a>';
  
    html += '<div style="border: 1px solid black; align-items: center; display: grid; padding-right: 10px; padding-left: 10px; font-family: exo;">';
    html += '<span id="dia_evento" style="font-size: 1.2rem; color: grey; display: flex; justify-content: center;">';
    html += formata_dia(linha.data_evento);
    html += '</span>';
    html += '<span id="hora_evento" style="font-size: 1.2rem; color: grey; display: flex; justify-content: center;">';
    html += formata_hora(linha.data_evento);
    html += '</span>';
    html += '</div>';
  
    html += '</div>';
    html += '<div class="div_layout_feed">';
    html += '<a class="a_img_layout">';
    html += '<img class="img_layout_feed" src="' + linha.agenda_img + '">';
    html += '</a>';
    html += '<div class="div_descricao">';
    html += '<span class="span_descricao">';
    html += linha.descricao_evento;
    html += '</span>';
    html += '</div>';
    html += '</div>';
    html += '<div class="div_rodape_feed">';
    html += '<div class="rodape_feed_botao">';
    html += '<span class="fa-solid fa-share-nodes span_rodape_botao">';
    html += '</span>';
    html += '</div>';
    html += '<div class="compartilhamento">';
    html += ' <a href="#" class="btn-compartilhar btn-whatsapp">';
    html += '<img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/brands/whatsapp.svg" alt="Compartilhar via WhatsApp">';
    html += '</a>';
    html += ' <a href="#" class="btn-compartilhar btn-facebook">';
    html += ' <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/brands/facebook.svg" alt="Compartilhar no Facebook">';
    html += '</a>';
    html += ' <a href="#" class="btn-compartilhar btn-instagram">';
    html += '<img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/brands/instagram.svg" alt="Compartilhar no Instagram">';
    html += '</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  
    $("#divFeed").append(html);
  }