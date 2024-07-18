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
descricao_cabecalho = '';
descricao_rodape = '';
opt = "cabecalho";
estilos = {};

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
  
  agenda_id = window.sessionStorage.getItem('agenda_id');

  busca_agenda(agenda_id);
});

function busca_agenda(agenda_id ){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_by_id",
    data: {agenda_id: agenda_id}
  })
  .done(function(ret) {
    str_dias_escolhidos = '';
    var obj = jQuery.parseJSON(ret);
    if(obj.agenda.agenda_lote > 0){
     
      str_dias_escolhidos = obj.agenda.agenda_dias_escolhidos.split(",");//FILIPE
   
      str_dias_escolhidos.forEach(function(element, index) {
        
        dias_agenda.push(parseInt(element));
      });
    }

    carrega_horas_fixas(obj.agenda.data_inicio_fixo, obj.agenda.data_fim_fixo);
    carregarDatas(obj.agenda.data_referencia);
   

    $(document.body).show();
   
    if(isEdit(obj.agenda)){
      $("#divImg").html(obj.agenda.agenda_layout);
    }
    evento_agenda(obj.agenda);
    eventosElementosImg();
  });
}

function evento_agenda(agenda){
  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/get_layout_evento",
    data: {evento_id: agenda.agenda_evento_id}
  })
  .done(function(ret) {
    //getImgSize("./imgs/imgs-igreja/missa1.jpg");
    var obj = jQuery.parseJSON(ret);

    var html = '';
    var layout_id = 0;
    $.each(obj.lista_layout_evento, function (k, lpp) {
      
      if(isEdit(agenda)){
        if(lpp.layout_id == agenda.agenda_layout_id){
          layout_id = k;
        }

      }

        
        html += '<div id="'+k+'"  data-layout_id="'+lpp.layout_id+'"  data-img_background="'+lpp.layout_background+'" data-evento_css="'+lpp.layout_evento_css+'" data-rodape_css="'+lpp.layout_rodape_css+'"  data-data_css="'+lpp.layout_data_css+'" data-master_css="'+lpp.layout_data_master_css+'" data-slave1_css="'+lpp.layout_data_slave1_css+'" data-evento_cod="'+lpp.evento_id+'" data-evento_nome="'+lpp.evento_nome+'" data-evento_sub_descricao="'+lpp.evento_sub_descricao+'" class="layout_css divPerfilEC">';
          html += '<img  src="'+lpp.layout_background_icone+'">';
        html += '</div>';
    });

    $("#layoutImg").html(html);
     
    $('.layout_css').click(function(e){
      //inicio deixa layout slick selecionado
      $('.divPerfilEC').removeClass('layout_slick_selected');
      $(this).addClass('layout_slick_selected');
      //fim deixa layout slick selecionado
      obj_layout = data2objLayout($(this));
      atualiza_layout(obj_layout, agenda);
      
    });
    
    $("#"+layout_id+"").click();
    

    
    
  });
}

function carrega_horas_fixas(data_inicio, data_fim){
  var hashdata = data_inicio.split("-");
  hora_inicio_fixo = hashdata[3];
  var hashdata = data_fim.split("-");
  hora_fim_fixo = hashdata[3];
}

$('#cor').click(function(e){
  $('#cores').show();
});

$('#close_colors').click(function(e){
  $('#cores').hide();
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
    var txtSlave = getContent($('#data_slave1').html())
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
    descricao_cabecalho = textArea2html($(this).val());
    
  }
  if(opt == "rodape"){
   
    $("#txt_rodape").html(textArea2html($(this).val()));
    descricao_rodape = textArea2html($(this).val());
  }
});

$("#txt_data_master").on("keyup", function () {

    $("#data_master").html('<span>'+$(this).val()+'</span>');
  
});

$("#txt_data_slave").on("keyup", function () {

  $("#data_slave1").html('<span>'+$(this).val()+'</span>');

});

