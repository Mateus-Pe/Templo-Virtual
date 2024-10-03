var cidade_id = '';

$(document).ready(function () {
    //solução provisória
   // window.sessionStorage.setItem('cidade_id', 9240);
   // window.sessionStorage.setItem("cidade_nome", "Itapetininga");
    $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
    cidade_id = window.sessionStorage.getItem("cidade_id");
    window.sessionStorage.setItem('igreja_id','');

    if(cidade_id != null && cidade_id != ''){
        get_paroquias(cidade_id);
    }

    $('#copy_link').click(function () {
        $('#link_usuario').select();
        document.execCommand("copy");
        $('#link_usuario').blur();
    });
});


function get_paroquias(cidadeId) {
    $.ajax({
        type: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_paroquia",
        cache: false,
        dataType: 'json',
        data: { 'cidade_id': cidadeId },
        success: function (data) {
            var rows = JSON.parse(data.length);

            if (rows == 0) {
                showAdd();
            }
            else {
                listaEscolhida(data);
                configurarEventos();
            }
        }
    });
}

function listaEscolhida(data) {

    $('#divListaPrincipal').html('');

    var rows = JSON.parse(data.length);
    var cidadeId = 0;
    html = '';
    var arrColor = ['black', 'blue', 'darkred', 'darkgray', 'orange'];
    var color = arrColor[0];
    categoria_cod = 0;
    for (var i = 0; i < rows; i++) {
        if(cidadeId != data[i].cidade_id){
            cidadeId = data[i].cidade_id;
            color = arrColor[ Math.floor(Math.random() * arrColor.length)];
        }
        
        html +=     '<div class="div-igreja">'+
                        '<div class="contain_lista_paroquia" style="background-color: '+color+'">' +
                            '<div class="list-line">'+
                                '<span class="span-igreja">'+
                                    '<p>' + data[i].tipo + '</p>'+
                                '</span>' +
                                '<div class="contain_options_lista">'+
                                    '<span data-paroquia_id="'+ data[i].paroquia_id +'" class="fa-solid fa-pen-to-square editar-paroquia" style="margin-left: 10px;"></span>'+
                                    '<span data-paroquia_id="'+ data[i].paroquia_id +'" class="fa-solid fa-user-plus botao_adicionar" ></span>'+
                                    '<span class="ion-android-arrow-dropleft-circle" acToggle"></span>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        html += '<div class="accordion div-igreja-detalhes" style="display: none">';

        $.each(data[i].listabycat, function (k, l) {
            if(data[i].tipo != 'MATRIZ'){
            
                span_remove = '<span data-id="'+l.igreja_id+'" class="remove-igreja"></span>' ;              
            }

            html += '<div class="contain_lista_comunidade">' +
                        '<div class="list-line">'+
                            '<span for="itens-check" class="label-lista">' +
                                '<p>'+l.igreja_nome+'</p>' +
                            '</span>' +
                            '<span class="ion-android-arrow-dropleft-circle acToggle" style="font-size: 1.5rem"></span>' +
                        '</div>'+
                    '</div>' +
                    '<div class="modal-container endereco-lista" >' +
                        '<div>' +
                            '<p>' + l.igreja_endereco_logradouro +', '+ l.igreja_endereco_numero + '</p>' +
                            '<p>' + l.igreja_endereco_bairro + '</p>' +
                            '<p>' + l.igreja_endereco_cidade + '</p>' +
                        '</div>' +
                    '</div>';
        });
        html += '</div>';
    }
    $('#divListaPrincipal').html(html);

    $('.div-igreja').click(function () {
        $(this).next('.div-igreja-detalhes').slideToggle("slow");
    });

    configurarEventos();
};

