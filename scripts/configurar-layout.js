var imageFile;
var atual_evento_cod = 0;
var dia = '0';// $('#data_master').children().html().trim();
var mes = '0';//$('#data_slave1').children().html().trim();
var hora = '0';//$('#data_slave2').children().html().trim();
var diaName = '';
var layout_id = 0;
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


$(document).ready(function() {
  button_edit_hide();
  carregarDatas();
});

function carregarDatas(){
  var data =  window.sessionStorage.getItem('data_referencia');
  var hashdata = data.split("-");
  ano = hashdata[0];
  mes = hashdata[1];
  dia = hashdata[2];
  hora = hashdata[3];
  hoje = new Date();
  dia_semana = new Date(ano,mes -1,dia).getUTCDay();
  date_ref = new  Date(ano,mes -1,dia);
  diff = new Date(date_ref - hoje);
  diff_days = diff/1000/60/60/24;
  diaName = dias.find(x => x.id === dia_semana).name;
  mes = months.find(x => x.id == mes).name;
    if(Math.floor(diff_days) < 2){
      if(dia == hoje.getDate()){
        diaName = 'Hoje';
      }
      if(parseInt(dia) == parseInt(hoje.getDate()) + 1){
        diaName = 'Amanhã';
      }
    }
  
    if(parseInt(dia) < 10){
      dia = '0'+ dia;
    }
}


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
      console.log(obj);
      $.each(obj.lista_layout_evento, function (k, lpp) {
          html += '<a id="'+k+'"  data-layout_id="'+lpp.layout_id+'"  data-img_background="'+lpp.layout_background+'" data-evento_css="'+lpp.layout_evento_css+'" data-rodape_css="'+lpp.layout_rodape_css+'"  data-data_css="'+lpp.layout_data_css+'" data-master_css="'+lpp.layout_data_master_css+'" data-slave1_css="'+lpp.layout_data_slave1_css+'" data-slave2_css="'+lpp.layout_data_slave2_css+'" data-evento_cod="'+lpp.evento_id+'" data-evento_nome="'+lpp.evento_nome+'" class="layout_css"><div  class="divPerfilEC" style="opacity: 0.5;height: 80px;display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
              html += '<div style="display: grid;">';
          html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.layout_background_icone+'" style="height:55px;width:60px;border-radius:50%;"/></div>';
                html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;"></span></div>';
              html += '</div></a>';
      });
      html += '</section>';

      $("#divHistoria").html(html);

      slick();
      $('#carregando').hide();

      

      $('.layout_css').click(function(e){
        layout_id = $(this).data('layout_id');
         $("#divImg").css("background-image", "url("+$(this).data('img_background')+")");
         $("#txt_evento").html($(this).data('evento_nome'));
         $("#descricao").val($(this).data('evento_nome'));
         set_style($(this).data('evento_css'), 'evento');
         set_style($(this).data('data_css'), 'data');
         set_style($(this).data('master_css'), 'data_master');
         set_style($(this).data('slave1_css'), 'data_slave1');
         set_style($(this).data('slave2_css'), 'data_slave2');
         set_style($(this).data('rodape_css'), 'rodape');
      });
      $('#0').click();
      troca_layout('dia');
    });
  }



  $('#layout').change(function() {
    var option = $('#layout').find(":selected").val();
    troca_layout(option);
    });

    function troca_layout(option){
      
    
   
      if(option == "dia"){
        $("#data_master").css("font-size","6.5em");
        $("#data_master").html("<span>"+ dia +"</span>");
        $("#data_slave1").html("<span>"+ mes +"</span>");
        $("#data_slave2").html("<span>"+ hora +"</span>");
      }
  
      if(option == "hora"){
        $("#data_master").css("font-size","5.5em");
        $("#data_master").html("<span>"+ hora +"</span>");
        $("#data_slave1").html("<span> dia "+ dia +"</span>");
        $("#data_slave2").html("<span> de "+ mes +"</span>");
        
      }
  
      if(option == "dia_semana"){
        $("#data_master").css("font-size","4.8em");
        $("#data_master").html("<span>"+ diaName +"</span>");
        $("#data_slave1").html("<span>dia "+ dia +"</span>");
        $("#data_slave2").html("<span> às "+ hora +"</span>");
        
      }
    }

  function set_style(strStyle, divElement){
      arrStyle = strStyle.split(";");
      $("#"+divElement).removeAttr("style")
      $.each(arrStyle, function(index, value) { 
        var hashmap = value.split(":");
        $("#"+divElement).css(hashmap[0], hashmap[1]);        
    });


  }


  function slick(){
    $(".regular").slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2
    });

  }

  $('#fonte').change(function() {
    var option = $('#fonte').find(":selected").text();
    $("#divImg").css("font-family", $(this).find('option:selected').val());
    });

    $('#fonte1').change(function() {
      var option = $('#fonte1').find(":selected").text();
      $("#rodape").css("font-family", $(this).find('option:selected').val());
      });
  
    $(function() {
      var $exibirTexto = $("#evento");
      $("#descricao").on("keyup", function () {
        var texto = $(this).val();
        $exibirTexto.text(texto);
      });
    });

    $(function() {
      var $exibirTexto = $("#rodape");
      $("#descricao_rodape").on("keyup", function () {
        var texto = $(this).val();
        $exibirTexto.text(texto);
      });
    });

    document.getElementById('btn_salvar').addEventListener('click',function(){
      //print();
     // PrintElem('divImg');
     salvar();
    });

    function salvar(){
      $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_layout_agenda",
        data: {
              agenda_id: "138",
              agenda_desc_head : "Santa Missa",
              agenda_font_head : "font-family:arial;",
              agenda_layout_data : "S",
              agenda_desc_footer : "Solenidade São José",
              agenda_font_footer : "font-family:arial;",
              agenda_layout_id: layout_id
            }
      })
      .done(function(ret) {
  
        var obj = jQuery.parseJSON(ret);
  

        if(obj.status == '1'){
          alert("atualizouuuuu");
        }
       
  
        
      });
    }


    $('#evento').click(function(e){
      modalHeader();
    });

    $('#data').click(function(e){
      modalData()
    });
    $('#modalData').click(function(e){
      modalData()
    });
    function modalData(){
      $('#modal_data').show();
    
      $('#confirmar2').click(function (e) {
        $('#modal_data').hide();      
      });
    }

    $('#rodape').click(function(e){
     modalFooter();
  });
  $('#modalFooter').click(function(e){
    modalFooter();
  });

  $('#modalHeader').click(function(e){
    modalHeader();
  });
  function modalFooter(){
    $('#modal_rodape').show();
  
    $('#confirmar3').click(function (e) {
        $('#modal_rodape').hide();
    });
  }
  function modalHeader(){
    $('#modal_evento').show();
    $('#confirmar').click(function (e) {
      $('#modal_evento').hide();
      
      });
  }
  
  var popup_edit = 0;

  function button_edit(){
    if(popup_edit % 2 == 0){
      button_edit_hide();
    }else{
      button_edit_show();
    }
    popup_edit++;
  }

  function button_edit_show(){
    $('#modalHeader').show();
    $('#modalData').show();
    $('#modalFooter').show();
  }
  function button_edit_hide(){
    $('#modalHeader').hide();
    $('#modalData').hide();
    $('#modalFooter').hide();
  }
  setInterval(button_edit,5000);


  function print(){
   
    html2canvas(document.querySelector("#divImg"), {
     logging: true, letterRendering: 1, //allowTaint: false,
      useCORS: true
  }).then(canvas => {

        var anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);
        anchorTag.download = "filename.jpg";
        anchorTag.href = canvas.toDataURL("image/jpg");
        anchorTag.target = '_blank';
        anchorTag.click();
                
    });
}


function PrintElem(elem) {
  var element = document.getElementById(elem);

  html2canvas(element).then(function (canvas) {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600');

      mywindow.document.write('<html><head><title>' + ''  + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + '#divImg' + '</h1>');
      mywindow.document.write('<img src="' + canvas.toDataURL("image/png") + '" style="width:100%;">');
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
  });
}