$('#fonte_master').change(function() {
  var fonte = $('#fonte_master').find(":selected").val();
  
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
    
    if(opt == "cabecalho"){
      
      $("#evento").css("font-size", tamanhoFonte);
    }
    if(opt == "corpo"){
      
      $("#data").css("font-size", tamanhoFonte);
      tamanhoDataSlave();
    }
    if(opt == "rodape"){
     
     $("#rodape").css("font-size", tamanhoFonte);
    }
    mudaElemento(opt);
    });

    function tamanhoDataSlave(){
      tamanhoFonte = converteFontePonto($("#data").css("font-size"));
      var tamanhoDataSlave = parseInt(tamanhoFonte.replace('pt', '')) * 0.7;
      $("#data_slave1").css("font-size", tamanhoDataSlave+'pt');
    }

    function geraCores(){
      var html = "";
      var numeroColunas = 10;
      var numeroLinhas = 9;
    
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
    
        for(var j = 0; j < numeroLinhas; j++){
          // Calcular a posição relativa na grade
          var rowPosition = i / (numeroColunas - 1);
          var colPosition = j / (numeroLinhas - 1);
    
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
  p = $(newImg).ready(function() {
      return {width: newImg.width, height: newImg.height};
  });

  newHeight = Math.round((($( document ).width() * height) / width)+1);
  
  $("#divImg").css("height", newHeight+"px");
  //alingOtherElements(newHeight);
  geraCores();

}


function styleLayout(layout){
  console.log("style criou");
  stylesObjLayout();
  if(estilos.hasOwnProperty('cabecalho')){ // Verifica se é a primeira vez que está rodando
    
    set_style(mergeStyleLayout(layout.evento_css, estilos.cabecalho), 'evento');
    set_style(mergeStyleLayout(layout.data_css, estilos.data),'data');
    set_style(mergeStyleLayout(layout.rodape, estilos.rodape),'rodape');
  }
  else{
    set_style(layout.evento_css, 'evento');
    set_style(layout.data_css, 'data');
    set_style(layout.rodape, 'rodape');
  }
}


function processStyleString(styleString) {
  return styleString.split(';').reduce((acc, style) => {
    if (style.trim()) {
      let [key, value] = style.split(':').map(item => item.trim());
      acc[key] = value;
    }
    return acc;
  }, {});
}


function stylesObjLayout() {
  if ($('#evento').attr('style') != undefined) { // Verificar se é a primeira vez que está chamando o evento click do atualiza layout

    function preserveFontFamilySpaces(style) {
      // Preserva espaços dentro dos valores de font-family
      return style.replace(/font-family:\s*([^;]+);/g, function(match, p1) {
        return 'font-family:' + p1.replace(/\s*,\s*/g, ',').replace(/,/g, ', ') + ';';
      });
    }

    // Função para remover espaços desnecessários fora do `font-family`
    function removeUnnecessarySpaces(style) {
      return style.replace(/;\s*/g, ';').replace(/\s*:\s*/g, ':');
    }

    // Cria um objeto 'estilos' com os estilos dos elementos desejados, removendo espaços desnecessários fora do `font-family`
    estilos = {
      cabecalho: preserveFontFamilySpaces(removeUnnecessarySpaces($('#evento').attr('style'))),
      data: preserveFontFamilySpaces(removeUnnecessarySpaces($('#data').attr('style'))),
      rodape: preserveFontFamilySpaces(removeUnnecessarySpaces($('#rodape').attr('style')))
    }

    console.log(estilos);
  }
}


  function data2objLayout(e){
    
    const layout = {layout_id:$(e).data('layout_id'), 
                img_src:$(e).data('img_background'), 
                descricao: $(e).data('evento_nome'),
                evento_css: $(e).data('evento_css'),
                evento_sub_descricao: $(e).data('evento_sub_descricao'),
                data_css: $(e).data('data_css'),
                master_css: $(e).data('master_css'),
                data_slave1: $(e).data('slave1_css'),
                rodape: $(e).data('rodape_css')
              };

              
    return layout; 
  }

  function carregaBackground(layout){
    layout_id = layout.layout_id;
    img_src = "imgs/imgs-igreja/"+layout.img_src;
    $("#divImg").css("background-image", "url("+img_src+")");
  }

  function atualiza_layout(layout, agenda){
    descricao = "";
    sub_descricao = "";
    carregaBackground(layout);
    if(!isEdit(agenda)){
      sugestao_layout(layout, agenda);
    }else{
      styleLayout(layout);
    }
    
    mudaElemento(opt);
  }

  function sugestao_layout(layout, agenda){
    if(descricao_cabecalho != "" && descricao_cabecalho != layout.descricao){
      descricao = descricao_cabecalho;  
    }
    else{
      descricao = layout.descricao;//sugestao
    }
    
    if(descricao_rodape != "" && descricao_rodape != layout.descricao){
      sub_descricao = descricao_rodape; 
    }
    else{
      sub_descricao = layout.evento_sub_descricao;//sugestao
    }

    $("#txt_evento").html(descricao);
    $("#txt_rodape").html(sub_descricao);
    
    
    styleLayout(layout);
    
    tamanhoDataSlave();
    sugestao_data(origemLote(agenda));
  }

 

function mergeStyleLayout(styleIn, styleOut){

  style = '';
  arrStyleChange = ["font-family", "color", "font-size"]
  arrStyle = styleIn.split(";");
  $.each(arrStyle, function(index, value) {
    var hashmap = value.split(":"); 
    if(jQuery.inArray(hashmap[0], arrStyleChange) < 0 && value != ''){
      style += hashmap[0]+':'+hashmap[1]+';';
    }
  });

  arrStyle = styleOut.split(";");
  $.each(arrStyle, function(index, value) {
    var hashmap = value.split(":"); 
    if(jQuery.inArray(hashmap[0], arrStyleChange) >= 0  && value != ''){
      style += hashmap[0]+':'+hashmap[1]+';';
    }
  });
  return style;
} 

function set_style(strStyle, divElement){
  arrStyle = strStyle.split(";");
  $("#"+divElement).removeAttr("style");
  $.each(arrStyle, function(index, value) {
    var hashmap = value.split(":");
    $("#"+divElement).css(hashmap[0], hashmap[1]);  
  });
}


  function sugestao_data(origem_lote){
      
    if(origem_lote){
      //$('#layout').hide();        
   
      if(array_sequencial()){
        if(dias_agenda.length == 1){
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          $("#data_master").html("<span>"+dia_inicio+"</span>");
          $("#data_slave1").html("<span>Das "+hora_inicio_fixo+" às "+hora_fim_fixo+"</span>");
        }
        else{
          dia_inicio = dias.find(x => x.id == dias_agenda[0]).name;
          dia_fim = dias.find(x => x.id == dias_agenda[dias_agenda.length-1]).name;
          $("#data_master").html("<span>"+dia_inicio+" à "+dia_fim+"</span>");
          $("#data_slave1").html("<span>Das "+hora_inicio_fixo+" às "+hora_fim_fixo+"</span>");
        }  
      }else{
        str_dias = "";
        dias_agenda.forEach(function(element, index) {
          if(index < dias_agenda.length-1 )
            str_dias += dias.find(x => x.id == element).name.substring(0,3)+'/';
          else
            str_dias += dias.find(x => x.id == element).name.substring(0,3)
        });
        $("#data_master").html("<span>"+str_dias+"</span>");
        $("#data_slave1").html("<span>Das "+hora_inicio_fixo+" às "+hora_fim_fixo+"</span>");
      }
    }else{
        
        $("#data_master").html("<span>"+ diaName +"</span>");
        $("#data_slave1").html("<span>dia "+ D +"  às "+ H +"</span>");
   
    }

      
  }

 



  $('#fonte').change(function() {
    var option = $('#fonte').find(":selected").text();
    $("#divImg").css("font-family", $(this).find('option:selected').val());
    });

    $('#fonte1').change(function() {
      var option = $('#fonte1').find(":selected").text();
      $("#rodape").css("font-family", $(this).find('option:selected').val());
      });
  
      $('#div_btn_close').click(function(e){
        window.location='calendario.html';
      });

    

    document.getElementById('btn_salvar').addEventListener('click',function(){
     print();
     salvar();
     
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
              agenda_layout_id: layout_id,
              agenda_layout: $("#divImg").html()
            }
      })
      .done(function(ret) {
  
        var obj = jQuery.parseJSON(ret);
  

        if(obj.status == '1'){
          window.location='configurar_layout_upload.html';
        }
       
  
        
      });
    }

    function getStyleElement(elemento){
      var styles = $div.attr('style');
    }

