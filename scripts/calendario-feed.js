currentDay = 0;
var igrejaId = null;
var arrDay = {
  numberDay : new Date().getDate(),
  day : new Date()
}
var startDayWeek;
var lastDayWeek;
const tamanhoItemLista = 80;
var contLista = 0;

const dias = [
  { 'id': 1, 'name': 'Segunda', 'name_caps' : 'SEGUNDA', 'name_small' : 'Seg'},
  { 'id': 2, 'name': 'Terça', 'name_caps' : 'TERÇA', 'name_small' : 'Ter' },
  { 'id': 3, 'name': 'Quarta', 'name_caps' : 'QUARTA', 'name_small' : 'Qua' },
  { 'id': 4, 'name': 'Quinta', 'name_caps' : 'QUINTA', 'name_small' : 'Qui' },
  { 'id': 5, 'name': 'Sexta', 'name_caps' : 'SEXTA', 'name_small' : 'Sex' },
  { 'id': 6, 'name': 'Sábado', 'name_caps' : 'SÁBADO', 'name_small' : 'Sab' },
  { 'id': 0, 'name': 'Domingo', 'name_caps' : 'DOMINGO', 'name_small' : 'Dom' },
];

const months = [
  { 'id': 1, 'name': 'Janeiro' },
  { 'id': 2, 'name': 'Fevereiro' },
  { 'id': 3, 'name': 'Março' },
  { 'id': 4, 'name': 'Abril' },
  { 'id': 5, 'name': 'Maio' },
  { 'id': 6, 'name': 'Junho' },
  { 'id': 7, 'name': 'Julho' },
  { 'id': 8, 'name': 'Agosto' },
  { 'id': 9, 'name': 'Setembro' },
  { 'id': 10, 'name': 'Outubro' },
  { 'id': 11, 'name': 'Novembro' },
  { 'id': 12, 'name': 'Dezembro' },
];


$(document).ready(function() {

  ref = new Date(); 
  makeDayWeek(ref);
  makeCalendar(ref, ref);

});


var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;





function letsCheck(year, month) {
    var mes = month +1;
    var daysInMonth = new Date(year, month, 0).getDate();
    var firstDay = new Date(year, mes, 1).getUTCDay();
    var array = {
        daysInMonth: daysInMonth,
        firstDay: firstDay
    };
    return array;
}

function makeDayWeek(ref){
  refN = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()); 
  
  html = '';
  for (let i = 1; i <= 7 ;i++) {
    dw = parseInt(refN.getUTCDay()) ;
    console.log(dw);
    dayWeek = dias.find(x => x.id == dw).name_small;
    html += '<li class="day-name">'+dayWeek+'</li>';
    refN.setDate(refN.getDate() + 1);     
  }
  $('.calendarList1').html(html);  
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


function makeCalendar(ref, refWeek) {
    

    var getChek = letsCheck(arrDay.day.getFullYear(), arrDay.day.getMonth()); 
    getChek.firstDay === 0 ? getChek.firstDay = 7 : getChek.firstDay;
    $('#calendarList').empty();
    d = parseInt(refWeek.getDate())
    i = 0;
    dtHtml = new Date(refWeek);
    do {
      diaHtml = dtHtml.getDate();
      mesHtml = dtHtml.getMonth();  
      anoHtml = dtHtml.getFullYear();    
      var div = '<li id="' + diaHtml + '" data-mes='+mesHtml+' data-ano='+anoHtml+'>' + diaHtml + '</li>'
      $('#calendarList').append(div);
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


    $('#yearMonth').text(arrDay.day.getDate() + ' ' + monthName );
    configuraEventos();
    
    
    if(igrejaId != null && igrejaId != ''){
      carregarCalendario();
    }

    var idDiaAnterior = ''; // Inicializa a variável idDiaAnterior


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
    $('#calendarList li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#yearMonth').text(arrDay.day.getDate() + ' ' + months.find(x => x.id == m).name);
  }
  data = arrDay.day.getFullYear() +'-'+m+"-"+arrDay.numberDay;
  console.log(data);
  get_calendario_hora(data);
}

function nextWeek(){
  
    //dt = new Date(startDayWeek) 
    startDayWeek.setDate(startDayWeek.getDate() + 7); 


    m = parseInt(startDayWeek.getMonth()) + 1; 
    $('#yearMonth').text(startDayWeek.getDate() + ' ' + months.find(x => x.id == m).name);
    

    makeCalendar(startDayWeek, startDayWeek);
  
    data = startDayWeek.getFullYear() +'-'+m+"-"+startDayWeek.getDate();
    get_calendario_hora(data);
}

