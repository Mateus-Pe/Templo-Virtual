var dias_agenda = [];
var atual_evento_cod = 0;
img_src = "";
var D = '0';// $('#data_master').children().html().trim();
var mes = '0';//$('#data_slave1').children().html().trim();
var H = '0';//$('#data_slave2').children().html().trim();
var diaName = '';
var layout_id = 0;
var agenda_id = 0;
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
  getImgSize("./imgs/imgs-igreja/missa1.jpg");
  /*setTimeout(function() { 
    getImgSize("./imgs/imgs-igreja/missa1.jpg");
}, 5000);*/
  
  agenda_id = window.sessionStorage.getItem('agenda_id');
  button_edit_hide();
  
  busca_agenda(agenda_id);
});

function carregarDatas(data){
  //var data =  window.sessionStorage.getItem('data_referencia');
  var hashdata = data.split("-");
  ano = hashdata[0];
  mes = hashdata[1];
  D = hashdata[2];
  H = hashdata[3];
  hoje = new Date();
  S = new Date(ano,mes -1,D).getUTCDay();
  date_ref = new  Date(ano,mes -1,D);
  diff = new Date(date_ref - hoje);
  diff_days = diff/1000/60/60/24;
  diaName = dias.find(x => x.id === S).name;
  mes = months.find(x => x.id == mes).name;
    if(Math.floor(diff_days) < 2){
      if(D == hoje.getDate()){
        diaName = 'Hoje';
      }
      if(parseInt(D) == parseInt(hoje.getDate()) + 1){
        diaName = 'Amanhã';
      }
    }
  
    if(parseInt(D) < 10){
      D = '0'+ parseInt(D);
    }
}


function getImgSize(imgSrc) {
  var newImg = new Image();
  newImg.src = imgSrc;
  var height = 183;//newImg.height;
  var width = 275;//newImg.width;
  console.log('heithg: '+height);
  console.log('wid: '+width);
  p = $(newImg).ready(function() {
      return {width: newImg.width, height: newImg.height};
  });

  newHeight = Math.round((($( document ).width() * height) / width)+1);
  
  $("#divImg").css("height", newHeight+"px");
  console.log('new heithg: '+newHeight);
}




