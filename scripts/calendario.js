currentDay = 0;
var igrejaId = null;
var dtReferencia;

$(document).ready(function() {

  igrejaId = window.sessionStorage.getItem('igreja_id');

  makeCalendar(currentYear, currentMonth);


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
      window.location = 'configurar_layout_upload.html';
    }
    $('#modal_config').hide();
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
    var agenda_id = $('#modal_config').find('[data-agenda_id]').data('agenda_id');
    $("#hid_agenda_id").val(agenda_id);
    pre_lote();
    $('#modal_config').hide();
  });

  $('#cancelarRemocao').click(function(){
    $('#modalConfirmacao').hide();
    $('#modal_config').show();
  });

  $('#confirmarRemocao').click(function(){
    var agenda_id = $('#modal_config').find('[data-agenda_id]').data('agenda_id');
    remover(agenda_id, 0);
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
    monthName = months.find(x => x.id === month).name_small;
    $('#yearMonth').text(year + ' ' + monthName);
    configuraEventos();
    
    
    if(igrejaId != null && igrejaId != ''){
      carregarCalendario();
    }


$('#calendarList').on('click', 'li', function() {
  $('.calendarList2').children().removeClass('dia_selecionado');
  $(this).addClass('dia_selecionado');
});
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
    $('#divListaAgenda').empty(); 
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
    $('#divListaAgenda').empty(); 

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
        url: "https://flavorosa.com.br/templo/index.php/welcome/get_agenda_calendario",
        data : {igreja_id: igrejaId}
      })
      .done(function(ret) {
  
        var obj = jQuery.parseJSON(ret);
  
        
        if(obj.status == 1){
          $.each(obj.calendario, function (k, o) {
            dia = o.agenda_data.substr(0,2);
            mes = o.agenda_data.substr(3,2);
            ano = o.agenda_data.substr(6,4);
    
            
            if(ano == currentYear && mes == currentMonth){
                $('#'+parseInt(dia)).addClass("dia_eventos");
                console.log(mes);
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
        $(this).addClass('disabilitado');
      }
    });
  }

  $('#ok').click(function(){
    $('#modalStatus').hide();
  });
  
  function get_calendario_hora(dtReferencia){

	$.ajax({
	   method: "POST",
	   url: "https://flavorosa.com.br/templo/index.php/welcome/get_agenda_calendario_hora",
	   data: {  'igreja_id': igrejaId, 
                data_referencia: dtReferencia,
                
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
								'<div style="width: 20%; text-align: left;">'+
									'<span style="font-size:1.5rem; color: black; margin-left: 15px;">'+ ch.agenda_hora +'</span>'+
								'</div>'+
                                '<div style="width: 50%; text-align: left;">'+
									'<span style="font-size:1.5rem; color: black;">'+ ch.evento_nome +'</span>'+
								'</div>'+
                statusLayout(ch.agenda_layout_tipo, ch)+
                                '<div class="columns">' +
                                '<span data-agenda_img="'+ ch.agenda_img +'"data-agenda_id="'+ ch.agenda_id +'" data-agenda_hora="'+ ch.agenda_hora +'" data-status="'+ch.agenda_layout_tipo+'" data-logo_url="'+ch.igreja_logo_url+'" data-igreja_nome="'+ch.igreja_nome+'" data-agenda_desc=\''+ch.agenda_layout_upload_desc+'\'  class="ion-more acToggle config"></span>'+
                                //'<span data-agenda_img="'+ ch.agenda_img +'" class="material-symbols-outlined acToggle ver_layout">visibility</span>'+
                                //'<span data-agenda_id="'+ ch.agenda_id +'" data-agenda_hora="'+ ch.agenda_hora +'"  class="material-symbols-outlined acToggle configurar_layout">edit</span>'+
                                '</div>'+
                            '</div>' +

					   '</div>';

				$('#divListaAgenda').append(html);
        console.log(obj);
			});
            disableConfig();
            $('.config').click(function () {
                var agenda_img = $(this).data('agenda_img');
                var status = $(this).data('status');
                var agenda_id = $(this).data('agenda_id');
                var agenda_hora = $(this).data('agenda_hora');
                var igreja_logo_url = $(this).data('logo_url');
                var igreja_nome = $(this).data('igreja_nome');
                var agenda_desc = $(this).data('agenda_desc');
            
                // Definir os dados nos elementos do modal
                $('#modal_config').find('[data-agenda_img]').data('agenda_img', agenda_img);
                $('#modal_config').find('[data-agenda_id]').data('agenda_id', agenda_id);
                $('#modal_config').find('[data-agenda_hora]').data('agenda_hora', agenda_hora);
                $('#modal_config').find('[data-status]').data('status', status);
                $('#modal_config').find('[data-logo_url]').data('logo_url', igreja_logo_url);
                $('#modal_config').find('[data-igreja_nome]').data('igreja_nome', igreja_nome);
                $('#modal_config').find('[data-agenda_desc]').data('agenda_desc', agenda_desc);


                
            
                
                $('#modal_config').show();
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
              window.location = 'configurar_layout_upload.html';
            });

            $('.remove-igreja').click(function () {

              var id = $(this).data('id');
              remover(id);
          });

	   });

}


$('#add').click(function () {
    window.location = "escolha-tipo-agenda.html";
});

// menu

$('.page-menu--toggle').click(function(e){

    e.preventDefault();
  
    if($(this).hasClass('page-menu__hamburger--open')){

        
        $('.mobile-nav').css('display', 'none');
        
    }
    else{
  
      $('.mobile-nav').css('display', 'block');
  
    }
  
    $(this).toggleClass('page-menu__hamburger--open');
  
    $('.page-menu').toggleClass('disabled');
    

    $('.page-menu').toggleClass('no-scroll');

  
    efeitoBlur()
  
  });

  
  function efeitoBlur(){
    $('.container').toggleClass('is-blur');
  
  }

  function remover(id, flagLote){
  $.ajax({
      method: "POST",
      url: "https://flavorosa.com.br/templo/index.php/welcome/remove_agenda",
      data: {
          agenda_id : id,
          flag_lote : flagLote
          
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
  console.log(flagLote);
  console.log(id);
}

function pre_lote(){

	$.ajax({
	   method: "POST",
	   url: "https://flavorosa.com.br/templo/index.php/welcome/pre_lote",
	   data: {  
              "agenda_id" : $("#hid_agenda_id").val()
			 }
	 })
   .done(function(ret) {
    var obj = jQuery.parseJSON(ret);
    var quantidade = obj.agendas.length;
    if(quantidade > 1){ // lote
        
      $("#modalPreExcluir").show();
      texto_modal = "<p style='line-height:20px'><b>Já existem agendamenteos:</b><br><br>";
      $.each(obj.agendas, function (k, agenda){
        if(k > 2){
          return false;
        }
        texto_modal += dateText(splitDateTime(agenda.agenda_horario).date)+" ás "+timeFormat(splitDateTime(agenda.agenda_horario).time, ':', true)+"<br>";
        quantidade--;
      });
      if(quantidade > 0){
        texto_modal += "<br>E mais ["+quantidade+"]  </p><br>";
      }
        $('#mensagem_modalPreExcluir').html(texto_modal);
      
    }else{//especifica
      $("#modalConfirmacao").show()
    }
  });
}

$("#excluirLote").click(function(){
  agenda_id = $("#hid_agenda_id").val();
  $("#modalPreExcluir").hide();
  remover(agenda_id, 1);
  location.reload();
});

$("#excluirEspecifica").click(function(){
  agenda_id = $("#hid_agenda_id").val();
  $("#modalPreExcluir").hide();
  remover(agenda_id, 0);
  location.reload();
});

$("#cancelarExclusao").click(function(){
  $("#modalPreExcluir").hide();
});