$('#texto').click(function(e){
    window.location = "criar-post-texto.html";
  });

  $('#video').click(function(e){
    window.location = "criar-post-video.html";
  });


document.getElementById("add_imagem").addEventListener("click", function() {
    document.getElementById("imageFileInput").click();
});



document.addEventListener('DOMContentLoaded', function() {
  // Inicialize o TinyMCE
  tinymce.init({
      selector: '#descricao2',
      height: '20rem',
      plugins: [],
      toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
      fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
      content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }'
  });

  // Aguarde 10 milissegundos e, em seguida, remova a barra de status do TinyMCE
  setTimeout(function() {
      // Encontra a div com a classe .tox-statusbar
      var statusbarDiv = document.querySelector('.tox .tox-statusbar');

      // Verifica se a div foi encontrada
      if (statusbarDiv) {
          // Remove a div
          statusbarDiv.remove();
      } else {
          // Se a div não foi encontrada, exibe uma mensagem de erro no console
          console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
      }
  }, 50);
});