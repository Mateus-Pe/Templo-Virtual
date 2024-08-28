var paroquia_id = null;
$(document).ready(function() {
    paroquia_id = window.sessionStorage.getItem('paroquia_id'); 
    if(paroquia_id != null && paroquia_id != ''){
        get_listaitem(paroquia_id);
        eventos_gerais(paroquia_id);
    }    
}); 

function get_listaitem(paroquiaId) {

    $.ajax({

        type: "POST",

        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja",

        cache: false,

        dataType: 'json',

        data: {paroquia_id: paroquiaId },

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

    html = '';

    categoria_cod = 0;
    for (var i = 0; i < rows; i++) {

        
        
        html += '<div class="div-igreja">' +
                    '<span class="span-igreja">' + data[i].tipo + '</span>' +
                    '</div>';

        html += '<div class="accordion" style="font-family: Exo;">';

        $.each(data[i].listabycat, function (k, l) {
            
            html += '<h3 style="border: 1px solid #ddd; border-radius:0px; display: flex; color: #484848; font-weight: bold; cursor: pointer; position: relative; margin-top:0px; padding: 1.5em .5em 1.5em .7em; background: white;">' +
            '<span class="ion-android-arrow-dropdown-circle acToggle" style="font-size: 17px !important; color: darkred; display: flex; align-items: center"></span>' +
                 '<div class="list-line">'+
                 '<label for="itens-check" class="label-lista">' +
                 '<p style="display:inline; padding:5px;">'+l.igreja_nome+'</p>' +
                 
                 '</label>' +
                 '</div>'+
                 '<span data-id="'+l.igreja_id+'" data-igreja_desc="'+l.igreja_nome+'" data-tipo_igreja="'+data[i].tipo_igreja+'" class="ion-android-settings editar-igreja" style="line-height: 1;"></span>' +
                 '</h3>' +
                 '<div class="modal-container endereco-lista" >' +
                    
                    '<div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 9px; font-size: 13px; gap: 9px; padding: 0.4em 1.2em !important;">' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_logradouro +', '+ l.igreja_endereco_numero + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_bairro + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_cidade + '</p>' +
                    '</div>' +
                    
               '</div>';
               

                 
                 
        });

        html += '</div>';
    }
    
    $('#divListaPrincipal').html(html);

   
};

function configurarEventos(){

    $('.editar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_desc', $(this).data('igreja_desc'));
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        var id = $(this).data('id');
        var nome = $(this).data('igreja_desc');
        $("#hid_igreja_id").val(id);
        $("#hid_igreja_nome").val(nome);
        if($(this).data('tipo_igreja') == 'P'){
            $('#excluir').hide();
            $('#tornar_matriz').hide();
        }else{
            $('#excluir').show();
            $('#tornar_matriz').show();
        }
        $('#modal_config').show();
    });

    $('#calendario').click(function () {
        //var id = $(this).data('igreja_id');
        var id =  $("#hid_igreja_id").val();
        window.sessionStorage.setItem('igreja_id', id);
        window.location = 'calendario.html';
    });
    

    $('#editar_perfil').click(function () {
        var id =  $("#hid_igreja_id").val();
        window.sessionStorage.setItem('igreja_id', id);
        window.location = 'configurar-perfil-igreja.html';
    });

    $('#excluir').click(function () {

        
        var id =  $("#hid_igreja_id").val();
        var nome = $("#hid_igreja_nome").val();
        $('#confirmarRemocao').data('id', id);
        $('#modal_config').hide();
        remover(id, nome);
    });

    $('#tornar_matriz').click(function(){
        var id =  $("#hid_igreja_id").val();
        var nome = $("#hid_igreja_nome").val();
        
        existeMatriz(nome, id);
        $('#modal_config').hide();
    })

    

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
            var $span = $(this).prev().find('.acToggle');
            
            if ($(this).attr('aria-hidden') == 'false') {
                $span.removeClass('ion-android-arrow-dropdown-circle'); 
                $span.addClass('ion-android-arrow-dropright-circle'); 
            } else {
                $span.removeClass('ion-android-arrow-dropright-circle'); 
                $span.addClass('ion-android-arrow-dropdown-circle'); 
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

$('#add').click(function () {
    window.sessionStorage.setItem('igreja_id', '');
    window.location = 'criar-igreja.html';
});


function remover(id, nome){
    texto_modal = "<p> Deseja remover <b>"+ nome +"</b>?</p><br>";
    $('#modalRemocao').show();
    $('#texto_remocao').html(texto_modal); 

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
            }
            
        });
    });
}

