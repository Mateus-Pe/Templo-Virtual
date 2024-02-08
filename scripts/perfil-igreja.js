carregar_feed();
evento_agenda();
carregar_perfil();
function carregar_feed(){
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
     

      $("#divFeed").html(html);

     
  });
}

function carregar_perfil(){
    var html = '';
  
      html += '<div id="imagem_igreja" class="div_img_igreja">';
      html += '<img class="img_igreja1" src="https://www.pedeoferta.com.br/mercado/img/igreja/missa.png">';
      html += '</div>';
      html += '<div class="div_publicacao">';
      html += '<div class="feed_principal">';
      html += '<div class="div_feed_secundario">';
      html += '<div>';
      html += '<div>';
      html += '<a class="a_div_perfil">';
      html += '<h1 id="nome_da_igreja" class="nome_da_igreja">';
      html += 'Santa Rita de Cassia';
      html += '</h1>';
      html += '<span class="abrir_map">';
      html += '<span id="localizacao" data-lat="-23.6029417" data-long="-48.0633432" >';
      html += 'Ver no mapa';
      html += '</span>';
      html += '<span class="material-symbols-outlined icone_editar ion_map">';
      html += 'location_on';
      html += '</span>';
      html += '</span>';
      html += '<span id="endereco_da_igreja" class="endereco_igreja">';
      html += 'Rua da igreja, 78, Vila Santana, Sorocaba';
      html += '</span>';
      html += '<span id="contato_da_igreja" class="endereco_igreja">';
      html += '(15)99836-7365';
      html += '</span>';
      html += '<span id="comunidade" class="endereco_igreja">';
      html += 'Comunidade';
      html += '</span>';
      html += '</a>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      $("#divPerfil").html(html);
}
   






function evento_agenda() {
  $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja_by_id",
  })
  .done(function(ret) {
      var obj = jQuery.parseJSON(ret);
      console.log(obj);

      var html = '';
      html += '<section class="regular slider">';

      $.each(obj.lista_igreja, function (k, lpp) {
          html += '<a data-igreja-id="'+lpp.igreja_id+'" class="produtos_perfil"><div class="divPerfilEC" style="opacity: 0.5;height: 90px; display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
          html += '<div style="display: grid;">';
          html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.igreja_logo+'" style="height:50px"/></div>';
          html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;">'+abreviarNomeIgreja(lpp.igreja_nome)+'</span></div>';
          html += '</div></a>';
      });
      html += '</section>';

      $("#divHistoria").html(html);

      slick();
      $('#carregando').hide();

      $('.produtos_perfil').click(function(e) {
          $('.divPerfilEC').removeClass('perfil_ec_selected');
          $(this).children().addClass('perfil_ec_selected');

          var igrejaId = $(this).data('igreja-id');

          var igrejaSelecionada = obj.lista_igreja.find(function(igreja) {
              return igreja.igreja_id == igrejaId;
          });

          $("#nome_da_igreja").text(igrejaSelecionada.igreja_nome);
          $("#endereco_da_igreja").text(igrejaSelecionada.igreja_endereco_logradouro + ", " + igrejaSelecionada.igreja_endereco_numero + ", " + igrejaSelecionada.igreja_endereco_bairro + ", " + igrejaSelecionada.igreja_endereco_cidade);
          $("#imagem_igreja img").attr("src", igrejaSelecionada.igreja_logo);

      });
  });
}

  function slick(){
    $(".regular").slick({
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2
    });

  }


  
  function abreviarNomeIgreja(nome) {
    var palavras = nome.split(' ');
    var nomeAbreviado = '';

    for (var i = 0; i < palavras.length; i++) {
        if (nomeAbreviado.length + palavras[i].length <= 15) {
            nomeAbreviado += palavras[i] + ' ';
        } else {
            nomeAbreviado = nomeAbreviado.trim() + ' ' + (palavras[i][0] || '') + '.';
            for (var j = i + 1; j < palavras.length; j++) {
                nomeAbreviado += ' ' + (palavras[j][0] || '') + '.';
            }
            break;
        }
    }

    // Remover os pontos no final se não houverem mais palavras
    nomeAbreviado = nomeAbreviado.trim().replace(/\.$/, '');

    return nomeAbreviado.trim();
}




function marker(lat, lng, img) {
  var myLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng
  });
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: ''
  });

  // Ajuste o modal para exibir com base na posição clicada
  var modal = document.querySelector('#modal_addproduto');
  $(modal).css('display', 'block');
}



$("#localizacao").click(function(e) {
  var lat = $(this).data('lat');
  var lng = $(this).data('long');
  marker(lat, lng, '');
 $('#modal_addproduto').show(); 
});
$(".modal_close").click(function(e) {
 $('#modal_addproduto').hide(); 
});