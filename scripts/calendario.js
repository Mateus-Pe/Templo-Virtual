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
            data = $(this).attr('id') +'/'+currentMonth+"/"+currentYear;
            alert(data);
          });    

    
}

