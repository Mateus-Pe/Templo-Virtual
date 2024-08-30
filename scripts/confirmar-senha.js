var searchParams = new URLSearchParams(window.location.search);
var login = searchParams.get("c");

$('#login').val(login);

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
        
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}
 
$('#senha').on('input', function() {
    const senha = $(this).val();
    const strengthIndicator = $('#password-strength');

    if (senha === '') {
        strengthIndicator.css('display', 'none'); // Esconde o indicador quando o campo está vazio
    } else {
        let strength = 'Fraca';
        let color = 'red';

        if (senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha) && /[^A-Za-z0-9]/.test(senha)) {
            strength = 'Forte';
            color = 'green';
        } else if (senha.length >= 6) {
            strength = 'Razoável';
            color = 'orange';
        }
        setTimeout(function() {
        strengthIndicator.text('Senha ' + strength).css({'color': color})// Mostra o indicador quando há conteúdo
        },300);
        strengthIndicator.css({'color': color, 'display': 'block'})
    }
});


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