$('#solicitar_senha').click(function(e){
  console.log('entro');
  if($('#celular').val() == ''){
    $('.cadastro__alert').text('Digite seu celular para continuar');
  }
  else{
    //loginas();
    console.log('enviou o link pelo zap');
  }
});

$('#celular').on('keyup', function(event) {
  mascaraTelefone(event);
});

$('#voltar_login').click(function(){
  console.log('clicou');
  window.location = 'loginas.html';
});

function mascaraTelefone(event) {
  let telefone = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Limita o número a 11 dígitos
  if (telefone.length > 11) {
      telefone = telefone.slice(0, 11);
  }

  let telefoneFormatado = '';

  // Formatação condicional
  if (telefone.length > 2) {
      telefoneFormatado = '(' + telefone.substring(0, 2) + ') ';
  }
  if (telefone.length > 7) {
      telefoneFormatado += telefone.substring(2, 7) + '-' + telefone.substring(7);
  } else if (telefone.length > 2) {
      telefoneFormatado += telefone.substring(2);
  } else {
      telefoneFormatado = telefone;
  }

  // Verifica se Backspace ou Delete foi pressionado
  if (["Backspace", "Delete"].includes(event.key)) {
      let posicaoCursor = event.target.selectionStart;

      // Se o cursor estiver após um `)` ou um `-`, remove o caractere especial junto
      if (telefoneFormatado[posicaoCursor - 1] === ')' || telefoneFormatado[posicaoCursor - 1] === '-') {
          telefoneFormatado = telefoneFormatado.substring(0, posicaoCursor - 2) + telefoneFormatado.substring(posicaoCursor);
      }

      // Se o cursor estiver após `(` e o próximo caractere for `)`, remova ambos
      if (telefoneFormatado[posicaoCursor - 1] === '(' && telefoneFormatado[posicaoCursor + 2] === ')') {
          telefoneFormatado = telefoneFormatado.substring(2);
      }
  }

  // Aplica a formatação
  event.target.value = telefoneFormatado;
}

/*function loginas(){
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
}*/