function eventosElementosImg(){

  $('#evento').click(function(e){
    $('#elemento').val('cabecalho');
    var option = $('#elemento').find(":selected").val();
    mudaElemento(option);
  });
  
  $('#data').click(function(e){
    $('#elemento').val('corpo');
    var option = $('#elemento').find(":selected").val();
    mudaElemento(option);
  });
  
  $('#rodape').click(function(e){
    $('#elemento').val('rodape');
    var option = $('#elemento').find(":selected").val();
    mudaElemento(option);
  });

}
$('#txt_descricao').focus(function(e){
  $(window).scrollTop(55);
});

 

  var popup_edit = 0;

  function button_edit(){
    if(popup_edit % 2 == 0){
      button_edit_hide();
    }else{
      button_edit_show();
    }
    popup_edit++;
  }

  function upload_layout(imageFile){
    

    $.ajax({

        type: "POST",

        url: "https://pedeoferta.com.br/templo/index.php/welcome/upload_layout",

        data: {'imagem': imageFile},

        cache: false,

        dataType: 'json',

        success: function (data) {


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
  }
  
}

function array_sequencial(){
  var retorno =1;
  var pos1= parseInt(dias_agenda[0]);
  dias_agenda.forEach(function(element, index) {
    if(dias_agenda.includes(pos1)){
      pos1 ++;
    }else{
      retorno = 0
      return false;
      
    }
    
  });
  return retorno;
}

function origemLote(objAgenda){
  if(objAgenda.agenda_lote > 0){
    return true;    
  }else{
    return false;
  }

}

function isEdit(objAgenda){
  if(objAgenda.agenda_layout != null && objAgenda.agenda_layout != ''){
    return true;
  }  
  else{
    return false;
  }
}

