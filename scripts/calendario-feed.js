currentDay = 0;
var igrejaId = null;
var dtReferencia;
var arrDay = {
  numberDay : new Date().getDate(),
  day : new Date()
}
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


$(document).ready(function() {
  
  igrejaId = window.sessionStorage.getItem('igreja_id');
  ref = new Date(); 
  makeDayWeek(ref);
  makeCalendar(ref, currentYear, currentMonth);

  $('#visualizar_layout').click(function(){
    var agenda_img = $(this).find('[data-agenda_img]').data('agenda_img');
    var logo_url = $(this).find('[data-logo_url]').data('logo_url');
    var igreja_nome = $(this).find('[data-igreja_nome]').data('igreja_nome');
    var agenda_desc = $(this).find('[data-agenda_desc]').data('agenda_desc');
    

    $('#visualiza_layout_feed').attr('src', agenda_img);
    $('#imagem_igreja').attr('src', logo_url);
    $(".nome_igreja").text(igreja_nome);
    $("#descricao_layout_feed").html(agenda_desc);

    $('#modal_config').hide();
    $('#modal_visualizar_layout').show();
   
    
    console.log('visualizou o layout');
    
  });

  $('#editar_layout').click(function(){
          var agenda_id = $(this).find('[data-agenda_id]').data('agenda_id');
          var status = $(this).find('[data-status]').data('status');
          var agenda_hora = $(this).find('[data-agenda_hora]').data('agenda_hora');
          var str_data_referencia =  dtReferencia + '-' +  agenda_hora;
          window.sessionStorage.setItem('agenda_id', agenda_id);
          console.log(status);
          //window.sessionStorage.setItem('data_referencia', str_data_referencia);
          if(status == 2){
            window.location = 'configurar_layout_upload.html';
          }
          else{
            window.location = 'escolha-layout.html';
          }
        
          $('#modal_config').hide();
         console.log(agenda_id);
        console.log('configurou o layout');
  })

  $('#cancelar').click(function(){
    $('#modal_config').hide();
  })


  $(document).on('click', function(event) {
    if ($(event.target).closest('.modal-content1').length === 0) {
        $('#modal_visualizar_layout').hide();
    }
    
  });

  $('#excluir').click(function(){
    
    $('#modal_config').hide();
    $('#modalConfirmacao').show();
  });

  $('#cancelarRemocao').click(function(){
    $('#modalConfirmacao').hide();
    $('#modal_config').show();
  });

  $('#confirmarRemocao').click(function(){
    var agenda_id = $('#modal_config').find('[data-agenda_id]').data('agenda_id');
    remover(agenda_id);
    setTimeout(function() {
      // Verificar se ainda existem eventos na lista
      if ($('#divListaAgenda').find('.pesq').length === 0) {
          // Não há mais eventos, então atualize a tela
          location.reload(); // Isso recarrega a página
      } else {
          // Ainda existem eventos na lista
          $('#modalConfirmacao').hide();
          $('#modal_config').hide();
      }
  }, 1000);
  });
});

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

function compareDates (dt1, dt2) {
  let d1 = new Date(dt1); 
  let d2 = new Date(dt2);     
  return d1 > d2 ? true : false
}


