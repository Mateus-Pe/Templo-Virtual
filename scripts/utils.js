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
    { 'id': 1, 'name': 'Janeiro', 'name_small' : 'JAN' },
    { 'id': 2, 'name': 'Fevereiro', 'name_small' : 'FEV' },
    { 'id': 3, 'name': 'Março', 'name_small' : 'MAR' },
    { 'id': 4, 'name': 'Abril', 'name_small' : 'ABR' },
    { 'id': 5, 'name': 'Maio', 'name_small' : 'MAI' },
    { 'id': 6, 'name': 'Junho', 'name_small' : 'JUN' },
    { 'id': 7, 'name': 'Julho', 'name_small' : 'JUL' },
    { 'id': 8, 'name': 'Agosto', 'name_small' : 'AGO' },
    { 'id': 9, 'name': 'Setembro', 'name_small' : 'SET' },
    { 'id': 10, 'name': 'Outubro', 'name_small' : 'OUT' },
    { 'id': 11, 'name': 'Novembro', 'name_small' : 'NOV' },
    { 'id': 12, 'name': 'Dezembro', 'name_small' : 'DEZ' },
];


function formata_hora_extenso(data){
    dataHora = data.split(' ');
    //var data =  window.sessionStorage.getItem('data_referencia');
    var hashdata = dataHora[1].split(":");
    H = hashdata[0];
    m = hashdata[1];

    if(m == '00'){
        m = '';
    }
    strHora = H +'h'+ m;
    return strHora;
}



function formata_dia_extenso(data){
    //var data =  window.sessionStorage.getItem('data_referencia');
    dataHora = data.split(' ');
    var hashdata = dataHora[0].split("-");
    ano = hashdata[0];
    mes = hashdata[1];
    D = hashdata[2];
    hoje = new Date();
    S = new Date(ano,mes -1,D).getUTCDay();
    date_ref = new  Date(ano,mes -1,D);
    diff = new Date(date_ref - hoje);
    diff_days = diff/1000/60/60/24;

    diaName = dias.find(x => x.id === S).name;
    mes = months.find(x => x.id == mes).name;

    strDia = "";
    if(Math.floor(diff_days) < 7){
        if(Math.floor(diff_days) < 2){
            if(D == hoje.getDate()){
                strDia = 'Hoje';
            }
           else if(parseInt(D) == parseInt(hoje.getDate()) + 1){
                strDia = 'Amanhã';
            }else{
                strDia = diaName;
            }
        }else{
        strDia = diaName;
        }
    }
    if(parseInt(D) < 10){
    D = '0'+ parseInt(D);
    }
    if(strDia == "")
    strDia = D+" de "+mes;

    return strDia;

}

/**
 * 
 * @param t exemplo: HH:mm, s exemplo: h, :, -
 * @returns exemplo: 19:30 ou, 19h30 
 */


function timeFormat(t, s, withMinute){
    var hashTime = t.split(":");
    H = hashTime[0];
    m = hashTime[1];

    if(withMinute){
        return H + s + m;
    }
    else{
        if(m == '00')
            return H + s;
        else
            return H + s + m;
    }
}

/**
 * 
 * @param d exemplo: YYYY-MM-DD 
 * @returns exemplo: HOJE, AMANHÃ ou dia especificado
 */

function dateText(d){
    var hashDate = d.split('-');
    Y = hashDate[0];
    M = hashDate[1];
    D = hashDate[2];
    today = new Date();
    S = new Date(Y,M -1,D).getUTCDay();
    ref = new  Date(Y,M -1,D);
    diff = new Date(ref - today);
    diff_days = diff/1000/60/60/24;

    dayName = dias.find(x => x.id === S).name_caps;
    monthName = months.find(x => x.id == M).name_small;

    ret = "";
    if(Math.floor(diff_days) < 7){
        if(Math.floor(diff_days) < 2){
            if(D == today.getDate()){
                ret = 'HOJE';
            }
            else if(parseInt(D) == parseInt(today.getDate()) + 1){
                ret = 'AMANHÃ';
            }else{
                ret = dayName;
            }
        }else{
            ret = dayName;
        }
    }
    if(parseInt(D) < 10){
        D = '0'+ parseInt(D);
    }
    if(ret == "")
        ret = D+"/"+M;

    return ret;

}

/**
 * 
 * @param d exemplo: YYYY-MM-DD HH:mm
 * @returns exemplo: {date: YYYY-MM-DD, time: HH:mm}
 */

function splitDateTime(d){
    hashDateTime = d.split(' ');
    var arrDateTime = {
        date : hashDateTime[0],
        time : hashDateTime[1]
    }
   
    return arrDateTime;
}

function splitHourMinute(t){
    hashTime = t.split(':');
    var arrTime = {
        hour : hashTime[0],
        minute : hashTime[1]
    }
   
    return arrTime;
}

function removerUf(cidadeUf) {
    // Verifica se a string termina com " - XX"
    var regex = / - [A-Z]{2}$/;
    if (regex.test(cidadeUf)) {
        // Remove a UF usando a regex
        return cidadeUf.replace(regex, '');
    }
    return cidadeUf;
}

function upperText(t){
    return t.toUpperCase();
}