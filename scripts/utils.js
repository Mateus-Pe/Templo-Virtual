const dias = [
    { 'id': 1, 'name': 'Segunda', 'name_caps' : 'SEGUNDA' },
    { 'id': 2, 'name': 'Terça', 'name_caps' : 'TERÇA' },
    { 'id': 3, 'name': 'Quarta', 'name_caps' : 'QUARTA' },
    { 'id': 4, 'name': 'Quinta', 'name_caps' : 'QUINTA' },
    { 'id': 5, 'name': 'Sexta', 'name_caps' : 'SEXTA' },
    { 'id': 6, 'name': 'Sábado', 'name_caps' : 'SÁBADO' },
    { 'id': 0, 'name': 'Domingo', 'name_caps' : 'DOMINGO' },
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
        if(parseInt(D) == parseInt(hoje.getDate()) + 1){
            strDia = 'Amanhã';
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


function formata_hora_resumido(data){
    dataHora = data.split(' ');
    //var data =  window.sessionStorage.getItem('data_referencia');
    var hashdata = dataHora[1].split(":");
    H = hashdata[0];
    m = hashdata[1];

    strHora = H +':'+ m;
    return strHora;
}



function formata_dia_resumido(data){
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

    diaName = dias.find(x => x.id === S).name_caps;
    mes = months.find(x => x.id == mes).name_small;

    strDia = "";
    if(Math.floor(diff_days) < 7){
        if(Math.floor(diff_days) < 2){
        if(D == hoje.getDate()){
            strDia = 'HOJE';
        }
        if(parseInt(D) == parseInt(hoje.getDate()) + 1){
            strDia = 'AMANHÃ';
        }
        }else{
        strDia = diaName;
        }
    }
    if(parseInt(D) < 10){
    D = '0'+ parseInt(D);
    }
    if(strDia == "")
    strDia = D+"/"+mes;

    return strDia;

}