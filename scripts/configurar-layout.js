var imageFile;
var atual_evento_cod = 0;
var dia = $('#data_master').children().html().trim();
var mes = $('#data_slave1').children().html().trim();
var hora = $('#data_slave2').children().html().trim();


function getImgSize(imgSrc) {
  var newImg = new Image();
  newImg.src = imgSrc;
  var height = newImg.height;
  var width = newImg.width;
  p = $(newImg).ready(function() {
      return {width: newImg.width, height: newImg.height};
  });

  newHeight = Math.round((($( document ).width() * height) / width)+1);

  $("#divImg").css("height", newHeight+"px");
}


getImgSize("./imgs/imgs-igreja/missa1.jpg");



evento_agenda();



  function evento_agenda(){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_layout_evento",
      data: {evento_id: "1"}
    })
    .done(function(ret) {

      var obj = jQuery.parseJSON(ret);

      var html = '';
      html += '<section class="regular slider">';

      $.each(obj.lista_layout_evento, function (k, lpp) {
          html += '<a data-img_background="'+lpp.layout_background+'" data-evento_css="'+lpp.layout_evento_css+'" data-data_css="'+lpp.layout_data_css+'" data-dia_css="'+lpp.layout_dia_css+'" data-mes_css="'+lpp.layout_mes_css+'" data-hora_css="'+lpp.layout_hora_css+'" data-evento_cod="'+lpp.evento_id+'" data-evento_nome="'+lpp.evento_nome+'" class="layout_css"><div  class="divPerfilEC" style="opacity: 0.5;height: 90px; display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
              html += '<div style="display: grid;">';
          html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.layout_background_icone+'" style="height:50px"/></div>';
                html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;"></span></div>';
              html += '</div></a>';
      });
      html += '</section>';

      $("#divHistoria").html(html);

      slick();
      $('#carregando').hide();
      $('.layout_css').click(function(e){
         $("#divImg").css("background-image", "url("+$(this).data('img_background')+")");
         $("#txt_evento").html($(this).data('evento_nome'));
         $("#descricao").val($(this).data('evento_nome'));
         set_style($(this).data('evento_css'), 'evento');
         set_style($(this).data('data_css'), 'data');
         set_style($(this).data('dia_css'), 'data_master');
         set_style($(this).data('mes_css'), 'data_slave1');
         set_style($(this).data('hora_css'), 'data_slave2');
      });
    });
  }

  $('#layout').change(function() {
    var option = $('#layout').find(":selected").val();
    
   
    if(option == "dia"){
      $("#data_master").html("<span>"+ dia +"</span>");
      $("#data_slave1").html("<span>"+ mes +"</span>");
      $("#data_slave2").html("<span>"+ hora +"</span>");
    }

    if(option == "hora"){
      $("#data_master").html("<span>"+ hora +"</span>");
      $("#data_slave1").html("<span>"+ dia +"</span>");
      $("#data_slave2").html("<span>"+ mes +"</span>");
    }

    if(option == "dia_semana"){
      $("#data_master").html("<span>"+ dia +"</span>");
      $("#data_slave1").html("<span>"+ mes +"</span>");
      $("#data_slave2").html("<span>"+ hora +"</span>");
    }
    
    });


  function set_style(strStyle, divElement){
      arrStyle = strStyle.split(";");
      $.each(arrStyle, function(index, value) { 
        var hashmap = value.split(":");
        $("#"+divElement).css(hashmap[0], hashmap[1]);        
    });


  }


  function slick(){
    $(".regular").slick({
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2
    });

  }

  $('#fonte').change(function() {
    var option = $('#fonte').find(":selected").text();
    $("#divImg").css("font-family", $(this).find('option:selected').val());
    });
  
    $(function() {
      var $exibirTexto = $("#evento");
      $("#descricao").on("keyup", function () {
        var texto = $(this).val();
        $exibirTexto.text(texto);
      });
    });