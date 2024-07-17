const dias = [
    { 'id': 1, 'name': 'Segunda' },
    { 'id': 2, 'name': 'Terça' },
    { 'id': 3, 'name': 'Quarta' },
    { 'id': 4, 'name': 'Quinta' },
    { 'id': 5, 'name': 'Sexta' },
    { 'id': 6, 'name': 'Sábado' },
    { 'id': 0, 'name': 'Domingo' },
];

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


function formata_hora(data){
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



function formata_dia(data){
    //var data =  window.sessionStorage.getItem('data_referencia');
    dataHora = data.split(' ');
    console.log(data);
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
    strDia = D+"/"+mes;

    return strDia;

}