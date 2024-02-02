

var igrejaId = null;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');

  makeCalendar(currentYear, currentMonth);
  
    
  

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


    if(igrejaId != null && igrejaId != ''){
        carregarCalendario();
    }
   
   
}




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
            data =currentYear +'-'+currentMonth+"-"+$(this).attr('id') ;
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

  function get_calendario_hora(dtReferencia){

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario_hora",
	   data: {  'igreja_id': igrejaId, 
                data_referencia: dtReferencia
			 }
	 })
	   .done(function(ret) {


			var obj = jQuery.parseJSON(ret);

			$('#divListaAgenda').html('');

            

            var total_checked = 0;
			$.each(obj.calendario_hora, function (k, ch) {
				checked = '';

				
				html =  '<div class="pesq" style="background-color: white;height:50px;line-height:50px; padding-bottom: 10px; border-bottom: 1px solid #5b318a36">';

				html +=     '<div class="add" style="display: flex;" data-agenda_id="'+ ch.agenda_id +'">' +
								'<div style="width: 40%; text-align: left;">'+
									'<span style="font-size:1.5rem; color: black; margin-left: 15px;">'+ ch.agenda_hora +'</span>'+
								'</div>'+
                                '<div style="width: 40%; text-align: left;">'+
									'<span style="font-size:1.5rem; color: black; margin-left: 15px;">'+ ch.evento_nome +'</span>'+
								'</div>'+
                                '<div class="columns">' +
                                '<span data-agenda_id="'+ ch.agenda_id +'" data-agenda_hora="'+ ch.agenda_hora +'"  class="material-symbols-outlined acToggle configurar_layout">edit</span>'+
                                '</div>'+
                            '</div>' +

					   '</div>';

				$('#divListaAgenda').append(html);
			});

			
            $('.configurar_layout').click(function () {
                var str_data_referencia =  dtReferencia + '-' + $(this).data('agenda_hora');
                window.sessionStorage.setItem('agenda_id', $(this).data('agenda_id'));
                window.sessionStorage.setItem('data_referencia', str_data_referencia);
                window.location = 'configurar-layout.html';
            });


	   });
}


$('#add').click(function () {
    window.location = "criar-agenda.html";
});

// menu

$('.page-menu--toggle').click(function(e){

    e.preventDefault();
  
    if($(this).hasClass('page-menu__hamburger--open')){

        
        $('.mobile-nav').css('display', 'none');
        $('#add').css('bottom', '10px');
        
    }
    else{
  
      $('.mobile-nav').css('display', 'block');
      $('#add').css('bottom', 'calc(10px + var(--nav-height))');
  
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

  
  
  