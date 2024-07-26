currentDay = 0;
var igrejaId = null;
var arrDay = {
  numberDay : new Date().getDate(),
  day : new Date()
}
var startDayWeek;
var startDayWeekNumber;
var lastDayWeek;
const tamanhoItemLista = 80;
var contLista = 0;
var listaTotalCh;

$(document).ready(function() {

  ref = new Date(); 
  makeDayWeek(ref);
  makeCalendarWeek(ref, ref);
  var currentYear = arrDay.day.getFullYear();
  var currentMonth = arrDay.day.getMonth();
  makeCalendar(currentYear, currentMonth);


  $(document).on('selectDate', function(event, data){
      makeCalendarWeek(data.returnDate, getStartWeekDayUtil(data.returnDate));
  })

  $('.select_filter div').click(function() {
    $('.select_filter div').removeClass('selected');
    $(this).addClass('selected');
  });
});

function getStartWeekDayUtil(dt){
  dtR = new Date(dt)
  for (let i = 1; i <= 7 ;i++) {
    if(dtR.getUTCDay() == startDayWeekNumber){
      return dtR;
    }
    dtR.setDate(dtR.getDate() -1);
  }  
}

function makeDayWeek(ref){
  refN = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()); 
  startDayWeekNumber = refN.getUTCDay();
  html = '';
  for (let i = 1; i <= 7 ;i++) {
    dw = parseInt(refN.getUTCDay()) ;
    dayWeek = dias.find(x => x.id == dw).name_small;
    html += '<li class="day-name">'+dayWeek+'</li>';
    refN.setDate(refN.getDate() + 1);     
  }
  $('.calendarWeekList1').html(html);  
}

function compareDatesMinur (dt1, dt2) {
  let d1 = new Date(dt1); 
  let d2 = new Date(dt2);     
  return d1 < d2 ? true : false
}

function compareDatesMajor (dt1, dt2) {
  let d1 = new Date(dt1); 
  let d2 = new Date(dt2);     
  return d1 > d2 ? true : false
}


function makeCalendarWeek(ref, refWeek) {
    

    var getChek = letsCheck(arrDay.day.getFullYear(), arrDay.day.getMonth()); 
    getChek.firstDay === 0 ? getChek.firstDay = 7 : getChek.firstDay;
    $('#calendarEvents').empty();
    d = parseInt(refWeek.getDate())
    i = 0;
    dtHtml = new Date(refWeek);
    do {
      diaHtml = dtHtml.getDate();
      mesHtml = dtHtml.getMonth();  
      anoHtml = dtHtml.getFullYear();    
      var div = '<li id="' + diaHtml + '" data-mes='+mesHtml+' data-ano='+anoHtml+'>' + diaHtml + '</li>'
      $('#calendarEvents').append(div);
      lastDayWeek = d; 
      if(d >= getChek.daysInMonth)d=0;
      dtHtml.setDate(dtHtml.getDate() + 1);
      i++;  
    }while(i < 7)

    arrDay.day = new Date(ref);
    //ref.setDate(ref.getDate() - 1);  
    lastDayWeek = new Date(refWeek);
    lastDayWeek.setDate(lastDayWeek.getDate() + 6);  
    startDayWeek = new Date(refWeek);

    m = parseInt(arrDay.day.getMonth()) + 1; 
    monthName = months.find(x => x.id === m).name;
    $('#' + ref.getDate()).addClass('dia_selecionado');
    data =arrDay.day.getFullYear() +'-'+m+"-"+arrDay.day.getDate(); 
    get_calendario_hora(data);


    $('#dayMonth').text(arrDay.day.getDate() + ' ' + monthName );
    configuraEventos();
    
    
    if(igrejaId != null && igrejaId != ''){
      carregarCalendario();
    }
}

function loadDay(){
  //var data =  window.sessionStorage.getItem('data_referencia');
    day = new Date();
  var array = {
    numberDay : day.getDate(),
    day : day
  }
  
  return array;
  
}

function nextDay(){
  
  arrDay.day.setDate(arrDay.day.getDate() + 1); 
  arrDay.numberDay = arrDay.day.getDate(); 
  

  if(compareDatesMajor(arrDay.day,lastDayWeek)){
    nextWeek();
  }else{
    $('#calendarEvents li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#dayMonth').text(arrDay.day.getDate() + ' ' + months.find(x => x.id == m).name);
  }
  data = arrDay.day.getFullYear() +'-'+m+"-"+arrDay.numberDay;
  get_calendario_hora(data);
}