function makeCalendar(ref, year, month) {
    
    var getChek = letsCheck(year, month); 
    getChek.firstDay === 0 ? getChek.firstDay = 7 : getChek.firstDay;
    $('#calendarList').empty();
    d = parseInt(ref.getDate())
    i = 0;
    do {
      var div = '<li id="' + d+ '" >' + d + '</li>'
      $('#calendarList').append(div);
      lastDayWeek = d; 
      if(d >= getChek.daysInMonth)d=0;
      d+=1;
      i++;  
    }while(i < 7)


    //ref.setDate(ref.getDate() - 1);  
    lastDayWeek = new Date(ref);
    lastDayWeek.setDate(lastDayWeek.getDate() + 6);  

    monthName = months.find(x => x.id === month).name;
    
    
    $('#' + arrDay.numberDay).addClass('dia_selecionado');
    data =currentYear +'-'+currentMonth+"-"+arrDay.numberDay;
    get_calendario_hora(data);


    $('#yearMonth').text(arrDay.numberDay + ' ' + monthName );
    configuraEventos();
    
    
    if(igrejaId != null && igrejaId != ''){
      carregarCalendario();
    }

    var idDiaAnterior = ''; // Inicializa a variável idDiaAnterior

$('#calendarList').on('click', 'li', function() {
  arrDay.numberDay = parseInt($(this).attr('id'));
  $('#yearMonth').text(arrDay.numberDay + ' ' + monthName);

  if (idDiaAnterior !== '') {
      
    $('#' + idDiaAnterior).addClass('dia_eventos');
  }
    // Remove a classe dia_selecionado de todos os dias
    $('#calendarList li').removeClass('dia_selecionado');
    
    // Adiciona a classe dia_selecionado ao dia clicado para destacá-lo
    $(this).addClass('dia_selecionado');
    
    // Verifica se o dia clicado possui a classe dia_eventos
    if ($(this).hasClass('dia_eventos')) {
        // Remove a classe dia_eventos do dia clicado
        $(this).removeClass('dia_eventos');
        idDiaAnterior =  $(this).attr('id'); // Atualiza idDiaAnterior com o ID do dia clicado
    }
});
//$('#divListaAgenda').removeClass('calendar_open');
}
$('#yearMonth').data('click-count', 0);

$('#yearMonth ').click(function(e){
  var clickCount = $(this).data('click-count'); 
  clickCount++;
  $(this).data('click-count', clickCount);

  if(clickCount % 2 == 0){
    $('#div_dias').css('display', 'none');
    $('#divListaAgenda').css('height', '90%');
    
  }else{
    $('#div_dias').css('display', 'grid');
    $('#divListaAgenda').css('height', '50%');
  }
});

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
  var getChek = letsCheck(currentYear, currentMonth);
  
  arrDay.day.setDate(arrDay.day.getDate() + 1); 
  arrDay.numberDay = arrDay.day.getDate(); 
  

  if(compareDates(arrDay.day,lastDayWeek)){
    
    console.log("if")
   
    makeCalendar(arrDay.day , currentYear, currentMonth);
   // console.log(getChek.daysInMonth);
  }else{
    console.log('else');
    $('#calendarList li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
  
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#yearMonth').text(arrDay.day.getDate() + ' ' + months.find(x => x.id == m).name);
  }
    data =currentYear +'-'+currentMonth+"-"+arrDay.numberDay;
    get_calendario_hora(data);
}

function prevDay(){
  var getChek = letsCheck(currentYear, currentMonth - 1);
  arrDay.numberDay -= 1;

  if(arrDay.numberDay < 1){
    arrDay.numberDay = getChek.daysInMonth;
    prevMonth();
  }else{
    $('#calendarList li').removeClass('dia_selecionado');
    $('#' + arrDay.day.getDate()).addClass('dia_selecionado');
    m = parseInt(arrDay.day.getMonth()) + 1; 
    $('#yearMonth').text(arrDay.day.getDate() + ' ' + m);
    
  }
  data =arrDay.day.getFullYear() +'-'+m+"-"+arrDay.numberDay;
  get_calendario_hora(data);
}


function nextMonth() {
    currentMonth = currentMonth + 1;
    if (currentMonth > 12) {
        currentYear = currentYear + 1;
        currentMonth = 1;
    }
    $('#calendarList').empty();
    //makeCalendar(currentYear, currentMonth);

}


function prevMonth() {
    currentMonth = currentMonth - 1;
    if (currentMonth < 1) {
        currentYear = currentYear - 1;
        currentMonth = 12;
    }
    $('#calendarList').empty();
    //makeCalendar(currentYear, currentMonth);

}


function configuraEventos(){

    
        $('.calendarList2 li').click(function (e) {
            data =currentYear +'-'+currentMonth+"-"+$(this).attr('id') ;
            currentDay = $(this).attr('id');
            get_calendario_hora(data);
          });

    
}

function carregarCalendario(){
    $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario",
        data : {igreja_id: igrejaId}
      })
      .done(function(ret) {
  
        var obj = jQuery.parseJSON(ret);
  
        
        if(obj.status == 1){
            $.each(obj.calendario, function (k, o) {
                dia = o.agenda_data.substr(0,2);
                mes = o.agenda_data.substr(3,2);
                ano = o.agenda_data.substr(6,4);
        
                
                if(ano = currentYear && mes == currentMonth){
                    $('#'+parseInt(dia)).addClass("dia_eventos")
                }
        
            });
        }
      });
}

