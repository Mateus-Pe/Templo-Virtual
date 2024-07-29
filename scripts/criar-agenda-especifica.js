var imageFile;
var ids_remove = [];
var atual_evento_cod = 0;
dias_checked = [];

var searchParams = new URLSearchParams(window.location.search);

var arrDay = {
  numberDay : new Date().getDate(),
  day : new Date()
}

var igrejaId = null;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');

  evento_agenda();
  
  var currentAno = arrDay.day.getFullYear();
  var currentMes = arrDay.day.getMonth();
  makeCalendar(currentAno, currentMes);

  $(document).on('selectDate', function(event, data){
    $('#data_evento').val(formata_data(data.returnDate));
})

});

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;





function letsCheck(year, month) {
    var mes = month -1;
    var daysInMonth = new Date(year, month, 0).getDate();
    var firstDay = new Date(year, mes, 1).getUTCDay();
    var array = {
        daysInMonth: daysInMonth,
        firstDay: firstDay
    };
    return array;
}


function configuraEventos(){

    
        $('.calendarList2 li').click(function (e) {
            $('.calendarList2 li').removeClass('selected');
            $(this).addClass('selected');
            $('#modalCalendario').hide();
          });

    
}

function formata_data(dateRef){
    var m = dateRef.getMonth() + 1;
    var d = dateRef.getDate();
    var y = dateRef.getFullYear();

    if(parseInt(d) < 10){
        d = '0'+d;
    }else{
        d = d;
    }

    if(parseInt(m) < 10){
        m = '0'+m;
    }else{
        m = m;
    }

    return d+'/'+m+"/"+ y;


}


  $('#btn_seguir').click(function(e){
    validacao_evento_agenda();
  });

  function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_agenda",
      
    })
    .done(function(ret) {

      var obj = jQuery.parseJSON(ret);

      var html = '';

      $.each(obj.lista_evento_agenda, function (k, lpp) {
          html += '<div data-evento_cod="'+lpp.evento_id+'" class="eventos_select divPerfilEC">';
          html += '<div>  <img  src="'+lpp.evento_icone_img+'"> </div>';
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
      });
    });
  }

  function gerar_agenda_especifica(){
    


    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda_especifica",
      data: { 
          'agenda_igreja_id': igrejaId,
          'agenda_evento_id': atual_evento_cod,    
          'agenda_data': $('#data_evento').val(),     
          'agenda_de_hora': splitHourMinute($('#agenda_de').val()).hour,
          'agenda_de_minuto': splitHourMinute($('#agenda_de').val()).minute,
          'agenda_ate_hora': splitHourMinute($('#agenda_ate').val()).hour,
          'agenda_ate_minuto': splitHourMinute($('#agenda_ate').val()).minute,
          
        }
    })
      .done(function(ret) {

        console.log(ret);
      var obj = jQuery.parseJSON(ret);
        
        if(obj.status ==1){
            window.sessionStorage.setItem('agenda_id', obj.agenda_id);
            window.location = "escolha-layout.html";
        }


      });
  }

  $('#recorrente').click(function(e){
    window.location = "criar-agenda.html";
  });

  $('#data_evento').focus(function(e){
    $('#modalCalendario').show();
  });
  

  function validacao_evento_agenda(){
    var erro = false;

    if($('#agenda_ate').val() == '0' || $('#agenda_ate').val() == undefined){
      texto_modal = "<p> Selecione quando o evento terminará. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#agenda_de').val() == '0' || $('#agenda_de').val() == undefined){
      texto_modal = "<p> Selecione quando o evento iniciará. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#data_evento').val() == ''){
      texto_modal = "<p> Selecione o dia que deseja agendar. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if (atual_evento_cod == 0) {
      texto_modal = "<p> Selecione o evento que deseja. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    } 
    if(!erro){

      if ($('#agenda_de').val() >= $('#agenda_ate').val()){
        texto_modal = "<p> A hora de início deve ser menor que a hora do fim. </p><br>";
        $('#texto_confirmacao').html(texto_modal);
        erro = true;
      }
    }

    $('#modalConfirmacao').show();
    
    $('#confirmar').click(function (e) {
      $('#modalConfirmacao').hide();
      
    });

    if(!erro){
      $('#modalConfirmacao').hide();
      gerar_agenda_especifica();
    }
  }

  $('#agenda_de').change(function (e) {
    var val = $("#agenda_de option:selected").next().next().val();
    $("#agenda_ate").val(val);
  });

