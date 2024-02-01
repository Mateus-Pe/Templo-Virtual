var imageFile;
var ids_remove = [];
var atual_evento_cod = 0;
dias_checked = [];

var igrejaId = null;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');

 alert(igrejaId)
  
    
  

});

var searchParams = new URLSearchParams(window.location.search);

evento_agenda();


  $('#btn_seguir').click(function(e){
    validacao_evento_agenda();
    
  });


  function validacao_evento_agenda(){
    var erro = false;
    $('.dias:checked').each(function(i, e) {
      dias_checked.push($(this).val());
      
    });

    if($('#agenda_ate').val() == '0'){
      texto_modal = "<p> Selecione quando o evento terminará. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#agenda_de').val() == '0'){
      texto_modal = "<p> Selecione quando o evento iniciará.. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#tempo_duracao').val() == '0'){
      texto_modal = "<p> Selecione o tempo de duração do evento. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#agenda_dias').val() == '0'){
      texto_modal = "<p> Selecione para quais dias deseja agendar. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if (dias_checked.length == 0) {
      texto_modal = "<p> Selecione o(s) dia(s) que deseja agendar. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    } 
    if (atual_evento_cod == 0) {
      texto_modal = "<p> Selecione o evento que deseja. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    } 

    $('#modalConfirmacao').show();
    
    $('#confirmar').click(function (e) {
      $('#modalConfirmacao').hide();
      
    });
    
    
    if(!erro) {
      gerar_agenda();
    }
  }

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
                html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;">'+lpp.evento_nome+'</span></div>';
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

  function gerar_agenda(){
    


    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda",
      data: { 
          'dias': dias_checked.join(),
          'agenda_igreja_id': igrejaId,
          'agenda_evento_id': atual_evento_cod,
          'agenda_dias': $('#agenda_dias').val(),
          'tempo_duracao': $('#tempo_duracao').val(),
          'agenda_de': $('#agenda_de').val(),
          'agenda_ate': $('#agenda_ate').val()
          
        }
    })
      .done(function(ret) {


      var obj = jQuery.parseJSON(ret);

        if(obj.status ==1){
            alert(obj.agenda_id);
            window.sessionStorage.setItem('agenda_id', obj.agenda_id);
            //window.location = "configurar-layout.html";
        }


      });
  }

  $('#especifica').click(function(e){
    window.location = "criar-agenda-especifica.html";
  });