function prevDay(){
  
  arrDay.day.setDate(arrDay.day.getDate() - 1); 
  arrDay.numberDay = arrDay.day.getDate(); 
  

  if(compareDatesMinur(arrDay.day,startDayWeek)){
    
    console.log("if")
    startDayWeek.setDate(startDayWeek.getDate() - 7);
    makeCalendar(arrDay.day, startDayWeek);
    
   // console.log(getChek.daysInMonth);
  }else{
    console.log('else');
    $('#calendarList li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
  
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#yearMonth').text(arrDay.day.getDate() + ' ' + months.find(x => x.id == m).name);
  }
    data = arrDay.day.getFullYear() +'-'+m+"-"+arrDay.numberDay;
    console.log(data);
    get_calendario_hora(data);
}

function prevWeek(){
  
  startDayWeek.setDate(startDayWeek.getDate() - 7); 
  m = parseInt(startDayWeek.getMonth()) + 1; 
  $('#yearMonth').text(startDayWeek.getDate() + ' ' + months.find(x => x.id == m).name);
  

  makeCalendar(startDayWeek, startDayWeek);

  data = startDayWeek.getFullYear() +'-'+m+"-"+startDayWeek.getDate();
  get_calendario_hora(data);
}

function configuraEventos(){    
  $('.calendarList2 li').click(function (e) {
    arrDay.day = new Date($(this).data('ano'), $(this).data('mes'), $(this).attr('id'));
    m = parseInt(arrDay.day.getMonth()) + 1; 
    monthName = months.find(x => x.id === m).name;
    
    $('#yearMonth').text(arrDay.day.getDate() + ' ' + monthName);
    $('#calendarList li').removeClass('dia_selecionado');
    $(this).addClass('dia_selecionado');

    data =($(this).data('ano') +'-'+m+"-"+$(this).attr('id'));
    get_calendario_hora(data);
  });    
}

  
function estiloEventoPassado(hora, minuto, segundo) {
    var dataRef= new Date(currentYear, currentMonth - 1, arrDay.numberDay, hora, minuto, segundo);
    //dataRef.setHours(hora, minuto, segundo, 0);

    const dataAtual = new Date();
     var htmlAncoraHora = '';
     
     if(dataAtual > dataRef){
       htmlAncoraHora = 'opacity: 50%;';
       contLista += 1;
     }

    return htmlAncoraHora;
}

  function montaHorario(ch){
   
    var html = '';
    if(ch.tipo == 'E'){

      html ='<div style="width: 60%; justify-content: center; display: flex; align-items: center;">'+
                    '<div style="width: 70px; height: 40px; border: 1px solid; border-radius: 20px; background-color: darkred; font-size: 16px; align-items: center; justify-content: center; display: flex; color: white;"> '+
                    ch.agenda_hora+
                    '</div>'+
              '</div>';
    }else{
      html = '<div style="width: 30%; justify-content: center; display: flex; align-items: center;">'+
                    '<div style="width: 70px; height: 40px; border: 1px solid; border-radius: 20px; background-color: darkred; font-size: 16px; align-items: center; justify-content: center; display: flex; color: white;">'+
                    ch.agenda_hora+
                  '</div>'+
              '</div>'+

              '<div style="width: 30%; justify-content: center; display: flex; align-items: center;">'+
                    '<div style="width: 70px; height: 40px; border: 1px solid; border-radius: 20px; background-color: darkred; font-size: 16px; align-items: center; justify-content: center; display: flex; color: white;">'+
                    ch.agenda_fim+
                  '</div>'+
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

			$('#divListaAgenda').html('');

            

            var total_checked = 0;
            
              $.each(obj.calendario_hora, function (k, ch) {
                checked = '';
                var arrHora = ch.agenda_hora.split(":");
              
              
                html =  '<div class="pesq" data-agenda_id="'+ch.agenda_id+'" data-igreja_id="'+ch.igreja_id+'" style="background-color: white; border-bottom: 1px solid #5b318a36; '+estiloEventoPassado(arrHora[0], arrHora[1], 0)+'">';

                html +=     '<div class="add" style="display: flex;" data-agenda_id="'+ ch.agenda_id +'">' +



                            '<div  style="display: inline-grid; padding-top: 10px;">'+
                                '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">'+
                                    '<img id="img_igreja_desc_resumida" src="'+ch.igreja_logo_url+'" style="height:50px; width: 50px; border-radius: 50%;">'+
                                '</div>'+
                                '<span id="desc_resumida" style="font-size: 1.3rem;text-align:center;text-decoration:none; width: 100px; padding-bottom: 5px;">'+
                                  ch.igreja_nome+
                                '</span>'+
                            '</div>'+


                            

                        '<div style="width: 50%; text-align: center; justify-content: center; align-items: center; display: flex;">'+
                          '<span style="font-size:1.5rem; color: black;">'+ ch.evento_nome +'</span>'+
                        '</div>'+
                        

                        
                        montaHorario(ch)+

                      '</div>' +
                    '</div>';

                $('#divListaAgenda').append(html);
                $('#divListaAgenda').scrollTop((contLista * tamanhoItemLista));

            });
            
            $('.pesq').click(function () {
                var agenda_id = $(this).data('agenda_id');
                window.sessionStorage.setItem('feed_igreja_id', $(this).data('igreja_id'));
                window.sessionStorage.setItem('feed_agenda_id', $(this).data('agenda_id'));
                window.location = 'perfil-igreja.html';
              
            });

            $('.status_layout').click(function(){
              var agenda_id = $(this).data('agenda_id');
              var status = $(this).data('status');

              $('#modalStatus').find('[data-agenda_id]').data('agenda_id', agenda_id);
              $('#modalStatus').find('[data-status]').data('status', status);

              $('#modalStatus').show();
              if(status == 2){
                 $('#mensagem_status').text('Este evento já está configurado para aparecer no feed');
                 $('#configurar_layout').css('display', 'none');
              }else if(status == 3){
                $('#mensagem_status').text('Este evento já foi realizado');
                $('#configurar_layout').css('display', 'none');
              }else{
                $('#mensagem_status').text('Este evento ainda não foi configurado, para configurar basta clicar em configurar layout');
                $('#configurar_layout').css('display', 'flex');
              }
            });

            $('#configurar_layout').click(function(){
              var agenda_id = $(this).data('agenda_id');
              window.sessionStorage.setItem('agenda_id', agenda_id);
              $('#modalStatus').hide();
              window.location = 'escolha-layout.html';
            });

            $('.remove-igreja').click(function () {

              var id = $(this).data('id');
              remover(id);
          });

	   });

}




  
