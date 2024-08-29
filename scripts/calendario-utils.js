var globalCY;
var globalCM;

htmlUtilDayWeek =  '<div class="calendarYearMonth center">'
htmlUtilDayWeek +=  '<p class="left calBtn fa-solid fa-angle-left" onclick="prevMonth()"></p>'
htmlUtilDayWeek +=  '<p id="yearMonth"> 2023 Dez </p>'
htmlUtilDayWeek +=  '<p class="right calBtn fa-solid fa-angle-right" onclick="nextMonth()"></p>'
htmlUtilDayWeek +=  '</div>'

htmlUtilDayWeek +=   '<ol class="calendarList1">';
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
    console.log(month);
    if(parseInt(month) == 12){
        m = 1;
    }
    else{
        m = parseInt(month) + 1;
    }
    console.log(year);
    monthName = months.find(x => x.id === m).name;
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
    m = globalCM; 
    
    if (globalCM > 12) {
        globalCY = globalCY + 1;
        globalCM = 1;
    }
    
    $('#calendarList').empty();
    makeCalendar(globalCY, globalCM);

    y = globalCY;
    monthName = months.find(x => x.id === m).name;
    if(globalCM == 12)
        y = y+1;
    $('#yearMonth').text(y + ' ' + monthName);
}

function prevMonth() {
    globalCM = globalCM - 1;
    m = globalCM; 
    y = globalCY;
    if (globalCM < 1) {
        globalCY = globalCY - 1;
        globalCM = 12;
    }
    
    $('#calendarList').empty();
    makeCalendar(globalCY, globalCM);
    
    monthName = months.find(x => x.id === m).name;
    $('#yearMonth').text(y + ' ' + monthName);
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

function letsCheck(year, month) {
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getUTCDay();
    var array = {
        daysInMonth: daysInMonth,
        firstDay: firstDay
    };
    return array;
}