function eventos_gerais(paroquia_id){

    $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_estatistica",
        data: {
            paroquia_id : paroquia_id
        }
    })

    .done(function (ret) {
        var obj = jQuery.parseJSON(ret);

        if(obj.status == 1){
            html =  '<span id="eventos_dias" class="span_eventos_gerais">Eventos dos próximos 7 dias:</span>'+
                    '<span id="eventos_missas" class="span_eventos_gerais">Missas: '+obj.estatistica.missa+'</span>'+
                    '<span id="eventos_confissoes" class="span_eventos_gerais">Confissões: '+obj.estatistica.confissao+'</span>'+
                    '<span id="eventos_outros" class="span_eventos_gerais">Outros eventos: '+obj.estatistica.outro+'</span>';
            
            $('#eventos_gerais').html(html);
        }

    });
}

// menu

$('.page-menu--toggle').click(function(e){

    e.preventDefault();
  
    if($(this).hasClass('page-menu__hamburger--open')){

        
        $('.mobile-nav').css('display', 'none');
        $('#divCorpo').css('overflow', 'auto');
        $('body').css('overflow', 'auto');
        
        
    }
    else{
  
      $('.mobile-nav').css('display', 'block');
      $('#divCorpo').css('overflow', 'hidden');
      $('body').css('overflow', 'hidden');
    }
  
    $(this).toggleClass('page-menu__hamburger--open');
  
    $('.page-menu').toggleClass('disabled');
  
    $('body').toggleClass('disabled');

    $('body').toggleClass('no-scroll');

  
    efeitoBlur()
  
});

  
function efeitoBlur(){

$('main').toggleClass('is-blur');

$('.show-search').toggleClass('is-blur');

$('.categories').toggleClass('is-blur');

$('.options').toggleClass('is-blur');

$('.search-market').toggleClass('is-blur');

$('#divListaPrincipal').toggleClass('is-blur');

$('#eventos_gerais').toggleClass('is-blur');

$('.container').toggleClass('is-blur');

}



//Verifica o item clicado no sidemenu

$('.mobile-nav__items li a').click(function(){

var classeItemMenu = $(this).attr('class');



if(classeItemMenu == 'mobile-nav__link-produtos'   ||

    classeItemMenu == 'mobile-nav__link-categorias' ||

    classeItemMenu == 'mobile-nav__link-mercados'){

    setStorageMenu(classeItemMenu);

    window.location = 'vitrine-geral.html';

}

});

function setStorageMenu(item_menu) {

sessionStorage.setItem("item_menu", item_menu);

}

function existeMatriz(igrejaNome, id){
$.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_matriz",
    data: { paroquia_id: window.sessionStorage.getItem('paroquia_id') },
    
})
    .done(function (ret) {
    var obj = jQuery.parseJSON(ret);
    
    if(obj.status == '1'){
        matriz = obj.matriz.igreja_nome;
        texto_modal = "<p> A Matriz atual é a <b>"+ matriz +"</b>.</p><br>";
        texto_modal += "<p> Deseja tornar a <b>"+ igrejaNome +"</b> Matriz? </p>";
        $('#confirmarTransicao').data('id', id);  
        $('#texto_confirmacao').html(texto_modal);  
        $('#modalConfirmacao').show(); 
    }
        
    });
}

function atualizar_matriz(igrejaId){
if(igrejaId != null){
    $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_matriz",
    data: {
        igreja_id : igrejaId,
        paroquia_id: window.sessionStorage.getItem('paroquia_id')
        
    }
    })
    .done(function (ret) {
        var obj = jQuery.parseJSON(ret);
        if(obj.status == '1'){
        window.location = "lista-igreja.html";
        }
        
    });
}
}

$('#confirmarTransicao').click(function(e){
atualizar_matriz($(this).data('id'));
});  

$('#cancelarTransicao').click(function(){
$('#modalConfirmacao').hide();
$('.chk_matriz').prop('checked', false);
});

$('#cancelar').click(function(){
$('#modal_config').hide();
});

$('#cancelarRemocao').click(function(){
$('#modalRemocao').hide();
});