$('#imagem').click(function(e){
    window.location = "criar-post.html";
  });

  $('#video').click(function(e){
    window.location = "criar-post-video.html";
  });

  $(function() {
    $('#feed_texto').click(function(e){
        $('#modal_texto').show();
    });

    $('#btn_ok').click(function(e){
         $('#modal_texto').hide();

    });

    var $exibirTexto = $("#feed_texto");
    $("#texto_publi").on("keyup", function () {
        var texto = $(this).val().trim(); 
        if (texto !== "") {
            $exibirTexto.text(texto);
        } else {
            $exibirTexto.text("Clique para editar o texto");
        }
    });
});

$(function() {
  $('#descricao_texto').click(function(e){
      $('#modal_descricao').show();
  });

  $('#btn_ok1').click(function(e){
       $('#modal_descricao').hide();

  });

  var $exibirTexto = $(".span_descricao");
  $("#descricao_publi").on("keyup", function () {
      var texto = $(this).val().trim(); 
      if (texto !== "") {
          $exibirTexto.text(texto);
      } else {
          $exibirTexto.text("Clique para adicionar uma descrição");
      }
  });
});
