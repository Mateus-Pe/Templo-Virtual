var imageFile;
var ids_remove = [];
var atual_ec = 0;

var searchParams = new URLSearchParams(window.location.search);

var ec_cod_url = searchParams.get("ec_cod");

var param_ec = 0;
if(ec_cod_url != null && ec_cod_url != '')
    param_ec = ec_cod_url;

evento_agenda();


$('#divFoto').click(function(){

      navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
              destinationType: Camera.DestinationType.DATA_URL
          });

          function onSuccess(imageData) {
              var image = document.getElementById('foto');
              imageFile = "data:image/jpeg;base64," + imageData;
              console.log(imageFile);
              image.src = imageFile;

          }

          function onFail(message) {
              window.location = "vitrine-geral.html";
          }
});

function getKey(){
  $.ajax({

     method: "POST",

     url: "https://www.pedeoferta.com.br/oferta/cliente/get_cliente_by_cod",

     data: {'cliente_cod': window.sessionStorage.getItem("key")

           }

    })

     .done(function(ret) {

      	var obj = jQuery.parseJSON(ret);

        if(obj.status == 1){

          $('#cliente_nome').val(obj.cliente.cliente_nome);

          $('#cliente_email').val(obj.cliente.cliente_email);

          $('#cliente_celular').val(obj.cliente.cliente_celular);

          /*if(obj.cliente.cliente_picture != '') {
             console.log(obj.cliente.cliente_picture);
             var image = document.getElementById('foto');


               image.src = obj.cliente.cliente_picture;
          }*/

        }

  });
}

function altera_cliente(){
  $.ajax({

     method: "POST",

     url: "https://www.pedeoferta.com.br/oferta/cliente/altera_cliente",

     data: {'cliente_cod': window.sessionStorage.getItem("key"),
            'cliente_nome': $('#cliente_nome').val(),
            'cliente_email': $('#cliente_email').val(),
            'cliente_celular': $('#cliente_celular').val(),
            'cliente_sexo': $('#cliente_sexo').val(),
            'cliente_data_nascimento': '',
            'foto': imageFile

           }
    })

     .done(function(ret) {

      	var obj = jQuery.parseJSON(ret);

        if(obj.status == 1){

        }
  });
}




  $(document).ready(function() {



  });

  $('#cadastro_email').keyup(function(){

      this.value = this.value.toLowerCase();

  });

$('#btn_seguir').click(function(e){
  
  gerar_agenda();

});









function evento_agenda(){




$.ajax({
               method: "POST",
               url: "https://pedeoferta.com.br/templo/index.php/welcome/get_evento_agenda",
               
             })
               .done(function(ret) {

                    var obj = jQuery.parseJSON(ret);

                    var html = '';
                	html += '<section class="regular slider">';




                    $.each(obj.lista_evento_agenda, function (k, lpp) {


						html += '<a data-ec_cod="'+lpp.evento_id+'" class="produtos_perfil"><div data-ec_cod="'+lpp.evento_id+'" class="divPerfilEC" style="opacity: 0.5;height: 90px; display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;">';
	                    html += '<div style="display: grid;">';
						html += '<div style="display: flex;align-items: center; flex-direction: row;flex-wrap: wrap; justify-content: center;"><img  src="'+lpp.evento_icone_img+'" style="height:50px"/></div>';
                        html += '<span style="font-size: 1.3rem; text-align:center; text-decoration:none;">'+lpp.evento_nome+'</span></div>';
	                    html += '</div></a>';

               		});
                    html += '</section>';

                    $("#divHistoria").html(html);

                    slick();
                    $('#carregando').hide();

                    if(ec_cod_url != null && ec_cod_url != ''){
                        produtos_by_ec(ec_cod_url);

                        $('.divPerfilEC').each(function( index ){

                          if($(this).data('ec_cod') == ec_cod_url){

                            $(this).addClass('perfil_ec_selected');
                            $('#divInf').hide();
                            $('#divAll').show();

                          }
                        });
                    }






                    $('.produtos_perfil').click(function(e){
						$('.divPerfilEC').removeClass('perfil_ec_selected');
						$(this).children().addClass('perfil_ec_selected');
                        produtos_by_ec($(this).data('ec_cod'));
						atual_ec = $(this).data('ec_cod');
						$('#divInf').hide();
						$('#divAll').show();
						if(atual_ec != 0){
						     insere_perfil_produtos('');
						}



                    });

               });
			   ;





}

