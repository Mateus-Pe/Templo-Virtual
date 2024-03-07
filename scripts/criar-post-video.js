$('#texto').click(function(e){
    window.location = "criar-post-texto.html";
});

$('#imagem').click(function(e){
    window.location = "criar-post.html";
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