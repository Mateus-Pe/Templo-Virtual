var searchParams = new URLSearchParams(window.location.search);
var login = searchParams.get("c");

$('#login').val(login);

$('#btn_seguir').click(function(e){
  console.log('entro');
  if($('#login').val().length < 9){
      $('.cadastro__alert').text('Digite seu DDD + Celular para prosseguir');
  }
  else{
     loginas();
  }
});

function loginas(){
  var dados = {
    usuario_celular: $('#login').val(),
    usuario_senha: $('#senha').val()

  };

  $.ajax({
    type: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/login",
    data: dados,
    dataType: "json",
    success: function (response) {
 
    console.log(response.status);
      if(response.status == 1) {
        window.sessionStorage.setItem('paroquia_id', response.usuario.usuario_paroquia_id);
        window.location = "lista-igreja.html";
        
      }else{
        $('.cadastro__alert').text('Usuário ou senha incorretos');
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}
 
$('#togglePassword').click(function() {
  const senhaInput = $('#senha');
  const type = senhaInput.attr('type') === 'password' ? 'text' : 'password';
  senhaInput.attr('type', type);
  $(this).toggleClass('fa-eye fa-eye-slash'); // Alterna o ícone
});

$("#login").focus(function(){
  $('.cadastro__alert').text('');
});

$("#senha").focus(function(){
  $('.cadastro__alert').text('');
})