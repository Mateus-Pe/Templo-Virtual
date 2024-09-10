var cidade_id = '';


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
                $('#divHeader').show();

            }
        }
    });
}

function listaEscolhida(data) {

    $('#divListaPrincipal').html('');

    var rows = JSON.parse(data.length);
    var cidadeId = 0;
    html = '';
    var arrColor = ['black', 'blue', 'darkred', 'white', 'orange'];
    var color = arrColor[0];
    categoria_cod = 0;
    for (var i = 0; i < rows; i++) {
        if(cidadeId != data[i].cidade_id){
            cidadeId = data[i].cidade_id;
            color = arrColor[ Math.floor(Math.random() * arrColor.length)];
        }
        
        html += '<div class="div-igreja" style="display:flex; align-items:center; border-color: white; background-color: '+color+'">' +
                    '<span class="span-igreja">' + data[i].tipo + '</span>' +
                    '<span data-paroquia_id="'+ data[i].paroquia_id +'" class="material-symbols-outlined botao_adicionar" style="color:white; position:absolute; right:10%; font-size:2rem"> person_add </span>'+
                    '<span data-paroquia_id="'+ data[i].paroquia_id +'" class="material-symbols-outlined editar-paroquia" style="color:white; position:absolute; right:20%; font-size:2rem"> edit </span>'+
                    '<span class="material-symbols-outlined acToggle" style="position:absolute; right: 2%; color: white; font-size: 16px">expand_circle_right</span>' +
                '</div>';

        html += '<div class="accordion div-igreja-detalhes" style="font-family: Exo; display: none">';

        $.each(data[i].listabycat, function (k, l) {
            var span_remove = '';
            if(data[i].tipo != 'MATRIZ'){
            
                span_remove = '<span data-id="'+l.igreja_id+'" class="material-symbols-outlined acToggle remove-igreja">delete</span>' ;              
            }

            html += '<h3 style="border: 1px solid #ddd; border-radius:0px; display: block; color: #484848; font-weight: bold; cursor: pointer; position: relative; margin-top:0px; padding: 1.5em .5em 1.5em .7em; background: white;">' +
                 '<div class="list-line">'+
                 '<label for="itens-check" class="label-lista">' +
                 '<p style="display:inline; padding:10px;">'+l.igreja_nome+'</p>' +
                 
                 
                 '</label>' +
                 '<span class="material-symbols-outlined acToggle">expand_circle_right</span>' +
                 '</div>'+
                 '</h3>' +
                 '<div class="modal-container endereco-lista" >' +
                    '<div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 9px; font-size: 10px;">' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_logradouro +', '+ l.igreja_endereco_numero + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_bairro + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_cidade + '</p>' +
                    '</div>' +
                    '<div class="list-line">'+
                    '</div>'+
               '</div>';
               

                 
                 
        });

        html += '</div>';
    }
    
    $('#divListaPrincipal').html(html);

    $('.div-igreja').click(function () {
        $(this).next('.div-igreja-detalhes').slideToggle("slow");
    });

    configurarEventos();
    $('#divHeader').show();

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

    $('.editar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        window.location = 'criar-igreja.html';
    });

    $('.configurar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        window.location = 'configurar-perfil-igreja.html';
    });

    $('.remove-igreja').click(function () {

        var id = $(this).data('id');
        remover(id);
    });

    $('.check_lista').click(function () {
        if ($(this).data('listaitem_check') == 0)
            auxCheck = 1;
        else
            auxCheck = 0;

        check($(this).data('listaitem_cod'), auxCheck);
    });

    $('.minimiza').click(function () {
        get_listaitem();
    });

    $('.remove').click(function () {
        remove_item($(this).data('listaitem_cod'));
    });

    $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    $(".accordion").find('h3').on('click', function(){

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

/*-------------------------NOVO JS APAGAR ACIMA-----------------*/

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
