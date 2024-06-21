var previewImg = false;
var conteudoHtml = '';
var agenda_id = 0;

$(document).ready(function() {
  alingDivPreviw();
  agenda_id = window.sessionStorage.getItem('agenda_id');
  console.log(agenda_id);
  get_agenda();
});

document.getElementById("add_imagem").addEventListener("click", function() {
  document.getElementById("imageFileInput").click();
});

$('#btn_close').click(function(e) {
  window.location = "calendario.html";
});

document.getElementById('imageFileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        $("#visualizar").css("display","none");
        $("#previewImg").css("display","none");
        previewImg = false;
            img.onload = function() {
                const height = img.height;
                const width = img.width;
                if (validarImagem(height, width)){
                  document.getElementById('previewImg').src = e.target.result;
                  $("#visualizar").css("display","grid");
                  $("#previewImg").css("display","flex");
                  previewImg = true;
                  verificaBotaoImg();
                }
            }
            img.src = e.target.result;

          //document.getElementById('previewImg').src = e.target.result;
          document.getElementById('visualiza_layout_feed').src = e.target.result;
          //$("#imagem_selecionada").css("background-image", "url("+e.target.result+")");
          
          
      };
      reader.readAsDataURL(file);
      console.log($("#previewImg").src);
      
  }
});

function validarImagem(height, width){
  retorno = true;

  if ((1.33 * width) > height && height > width) {
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }
  if ((1.8 * height) > width && width > height) {
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }
  if (height < 100 || width < 100){
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com mais de 100 pixels.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }
  console.log(`Altura: ${height}, Largura: ${width}`);
  return retorno;
}

function alingDivPreviw(){
  var alturaMenu = parseInt($(".header1").css("height").replace('px', ''));// 55;
  var alturaImagemSelected = parseInt($("#imagem").css("height").replace('px', '')); //70;
  var alturaPreVisualizar = parseInt($("#pre_visualizar").css("height").replace('px', ''));
  var alturaDivs =  alturaMenu + alturaImagemSelected + alturaPreVisualizar;
  console.log(alturaDivs);
  var posicaoTextArea = parseInt($("#textArea").css("height").replace('px', ''));
  console.log(posicaoTextArea);
  var alturaPreviw = parseInt($(document).height() - posicaoTextArea - alturaDivs);
  $("#imagem_selecionada").css("height", alturaPreviw+"px");
  console.log(alturaPreviw);
}

document.getElementById("imageFileInput").addEventListener("change", function() {
  verificarCampos();
});

window.addEventListener("load", function() {
  verificarCampos();
});


function verificarCampos() {
  var arquivoInput = document.getElementById("imageFileInput");
  var botaoCompartilhar = document.getElementById("btn_salvar");

  if (arquivoInput.files && arquivoInput.files.length > 0) {
      botaoCompartilhar.disabled = false;
  } else {
      botaoCompartilhar.disabled = true;
  }
}

document.getElementById("btn_salvar").addEventListener("click", function() {

  if(!previewImg){
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao compartilhar, selecione uma imagem.</p><br>";
      $('#mensagem_modal').html(texto_modal);
  }else{
    salvar();
  }
});

$('#confirmar').click(function(e){
  $("#modalConfirmacao").hide();
});

function verificaBotaoImg(){
  if(previewImg){
    $("#imagem").css("display", "none");
    $("#editImg").css("display", "grid");
  }
}

$("#add_new_img").click(function(e){
  $("#imageFileInput").click();
});

$("#add_new_img").click(function(e){
  $("#modal_trocarImg").hide();
});

$("#trocar_img").click(function(e){
  window.location = "configurar-layout.html";
});

$("#trocar_img").click(function(e){
  $("#modal_trocarImg").hide();
});

$("#editImg").click(function(e){
  $("#modal_trocarImg").show();
});
$("#cancelar").click(function(e){
  $("#modal_trocarImg").hide();
});

