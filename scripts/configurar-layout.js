var dias_agenda = [];
var atual_evento_cod = 0;
img_src = "";
var D = '0';// $('#data_master').children().html().trim();
var mes = '0';//$('#data_slave1').children().html().trim();
var H = '0';//$('#data_slave2').children().html().trim();
var diaName = '';
var layout_id = 0;
var agenda_id = 0;
hora_inicio_fixo = '0';
hora_fim_fixo = '0';
opt = "cabecalho";

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

$('#cor').click(function(e){
  $('#cores').show();
});

$('#elemento').change(function() {
  var option = $('#elemento').find(":selected").val();
  mudaElemento(option);
});

function converteFontePonto(valorPX){
  var valor = 0;
  valor = valorPX.replace('px', '');
  valor = 0.75 * valor;
  return valor+''+'pt';
}

function textArea2html(texto){
  return texto.replace(/\n/g, "<br />");
}

function html2TextArea(texto){
  return texto.replace(/<br>/g,"\n");
}

function mudaElemento(option){
  if(option == "cabecalho"){
    $("#txt_descricao").val(html2TextArea($("#txt_evento").html()));
    $("#fonte_master").val($("#evento").css("font-family"));
    $("#tamanho_fonte").val(converteFontePonto($("#evento").css("font-size")));
    $("#cor").css("background-color", $("#evento").css("color"));
    $("#altura").val($("#evento").css("top").replace('px',''));
    $("#div_display_txt").css("display","flex");
    $("#data_destaque").css("display","none");
    opt = 'cabecalho';
  }
  if(option == "corpo"){
    $("#txt_data_master").val(getContent($('#data_master').html()));
    var txtSlave = getContent($('#data_slave1').html());
    txtSlave += ' '+getContent($('#data_slave2').html());
    $("#txt_data_slave").val(txtSlave);
    $("#fonte_master").val($("#data").css("font-family"));
    $("#tamanho_fonte").val(converteFontePonto($("#data").css("font-size")));
    $("#cor").css("background-color", $("#data").css("color"));
    $("#div_display_txt").css("display","none");
    $("#data_destaque").css("display","grid");
    opt = 'corpo';
  }
  if(option == "rodape"){
    
    $("#txt_descricao").val(html2TextArea($("#txt_rodape").html()));
    $("#fonte_master").val($("#rodape").css("font-family"));
    $("#tamanho_fonte").val(converteFontePonto($("#rodape").css("font-size")));
    $("#cor").css("background-color", $("#rodape").css("color"));
    $("#div_display_txt").css("display","flex");
    $("#data_destaque").css("display","none");
    opt = 'rodape';
  }
}

function getContent(html){
  const conteudoTexto = html.replace(/<[^>]*>/g, '');

    // Retornar o conteúdo de texto limpo
  return conteudoTexto;
}



$("#txt_descricao").on("keyup", function () {

  if(opt == "cabecalho"){
    $('#txt_evento').html(textArea2html($(this).val()));
    //$("#txt_evento").html($(this).val());
    
  }
  if(opt == "corpo"){
    
    $("#data").css("font-family", fonte);
  }
  if(opt == "rodape"){
   
    $("#txt_rodape").html(textArea2html($(this).val()));
  }
});

