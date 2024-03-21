$(document).ready(function() {
    $('#vizualizar').click(function(){ 

        $('#modal_visualizar_layout').show();

        var conteudoHtml = tinymce.get('descricao2').getContent();
        document.getElementById('descricao_do_video').innerHTML = conteudoHtml;
        document.getElementById('descricao_do_video').style.display = 'inline';

      });

      $('#close').click(function(){ 

        $('#modal_visualizar_layout').hide();

        document.getElementById('descricao_do_video').style.display = 'none';
      });
});


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
    //document.getElementById("videoFileInput").click();
    exibirVisualizacaoVideo();
    simulateUpload();
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

document.addEventListener("DOMContentLoaded", function() {
    // Armazena o elemento descricao_texto em uma variável
    var descricaoTexto = document.getElementById('descricao_do_video');

    // Verifica se o elemento existe
    if (descricaoTexto) {
        // Define temporariamente o estilo display como block e a opacidade como 0
        descricaoTexto.style.display = 'block';
        descricaoTexto.style.opacity = 0;

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

                    var conteudoHtml = editor.getContent();

                    // Atualiza o conteúdo da div descricao_texto com o conteúdo HTML do editor
                    descricaoTexto.innerHTML = conteudoHtml;

                    // Verifica se o editor está vazio
                    if (!conteudoHtml.trim()) {
                        // Se estiver vazio, exibe a mensagem padrão
                        descricaoTexto.innerHTML = 'Adicione um comentário para visualiza-lo';
                    }

                    // Restaura o estilo display e a opacidade para os valores originais
                    descricaoTexto.style.display = 'none';
                    descricaoTexto.style.opacity = 1;
                });
            }
        });
    } else {
        console.error('Elemento com ID descricao_texto não encontrado.');
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


function exibirVisualizacaoVideo() {
    // Mostra a prévia do vídeo
    document.getElementById("visualizacao_video").style.display = "flex";

    // Esconde o botão de adicionar vídeo
    document.getElementById("add_video_local").style.display = "none";

    document.getElementById("txt_add_video").style.display = "none";
    var caminhoDoVideo = "/imgs/imgs-igreja/Imagens Incríveis da Natureza (4k).AVI"; // Substitua pelo caminho do vídeo
    var nomeDoVideo = obterNomeDoVideo(caminhoDoVideo);

    // Atualiza o nome do vídeo na prévia
    document.getElementById("video_name").textContent = nomeDoVideo;

}

function obterNomeDoVideo(caminhoDoVideo) {
    // Extrai o nome do vídeo do caminho do arquivo
    var partesDoCaminho = caminhoDoVideo.split("/");
    var nomeDoArquivo = partesDoCaminho.pop();
    var partesDoNome = nomeDoArquivo.split(".");
    partesDoNome.pop(); // Remove a extensão do arquivo
    var nomeDoVideo = partesDoNome.join(".");
    return nomeDoVideo;
}

document.getElementById("delete_video").addEventListener("click", function(){
    document.getElementById("add_video_local").style.display = "flex";

    document.getElementById("txt_add_video").style.display = "flex";

    document.getElementById("visualizacao_video").style.display = "none";
});


function simulateUpload() {
    var progressBar = document.getElementById("progressBar");
    var progress = 0;
    var interval = setInterval(function() {
        progress += 5; // Aumenta o progresso em 5 a cada intervalo
        progressBar.value = progress; // Define o valor da barra de progresso
        if (progress >= 100) {
            clearInterval(interval); // Limpa o intervalo quando o progresso atinge 100%
            document.getElementById("progressContainer").classList.add("hide"); // Adiciona a classe hide
            document.getElementById("vizualizar").style.display = "flex";
        }
    }, 200); // Intervalo de 200ms para simular o progresso
}