function nextWeek(){
  
    //dt = new Date(startDayWeek) 
    startDayWeek.setDate(startDayWeek.getDate() + 7); 


    m = parseInt(startDayWeek.getMonth()) + 1; 
    $('#dayMonth').text(startDayWeek.getDate() + ' ' + months.find(x => x.id == m).name);
    

    makeCalendarWeek(startDayWeek, startDayWeek);
  
    data = startDayWeek.getFullYear() +'-'+m+"-"+startDayWeek.getDate();
    get_calendario_hora(data);
}

function prevDay(){
  
  arrDay.day.setDate(arrDay.day.getDate() - 1); 
  arrDay.numberDay = arrDay.day.getDate(); 
  

  if(compareDatesMinur(arrDay.day,startDayWeek)){
    startDayWeek.setDate(startDayWeek.getDate() - 7);
    makeCalendarWeek(arrDay.day, startDayWeek);
  }else{
    $('#calendarEvents li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
  
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#dayMonth').text(arrDay.day.getDate() + ' ' + months.find(x => x.id == m).name);
  }
    data = arrDay.day.getFullYear() +'-'+m+"-"+arrDay.numberDay;
    get_calendario_hora(data);
}

function prevWeek(){
  
  startDayWeek.setDate(startDayWeek.getDate() - 7); 
  m = parseInt(startDayWeek.getMonth()) + 1; 
  $('#dayMonth').text(startDayWeek.getDate() + ' ' + months.find(x => x.id == m).name);
  

  makeCalendarWeek(startDayWeek, startDayWeek);

  data = startDayWeek.getFullYear() +'-'+m+"-"+startDayWeek.getDate();
  get_calendario_hora(data);
}

function configuraEventos(){
  $('.calendarWeekList2 li').click(function (e) {
    arrDay.day = new Date($(this).data('ano'), $(this).data('mes'), $(this).attr('id'));
    m = parseInt(arrDay.day.getMonth()) + 1; 
    monthName = months.find(x => x.id === m).name;
    
    $('#dayMonth').text(arrDay.day.getDate() + ' ' + monthName);
    $('#calendarEvents li').removeClass('dia_selecionado');
    $(this).addClass('dia_selecionado');

    data =($(this).data('ano') +'-'+m+"-"+$(this).attr('id'));
    get_calendario_hora(data);
  });
}

  
function estiloEventoPassado(hora, minuto, segundo) {
    /*var dataRef= new Date(currentYear, currentMonth - 1, arrDay.numberDay, hora, minuto, segundo);
    //dataRef.setHours(hora, minuto, segundo, 0);

    const dataAtual = new Date();
     var htmlAncoraHora = '';
     
     if(dataAtual > dataRef){
       htmlAncoraHora = 'opacity: 50%;';
       contLista += 1;
     }

    return htmlAncoraHora;*/
    return '';
}

function montaHorario(ch){
   
    var html = '';
    if(ch.tipo == 'E'){

      html =  '<div class="agenda_hora"> '+
                'Ás '+timeFormat(ch.agenda_hora,'h', true)+
              '</div>';
              
    }else{
      html =  '<div class="agenda_hora">'+
                  'Das '+ch.agenda_hora+' ás '+ch.agenda_fim+
              '</div>';
    }
    return html;
  }
  
function get_calendario_hora(dtReferencia){

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario_feed",
	   data: {  'cidade_id': 9240, 
                data_referencia: dtReferencia,
                
			 }
	 })
	  .done(function(ret) {
      var obj = jQuery.parseJSON(ret);

      listaTotalCh = obj.calendario_hora;

			montaHtmlCalendarioHora(listaTotalCh);
	  });
}


