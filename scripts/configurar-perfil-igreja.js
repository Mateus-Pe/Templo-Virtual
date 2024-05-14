igrejaId = "" ;
nomeIgrejaVerificado = "";
//evento_agenda();


$(document).ready(function() {

  carregar_perfil();
  //carregar_feed();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  if(igrejaId != null && igrejaId != ''){
    carregarIgreja();
  }
  
  carregarIgreja();

  $('#nome_igreja').on('input', verificarNomeIgreja);
});


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
      html += '<div>';
      html += '<h1 id="nome_da_igreja" class="nome_da_igreja">';
      html += '</h1>';
      html += '<span id="descricao_igreja" class="material-symbols-outlined" style="font-size: 20px; color: darkred; position: relative; left: 1rem; top: 1rem;">edit</span>'
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

  $("#nome_da_igreja").click(function(e){
    $("#modal_descricao").show();
  });

  $("#descricao_igreja").click(function(e){
    $("#modal_descricao").show();
  });

  $("#ok").click(function(e){
    $("#modal_descricao").hide();
  });

  $("#nome_igreja").on("input", function() {
    var novoNome = $(this).val();
    $("#nome_da_igreja").text(novoNome);
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
  instagram: './imgs/instagram.png',
  email: './imgs/email.png',
};

function atualizarContatos() {
  const campos = ['whatsapp_txt', 'facebook_txt', 'instagram_txt', 'email_txt'];

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

      $('.contatos').append(divContato);
    }
  });
}

/*$('#whatsapp_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_whats'));
  atualizarContatos();
});
*/
$('#whatsapp_txt').on('keyup', function(event) {
  mascaraTelefone(event);
  
});

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
  var descResumida = $('#txt_desc_resumida').val().trim();

  if (descResumida === ''){
    $('#modal_validacao').show();
  } else{
    
    salvar();
  }
});

$('#btnFecharModal').on('click', function(){
  $('#modal_validacao').hide();
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

        nomeIgrejaVerificado = obj.igreja.igreja_nome;

        var nomeIgreja = obj.igreja.igreja_nome;
        $('#nome_igreja').val(nomeIgreja);
      }

    });
}

function verificarNomeIgreja() {
  var novoNome = $('#nome_igreja').val().trim();
  
  if (novoNome === "") {
    $("#nome_da_igreja").text(nomeIgrejaVerificado);
  }
}


$("#perfil_desc_resumida").click(function(e){
  $("#modal_editar").show();
  
});

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
  let telefone = event.target.value.replace(/\D+/g, ""); 

  if (["Backspace", "Delete"].includes(event.key)) {
      event.preventDefault(); 
      if (telefone.length > 0) {
          telefone = telefone.slice(0, -1); 
      }
  } else if (telefone.length >= 12) {
      event.preventDefault(); 
      return false;
  }

  let telefoneFormatado = '';

  if (telefone.length > 2) {
      telefoneFormatado = '(' + telefone.substring(0, 2) + ') ';
      if (telefone.length > 7) {
          telefoneFormatado += telefone.substring(2, 7) + '-' + telefone.substring(7, 11);
      } else {
          telefoneFormatado += telefone.substring(2, telefone.length);
      }
  } else {
      telefoneFormatado = telefone;
  }

  event.target.value = telefoneFormatado; 
}

$('#txt_desc_resumida').on('input', function() {
  var maxLength = 20; 
  var text = $(this).val();
  
  if (text.length > maxLength) {
      $(this).val(text.substring(0, maxLength));
  }
});

//menu

$('.page-menu--toggle').click(function(e){

  e.preventDefault();

  if($(this).hasClass('page-menu__hamburger--open')){

      
      $('.mobile-nav').css('display', 'none');
      $('#imagem_igreja').css('top', '2.6rem');
      $('.div_btn-salvar').css('bottom', '30px');
      
  }
  else{

    $('.mobile-nav').css('display', 'block');
    $('#imagem_igreja').css('top', '2.49rem');
    $('.div_btn-salvar').css('bottom', '0px');

  }

  $(this).toggleClass('page-menu__hamburger--open');

  $('.page-menu').toggleClass('disabled');

  $('body').toggleClass('disabled');

  $('body').toggleClass('no-scroll');


  efeitoBlur()

});







function efeitoBlur(){

  $('main').toggleClass('is-blur');

  $('.show-search').toggleClass('is-blur');

  $('.categories').toggleClass('is-blur');

  $('.options').toggleClass('is-blur');

  $('.search-market').toggleClass('is-blur');

  $('.perfil').toggleClass('is-blur');


}



//Verifica o item clicado no sidemenu

$('.mobile-nav__items li a').click(function(){

  var classeItemMenu = $(this).attr('class');



  if(classeItemMenu == 'mobile-nav__link-produtos'   ||

     classeItemMenu == 'mobile-nav__link-categorias' ||

     classeItemMenu == 'mobile-nav__link-mercados'){

      setStorageMenu(classeItemMenu);

      window.location = 'vitrine-geral.html';

  }

});



function setStorageMenu(item_menu) {

  sessionStorage.setItem("item_menu", item_menu);

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


var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('header').outerHeight();
var isVisible = true;

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
            $('header').removeClass('header-down').addClass('header-up');
            isVisible = false;
        }
    } else {
        // Rolagem para cima
        if (st < lastScrollTop) {
            $('header').removeClass('header-up').addClass('header-down');
            isVisible = true;
        }
    }

    lastScrollTop = st;
}