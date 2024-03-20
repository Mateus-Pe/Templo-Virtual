$('#texto').click(function(e){
    window.location = "criar-post-texto.html";
});

$('#imagem').click(function(e){
    window.location = "criar-post.html";
});

window.addEventListener("load", function() {
    verificarCampos();
});

document.getElementById("youtube").addEventListener("click", function() {
    this.classList.add("clicked");
    document.getElementById("local").classList.remove("clicked");
    showHideElements("youtube");
});

document.getElementById("local").addEventListener("click", function() {
    this.classList.add("clicked");
    document.getElementById("youtube").classList.remove("clicked");
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
            var statusbarDiv = document.querySelector('.tox .tox-statusbar');
            if (statusbarDiv) {
                statusbarDiv.remove();
            } else {
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
            var statusbarDiv = document.querySelector('.tox .tox-statusbar');
            if (statusbarDiv) {
                statusbarDiv.remove();
            } else {
                console.error('A div com a classe .tox .tox-statusbar não foi encontrada.');
            }
        });
    }
});

document.getElementById("link_youtube").addEventListener("input", function() {
    verificarCampos();
});

document.getElementById("videoFileInput").addEventListener("change", function() {
    verificarCampos();
});

function showHideElements(selectedOption) {
    var descricaoYoutube = document.getElementById("descricao1");
    var descricaoLocal = document.getElementById("descricao2");
    var linkYoutube = document.getElementById("link_youtube");
    var videoFileInput = document.getElementById("videoFileInput");
    var botaoCompartilhar = document.getElementById("btn_salvar");

    if (selectedOption === "youtube") {
        document.getElementById("select_youtube").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_local").style.display = "none";
        
        descricaoLocal.value = "";
        videoFileInput.value = "";
    } else if (selectedOption === "local") {
        document.getElementById("select_local").style.display = "grid";
        document.getElementById("divBotoes").style.display = "block";
        document.getElementById("select_youtube").style.display = "none";
        
        descricaoYoutube.value = "";
        linkYoutube.value = "";
    } else {
        document.getElementById("select_youtube").style.display = "none";
        document.getElementById("select_local").style.display = "none";
        document.getElementById("divBotoes").style.display = "none";
        
        descricaoYoutube.value = "";
        descricaoLocal.value = "";
        linkYoutube.value = "";
        videoFileInput.value = "";
    }

    verificarCampos();
}

function verificarCampos() {
    var linkYoutube = document.getElementById("link_youtube").value;
    var arquivoLocal = document.getElementById("videoFileInput").value;
    var botaoCompartilhar = document.getElementById("btn_salvar");

    if (linkYoutube || arquivoLocal) {
        botaoCompartilhar.disabled = false;
    } else {
        botaoCompartilhar.disabled = true;
    }
}

document.getElementById("btn_salvar").addEventListener("click", function() {
    alert("Botão de compartilhar clicado!");
});