$('#fonte_master').change(function() {
  var fonte = $('#fonte_master').find(":selected").val();
  console.log(fonte);
  
  if(opt == "cabecalho"){
    
    $("#evento").css("font-family", fonte);
  }
  if(opt == "corpo"){
    
    $("#data").css("font-family", fonte);
  }
  if(opt == "rodape"){
   
   $("#rodape").css("font-family", fonte);
  }
  mudaElemento(opt);
  });


  $('#tamanho_fonte').change(function() {
    var tamanhoFonte = $('#tamanho_fonte').find(":selected").val();
    console.log(tamanhoFonte);
    
    if(opt == "cabecalho"){
      
      $("#evento").css("font-size", tamanhoFonte);
    }
    if(opt == "corpo"){
      
      $("#data").css("font-size", tamanhoFonte);
    }
    if(opt == "rodape"){
     
     $("#rodape").css("font-size", tamanhoFonte);
    }
    mudaElemento(opt);
    });

    function geraCores(){
      var html = "";
      var numeroColunas = 10;
    
      // Definindo uma paleta de cores principais mais variada
      var coresPrincipais = [
        [255, 0, 0],    // Vermelho
        [255, 165, 0],  // Laranja
        [255, 255, 0],  // Amarelo
        [0, 128, 0],    // Verde
        [0, 255, 255],  // Ciano
        [0, 0, 255],    // Azul
        [75, 0, 130],   // Índigo
        [238, 130, 238],// Violeta
        [128, 128, 128],// Cinza
        [255, 255, 255],// Branco
        [0, 0, 0]       // Preto
      ];
    
      // Função para interpolar entre duas cores
      function interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) { 
          factor = 0.5; 
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
      }
    
      for(var i = 0; i < numeroColunas; i++){
        html += "<div>";
    
        for(var j = 0; j < numeroColunas; j++){
          // Calcular a posição relativa na grade
          var rowPosition = i / (numeroColunas - 1);
          var colPosition = j / (numeroColunas - 1);
    
          // Selecionar cores para interpolar, espaçadas uniformemente
          var colorIndex1 = Math.floor(rowPosition * (coresPrincipais.length - 1));
          var colorIndex2 = (colorIndex1 + 1) % coresPrincipais.length;
    
          // Interpolar entre as duas cores baseado na posição
          var interpolatedColor = interpolateColor(coresPrincipais[colorIndex1], coresPrincipais[colorIndex2], colPosition);
          var cor = `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`;
    
          html += '<div class="color" style="background-color: ' + cor + '; "></div>';
        }
        html += "</div>";
      }
      $('#div_cores').html(html);
    
      $('.color').click(function(e){
        console.log($(this).css("background-color"));
    
        if(opt == "cabecalho"){
          $("#evento").css("color", $(this).css("background-color"));
        }
        if(opt == "corpo"){
          $("#data").css("color", $(this).css("background-color"));
        }
        if(opt == "rodape"){
          $("#rodape").css("color", $(this).css("background-color"));
        }
        mudaElemento(opt);
        $('#cores').hide();
      });
    }
  

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
  alingOtherElements(newHeight);
  console.log('new heithg: '+newHeight);
}