function mock_agenda(){
    var agenda = [{
      "agenda_id": "1",
      "agenda_data_inicio": "21/12/2023",
     
    },
    {
        "agenda_id": "12",
        "agenda_data_inicio": "25/12/2023",
    },
    {
        "agenda_id": "1",
        "agenda_data_inicio": "31/12/2023",
    },
    {
        "agenda_id": "3",
        "agenda_data_inicio": "08/11/2023",
       
      },
      {
          "agenda_id": "4",
          "agenda_data_inicio": "14/01/2024",
      },
      {
          "agenda_id": "5",
          "agenda_data_inicio": "30/06/2024",
      }]
  
    console.log(agenda);
  
    objReturn = null;
    jQuery.each( agenda, function( i, obj ) {
        dia = obj.agenda_data_inicio.substr(0,2);
        mes = obj.agenda_data_inicio.substr(3,2);
        ano = obj.agenda_data_inicio.substr(6,4);

        
        if(ano = currentYear && mes == currentMonth){
            $('#'+parseInt(dia)).css("color", "red")
        }


        console.log(obj.agenda_data_inicio);
    });
  
  }



  function statusLayout(status, ch){
    
    cor = '';

    switch (status) {
      case '0':
          cor = 'red';
          break;
      case '1':
          cor = 'red';
          break;
      case '2':
          cor = 'green';
          break;
      case '3':
          cor = 'orange';
          break;
  }
  console.log(status);
    return  '<div id="div_status" style="width: 10%; align-items: center; display: flex; justify-content: center;">'+
            '<div data-agenda_id="'+ch.agenda_id+'" data-status="'+status+'" class="status_layout" style="border-radius: 50%; background-color: '+cor+'; width: 10px; height: 10px; border: 1px solid '+cor+';"></div>'+
            '</div>';
  }

  function disableConfig() {
    $('.config').each(function() {
      var status = $(this).data('status');
      if (status == 3) {
        $(this).addClass('disabled');
      }
    });
  }

  $('#ok').click(function(){
    $('#modalStatus').hide();
  });

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
            disableConfig();
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


$('#add').click(function () {
    window.location = "criar-agenda.html";
});

// menu
var element = document.getElementById('btn-header');
$('.page-menu--toggle').click(function(e){

    e.preventDefault();
  
    if($(this).hasClass('page-menu__hamburger--open')){

        element.style.removeProperty("right");
        $('.mobile-nav').css('display', 'none');
        $('#add').css('bottom', '10px');
        $('#div_principal').removeClass('move-right');
        $('#btn-header').css('left', '5px');
        
    }
    else{
  
      element.style.removeProperty("left");
      $('.mobile-nav').css('display', 'block');
      $('#add').css('bottom', 'calc(10px + var(--nav-height))');
      $('#div_principal').addClass('move-right');
      $('#btn-header').css('right', '5px');
  
    }
  
    $(this).toggleClass('page-menu__hamburger--open');
  
    $('.page-menu').toggleClass('disabled');

    $('.page-menu').toggleClass('no-scroll');

  
    efeitoBlur()
  
  });
  
  
  
  
  
  
  
  function efeitoBlur(){
  
    $('main').toggleClass('is-blur');
  
    $('.show-search').toggleClass('is-blur');
  
    $('.categories').toggleClass('is-blur');
  
    $('.options').toggleClass('is-blur');
  
    $('.search-market').toggleClass('is-blur');

    //$('#divPrincipal').toggleClass('is-blur');

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

  function remover(id){
    
    

        $.ajax({
            method: "POST",
            url: "https://pedeoferta.com.br/templo/index.php/welcome/remove_agenda",
            data: {
                agenda_id : id
                
            }
        })

        .done(function (ret) {
            var obj = jQuery.parseJSON(ret);
            
            if(obj.status == '1'){
                
              if(currentDay > 0){
                data =currentYear +'-'+currentMonth+"-"+currentDay;
                get_calendario_hora(data);
              
              }
              
                
            }
            
        });


   
}
