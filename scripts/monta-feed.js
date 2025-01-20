const dias = [
    { 'id': 1, 'name': 'Segunda' },
    { 'id': 2, 'name': 'Terça' },
    { 'id': 3, 'name': 'Quarta' },
    { 'id': 4, 'name': 'Quinta' },
    { 'id': 5, 'name': 'Sexta' },
    { 'id': 6, 'name': 'Sábado' },
    { 'id': 0, 'name': 'Domingo' },
  ];
  
  const months = [
    { 'id': 1, 'name': 'Jan' },
    { 'id': 2, 'name': 'Fev' },
    { 'id': 3, 'name': 'Mar' },
    { 'id': 4, 'name': 'Abr' },
    { 'id': 5, 'name': 'Mai' },
    { 'id': 6, 'name': 'Jun' },
    { 'id': 7, 'name': 'Jul' },
    { 'id': 8, 'name': 'Ago' },
    { 'id': 9, 'name': 'Set' },
    { 'id': 10, 'name': 'Out' },
    { 'id': 11, 'name': 'Nov' },
    { 'id': 12, 'name': 'Dez' },
  ];

function montaHtml(linha, i) {
  var html = "";
  var postId = 'post_' + i;

  html += '<div id="' + postId + '" data-feed="' + linha.agenda_id + '" class="div_publicacao">';
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

  html += '<div style="border: 1px solid black; align-items: center; display: grid; padding-right: 10px; padding-left: 10px; font-family: exo; margin-top: 2px; margin-right: 2px;">';
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
  //html += ' <a href="#" class="btn-compartilhar btn-instagram">';
  //html += '<img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/brands/instagram.svg" alt="Compartilhar no Instagram">';
  //html += '</a>';
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
        html += '<span class="fa-solid fa-share span_rodape_botao">';
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


function formata_hora(data){
    //var data =  window.sessionStorage.getItem('data_referencia');
    var hashdata = data.split("-");
    ano = hashdata[0];
    mes = hashdata[1];
    D = hashdata[2];
    H = hashdata[3];
    hoje = new Date();
    S = new Date(ano,mes -1,D).getUTCDay();
    date_ref = new  Date(ano,mes -1,D);
    diff = new Date(date_ref - hoje);
    diff_days = diff/1000/60/60/24;
  
  
      strHora = H;
      return strHora;
  }
  
  
  
  function formata_dia(data){
    //var data =  window.sessionStorage.getItem('data_referencia');
    var hashdata = data.split("-");
    ano = hashdata[0];
    mes = hashdata[1];
    D = hashdata[2];
    H = hashdata[3];
    hoje = new Date();
    S = new Date(ano,mes -1,D).getUTCDay();
    date_ref = new  Date(ano,mes -1,D);
    diff = new Date(date_ref - hoje);
    diff_days = diff/1000/60/60/24;
   
    diaName = dias.find(x => x.id === S).name;
    mes = months.find(x => x.id == mes).name;
  
    strDia = "";
    if(Math.floor(diff_days) < 7){
      if(Math.floor(diff_days) < 2){
        if(D == hoje.getDate()){
          strDia = 'Hoje';
        }
        if(parseInt(D) == parseInt(hoje.getDate()) + 1){
          strDia = 'Amanhã';
        }
      }else{
        strDia = diaName;
      }
    }
      if(parseInt(D) < 10){
        D = '0'+ parseInt(D);
      }
      if(strDia == "")
        strDia = D+"/"+mes;
  
      return strDia;
  
  }