function alingOtherElements(height){
  //alturas fixas
  var alturaMenu = $(".header1").css("height").replace('px', '');// 55;
  var alturaLayoutImg = $("#layoutImg").css("height").replace('px', ''); //80;
  var alturaPreVisualizar = $("#pre_visualizar").css("height").replace('px', '');
  //alinhamento pre visualizar
  $("#pre_visualizar").css("bottom", height+"px");
  //alinhamento do layout img
  var posicaoLayoutImg = height+parseInt(alturaPreVisualizar);
  var alturaCores = $(document).height() - posicaoLayoutImg;
  $("#layoutImg").css("bottom", posicaoLayoutImg+"px");
  $("#cores").css("height", alturaCores+"px");
  geraCores();
  //alinhamento dos campos
  var alturaCampos = $(document).height() - (parseInt(alturaMenu) + parseInt(alturaLayoutImg) + parseInt(alturaPreVisualizar) + height);
  console.log($(document).height());
  console.log(parseInt(alturaMenu));
  console.log(parseInt(alturaLayoutImg));
  console.log(height);

  $("#div_campos").css("top", alturaMenu+"px");
  $("#div_campos").css("height", alturaCampos+"px");
  console.log(alturaCampos);
  
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
    carrega_horas_fixas(obj.agenda.data_inicio_fixo, obj.agenda.data_fim_fixo);
    carregarDatas(obj.agenda.data_referencia);
   
    console.log(origem_lote);
    console.log(dias_agenda);
    $(document.body).show();
    evento_agenda(origem_lote, obj.agenda.agenda_evento_id);
  });
}

  function carrega_horas_fixas(data_inicio, data_fim){
    var hashdata = data_inicio.split("-");
    hora_inicio_fixo = hashdata[3];
    var hashdata = data_fim.split("-");
    hora_fim_fixo = hashdata[3];
    console.log(hora_inicio_fixo);
    console.log(hora_fim_fixo);
  }



  function evento_agenda(origem_lote, evento_id){
    $.ajax({
      method: "POST",
      url: "https://pedeoferta.com.br/templo/index.php/welcome/get_layout_evento",
      data: {evento_id: evento_id}
    })
    .done(function(ret) {
      //getImgSize("./imgs/imgs-igreja/missa1.jpg");
      var obj = jQuery.parseJSON(ret);

      var html = '';
      html += '<section class="regular slider">';
      console.log(obj);
      $.each(obj.lista_layout_evento, function (k, lpp) {
          html += '<a id="'+k+'"  data-layout_id="'+lpp.layout_id+'"  data-img_background="'+lpp.layout_background+'" data-evento_css="'+lpp.layout_evento_css+'" data-rodape_css="'+lpp.layout_rodape_css+'"  data-data_css="'+lpp.layout_data_css+'" data-master_css="'+lpp.layout_data_master_css+'" data-slave1_css="'+lpp.layout_data_slave1_css+'" data-slave2_css="'+lpp.layout_data_slave2_css+'" data-evento_cod="'+lpp.evento_id+'" data-evento_nome="'+lpp.evento_nome+'" data-evento_sub_descricao="'+lpp.evento_sub_descricao+'" class="layout_css produtos_perfil"><div  class="divPerfilEC" style="opacity: 0.5;height: 80px;display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
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
        obj_layout = carrega_layout($(this));
        console.log(obj_layout.descricao);
        atualiza_layout(obj_layout, origem_lote);
      });
      
      troca_layout('S', origem_lote);
      $('#0').click();
      
    });
  }

  function carrega_layout(e){
    
    const layout = {layout_id:$(e).data('layout_id'), 
                img_src:$(e).data('img_background'), 
                descricao: $(e).data('evento_nome'),
                evento_css: $(e).data('evento_css'),
                evento_sub_descricao: $(e).data('evento_sub_descricao'),
                data_css: $(e).data('data_css'),
                master_css: $(e).data('master_css'),
                data_slave1: $(e).data('slave1_css'),
                data_slave2: $(e).data('slave2_css'),
                rodape: $(e).data('rodape_css')              
              };

              
    return layout; 
  }

  function atualiza_layout(layout, origem_lote){
    descricao = "";
    sub_descricao = "";
    layout_id = layout.layout_id;
    img_src = "imgs/imgs-igreja/"+layout.img_src;
    $("#divImg").css("background-image", "url("+img_src+")");
    if($("#descricao").val() != "" && $("#descricao").val() != layout.descricao){
      descricao = $("#descricao").val(); 
    }
    else{
      descricao = layout.descricao;
    }
    
    if($("#descricao_rodape").val() != "" && $("#descricao_rodape").val() != layout.descricao){
      sub_descricao = $("#descricao_rodape").val(); 
    }
    else{
      sub_descricao = layout.evento_sub_descricao;
    }

    

    $("#txt_evento").html(descricao);
    $("#descricao").val(descricao);
    $("#txt_rodape").html(sub_descricao);
    $("#descricao_rodape").val(sub_descricao);
    
    set_style(layout.evento_css, 'evento');
    set_style(layout.data_css, 'data');
    set_style(layout.master_css, 'data_master');
    set_style(layout.data_slave1, 'data_slave1');
    set_style(layout.data_slave2, 'data_slave2');
    set_style(layout.rodape, 'rodape');
    mudaElemento(opt);
    if(origem_lote){
      $('#data').css('pointer-events', 'none');
    }
  }



  $('#layout').change(function() {
    var option = $('#layout').find(":selected").val();
    troca_layout(option, false);
  });

  function troca_layout(option, origem_lote){
      
    //if(origem_lote){
      //$('#layout').hide();        
   
      if(array_sequencial()){
        if(dias_agenda.length == 1){
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          $("#data_master").css("font-size","4.8em");
          $("#data_master").html("<span>"+dia_inicio+"</span>");
          $("#data_slave1").html("<span>Das "+hora_inicio_fixo+"</span>");
          $("#data_slave2").html("<span>às "+hora_fim_fixo+"</span>");
        }
        else{
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          dia_fim = dias.find(x => x.id == dias_agenda[dias_agenda.length-1]).name;
          $("#data_master").css("font-size","4.8em");
          $("#data_master").html("<span>"+dia_inicio+" à "+dia_fim+"</span>");
          $("#data_slave1").html("<span>Das "+hora_inicio_fixo+"</span>");
          $("#data_slave2").html("<span>às "+hora_fim_fixo+"</span>");
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
        $("#data_slave1").html("<span>Das "+hora_inicio_fixo+"</span>");
        $("#data_slave2").html("<span>às "+hora_fim_fixo+"</span>");
      }
    /*}else{
      
   
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
    }*/

      
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

