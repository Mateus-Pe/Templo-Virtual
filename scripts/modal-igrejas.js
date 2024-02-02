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

getProdutos();
//get_listaitem();


console.log(window.sessionStorage.getItem("lista_cod"));



function getProdutos() {

    $.ajax({

        type: "POST",

        url: "https://www.pedeoferta.com.br/oferta/index.php/welcome/get_lista_produtos",

        cache: false,

        dataType: 'json',

        data: { 'lista_cod': 1 },

        success: function (data) {

            myJson = data;
            myJson = data;
            myJsonPesq = data;

            montaProdutos(data);
            //configurarEventos();



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
        if (buscaRapida == 1 && $('#search-market').val().length >= 1) {
            switch (i) {
                case 0:
                    color = "green";
                    break;
                case 1:
                    color = "blue";
                    break;
                case 2:
                    color = "orange";
                    break;
                case 3:
                    color = "red";
                    break;
                case 4:
                    color = "gray";
                    break;
                default:
                    color = "#643296";
            }
        } else {
            color = "#643296";
        }

        html = '<div class="pesq" style="background-color: ' + color + ';height:50px;line-height:50px; padding-bottom: 10px; border-bottom: 1px solid white">';




        html += '<div class="add" style="text-align: center;" data-label="' + data[i].label + '" data-imagem_url="' + data[i].imagem_url + '" data-oferta_cod="' + data[i].oferta_cod + '">' +
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

    //configurarEventos();

    return ret;
}




$('#span_criar-igreja').click(function () {
    
    $('#divProdutos').show();
});