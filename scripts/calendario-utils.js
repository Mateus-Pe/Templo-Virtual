var globalCY;
var globalCM;


htmlUtilDayWeek =   '<ol class="calendarList1">';
htmlUtilDayWeek += '<li class="day-name">Seg</li>';
htmlUtilDayWeek += '<li class="day-name">Ter</li>';
htmlUtilDayWeek +=   '<li class="day-name">Qua</li>';
htmlUtilDayWeek +=   '<li class="day-name">Qui</li>';
htmlUtilDayWeek +=   '<li class="day-name">Sex</li>';
htmlUtilDayWeek +=   '<li class="day-name">Sab</li>';
htmlUtilDayWeek +=   '<li class="day-name">Dom</li>';
htmlUtilDayWeek += '</ol>';
htmlUtilDayWeek += '<ol class="calendarList2" id="calendarList">';
htmlUtilDayWeek +=  '</ol>';

 $('.calendario-utils').html(htmlUtilDayWeek);                  

function makeCalendar(year, month) {
    globalCY = year;
    globalCM = month;
    var getChek = letsCheck(globalCY, globalCM);
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
    month = month + 1;
    monthName = months.find(x => x.id === month).name;
    $('#yearMonth').text(year + ' ' + monthName);
    configuraEventosCalendar();
    
    
    $('#calendarList').on('click', 'li', function() {

    // Remove a classe dia_selecionado de todos os dias
    $('#calendarList li').removeClass('dia_selecionado');
    
    // Adiciona a classe dia_selecionado ao dia clicado para destacá-lo
    $(this).addClass('dia_selecionado');
    });
}

function nextMonth() {
    globalCM = globalCM + 1;
    if (globalCM > 12) {
        globalCY = globalCY + 1;
        globalCM = 1;
    }
    $('#calendarList').empty();
    $('#yearMonth').text(globalCY + ' ' + globalCM);
    makeCalendar(globalCY, globalCM);
}

function prevMonth() {

    globalCM = globalCM - 1;
    if (globalCM < 1) {
        globalCY = globalCY - 1;
        globalCM = 12;
    }
    $('#calendarList').empty();
    $('#yearMonth').text(globalCY + ' ' + globalCM);
    makeCalendar(globalCY, globalCM);
}

function configuraEventosCalendar(){

    $('.calendarList2 li').click(function (e) {
        $('.calendarList2 li').removeClass('selected');
        $(this).addClass('selected');
        returnDate = new Date(globalCY, globalCM ,$(this).attr('id'));
       
        //$('#data_evento').val(formata_data($(this).attr('id')));
        $('#modalCalendario').hide();

        $(document).trigger('selectDate', {returnDate: returnDate})
    });
}