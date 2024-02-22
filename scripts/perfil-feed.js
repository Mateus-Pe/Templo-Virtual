if(window.sessionStorage.getItem('igreja_id') != '' && window.sessionStorage.getItem('igreja_id') != null){
  carregar_perfil();
  carregarIgreja(window.sessionStorage.getItem('igreja_id'));
}

// Função para carregar o perfil
function carregar_perfil(){
  var html = '';

    html += '<div class="perfil" style="width: 100%; height: 70%;">';
    html += '<div class="div_imgFundo_perfil">';
    html += '<div class="imgFundo_perfil">';
    html += '</div>';
    html += '</div>';
    html += '<div id="imagem_igreja" class="div_img_igreja">';
    html += '<img class="img_igreja1" src="https://www.pedeoferta.com.br/mercado/img/igreja/missa.png">';
    html += '</div>';
    html += '<div class="div_publicacao">';
    html += '<div class="feed_principal">';
    html += '<div class="div_feed_secundario">';
    html += '<div>';
    html += '<div>';
    html += '<a class="a_div_perfil">';
    html += '<div>';
    html += '<h1 id="nome_da_igreja" class="nome_da_igreja">';
    html += '</h1>';
    html += '</div>';
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
    html += '<div class="contatos">';
    html += '<span id="whatsapp_txt" class="contato"></span>';
    html += '<span id="facebook_txt" class="contato"></span>';
    html += '<span id="instagram_txt" class="contato"></span>';
    html += '<span id="email_txt" class="contato"></span>';
    html += '</div>';
    html += '</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $("#divPerfil").html(html);
}

 


  function carregarIgreja(igrejaId){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_igreja_by_id",
      data: {
        igreja_id : igrejaId
       
      }
    })
      .done(function (ret) {
        var obj = jQuery.parseJSON(ret);
  
        console.log("Dados da igreja recebidos:", ret);
        
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
  
          nomeIgrejaVerificado = obj.igreja.igreja_nome;
  
          var nomeIgreja = obj.igreja.igreja_nome;
          $('#nome_igreja').val(nomeIgreja);
        }
  
      });
  }

  const imagens = {
    whatsapp: './imgs/whatsapp.png',
    facebook: './imgs/facebook.png',
    instagram: './imgs/instagram.png',
    email: './imgs/email.png',
  };
  
  function atualizarContatos() {
    const contatos = [
      { tipo: 'whatsapp', valor: $('#whatsapp_txt').val().trim() },
      { tipo: 'facebook', valor: $('#facebook_txt').val().trim() },
      { tipo: 'instagram', valor: $('#instagram_txt').val().trim() },
      { tipo: 'email', valor: $('#email_txt').val().trim() }
    ];
  
    $('.contatos').empty();
  
    contatos.forEach(contato => {
      if (contato.valor !== '') {
        const divContato = $('<div class="contato"></div>');
        const imgContato = $('<img src="' + imagens[contato.tipo] + '">');
        divContato.append(imgContato);
        const spanContato = $('<span></span>');
        spanContato.text(contato.valor);
        divContato.append(spanContato);
  
        $('.contatos').append(divContato);
      }
    });
  }