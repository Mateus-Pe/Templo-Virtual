var chaveSecreta = "key-uri";

// Extrai o valor dos parâmetros criptografados
var urlParams = new URLSearchParams(window.location.search);
var userToken = urlParams.get('t');

// Descriptografa os parâmetros
/*var bytes = CryptoJS.AES.decrypt(decodeURIComponent(dadosCriptografados), chaveSecreta);
console.log(bytes);
var parametrosDescriptografados = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//getUser(parametrosDescriptografados);
var userToken = parametrosDescriptografados.usuario_token;*/
console.log("Parâmetros: ", userToken);


$('#btn_seguir').click(function(e){
  console.log('entro');
  if($('#senha').val() == ''){
    $('.cadastro__alert').text('Digite sua senha!');
  }
  else if($('#confirmar_senha').val() == ''){
    $('.cadastro__alert').text('Confirme sua senha!');
  }
   else if($('#confirmar_senha').val() != $('#senha').val()){
        $('.cadastro__alert').text('Deu algo errado, confirme novamente sua senha!');
    }
    else{
      updateSenha();
  }
});


function getUser(parametros){
  var dados = {
    usuario_token : parametros.usuario_token

  };

  $.ajax({
    type: "POST",
    url: "https://flavorosa.com.br/templo/index.php/welcome/get_usuario",
    data: dados,
    dataType: "json",
    success: function (response) {
 
    console.log(response);
      if(response.status == 1) {
        //window.location = "lista-igreja.html";
        usuarioId = usuario.usuario_id;
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}


function updateSenha(){
  var dados = {
    usuario_senha : $("#senha").val(),
    usuario_token : userToken
  };

  $.ajax({
    type: "POST",
    url: "https://flavorosa.com.br/templo/index.php/welcome/alterar_senha",
    data: dados,
    dataType: "json",
    success: function (response) {
 
    console.log(response);
      if(response.status == 1) {
        window.sessionStorage.setItem('paroquia_id', response.usuario.usuario_paroquia_id);
        window.location = "lista-igreja.html";
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

$('#toggleConfirmPassword').click(function() {
    const confirmarSenhaInput = $('#confirmar_senha');
    const type = confirmarSenhaInput.attr('type') === 'password' ? 'text' : 'password';
    confirmarSenhaInput.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash'); // Alterna o ícone
});






