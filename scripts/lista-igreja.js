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
        
        html += '<div style="height:40px; font-family: Exo; line-height:40px; border-bottom: 1px solid #643296; width: 100%;text-align: left; background-color:#643296">' +
                    '<span style="font-size:1.5rem; font-style: italic; padding-left: 15px; color:white;">' + data[i].tipo + '</span>' +
                    '</div>';

        html += '<div class="accordion" style="font-family: Exo;">';

        $.each(data[i].listabycat, function (k, l) {

            html += '<h3 style="border: 1px solid #ddd; border-radius:0px; display: block; color: #484848; font-weight: bold; cursor: pointer; position: relative; margin-top:0px; padding: 1.5em .5em 1.5em .7em; background: white;">' +
                 '<div class="list-line">'+
                 '<label for="itens-check" style="font-size:1.5rem;">' +
                 '<input style="margin-right: 10px;" type="checkbox" id="itens-check" name="itens-check" value="" style="z-index: 100;">'+
                 '<p style="display:inline;">'+l.igreja_nome+'</p>' +
                 
                 '</label>' +
                 '<p class="list-quantidade">1</p>' + 
                 '<span class="ion-android-arrow-dropleft-circle acToggle"></span>' +
                 '</div>'+
                 '</h3>' +
                 '<div class="columns">' +
                 '<div class="modal__container-img" style="margin-top: 0px;" >' +
                 '<h6>' + l.igreja_endereco_logradouro + '</h6>' +
                 '</div>' +
                 '</div>';
                        
        });

        html += '</div>';
    }
    
    $('#divListaPrincipal').html(html);

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
};

$('#add').click(function () {
    window.location = 'criar-igreja.html';
});
