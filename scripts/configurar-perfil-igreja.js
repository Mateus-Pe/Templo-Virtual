igrejaId = "" ;
nomeIgrejaVerificado = "";
origem_imagem = "";
horarioFixoHtml = '';
editaHorarioFixo = '';
imagemVemDoBanco = false;
//evento_agenda();


$(document).ready(function() {

  carregar_perfil();
  //carregar_feed();
  igrejaId = window.sessionStorage.getItem('igreja_id');
  if(igrejaId != null && igrejaId != ''){
    carregarIgreja();
  }

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

      //html += '<div>';
      //html += '<h1 id="nome_da_igreja" class="nome_da_igreja">';
      //html += '</h1>';
      //html += '<span id="descricao_igreja" class="material-symbols-outlined" style="font-size: 20px; color: darkred; position: relative; left: 1rem; top: 1rem;">edit</span>'
      //html += '</div>';

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

      modalHorariosFixos();
      
}

function modalHorariosFixos(){

  $("#horarios_fixos").click(function(e){
    $("#modal_horarios_fixos").show();
    textoArea();
    $('body').css('overflow', 'hidden');
  });
  
  $("#close_horarios").click(function(e){
    $("#modal_horarios_fixos").hide();
    $('body').css('overflow', 'auto');
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
 $('body').css('overflow', 'auto');
});


$("#contato_da_igreja").click(function(e){
  $("#modal_contato").show();
});

$(".contatos").click(function(){
  $("#modal_contato").show();
})

$("#confirmar").click(function(e){
  $("#modal_contato").hide();
});

$(".span_criar-igreja").click(function(e){
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
  $("#span_criar-igreja").text(novoNome);
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
  let contatoAdicionado = false;

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
      contatoAdicionado = true;
    }
  });
  if(contatoAdicionado){
      $("#contato_da_igreja").removeClass('opacity_visible');
      $("#contato_da_igreja").addClass('opacity_hidden');
        $("#contato_da_igreja").css('display', 'none');
  }else{
    $("#contato_da_igreja").css('display', 'flex');
    setTimeout(function() {
    $("#contato_da_igreja").removeClass('opacity_hidden');
    $("#contato_da_igreja").addClass('opacity_visible');
    },10);
  }
}

/*$('#whatsapp_txt').on('input', function() {
  toggleDivVisibility($(this).val(), $('.div_whats'));
  atualizarContatos();
});
*/
$('#whatsapp_txt').on('keyup', function(event) {
  mascaraTelefone(event);
  atualizarContatos();
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
  //var descResumida = $('#txt_desc_resumida').val().trim();

  //if (descResumida === ''){
   // $('#modal_validacao').show();
  //} else{
    salvar();
  //}
});

$('#btnFecharModal').on('click', function(){
  $('#modal_validacao').hide();
});

function salvar(){

  var formData = new FormData();
  formData.append('igreja_id', igrejaId);
  //formData.append('igreja_desc_resumida', $('#txt_desc_resumida').val());
  formData.append('igreja_whats', $('#whatsapp_txt').val());
  formData.append('igreja_face', $('#facebook_txt').val());
  formData.append('igreja_instagram', $('#instagram_txt').val());
  formData.append('igreja_email', $('#email_txt').val());
  formData.append('igreja_horario_fixo', horarioFixoHtml);
  formData.append('file_background', $('#imageFundoFileInput')[0].files[0]);
  if(imagemVemDoBanco){
    formData.append('banco_imagem', $("#img_igreja_selected").attr('src'));
  }else{
    formData.append('file', $('#imageFileInput')[0].files[0]);
  }
  

  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_perfil_igreja",
    data: formData, 
    processData: false,
    contentType: false
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
        $("#span_criar-igreja").text(obj.igreja.igreja_nome);
        $("#endereco_da_igreja").text(obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade);
        $("#img_fundo_src").attr('src', obj.igreja.igreja_fundo_url);
        if(obj.igreja.igreja_horario_fixo != null)
          editaHorarioFixo = obj.igreja.igreja_horario_fixo;
        
        atualizarContatos();
        alterar_desc_resumida();

        nomeIgrejaVerificado = obj.igreja.igreja_nome;

        var nomeIgreja = obj.igreja.igreja_nome;
        $('#nome_igreja').val(nomeIgreja);

        if(obj.igreja.igreja_logo_url != null && obj.igreja.igreja_logo_url != ''){
          $("#img_igreja_selected").attr('src', obj.igreja.igreja_logo_url);
          $("#img_igreja_desc_resumida").attr('src', obj.igreja.igreja_logo_url);
        }

        if(obj.igreja.igreja_fundo_url != null && obj.igreja.igreja_fundo_url != ''){
          
          $("#img_fundo_src").css('display', 'flex');
        }
        
      }

    });
}

