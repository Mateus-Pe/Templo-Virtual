var paroquia_id = null;
$(document).ready(function() {
    paroquia_id = window.sessionStorage.getItem('paroquia_id'); 
    if(paroquia_id != null && paroquia_id != ''){
        get_listaitem(paroquia_id);
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
            var span_remove = '';
            if(data[i].permite_excluir == 'S'){
            
                span_remove = '<span data-id="'+l.igreja_id+'" class="material-symbols-outlined acToggle remove-igreja">delete</span>' ;              
            }

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
                    '<span data-id="'+l.igreja_id+'" data-igreja_desc="'+l.igreja_desc_resumida+'" class="material-symbols-outlined acToggle calendario">calendar_month</span>' +
                    '<span data-id="'+l.igreja_id+'" data-igreja_desc="'+l.igreja_desc_resumida+'" class="material-symbols-outlined acToggle configurar-igreja">manufacturing</span>' +
                    '<span data-id="'+l.igreja_id+'" data-igreja_desc="'+l.igreja_desc_resumida+'" class="material-symbols-outlined acToggle editar-igreja">edit</span>' +
                    span_remove +
                    '</div>' +
                    '</div>'+
               '</div>';
               

                 
                 
        });

        html += '</div>';
    }
    
    $('#divListaPrincipal').html(html);

   
};

function configurarEventos(){

    $('.calendario').click(function () {
        window.sessionStorage.setItem('igreja_desc', $(this).data('igreja_desc'));
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        window.location = 'calendario.html';
    });
    
    $('.editar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_desc', $(this).data('igreja_desc'));
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        window.location = 'criar-igreja.html';
    });

    $('.configurar-igreja').click(function () {
        window.sessionStorage.setItem('igreja_desc', $(this).data('igreja_desc'));
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

// menu

$('.page-menu--toggle').click(function(e){

    e.preventDefault();
  
    if($(this).hasClass('page-menu__hamburger--open')){

        
        $('.mobile-nav').css('display', 'none');
        $('#add').css('bottom', '10px');
        $('#divListaPrincipal').removeClass('move-right');
        
        
    }
    else{
  
      $('.mobile-nav').css('display', 'block');
      $('#add').css('bottom', 'calc(10px + var(--nav-height))');
      $('#divListaPrincipal').addClass('move-right');
  
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