var imageFile;
var atual_evento_cod = 0;


evento_agenda();



  function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_agenda",
      
    })
    .done(function(ret) {

      var obj = jQuery.parseJSON(ret);

      var html = '';
      html += '<section class="regular slider">';

      $.each(obj.lista_evento_agenda, function (k, lpp) {
          html += '<a data-evento_cod="'+lpp.evento_id+'" class="produtos_perfil"><div data-evento_cod="'+lpp.evento_id+'" class="divPerfilEC" style="opacity: 0.5;height: 90px; display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
              html += '<div style="display: grid;">';
          html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.evento_icone_img+'" style="height:50px"/></div>';
                html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;"></span></div>';
              html += '</div></a>';
      });
      html += '</section>';

      $("#divHistoria").html(html);

      slick();
      $('#carregando').hide();
      $('.produtos_perfil').click(function(e){
        $('.divPerfilEC').removeClass('perfil_ec_selected');
        $(this).children().addClass('perfil_ec_selected');
                    
        atual_evento_cod = $(this).data('evento_cod');
        console.log(atual_evento_cod);
      });
    });
  }

  function slick(){
    $(".regular").slick({
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2
    });

  }

  