function busca_agenda(agenda_id ){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_by_id",
    data: {agenda_id: agenda_id}
  })
  .done(function(ret) {
    str_dias_escolhidos = '';
    var obj = jQuery.parseJSON(ret);
    console.log(obj);
    if(obj.agenda.agenda_lote > 0){
      origem_lote = true;
      str_dias_escolhidos = obj.agenda.agenda_dias_escolhidos.split(",");
   
      str_dias_escolhidos.forEach(function(element, index) {
        
        dias_agenda.push(parseInt(element));
      });
    }else{
      origem_lote = false;
    }

    carregarDatas(obj.agenda.data_referencia);
   
    console.log(origem_lote);
    console.log(dias_agenda);
    $(document.body).show();
    evento_agenda(origem_lote);
  });
}





  function evento_agenda(origem_lote){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_layout_evento",
      data: {evento_id: "1"}
    })
    .done(function(ret) {
      //getImgSize("./imgs/imgs-igreja/missa1.jpg");
      var obj = jQuery.parseJSON(ret);

      var html = '';
      html += '<section class="regular slider">';
      console.log(obj);
      $.each(obj.lista_layout_evento, function (k, lpp) {
          html += '<a id="'+k+'"  data-layout_id="'+lpp.layout_id+'"  data-img_background="'+lpp.layout_background+'" data-evento_css="'+lpp.layout_evento_css+'" data-rodape_css="'+lpp.layout_rodape_css+'"  data-data_css="'+lpp.layout_data_css+'" data-master_css="'+lpp.layout_data_master_css+'" data-slave1_css="'+lpp.layout_data_slave1_css+'" data-slave2_css="'+lpp.layout_data_slave2_css+'" data-evento_cod="'+lpp.evento_id+'" data-evento_nome="'+lpp.evento_nome+'" class="layout_css produtos_perfil"><div  class="divPerfilEC" style="opacity: 0.5;height: 80px;display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
              html += '<div style="display: grid;">';
          html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.layout_background_icone+'" style="height:55px;width:60px;border-radius:50%;"/></div>';
                html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;"></span></div>';
              html += '</div></a>';
      });
      html += '</section>';

      $("#divHistoria").html(html);

      slick();
      $('#carregando').hide();
      $('.produtos_perfil').click(function(e){
        $('.divPerfilEC').removeClass('perfil_ec_selected');
        $(this).children().addClass('perfil_ec_selected');                    
       
      });

      

      $('.layout_css').click(function(e){
        atualiza_layout($(this), origem_lote);
      });
      
      troca_layout('S', origem_lote);
      $('#0').click();
      
    });
  }

  function atualiza_layout(e, origem_lote){
    layout_id = $(e).data('layout_id');
    img_src = "imgs/imgs-igreja/"+$(e).data('img_background');
    $("#divImg").css("background-image", "url("+img_src+")");
    $("#txt_evento").html($(e).data('evento_nome'));
    $("#descricao").val($(e).data('evento_nome'));
    set_style($(e).data('evento_css'), 'evento');
    set_style($(e).data('data_css'), 'data');
    set_style($(e).data('master_css'), 'data_master');
    set_style($(e).data('slave1_css'), 'data_slave1');
    set_style($(e).data('slave2_css'), 'data_slave2');
    set_style($(e).data('rodape_css'), 'rodape');
    if(origem_lote){
      $('#data').css('pointer-events', 'none');   
    }
  }



  $('#layout').change(function() {
    var option = $('#layout').find(":selected").val();
    troca_layout(option, false);
  });

  function troca_layout(option, origem_lote){
      
    if(origem_lote){
      $('#layout').hide();        
   
      if(array_sequencial()){
        if(dias_agenda.length == 1){
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          $("#data_master").css("font-size","4.8em");
          $("#data_master").html("<span>"+dia_inicio+"</span>");
          $("#data_slave1").html("<span>Das 14:00</span>");
          $("#data_slave2").html("<span>às 15:00</span>");
        }
        else{
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          dia_fim = dias.find(x => x.id == dias_agenda[dias_agenda.length-1]).name;
          $("#data_master").css("font-size","4.8em");
          $("#data_master").html("<span>"+dia_inicio+" à "+dia_fim+"</span>");
          $("#data_slave1").html("<span>Das 14:00</span>");
          $("#data_slave2").html("<span>às 15:00</span>");
        }  
      }else{
        str_dias = "";
        dias_agenda.forEach(function(element, index) {
          if(index < dias_agenda.length-1 )
            str_dias += dias.find(x => x.id == element).name.substring(0,3)+'/';
          else
            str_dias += dias.find(x => x.id == element).name.substring(0,3)
        });
        $("#data_master").css("font-size","3.1em");
        $("#data_master").html("<span>"+str_dias+"</span>");
        $("#data_slave1").html("<span>Das 14:00</span>");
        $("#data_slave2").html("<span>às 15:00</span>");
      }
    }else{
      
   
      if(option == "D"){
        $("#data_master").css("font-size","6.5em");
        $("#data_master").html("<span>"+ D +"</span>");
        $("#data_slave1").html("<span>"+ mes +"</span>");
        $("#data_slave2").html("<span>"+ H +"</span>");
      }
  
      if(option == "H"){
        $("#data_master").css("font-size","5.5em");
        $("#data_master").html("<span>"+ H +"</span>");
        $("#data_slave1").html("<span> dia "+ D +"</span>");
        $("#data_slave2").html("<span> de "+ mes +"</span>");
        
      }
  
      if(option == "S"){
        $("#data_master").css("font-size","4.8em");
        $("#data_master").html("<span>"+ diaName +"</span>");
        $("#data_slave1").html("<span>dia "+ D +"</span>");
        $("#data_slave2").html("<span> às "+ H +"</span>");
        
      }
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
      var $exibirTexto = $("#txt_evento");
      $("#descricao").on("keyup", function () {
        var texto = $(this).val();
        $exibirTexto.text(texto);
      });
    });

    $(function() {
      var $exibirTexto = $("#txt_rodape");
      $("#descricao_rodape").on("keyup", function () {
        var texto = $(this).val();
        $exibirTexto.text(texto);
      });
    });

    document.getElementById('btn_salvar').addEventListener('click',function(){
     print();
     //salvar();
     
    });

    function salvar(imageFile){
      $.ajax({
        method: "POST",
        url: "https://pedeoferta.com.br/templo/index.php/welcome/atualizar_layout_agenda",
        data: {
              'imagem': imageFile,
              agenda_id: agenda_id,
              agenda_desc_head : $("#txt_evento").html(),
              agenda_font_head : "font-family:" + $('#fonte').find(":selected").val() ,
              agenda_layout_data : $('#layout').find(":selected").val(),
              agenda_desc_footer : $("#txt_rodape").html(),
              agenda_font_footer : "font-family:" + $('#fonte1').find(":selected").val(),
              agenda_layout_id: layout_id
            }
      })
      .done(function(ret) {
  
        var obj = jQuery.parseJSON(ret);
  

        if(obj.status == '1'){
          window.location='calendario.html';
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
  //setInterval(button_edit,5000);

  function upload_layout(imageFile){
    

    $.ajax({

        type: "POST",

        url: "https://pedeoferta.com.br/templo/index.php/welcome/upload_layout",

        data: {'imagem': imageFile},

        cache: false,

        dataType: 'json',

        success: function (data) {

          console.log(data);

        }

    });
}


  function loadImage() {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.crossOrigin = "Anonymous";  // Configurar para tratar CORS
        img.onload = function() {
            resolve(img);
        };
        img.onerror = function() {
            reject("Erro ao carregar a imagem");
        };
        img.src = img_src; // Substitua pelo caminho real da sua imagem no servidor local
    });
}

async function print() {
  try {
      var image = await loadImage();
      document.getElementById("divImg").style.backgroundImage = `url(${image.src})`;

      html2canvas(document.getElementById("divImg"), {
          logging: true,
          letterRendering: 1,
          allowTaint: true
      }).then(canvas => {
         
          imageFile = canvas.toDataURL("image/jpeg");
          salvar(imageFile);
      });
  } catch (error) {
      console.error(error);
  }
  
}

function array_sequencial(){
  var retorno =1;
  var pos1= parseInt(dias_agenda[0]);
  console.log(dias_agenda);
  dias_agenda.forEach(function(element, index) {
    console.log(pos1);
    if(dias_agenda.includes(pos1)){
      pos1 ++;
    }else{
      retorno = 0
      return false;
      
    }
    
  });
  return retorno;
}