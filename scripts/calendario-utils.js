$(document).ready(function() {
    makeCalendar(currentYear, currentMonth);

});

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
    configuraEventosCalendar();
    
    
    if(igrejaId != null && igrejaId != ''){
      carregarCalendario();
    }

    $('#calendarList').on('click', 'li', function() {

    // Remove a classe dia_selecionado de todos os dias
    $('#calendarList li').removeClass('dia_selecionado');
    
    // Adiciona a classe dia_selecionado ao dia clicado para destacá-lo
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

function configuraEventosCalendar(){

    $('.calendarList2 li').click(function (e) {
        $('.calendarList2 li').removeClass('selected');
        $(this).addClass('selected');
        //$('#data_evento').val(formata_data($(this).attr('id')));
        $('#modalCalendario').hide();
    });
}