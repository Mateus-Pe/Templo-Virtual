$(document).ready(function() {
  getCidades();
});

function getCidades(){

  $.ajax({
      type: "GET",
      url: "https://flavorosa.com.br/templo/index.php/welcome/get_cidades_temp",
      cache: false,
      data: { 'importancia': '12'},
      dataType: 'json',
      success: function (data) {
        myJson = data;
        myJsonPesq = data;

        montaCidades(data);
        configurarEventos();
      }
  });
}

function montaCidades(data){

  $('.cadastro .container .lista').html('');
  var rows = data.length;
  html = "";

  for (var i = 0; i < rows; i++) {

    html +=      '<div class="divPesq" data-id="'+data[i].id+'" data-name="'+data[i].nickname+'">';
    html +=         '<div class="containCidade">' +
                      '<span class="cidadeSelect">'+ data[i].nickname +' - '+data[i].uf+ '</span>'+
                    '</div>' +
                 '</div>';
  }
  $('.lista').html(html);
};

function configurarEventos(){
  $( ".divPesq" ).on( "click", function() {
    window.sessionStorage.setItem('cidade_id', $(this).data('id'));
    window.sessionStorage.setItem('cidade_nome', $(this).data('name'));
    window.location = "feed.html";
  });
}

$('.inputCidade').keyup(function (e) {

  if($('.inputCidade').val().length >= 2){
    myJson = myJsonPesq.filter(function(a, b) {
        return a['name'].toLowerCase().indexOf($('.inputCidade').val().toLowerCase()) >= 0;
    });
    $('html,body').scrollTop(0);
  }else{
    myJson = myJsonPesq;
  }
  montaCidades(myJson);// this.value);
  configurarEventos();
});

$("#btnVoltar").click(function(e){
    window.location = "feed.html";
})