function configurarEventos(){

    $('.botao_adicionar').click(function () {
        $('#id_paroquia').val($(this).data('paroquia_id'));
        $('#modalAdicionar').show();
    });

    $('.editar-paroquia').click(function () {
        window.sessionStorage.setItem('paroquia_id', $(this).data('paroquia_id'));
        window.location = 'lista-igreja.html';
    });

    //não implementado mas pode vir a ser útil
    $('.remove-igreja').click(function () {
        var id = $(this).data('id');
        remover(id);
    });

    $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    $(".accordion").find('div').on('click', function(){

        $(".ui-accordion-content").each(function() {
            if($(this).attr('aria-hidden')== 'false'){
                $(this).prev().find('.acToggle').removeClass("ion-android-arrow-dropleft-circle").addClass("ion-android-arrow-dropdown-circle");
            }
            else{
                $(this).prev().find('.acToggle').removeClass("ion-android-arrow-dropdown-circle").addClass("ion-android-arrow-dropleft-circle");
            }
        });
    });

    $(".accordion").find('input[type="checkbox"]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(function () {
            this.checked = !this.checked;
        }.bind(this), 100);
    });
}

$('#confirmarAdicao').click(function () {
   
    $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/novo_usuario",
        data: {
            usuario_paroquia_id :  $('#id_paroquia').val(),
            usuario_nome : $('#usuario_nome').val(),
            usuario_celular : $('#usuario_celular').val(),
            usuario_tipo : $('#usuario_tipo').val()
            
        }
    })

    .done(function (ret) {
        var obj = jQuery.parseJSON(ret);
        
        if(obj.status == '1'){
            alert(obj.mensagem);
           /* console.log(obj.login_url)
            $('#link_usuario').val(obj.login_url);
            parametros = criarParametrosUrlUser(obj.usuario_token);
            link = "http://localhost:3001/confirmar-senha.html?" + parametros;
            var linkCodificado = encodeURIComponent(link);
            window.open('https://api.whatsapp.com/send?text='+linkCodificado, '_blank');*/
        }
    });
});

$('#cancelarAdicao').click(function () {
    $('#modalAdicionar').hide();
});


//no momento não está em uso mas pode vir a ser
function remover(id){
    $('#modalConfirmacao').show();
    $('#cancelarRemocao, .modal-background .modal-close').click(function(){
        $('#modalConfirmacao').hide();
    })
    $('#confirmarRemocao').click(function(){

        $.ajax({
            method: "POST",
            url: "https://pedeoferta.com.br/templo/index.php/welcome/remove_igreja",
            data: {
                igreja_id : id
            }
        })

        .done(function (ret) {
            var obj = jQuery.parseJSON(ret);
            if(obj.status == '1'){
                window.location = "lista-igreja.html";
                $('#modalConfirmacao').hide();
                window.location = "lista-igreja.html";
            }
        });
    });
}


$('#cidade_nome').click(function () {
    //sessionStorage.setItem('origem', 'administrar-igreja');
    window.location = 'estado.html?req=administrar-igreja';
});



$('#add').click(function () {
    $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/nova_paroquia",
        data: {
            paroquia_cidade_id : cidade_id,
            paroquia_nome : ''
        }
    })

    .done(function (ret) {
        var obj = jQuery.parseJSON(ret);
        
        if(obj.status == '1'){
            
            window.sessionStorage.setItem('paroquia_id', obj.paroquia_id);
            window.location = "criar-igreja.html";
        }
        
    });
});

//verificar se vira a ser util
function criarParametrosUrlUser(usuario_token){
    // Chave secreta
    var chaveSecreta = 'key-uri';
    // Parâmetros a serem criptografados
    var parametros = {
        usuario_token : usuario_token
    };
    // Converte os parâmetros para string JSON
    var parametrosString = JSON.stringify(parametros);
    // Criptografa os parâmetros
    var parametrosCriptografados = CryptoJS.AES.encrypt(parametrosString, chaveSecreta).toString();
    // Cria a URL com os parâmetros criptografados
    var parametrosGet = "dados=" + encodeURIComponent(parametrosCriptografados);
    console.log("Link com Parâmetros Criptografados: " + parametrosGet);
    return parametrosGet;
}
