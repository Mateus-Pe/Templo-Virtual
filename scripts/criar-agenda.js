var imageFile;
var ids_remove = [];
var atual_evento_cod = 0;
dias_checked = [];

var igrejaId = null;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');
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
    if ($('#agenda_de').val() >= $('#agenda_ate').val()){
      texto_modal = "<p> A hora de início deve ser menor que a hora do fim. </p><br>";
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
    if (atual_evento_cod == 3){
      if($('#select_evento').val() == 0){
        texto_modal = "<p> Selecione o evento que irá realizar. </p><br>";
        $('#texto_confirmacao').html(texto_modal);
        erro = true;
      }
      if($('#select_evento').val() == 'Outros' && $('#text_evento').val() == ''){
        texto_modal = "<p> Digite qual evento irá realizar. </p><br>";
        $('#texto_confirmacao').html(texto_modal);
        erro = true;
      }
    }
    
    if(erro) {
      $('#modalConfirmacao').show();
    }else{  
      gerar_agenda();
    }
  }

  $('#confirmar').click(function (e) {
    $('#modalConfirmacao').hide();
    
  });

  function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_agenda",
      
    })
    .done(function(ret) {

      var obj = jQuery.parseJSON(ret);

      var html = '';
      html += '<div class="eventos_select divPerfilEC">';
            html += '<div> </div>';
            html += '<span></span>';
      html += '</div>';
      $.each(obj.lista_evento_agenda, function (k, lpp) {
          html += '<div data-evento_cod="'+lpp.evento_id+'" class="eventos_select divPerfilEC">';
            html += '<div>  <img  src="'+lpp.evento_icone_img+'">  </div>';
            html += '<span>'+lpp.evento_nome+'</span>';
          html += '</div>';
      });

      $("#divEventos").html(html);

      $('#carregando').hide();
      $('.eventos_select').click(function(e){
        $('.divPerfilEC').removeClass('perfil_ec_selected');
        $(this).addClass('perfil_ec_selected');
                    
        atual_evento_cod = $(this).data('evento_cod');
        console.log(atual_evento_cod);
        if (atual_evento_cod == 3){
          $("#divSelectEventos").css('display', 'block');
          console.log(atual_evento_cod);
        }else{
          $("#divSelectEventos").css('display', 'none');
          $("#divTextEvento").css('display', 'none');
        }
      });
    });
  }

function pegarEvento(){
  var ret = '';
  if(atual_evento_cod == 3){

    if($('#select_evento').val() != 0 && $('#select_evento').val() != 'Outros'){
      ret = $('#select_evento').val();
    }else if($('#select_evento').val() == 'Outros'){
      ret = $('#text_evento').val();
    }
  }
  return ret;
}

function gerar_agenda(){


    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda",
      data: { 
          'dias': dias_checked.join(),
          'agenda_igreja_id': igrejaId,
          'agenda_evento_id': atual_evento_cod,
          'agenda_evento_outro': pegarEvento(),
          'agenda_dias': $('#agenda_dias').val(),
          'tempo_duracao': $('#tempo_duracao').val(),
          'agenda_de': $('#agenda_de').val(),
          'agenda_ate': $('#agenda_ate').val(),
          'agenda_de_hora': splitHourMinute($('#agenda_de').val()).hour,
          'agenda_de_minuto': splitHourMinute($('#agenda_de').val()).minute,
          'agenda_ate_hora': splitHourMinute($('#agenda_ate').val()).hour,
          'agenda_ate_minuto': splitHourMinute($('#agenda_ate').val()).minute
          
        }
    })
      .done(function(ret) {


      var obj = jQuery.parseJSON(ret);

        if(obj.status == 1){
            window.sessionStorage.setItem('agenda_id', obj.agenda_id);
            window.location = "escolha-layout.html";
        }else{
          texto_modal = "<p> Nenhum evento criado, os dias da semana não batem com os dias a serem gerados </p><br>";
          $('#texto_confirmacao').html(texto_modal);
          $('#modalConfirmacao').show();
        }


      });
  }

$('#especifica').click(function(e){
  window.location = "criar-agenda-especifica.html";
});

$('#agenda_de').change(function (e) {
  var val = $("#agenda_de option:selected").next().next().val();
  $("#agenda_ate").val(val);
});

$("#select_evento").change(function(e){
  var opcaoSelecionada = $(this).val();
  console.log(opcaoSelecionada);
  if(opcaoSelecionada == 'Outros'){
    $("#divTextEvento").css('display', 'block');
  }else{
    $("#divTextEvento").css('display', 'none');
  }
});