function produtos_by_ec(ec_cod){

	$.ajax({
	   method: "POST",
	   url: "https://www.pedeoferta.com.br/oferta/cliente/get_perfil_produto_by_ec",
	   data: {  'key': window.sessionStorage.getItem("key"),
				'ec_cod': ec_cod,

			 }
	 })
	   .done(function(ret) {


			var obj = jQuery.parseJSON(ret);

			$('#divLista').html('');

            var total_checked = 0;
			$.each(obj.lista_produtos, function (k, lp) {
				checked = '';

				if(lp.tem == 1){
				    total_checked++;
				    checked = 'checked';
				}



				html =  '<div class="pesq" style="background-color: white;height:50px;line-height:50px; padding-bottom: 10px; border-bottom: 1px solid #5b318a36">';

				html +=     '<div class="add" style="display: flex;" data-oferta_cod="'+ lp.oferta_cod +'">' +
								'<div style="width: 80%; text-align: left;">'+
									'<span style="font-size:1.5rem; color: black; margin-left: 15px;">'+ lp.oferta_obs +'</span>'+
								'</div>'+
                                    '<input type="checkbox" class="ids" name="ids[]" value="'+ lp.oferta_cod +'" '+checked+'>'+
							'</div>' +

					   '</div>';

				$('#divLista').append(html);
			});

			if(obj.lista_produtos.length == total_checked){
			    $("#txt_all").html('DESMARCAR');
			    $("#select_all").prop('checked', true);

			}

			/*$('.ids').click(function(e){
                produtos_by_ec($(this).data('ec_cod'));
            });*/

			$('.ids').change(function () {
				if(!$(this).prop("checked")){
					ids_remove.push($(this).val());
				}
			});

			/*$('#select_all').click(function(e){
				if($(this).prop("checked")){
					$("#txt_all").html('DESMARCAR');
					$(".ids").prop('checked', true);
				}else{
					$("#txt_all").html('MARCAR TODAS');
					$(".ids").prop('checked', false);
				}
            })*/

            $('#btn_nenhum').click(function () {
            	$(".ids").prop('checked', false);

            	$('.ids').each(function () {

                           if (this.checked == false) {
                               ids_remove.push($(this).val());
                           }
                });

            });
            $('#btn_todos').click(function () {
                $(".ids").prop('checked', true);

            });



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

function gerar_agenda(){
  var dias = [];
	$('.dias:checked').each(function(i, e) {
		dias.push($(this).val());
	});


  $.ajax({
    method: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda",
    data: { 
        'dias': dias.join(),
        'agenda_dias': $('#agenda_dias').val(),
        'tempo_duracao': $('#tempo_duracao').val(),
        'agenda_de': $('#agenda_de').val(),
        'agenda_ate': $('#agenda_ate').val()
        
      }
  })
    .done(function(ret) {


     var obj = jQuery.parseJSON(ret);

       if(obj.status ==1){
          console.log(obj.post);
       }


    });
}

function insere_perfil_produtos(page){
	var ids = [];
	$('.ids:checked').each(function(i, e) {
		ids.push($(this).val());
	});

	$.ajax({
	   method: "POST",
	   url: "https://pedeoferta.com.br/templo/index.php/welcome/insere_perfil_produtos",
	   data: { 'key': window.sessionStorage.getItem("key"),
			   'ofertas': ids.join(),
			   'ofertas_remove': ids_remove.join()
			 }
	 })
	   .done(function(ret) {


			var obj = jQuery.parseJSON(ret);

			ids_remove = [];
			$("#txt_all").html('MARCAR TODAS');
			$("#select_all").prop( "checked", false );

            if(page != ''){
                window.location = page;
            }


	   });
}

