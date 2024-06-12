var imageFile;
var ids_remove = [];
var atual_evento_cod = 0;
dias_checked = [];

var searchParams = new URLSearchParams(window.location.search);



var igrejaId = null;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');

  evento_agenda();
  
    
  

});


const months = [
    { 'id': 1, 'name': 'Jan' },
    { 'id': 2, 'name': 'Fev' },
    { 'id': 3, 'name': 'Mar' },
    { 'id': 4, 'name': 'Abr' },
    { 'id': 5, 'name': 'Mai' },
    { 'id': 6, 'name': 'Jun' },
    { 'id': 7, 'name': 'Jul' },
    { 'id': 8, 'name': 'Ago' },
    { 'id': 9, 'name': 'Set' },
    { 'id': 10, 'name': 'Out' },
    { 'id': 11, 'name': 'Nov' },
    { 'id': 12, 'name': 'Dez' },
];
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


function makeCalendar(year, month) {
    var getChek = letsCheck(year, month);
    getChek.firstDay === 0 ? getChek.firstDay = 7 : getChek.firstDay;
    $('#calendarList').empty();
    for (let i = 1; i <= getChek.daysInMonth; i++) {
        if (i === 1) {
            var div = '<li id="' + i + '" style="grid-column-start: ' + getChek.firstDay + ';">1</li>';
        } else {
            var div = '<li id="' + i + '" >' + i + '</li>'
        }
        $('#calendarList').append(div);
    }
    monthName = months.find(x => x.id === month).name;
    $('#yearMonth').text(year + ' ' + monthName);
    configuraEventos();
}

makeCalendar(currentYear, currentMonth);


function nextMonth() {
    currentMonth = currentMonth + 1;
    if (currentMonth > 12) {
        currentYear = currentYear + 1;
        currentMonth = 1;
    }
    $('#calendarList').empty();
    $('#yearMonth').text(currentYear + ' ' + currentMonth);
    makeCalendar(currentYear, currentMonth);

}


function prevMonth() {
    currentMonth = currentMonth - 1;
    if (currentMonth < 1) {
        currentYear = currentYear - 1;
        currentMonth = 12;
    }
    $('#calendarList').empty();
    $('#yearMonth').text(currentYear + ' ' + currentMonth);
    makeCalendar(currentYear, currentMonth);

}


function configuraEventos(){

    
        $('.calendarList2 li').click(function (e) {
            $('.calendarList2 li').removeClass('selected');
            $(this).addClass('selected');
            $('#data_evento').val(formata_data($(this).attr('id')));
            $('#modalCalendario').hide();
          });    

    
}

function formata_data(day){
    var mes = '';
    var dia = '';

    if(parseInt(day) < 10){
        dia = '0'+day;
    }else{
        dia = day;
    }

    if(parseInt(currentMonth) < 10){
        mes = '0'+currentMonth;
    }else{
        mes = currentMonth;
    }

    data =dia+'/'+mes+"/"+ currentYear;

    return data;

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

  function gerar_agenda_especifica(){
    


    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda_especifica",
      data: { 
          'agenda_igreja_id': igrejaId,
          'agenda_evento_id': atual_evento_cod,    
          'agenda_data': $('#data_evento').val(),     
          'agenda_de': $('#agenda_de').val(),
          'agenda_ate': $('#agenda_ate').val()
          
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

    if($('#agenda_ate').val() == '0'){
      texto_modal = "<p> Selecione quando o evento terminará. </p><br>";
      $('#texto_confirmacao').html(texto_modal);
      erro = true;
    }
    if($('#agenda_de').val() == '0'){
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

