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




ClassicEditor
    .create( document.querySelector( '#texto_publi' ), {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                '|',
                'undo',
                'redo'
            ]
        },
        language: 'pt-br'
    } )
    .then( editor => {
        // Armazena a instância do editor em uma variável
        window.editor = editor;

        // Armazena o conteúdo anterior do editor
        let conteudoAnterior = '';

        // Adiciona um ouvinte de evento para detectar mudanças no conteúdo do editor
        editor.model.document.on( 'change:data', () => {
            // Obtém o conteúdo HTML atual do editor
            var conteudoHTML = editor.getData();
            
            // Verifica se o conteúdo está vazio
            if (conteudoHTML.trim() === '') {
                // Se estiver vazio, restaura o texto padrão
                document.getElementById('feed_texto').innerHTML = textoPadrao;
            } else {
                // Se não estiver vazio, atualiza o conteúdo da div de exibição com o novo conteúdo
                document.getElementById('feed_texto').innerHTML = conteudoHTML;
                // Atualiza o conteúdo anterior
                conteudoAnterior = conteudoHTML;
            }
        } );
    } )
    .catch( error => {
        console.error( error );
    } );



    ClassicEditor
    .create( document.querySelector( '#descricao_publi' ), {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                '|',
                'undo',
                'redo'
            ]
        },
        language: 'pt-br'
    } )
    .then( editor => {
        // Armazena a instância do editor em uma variável
        window.descricaoEditor = editor;

        // Adiciona um ouvinte de evento para detectar mudanças no conteúdo do editor
        editor.model.document.on( 'change:data', () => {
            // Obtém o conteúdo HTML atual do editor
            var descricaoHTML = editor.getData();
            
            // Atualiza o conteúdo da div de exibição com o conteúdo HTML do editor
            document.getElementById('descricao_texto').innerHTML = descricaoHTML;
            
            // Se o editor estiver vazio, exibe o texto padrão na div
            if (descricaoHTML.trim() === "") {
                document.getElementById('descricao_texto').textContent = "Clique para adicionar uma descrição";
            }
        } );
    } )
    .catch( error => {
        console.error( error );
    } );