function salvar(){
  console.log($('#previewImg').attr('src'));
  file = $("#imageFileInput");
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_layout_agenda_upload",
    data: {
          agenda_id: agenda_id,
          agenda_layout_upload_img : $('#previewImg').attr('src'),
          agenda_layout_upload_desc : conteudoHtml
        }
  })
  .done(function(ret) {

    var obj = jQuery.parseJSON(ret);

    if(obj.status == '1'){
      window.location='calendario.html';
    }
  });
}

function get_agenda(){

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_by_id",
	   data: {  
              "agenda_id" : agenda_id
              
			 }
	 })
   .done(function(ret) {

    var obj = jQuery.parseJSON(ret);
    console.log(obj);
    if(obj.agenda.agenda_layout_tipo == 2){ //edição
      
    }
    $(".img_igreja").attr("src", obj.agenda.igreja_logo_url);
    $(".nome_igreja").text(obj.agenda.igreja_nome);
    if(obj.agenda.agenda_img != '' && obj.agenda.agenda_img != null){

      document.getElementById('previewImg').src = obj.agenda.agenda_img;
      $("#visualizar").css("display","grid");
      $("#previewImg").css("display","flex");
      previewImg = true;
      document.getElementById('visualiza_layout_feed').src = obj.agenda.agenda_img;
    }
    else{
      $("#visualizar").css("display","none");
      $("#previewImg").css("display","none");
      previewImg = false;
    }

    verificaBotaoImg();
    textoArea(obj.agenda);
  });
  }

  function textoArea(agenda){//document.addEventListener('DOMContentLoaded', function() {
    var descricaoTexto = document.getElementById('descricao_layout_feed');
    if (descricaoTexto) {
      // Inicialize o TinyMCE
      tinymce.init({
        selector: '#descricao2',
        height: '20rem',
        plugins: [],
        toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("txixhs2kyot0muep1k6v2mp5hd6wqk30jmbvp6hv8pk3g4b7")),
        setup: function(editor) {
          editor.on('init', function() {
            // Remove a barra de status ao inicializar o editor
            var statusbarDiv = document.querySelector('.tox .tox-statusbar');
            if (statusbarDiv) {
              statusbarDiv.remove();
            } else {
              console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
            }
            
              // Verifica e atualiza o conteúdo do editor ao inicializar
              conteudoHtml = editor.getContent();
              console.log(conteudoHtml);
              if (!conteudoHtml.trim()) {
                descricaoTexto.innerHTML = 'Adicione um comentário para visualiza-lo';
              } else {
                descricaoTexto.innerHTML = conteudoHtml;
              }
              descricaoTexto.style.display = 'inline'; // Exibe a div
              descricaoTexto.style.opacity = 1;
              editor.setContent(agenda.agenda_layout_upload_desc);
            
          });
  
          // Atualiza o conteúdo da div ao modificar o texto no editor
          editor.on('keyup change', function() {
            conteudoHtml = editor.getContent();
            if (!conteudoHtml.trim()) {
              descricaoTexto.innerHTML = 'Adicione um comentário para visualiza-lo';
            } else {
              descricaoTexto.innerHTML = conteudoHtml;
            }
            descricaoTexto.style.display = 'inline'; // Exibe a div quando há conteúdo
          });
        }
      });
    }
  
    // Exibe o modal e a div com o conteúdo do editor
    $('#visualizar').click(function(e) {
      var conteudoHtml = tinymce.get('descricao2').getContent();
      if (!conteudoHtml.trim()) {
        descricaoTexto.innerHTML = 'Adicione um comentário para visualiza-lo';
      } else {
        descricaoTexto.innerHTML = conteudoHtml;
      }
      descricaoTexto.style.display = 'inline'; // Exibe a div quando o modal é aberto
      $('#modal_visualizar').show();
    });
  
    // Fecha o modal e esconde a div
    $('#close_view').click(function(e) {
      $('#modal_visualizar').hide();
      descricaoTexto.style.display = 'none'; // Esconde a div quando o modal é fechado
    });
  }