function getAgendaById(agenda_id){

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_by_agenda_id",
	   data: {  'agenda_id': agenda_id
			 }
	 })
	  .done(function(ret) {
      var obj = jQuery.parseJSON(ret);
      console.log(obj);
      htmlEvents = '';
      html =  '<div class="div_perfil" >'+
                  '<div class="perfil_div">'+
                    '<img class="img_igreja" src="' + obj.agenda.igreja_logo_url + '">'+
                    '<span class="nome_igreja">'+
                      obj.agenda.igreja_nome+
                    '</span>'+
                  '</div>'+
                  '<div style="border: 1px solid black; align-items: center; display: grid; padding-right: 10px; padding-left: 10px; font-family: exo;">'+
                    '<span id="dia_evento" style="font-size: 1.2rem; color: white; display: flex; justify-content: center;">'+
                      dateText(splitDateTime(obj.agenda.data_inicio_evento).date)+
                    '</span>'+
                    '<span id="hora_evento" style="font-size: 1.2rem; color: white; display: flex; justify-content: center;">'+
                      timeFormat(splitDateTime(obj.agenda.data_inicio_evento).time, ':', true)+
                    '</span>'+
                  '</div>'+
                '</div>'+

              '<div class="feed_principal">'+
                '<div class="div_img_layout">'+
                    '<img id="visualiza_layout_feed" src="'+obj.agenda.agenda_img+'">'+
                '</div>'+
                '<div class="div_descricao">'+
                    '<span id="descricao_layout_feed" class="span_descricao">'+
                        obj.agenda.agenda_layout_upload_desc+
                    '</span>'+
                '</div>'+
              '</div>'+
              '<div id="divFixa"></div>';

          $("#modalPublicacaoEvento").html(html);

        htmlEvents = '<div id="horizontal_eventos">';
          $.each(obj.eventos_igreja, function (k, ei) {
            htmlEvents +=        '<div id="agenda" class="agenda_events">';
            htmlEvents +=             '<div>';
            htmlEvents +=             '<div class="div_agenda">'
            htmlEvents +=                 '<span class="span_agenda span_agenda_left">';
            htmlEvents +=                     dateText(splitDateTime(ei.agenda_horario).date);
            htmlEvents +=                 '</span>';
            htmlEvents +=                 '<span class="span_agenda span_agenda_right">';
            htmlEvents +=                     timeFormat(splitDateTime(ei.agenda_horario).time, ':', true);
            htmlEvents +=                 '</span>';
            htmlEvents +=             '</div>'
            htmlEvents +=                 '<img id="div_img" src="'+ei.agenda_img+'">';
            htmlEvents +=             '</div>';
            htmlEvents +=         '</div>';
        });
      htmlEvents +=      '</div>';
      htmlEvents +=      '<div class="div_ver_mais" data-igreja_id="'+obj.agenda.agenda_igreja_id+'">';
      htmlEvents +=         '<span>';
      htmlEvents +=             'Ver mais';
      htmlEvents +=         '</span>';
      htmlEvents +=      '</div>';
        
        $("#divFixa").html(htmlEvents);

        $('.div_ver_mais').click(function () {
          var agenda_id = $(this).data('agenda_id');
          window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
          window.location = 'perfil-igreja.html';
          console.log('clicou');
          
        });
	  });
}

function configurarEventosCalendarioHora(){
  $('.pesq').click(function () {
    var agenda_id = $(this).data('agenda_id');
    //window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
    //window.sessionStorage.setItem('feed_agenda_id', $(this).data('agenda_id'));
    //window.location = 'perfil-igreja.html';
    getAgendaById($(this).data('agenda_id'))
    $("#modalPublicacaoEvento").show();
});
}

$("#modalPublicacaoEvento").click(function(e){
  $("#modalPublicacaoEvento").hide();
});

$("#dayMonth").click(function(e){
  $("#modalCalendario").show();
});

function montaHtmlCalendarioHora(listaCalendarioHora){
  $('#divListaAgenda').html('');

            var total_checked = 0;
            
              $.each(listaCalendarioHora, function (k, ch) {
                checked = '';
                var arrHora = ch.agenda_hora.split(":");
              
              
                html =  '<div class="pesq" data-agenda_id="'+ch.agenda_id+'" data-igreja_id="'+ch.igreja_id+'" style="background-color: white; border-bottom: 1px solid #5b318a36; '+estiloEventoPassado(arrHora[0], arrHora[1], 0)+'">';

                html +=     '<div class="add"" data-agenda_id="'+ ch.agenda_id +'">' +


                            '<div  class="agenda">'+

                              '<div class="div_img">'+
                                  '<img id="img_igreja_desc_resumida" src="'+ch.igreja_fundo_url+'">'+
                              '</div>'+

                              '<div>'+
                                '<div id="desc_resumida" class="igreja_nome">'+
                                upperText(ch.igreja_nome)+
                                '</div>'+

                                '<span id="endereco_igreja" class="endereco_igreja">'+
                                  ch.endereco_bairro+ '  -  '+ removerUf(ch.endereco_cidade)+
                                '</span>'+

                                '<div class="div_evento_agenda">'+
                                  '<span>'+ ch.evento_nome +'</span>'+
                                '</div>'+
                                montaHorario(ch)+
                              '</div>'+
                            '</div>'+
                        

                      '</div>' +
                    '</div>';

                $('#divListaAgenda').append(html);
                $('#divListaAgenda').scrollTop((contLista * tamanhoItemLista));

            });
            configurarEventosCalendarioHora();
}

$("#select_missa").click(function(e){
  listaMissa = listaTotalCh.filter(function(a, b){
    return a['evento_nome'] == 'Missa';
  });
  montaHtmlCalendarioHora(listaMissa);
});

$("#select_confissao").click(function(e){
  listaMissa = listaTotalCh.filter(function(a, b){
    return a['evento_nome'] == 'Confissão';
  });
  montaHtmlCalendarioHora(listaMissa);
});

$("#select_todos").click(function(e){
  montaHtmlCalendarioHora(listaTotalCh);
})