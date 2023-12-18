get_listaitem();

function get_listaitem() {

    $.ajax({

        type: "POST",

        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja",

        cache: false,

        dataType: 'json',

        data: { 'lista_cod': 1291 },

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

            html += '<h3 style="border: 1px solid #ddd; border-radius:0px; display: block; color: #484848; font-weight: bold; cursor: pointer; position: relative; margin-top:0px; padding: 1.5em .5em 1.5em .7em; background: white;">' +
                 '<div class="list-line">'+
                 '<label for="itens-check" class="label-lista">' +
                 '<p style="display:inline; padding:10px;">'+l.igreja_nome+'</p>' +
                 
                 '</label>' +
                 '<span class="ion-android-arrow-dropleft-circle acToggle"></span>' +
                 '</div>'+
                 '</h3>' +
                 '<div class="modal-container endereco-lista" >' +
                    '<div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 9px; font-size: 10px;">' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_logradouro +', '+ l.igreja_endereco_numero + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_bairro + '</p>' +
                    '<p style="margin: 3px 0; text-align: left;">' + l.igreja_endereco_cidade + '</p>' +
                    '</div>' +
                    '<div class="list-line">'+
                    '<div class="columns">' +
                    '<span data-id="'+l.igreja_id+'" class="material-symbols-outlined acToggle editar-igreja">edit</span>' +
                    '<span data-id="'+l.igreja_id+'" class="material-symbols-outlined acToggle remove-igreja">delete</span>' +
                    '</div>' +
                    '</div>'+
               '</div>';
               

                 
                 
        });

        html += '</div>';
    }
    
    $('#divListaPrincipal').html(html);

   
};

function configurarEventos(){

    $('.editar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        window.location = 'criar-igreja.html';
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

$('#add').click(function () {
    window.sessionStorage.setItem('igreja_id', '');
    window.location = 'criar-igreja.html';
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