function verificarNomeIgreja() {
  var novoNome = $('#nome_igreja').val().trim();
  
  if (novoNome === "") {
    $("#span_criar-igreja").text(nomeIgrejaVerificado);
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
  let telefone = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Limita o número a 11 dígitos
  if (telefone.length > 11) {
      telefone = telefone.slice(0, 11);
  }

  let telefoneFormatado = '';

  // Formatação condicional
  if (telefone.length > 2) {
      telefoneFormatado = '(' + telefone.substring(0, 2) + ') ';
  }
  if (telefone.length > 7) {
      telefoneFormatado += telefone.substring(2, 7) + '-' + telefone.substring(7);
  } else if (telefone.length > 2) {
      telefoneFormatado += telefone.substring(2);
  } else {
      telefoneFormatado = telefone;
  }

  // Verifica se Backspace ou Delete foi pressionado
  if (["Backspace", "Delete"].includes(event.key)) {
      let posicaoCursor = event.target.selectionStart;

      // Se o cursor estiver após um `)` ou um `-`, remove o caractere especial junto
      if (telefoneFormatado[posicaoCursor - 1] === ')' || telefoneFormatado[posicaoCursor - 1] === '-') {
          telefoneFormatado = telefoneFormatado.substring(0, posicaoCursor - 2) + telefoneFormatado.substring(posicaoCursor);
      }

      // Se o cursor estiver após `(` e o próximo caractere for `)`, remova ambos
      if (telefoneFormatado[posicaoCursor - 1] === '(' && telefoneFormatado[posicaoCursor + 2] === ')') {
          telefoneFormatado = telefoneFormatado.substring(2);
      }
  }

  // Aplica a formatação
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

document.getElementById("imagem_igreja").addEventListener("click", function() {
  selecionaImgPerfil();
});

$(document).on('click', '.comunidade_select_img', function(){
  var src = $(this).find('img').attr('src');
  $("#img_igreja_selected").attr('src', src);
  imagemVemDoBanco = true;
  $("#modal_addproduto").hide();
  $("body").css('overflow', 'auto');
}); 

$('#abrir_select_img').click(function(){
  document.getElementById("imageFileInput").click();
  imagemVemDoBanco = false;
  $('#modal_addproduto').hide();
  $('body').css('overflow', 'auto');
})

document.getElementById("img_fundo").addEventListener("click", function() {
  document.getElementById("imageFundoFileInput").click();
});

document.getElementById('imageFileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        
        previewImg = false;
        
            img.onload = function() {
                //const height = img.height;
                //const width = img.width;
                //if (validarImagem(height, width)){
                  document.getElementById('img_igreja_selected').src = e.target.result;
                  document.getElementById('img_igreja_desc_resumida').src = e.target.result;
                  previewImg = true;
                  origem_imagem = "U";
                //}
            }
            img.src = e.target.result;

          //document.getElementById('previewImg').src = e.target.result;
          //document.getElementById('img_igreja_selected').src = e.target.result;
          //$("#imagem_selecionada").css("background-image", "url("+e.target.result+")");
          
          
      };
      reader.readAsDataURL(file);
      console.log($("#img_igreja_selected").src);
      
  }
});

document.getElementById('imageFundoFileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        
        previewImg = false;
            img.onload = function() {
                //const height = img.height;
                //const width = img.width;
                //if (validarImagem(height, width)){
                  document.getElementById('img_fundo_src').src = e.target.result;
                  previewImg = true;
                  $("#img_fundo_src").css('display', 'flex');
                  origem_imagem = "U";
                //}
            }
            img.src = e.target.result;

          //document.getElementById('previewImg').src = e.target.result;
          //document.getElementById('img_fundo_src').src = e.target.result;
          //$("#imagem_selecionada").css("background-image", "url("+e.target.result+")");
          
          
      };
      reader.readAsDataURL(file);
      console.log($("#img_fundo_src").src);
      
  }
});


  $("#click_sugestao1").click(function(e){
    editaHorarioFixo = $("#sugestao1").html();

  });


function textoArea(){//document.addEventListener('DOMContentLoaded', function() {
  console.log("testessda");
    // Inicialize o TinyMCE
    tinymce.init({
      selector: '#adicionar_horarios_fixos',
      height: '170px',
      plugins: [],
      toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
      fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
      content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("txixhs2kyot0muep1k6v2mp5hd6wqk30jmbvp6hv8pk3g4b7")),
      setup: function(editor) {
        editor.on('init', function() {
          console.log("ta no init");
          // Remove a barra de status ao inicializar o editor
          var statusbarDiv = document.querySelector('.tox .tox-statusbar');
          if (statusbarDiv) {
            statusbarDiv.remove();
          } else {
            console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
          }
          //if(agenda.agenda_layout_upload_desc != null && agenda.agenda_layout_upload_desc != ''){
              
            //editor.setContent(agenda.agenda_layout_upload_desc);
          //}
            // Verifica e atualiza o conteúdo do editor ao inicializar
            if(editaHorarioFixo != ''){
                
              editor.setContent(editaHorarioFixo);
            }
            horarioFixoHtml = editor.getContent();
        });

        // Atualiza o conteúdo da div ao modificar o texto no editor
        editor.on('keyup change', function() {
          horarioFixoHtml = editor.getContent();
        });
      }
    });
}

$("#btn_close").click(function(){
  window.location = 'lista-igreja.html';
})


function montaHtmlBancoImg(bancoImagem){
  html = '';
  $.each(bancoImagem, function (k, l) {
    html += '<div class="comunidade_select_img">'+
            '<img id="img_igreja_desc_resumida"  src="'+l.igreja_logo_url+'">'+
            '<span id="desc_resumida">'+l.igreja_desc_resumida+'</span>'+
            '</div>';
  });

  $(document).ajaxStop(function () {
    $('body').css('overflow', 'hidden');
  });

  $('#divBancoImg').html(html); 
  $('#modal_addproduto  ').show();
}


function selecionaImgPerfil(){
  
  
  $.ajax({
  method: "POST",
  url: "https://pedeoferta.com.br/templo/index.php/welcome/get_banco_imagem",
  data: {}, 
  processData: false,
  contentType: false
  })
  .done(function (ret) {
    var obj = jQuery.parseJSON(ret);
    if(obj.status == '1'){
      html = '';
      bancoImagem = obj.banco_imagem;
      montaHtmlBancoImg(obj.banco_imagem);
     
      
      $("#pesquisa_imagens").on('input', function(e) {
        bancoImagemFilter = bancoImagem.filter(function(a) {
          
            return a['igreja_nome'].toUpperCase().includes($("#pesquisa_imagens").val().toUpperCase());
        });
        montaHtmlBancoImg(bancoImagemFilter);
      });
    }
  });
}