$('#solicitar_senha').click(function(e){
  console.log('entro');
  if($('#celular').val() == ''){
    $('.cadastro__alert').text('Digite seu celular para continuar');
    $('.cadastro__alert').removeClass('is-verify').addClass('is-alert');
  }
  else{
    esqueciSenha();
  }
});



$('#voltar_login').click(function(){
  console.log('clicou');
  window.location = 'loginas.html';
});



function esqueciSenha(){
  var dados = {
    usuario_celular: $('#celular').val()
  };

  $.ajax({
    type: "POST",
    url: "https://pedeoferta.com.br/templo/index.php/welcome/esqueci_senha",
    data: dados,
    dataType: "json",
    success: function (response) {
 
    console.log(response.status);
      if(response.status == 1) {
        $('.cadastro__alert').removeClass('is-alert').addClass('is-verify');
        $('.cadastro__alert').text('Instruções de recuperação de senha enviada em seu celular');
        $("#divHide").css('display','none');
        $("#divGif").css('display','flex');
      }else{
        $('.cadastro__alert').removeClass('is-verify').addClass('is-alert');
        $('.cadastro__alert').text('Celular não encontrado');
      }

    },
    error: function (error) {
      console.log(error);
    }
  });
}