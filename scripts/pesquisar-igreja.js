var cidade_id = '';
var listaParoquias;


$(document).ready(function () {
    //solução provisória
    window.sessionStorage.setItem('cidade_id', 9240);
    window.sessionStorage.setItem("cidade_nome", "Itapetininga");
    $('#cidade_nome').html(' ' + window.sessionStorage.getItem("cidade_nome"));
    cidade_id = window.sessionStorage.getItem("cidade_id");
    window.sessionStorage.setItem('igreja_id','');

    if(cidade_id != null && cidade_id != ''){
        get_paroquias(cidade_id);
    }

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
                listaParoquias = data;
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

    html = '';

    categoria_cod = 0;
    for (var i = 0; i < rows; i++) {

        if(data[i].exibe != "undefined" && data[i].exibe == 0){
            continue;
        }
        
        html += '<div class="div-igreja" style="display:flex; align-items:center; border-color: white">' +
                    '<span class="ionTroca ion-android-arrow-dropright-circle" style="font-size: 15px !important; color: white; display: flex; align-items: center; position: absolute; margin-left: 3px"></span>' +
                    '<span class="span-igreja">' + data[i].tipo + '</span>' +
                    '<span data-paroquia_id="'+ data[i].paroquia_id +'"></span>'+
                    '<span data-paroquia_id="'+ data[i].paroquia_id +'"></span>'+
                    '<span class="acToggle"></span>' +
                '</div>';

        html += '<div class="accordion div-igreja-detalhes" style="font-family: Exo; display: none">';

        $.each(data[i].listabycat, function (k, l) {
            var span_remove = '';
            if(data[i].tipo != 'MATRIZ'){
            
                span_remove = '<span data-id="'+l.igreja_id+'" class="acToggle remove-igreja"></span>' ;
            }

            html += '<h3 style="border: 1px solid #ddd; border-radius:0px; display: block; color: #484848; font-weight: bold; cursor: pointer; position: relative; margin-top:0px; padding: 1.5em .5em 1.5em .7em; background: white;">' +
                 '<div class="list-line">'+
                 '<label for="itens-check" class="label-lista">' +
                 '<p style="display:inline; padding:10px;">'+l.igreja_nome+'</p>' +
                 
                 
                 '</label>' +
                 '<span class="acToggle ion-android-arrow-dropleft-circle"></span>' +
                 '</div>'+
                 '</h3>' +
                 '<div class="modal-container endereco-lista" data-igreja_id = '+l.igreja_id+' >' +
                 
                    '<div class="div_img">'+
                    '<img src="'+l.igreja_fundo_url+'">'+
                    '</div>'+
                    '<div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 9px; font-size: 10px;">' +
                    '<p style="margin: 3px 0; text-align: left; line-height: 15px;">' + l.igreja_endereco_logradouro +', '+ l.igreja_endereco_numero + '</p>' +
                    '<p style="margin: 3px 0; text-align: left; line-height: 15px;">' + l.igreja_endereco_bairro + '</p>' +
                    '<p style="margin: 3px 0; text-align: left; line-height: 15px;">' + l.igreja_endereco_cidade + '</p>' +
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
    $('#divHeader').show();

};

function configurarEventos(){

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

    $(".div-igreja").find('span').on('click', function(){

        $(".ionTroca").each(function() {
            if($(this).css('aria-hidden')== 'false'){
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


    
    $('.endereco-lista').click(function() {
        window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
        window.location = 'perfil-igreja.html';
        
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

$("#nome_igreja").on("input", function() {
    if($(this).val().length > 3){
        pesquisarIgrejas($(this).val());
        $('.div-igreja-detalhes').css('display','block');
    }else{
        listaParoquiaIgrejaOriginal();
    }
});


function pesquisarIgrejas(textFilter) {
    var listaParoquiaAux = JSON.parse(JSON.stringify(listaParoquias)); // Cópia profunda
    var rows = listaParoquiaAux.length; // Número de paróquias
    var arrPesq = textFilter.split(" "); // Termos de pesquisa divididos por espaço
    var termCounters = {}; // Objeto para contar os resultados por termo

    for (var j = 0; j < arrPesq.length; j++) {
        if (arrPesq[j] != '') {
            termCounters[arrPesq[j]] = 0; // Inicializa o contador para cada termo de pesquisa

            for (var i = 0; i < rows; i++) {
                // Filtrar igrejas pelo nome ou pelo bairro
                let listaFilter = listaParoquias[i].listabycat.filter(function(a) {
                    return a['igreja_nome'].toLowerCase().indexOf(arrPesq[j].toLowerCase()) >= 0 || 
                           a['igreja_endereco_bairro'].toLowerCase().indexOf(arrPesq[j].toLowerCase()) >= 0; // Adiciona a busca por bairro
                });

                if (listaFilter.length > 0) {
                    listaParoquiaAux[i].listabycat = listaFilter;
                    listaParoquiaAux[i].exibe = 1;
                    termCounters[arrPesq[j]] += listaFilter.length; // Incrementa o contador do termo

                    if (!listaParoquiaAux[i].termMatches) {
                        listaParoquiaAux[i].termMatches = 0;
                    }
                    listaParoquiaAux[i].termMatches += 1; // Incrementa para cada termo que encontrou correspondência
                } else {
                    if (j == 0) {
                        listaParoquiaAux[i].exibe = 0;
                    }
                }
            }
        }
    }

    // Ordenar listaParoquiaAux com base em termMatches (maior para menor)
    listaParoquiaAux.sort(function(a, b) {
        return (b.termMatches || 0) - (a.termMatches || 0); // Ordena pelo número de termos correspondentes
    });

    // Encontrar o termo com o maior número de resultados
    var termoMaisResultados = Object.keys(termCounters).reduce(function(a, b) {
        return termCounters[a] > termCounters[b] ? a : b;
    });

    console.log("Termo com mais resultados: " + termoMaisResultados);
    console.log("Contador de termos: ", termCounters);
    listaEscolhida(listaParoquiaAux); // Exibe a lista filtrada
}


function listaParoquiaIgrejaOriginal(){
    var rows = JSON.parse(listaParoquias.length);
    for (var i = 0; i < rows; i++) {
        listaParoquias[i].exibe = 1;
    }
    listaEscolhida(listaParoquias);
}
