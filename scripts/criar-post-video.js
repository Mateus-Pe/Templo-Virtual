$('#texto').click(function(e){
    window.location = "criar-post-texto.html";
});

$('#imagem').click(function(e){
    window.location = "criar-post.html";
});



window.addEventListener("load", function() {
    verificarCampos(); // Chama a função para verificar os campos ao carregar a página
});


function showHideElements(selectedOption) {
    if (selectedOption === "youtube") {
        document.getElementById("select_youtube").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_local").style.display = "none";
    } else if (selectedOption === "local") {
        document.getElementById("select_local").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_youtube").style.display = "none";
    } else {
        document.getElementById("select_youtube").style.display = "none";
        document.getElementById("select_local").style.display = "none";
        document.getElementById("divBotoes").style.display = "none";
    }
}

document.getElementById("youtube").addEventListener("click", function() {
    document.getElementById("youtube").classList.remove("clicked");
    document.getElementById("local").classList.remove("clicked");
    this.classList.add("clicked");
    showHideElements("youtube");
});

document.getElementById("local").addEventListener("click", function() {
    document.getElementById("youtube").classList.remove("clicked");
    document.getElementById("local").classList.remove("clicked");
    this.classList.add("clicked");
    showHideElements("local");
});

document.getElementById("add_video_local").addEventListener("click", function() {
    document.getElementById("videoFileInput").click();
});



tinymce.init({
    selector: '#descricao1',
    height: '15rem',
    plugins: [],
    toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
    fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
    content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
    setup: function(editor) {
        editor.on('init', function() {
            // Encontrar a div com a classe .tox-statusbar
            var statusbarDiv = document.querySelector('.tox .tox-statusbar');
          
            // Verificar se a div foi encontrada
            if (statusbarDiv) {
                // Remover a div
                statusbarDiv.remove();
            } else {
                // Se a div não foi encontrada, exibir uma mensagem de erro
                console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
            }
        });
    }
});


tinymce.init({
    selector: '#descricao2',
    height: '15rem',
    plugins: [],
    toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
    fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
    content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
    setup: function(editor) {
        editor.on('init', function() {
            // Encontrar a div com a classe .tox-statusbar
            var statusbarDiv = document.querySelector('.tox .tox-statusbar');
          
            // Verificar se a div foi encontrada
            if (statusbarDiv) {
                // Remover a div
                statusbarDiv.remove();
            } else {
                // Se a div não foi encontrada, exibir uma mensagem de erro
                console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
            }
        });
    }
});

document.getElementById("link_youtube").addEventListener("input", function() {
    verificarCampos();
});

// Adiciona um evento de escuta para o campo de entrada de upload de imagem local
document.getElementById("videoFileInput").addEventListener("change", function() {
    verificarCampos();
});



function verificarCampos() {
    var linkYouTube = document.getElementById("link_youtube").value;
    var arquivoLocal = document.getElementById("videoFileInput").value;

    var botaoCompartilhar = document.getElementById("btn_salvar");

    if (linkYouTube || arquivoLocal) {
        botaoCompartilhar.disabled = false; // Habilita o botão de compartilhamento
    } else {
        botaoCompartilhar.disabled = true; // Desabilita o botão de compartilhamento
    }
}

document.getElementById("btn_salvar").addEventListener("click", function() {
    alert("Botão de compartilhar clicado!");
});