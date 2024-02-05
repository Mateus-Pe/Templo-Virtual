var lista = [{ oferta_cod: "0", label: "++ADD++" }];

var myJson;

var dataLista;

var myJsonPesq;

var myJsonNew;

var de;

var ate;

var maxRegs = 50;

var countRegs;

var objResult;

var buscaRapida = 0;

var checagem = 0;

var sem_sucesso = 0;

var statusTalk = 'P'; /* P: PRODUTO
                      C: COR
                      Q: QUANTIDADE*/

getIgrejas();
igrejaDesc();
function igrejaDesc(){
    $('#span_criar-igreja').html(window.sessionStorage.getItem("igreja_desc"));
}




function getIgrejas() {

    $.ajax({

        type: "POST",

        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_lista_igreja_by_id",

        cache: false,

        dataType: 'json',

        data: { 'igreja_id': window.sessionStorage.getItem("igreja_id")},

        success: function (data) {

            myJson = data;
            myJson = data;
            myJsonPesq = data;

            montaProdutos(data);
            configurarEventos();



        }

    });

}

function montaProdutos(data) {

    $('#divLista').html('');



    var rows = JSON.parse(data.length);



    de = maxRegs + 1;

    countRegs = rows;

    if (rows < maxRegs)

        ate = rows;

    else

        ate = maxRegs;

    for (var i = 0; i < rows; i++) {
        

        html = '<div class="pesq" style="background-color: darkred ;height:50px;line-height:50px; padding-bottom: 10px; border-bottom: 1px solid white">';




        html += '<div class="add" style="text-align: center;" data-id="' + data[i].igreja_id + '" data-igreja_desc="' + data[i].igreja_desc + '">' +
            '<span style="font-size:1.2rem; color:white;">' + data[i].label + '</span>' +
            '</div>' +


            '</div>';



        $('#divLista').append(html);

    }

};

$('#search-market').keyup(function (e) {


    pesq();




});

function pesq() {
    var ret = false;
    if ($('#search-market').val().length >= 1) {

        myJson = myJsonPesq.filter(function (a, b) {

            return a['label'].toLowerCase().indexOf($('#search-market').val().toLowerCase()) >= 0;

        });
        if (myJson.length > 0) {

            if (buscaRapida == 1) {
                $("#divDica").hide();
                $('#dica').html('DIGA A COR DO PRODUTO TO ADD');
                $("#divDica").fadeIn(3000);
                app.initialize();
                app.vai();
            }
            ret = true;
            statusTalk = 'C';
        }








    }





    montaProdutos(myJson);// this.value);

    configurarEventos();

    return ret;
}

function configurarEventos() {



    $('.add').click(function () {
        window.sessionStorage.setItem('igreja_desc', $(this).data('igreja_desc'));
        window.sessionStorage.setItem('igreja_id', $(this).data('id'));
        location. reload(); 
        
    });


}




$('#span_criar-igreja').click(function () {
    
    $('#divProdutos').show();

});

$('#close').click(function () {
    
    $('#divProdutos').hide();
});