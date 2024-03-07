var textoPadrao = 'Clique para editar o texto';

$('#imagem').click(function(e){
    window.location = "criar-post.html";
});

$('#video').click(function(e){
    window.location = "criar-post-video.html";
});

document.getElementById('feed_texto').addEventListener('click', function() {
    document.querySelector('#btn_salvar').style.display = 'none';
    document.querySelector('#divHeader').style.display = 'none';
    document.querySelector('#editor_desc').style.display = 'none';
    document.querySelector('#editor_texto').style.display = 'flex';
    document.querySelector('#header').style.display = 'flex';
});

document.getElementById('descricao_texto').addEventListener('click', function() {
    document.querySelector('#btn_salvar').style.display = 'none';
    document.querySelector('#divHeader').style.display = 'none';
    document.querySelector('#editor_texto').style.display = 'none';
    document.querySelector('#header').style.display = 'flex';
    document.querySelector('#editor_desc').style.display = 'flex';
});

document.getElementById('salva_publi').addEventListener('click', function() {
    document.querySelector('#btn_salvar').style.display = 'inline';
    document.querySelector('#divHeader').style.display = 'flex';
    document.querySelector('#editor_texto').style.display = 'none';
    document.querySelector('#editor_desc').style.display = 'none';
    document.querySelector('#header').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o TinyMCE para o campo de texto texto_publi
    tinymce.init({
        selector: '#texto_publi',
        height: '20rem',
        plugins: [],
        toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
        setup: function(editor) {
            // Adiciona um evento de input ao editor
            editor.on('input', function() {
                // Obtém o conteúdo HTML atual do editor
                var conteudoHtml = editor.getContent();

                // Atualiza o conteúdo da div feed_texto com o conteúdo HTML do editor
                document.getElementById('feed_texto').innerHTML = conteudoHtml;

                // Verifica se o conteúdo está vazio
                if (conteudoHtml.trim() === '') {
                    // Se estiver vazio, define o texto padrão na div feed_texto
                    document.getElementById('feed_texto').innerHTML = textoPadrao;
                }
            });
        },
        init_instance_callback: function(editor) {
            // Após a inicialização do TinyMCE, remover a div .tox-statusbar se encontrada
            var statusbarDiv = editor.getContainer().querySelector('.tox .tox-statusbar');
            if (statusbarDiv) {
                statusbarDiv.remove();
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o TinyMCE para o campo de texto descricao_publi
    tinymce.init({
        selector: '#descricao_publi',
        height: '20rem',
        plugins: [],
        toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
        setup: function(editor) {
            // Adiciona um evento de input ao editor
            editor.on('input', function() {
                // Obtém o conteúdo HTML atual do editor
                var conteudoHtml = editor.getContent();

                // Atualiza o conteúdo da div descricao_texto com o conteúdo HTML do editor
                document.getElementById('descricao_texto').innerHTML = conteudoHtml;

                // Verifica se o editor está vazio
                if (!conteudoHtml.trim()) {
                    // Se estiver vazio, exibe a mensagem padrão
                    document.getElementById('descricao_texto').innerHTML = 'Clique para adicionar uma descrição';
                }
            });
        },
        init_instance_callback: function(editor) {
            // Após a inicialização do TinyMCE, remover a div .tox-statusbar se encontrada
            var statusbarDiv = editor.getContainer().querySelector('.tox .tox-statusbar');
            if (statusbarDiv) {
                statusbarDiv.remove();
            }
        }
    });
});
