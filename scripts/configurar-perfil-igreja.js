igrejaId = "" ;
//evento_agenda();


$(document).ready(function() {

  carregar_perfil();
  carregar_feed();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  if(igrejaId != null && igrejaId != ''){
    carregarIgreja();
  }
  
});


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
      html += '<span id="contato_da_igreja" class="endereco_igreja" style="display: flex; align-items: center;">';
      html += 'Contatos';
      html += '<span class="material-symbols-outlined" style="position: relative; left: 1rem; font-size: 20px; color: darkred;">';
      html += 'edit';
      html += '</span>';
      html += '</span>';
      html += '<div class="contatos">';
      html += '</div>';
      html += '</a>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      $("#divPerfil").html(html);
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


$("#contato_da_igreja").click(function(e){
    $("#modal_contato").show();
    
  });
  $("#confirmar").click(function(e){
    $("#modal_contato").hide();
  });



// Função para mostrar ou ocultar a div com base no valor do campo de texto
function toggleDivVisibility(value, targetDiv) {
  if (value.trim() !== "") {
      targetDiv.show();
      targetDiv.css("display", "flex");

  } else {
      targetDiv.hide();
      targetDiv.css("display", "none");
  }
}


const imagens = {
  whatsapp: './imgs/whatsapp.png',
  facebook: './imgs/facebook.png',
  //instagram: 'URL_DA_IMAGEM_INSTAGRAM',
  //email: 'URL_DA_IMAGEM_GMAIL'
};

function atualizarContatos() {
  const campos = ['whatsapp_txt', 'facebook_txt', 'instagram_txt', 'email_txt'];
  const divs = ['.div_whats', '.div_face', '.div_insta', '.div_email'];

  $('.contatos').empty();

  campos.forEach((campo, index) => {
    const valor = $('#' + campo).val().trim();
    if (valor !== '') {
      const divContato = $('<div class="contato"></div>');
      const imgContato = $('<img src="' + imagens[campo.split('_')[0]] + '">');
      divContato.append(imgContato);
      const spanContato = $('<span></span>');
      spanContato.text(valor);
      divContato.append(spanContato);

      const linhaAtual = $('<div class="linha"></div>');
      linhaAtual.append(divContato);

      $('.contatos').append(linhaAtual);
    }
  });
}

/*$('#whatsapp_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_whats'));
  atualizarContatos();
});

$('#whatsapp_txt').on('keyup', function(event) {
  mascaraTelefone(event);

});*/

$('#facebook_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_face'));
  atualizarContatos();
});

$('#instagram_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_insta'));
  atualizarContatos();
});

$('#email_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_email'));
  atualizarContatos();
});

$('#btn_salvar').on('click', function() {
  salvar();
});

function salvar(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_perfil_igreja",
    data: {
      igreja_id : igrejaId,
      igreja_desc_resumida: $('#txt_desc_resumida').val(),
      igreja_whats: $('#whatsapp_txt').val(),
      igreja_face: $('#facebook_txt').val(),
      igreja_instagram: $('#instagram_txt').val(),
      igreja_email: $('#email_txt').val()
      
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      if(obj.status == '1'){
        
       window.location = "lista-igreja.html";
       console.log(obj);
      }
    });
}


function carregarIgreja(){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_igreja_by_id",
    data: {
      igreja_id : igrejaId
     
    }
  })
    .done(function (ret) {
      var obj = jQuery.parseJSON(ret);
      
      if(obj.status == '1'){
        $('#whatsapp_txt').val(obj.igreja.igreja_whats);
        $('#facebook_txt').val(obj.igreja.igreja_face);
        $('#instagram_txt').val(obj.igreja.igreja_instagram);
        $('#email_txt').val(obj.igreja.igreja_email);
        $('#txt_desc_resumida').val(obj.igreja.igreja_desc_resumida);
        $("#nome_da_igreja").text(obj.igreja.igreja_nome);
        $("#endereco_da_igreja").text(obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade);
        atualizarContatos();
        alterar_desc_resumida();
      }

    });
}


$("#editar").click(function(e){
  $("#modal_editar").show();
  
});
$("#confirmar1").click(function(e){
  alterar_desc_resumida();
  $("#modal_editar").hide();
});

function alterar_desc_resumida(){
  $("#desc_resumida").html($("#txt_desc_resumida").val());
}


function mascaraTelefone(event) {
  let tecla = event.key;
  let telefone = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      telefone = telefone + tecla;
      let tamanho = telefone.length;

      if (tamanho >= 12) {
          return false;
      }
      console.log('chamou');
      if (tamanho > 10) {
          telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (tamanho > 5) {
          telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (tamanho > 2) {
          telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
          telefone = telefone.replace(/^(\d*)/, "($1");
      }
console.log(telefone);
      event.target.value = telefone;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}