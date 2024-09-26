var previewImg = false;
var conteudoHtml = '';
var agenda_id = 0;
var origem_imagem = ''; // U-upload; L-layout

$(document).ready(function() {
  agenda_id = window.sessionStorage.getItem('agenda_id');
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
                  origem_imagem = 'U';
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
  //verificar se realmente vai utilizar estas validações
  /*if ((1.5 * width) > height && height > width) { // antes 1.33
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }
  if ((1.5 * height) > width && width > height) {// antes 1.8
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }*/
  if (height < 100 || width < 100){
    $("#modalConfirmacao").show();
    texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com mais de 100 pixels.</p><br>";
      $('#mensagem_modal').html(texto_modal);
      retorno = false;
  }
  console.log(`Altura: ${height}, Largura: ${width}`);
  return retorno;
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
    pre_salvar();
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

$("#trocar_img").click(function(e){
  window.location = "configurar-layout.html";
});

document.getElementById("editImg").addEventListener("click", function() {
  document.getElementById("imageFileInput").click();
});

function salvar(flagLote){
  //console.log($('#previewImg').attr('src'));
  //file = $("#imageFileInput");
  var formData = new FormData();
  formData.append('agenda_id', agenda_id);
  formData.append('agenda_layout_upload_desc', conteudoHtml);
  formData.append('flag_lote', flagLote);
  if(origem_imagem == 'L'){
    formData.append('imagem_src', $("#previewImg").attr("src"));
  }
  else{
    formData.append('file', $('#imageFileInput')[0].files[0]);
  }
  formData.append('origem_imagem', origem_imagem);

  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_layout_agenda_upload",
    data: formData,
    processData: false,
    contentType: false
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
    $(".img_igreja").attr("src", obj.agenda.igreja_logo_url);
    $(".nome_igreja").text(obj.agenda.igreja_nome);
    if(obj.agenda.agenda_img != '' && obj.agenda.agenda_img != null){

      document.getElementById('previewImg').src = obj.agenda.agenda_img;
      $("#visualizar").css("display","grid");
      $("#previewImg").css("display","flex");
      previewImg = true;
      origem_imagem = 'L';
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


function pre_salvar(){

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/pre_lote",
	   data: {  
              "agenda_id" : agenda_id
			 }
	 })
   .done(function(ret) {
    var obj = jQuery.parseJSON(ret);
    var quantidade = obj.agendas.length;
    if(quantidade > 0){ // lote
      if(verificaHistoricoStatus(obj.agendas[0].agenda_historico_status)){ //ja atualizou
        
        $("#modalPreSalvar").show();
        texto_modal = "<p style='line-height:20px'><b>Já existem agendamenteos:</b><br><br>";
        $.each(obj.agendas, function (k, agenda){
          if(k > 2){
            return false;
          }
          texto_modal += dateText(splitDateTime(agenda.agenda_horario).date)+" ás "+timeFormat(splitDateTime(agenda.agenda_horario).time, ':', true)+"<br>";
          quantidade--;
        });
        if(quantidade > 0){
          texto_modal += "<br>E mais ["+quantidade+"]  </p><br>";
        }
          $('#mensagem_modalPreSalvar').html(texto_modal);
      }else{ // primeira vez
        salvar(0);
      }
    }else{//especifica
      salvar(0);
    }
  });
}

function verificaHistoricoStatus(strHistoricoStatus){
  if(strHistoricoStatus != null && strHistoricoStatus != ''){

    var arr = strHistoricoStatus.split(";");
    arr.includes('2');
    return arr.includes('2'); // ja atualizou
  }else{
    return false;
  }
}

$("#confirmar_alteracao").click(function(){
  $("#modalPreSalvar").hide();
  salvar(1);
})

$("#nao_confirmar_alteracao").click(function(){
  $("#modalPreSalvar").hide();
  salvar(0);
})

  function textoArea(agenda){//document.addEventListener('DOMContentLoaded', function() {
    var descricaoTexto = document.getElementById('descricao_layout_feed');
    if (descricaoTexto) {
      // Inicialize o TinyMCE
      tinymce.init({
        selector: '#descricao2',
        height: '120px',
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
            if(agenda.agenda_layout_upload_desc != null && agenda.agenda_layout_upload_desc != ''){
                
              editor.setContent(agenda.agenda_layout_upload_desc);
            }
              // Verifica e atualiza o conteúdo do editor ao inicializar
              conteudoHtml = editor.getContent();
              if (!conteudoHtml.trim()) {
                descricaoTexto.innerHTML = 'Adicione um comentário para visualiza-lo';
              } else {
                descricaoTexto.innerHTML = conteudoHtml;
              }
              descricaoTexto.style.display = 'inline'; // Exibe a div
              descricaoTexto.style.opacity = 1;
              
            
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