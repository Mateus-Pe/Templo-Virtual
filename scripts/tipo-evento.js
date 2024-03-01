    getCategorias();  
  
  
  
  
  
  function getCategorias() {
  
      $.ajax({
  
        type: "POST",
  
        url: "https://pedeoferta.com.br/templo/index.php/welcome/get_layout_evento",
  
        cache: false,
  
        dataType: 'json',
        
        data: {evento_id: "1"},

        success: function (data) {

            var rows = JSON.parse(data.lista_layout_evento.length);
  
            var optionsCategoria = '';

          for (var i = 0; i < rows; i++) {

            optionsCategoria += '<div class="categories__item">' +

                                  '<div class="categories__link">' +

                                    '<img class="categories__image" src=./imgs/imgs-igreja/igreja.png>' +

                                    '<span class="categories__name">Missa</span>' +

                                  '</div>' +

                                '</div>';
  
            }
  
            $('.categories .row').html(optionsCategoria);
  
            //Associa o evento de click ao DOM recém criado.
  
            $('.categories__item').click(function(e){
  
              
                
               
            });
  
        },

  
        });
  
  } 
  
  
  
  $('#btnVoltar').click(function(e){
  
    window.location="pesquisa.html";
  
  });
  
      
  
  
  
  
  
  