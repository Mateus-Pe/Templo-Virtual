function obterValoresSelecionados() {
    const selects = document.querySelectorAll('#eventos, #estado, #regiao, #cidade, #igreja, #comunidade');
    const valoresSelecionados = [];
    selects.forEach(select => {
      const valorSelecionado = select.value;
      if (valorSelecionado) { 
        valoresSelecionados.push(valorSelecionado);
      }
    });
    return valoresSelecionados;
  }

  function atualizarBarraCaminhos() {
    const valoresSelecionados = obterValoresSelecionados();
    const barraCaminhos = document.getElementById('barra-caminhos');
    barraCaminhos.innerHTML = valoresSelecionados.join(' > ');
  }
  
  document.querySelectorAll('#eventos, #estado, #regiao, #cidade, #igreja, #comunidade').forEach(select => {
    select.addEventListener('change', () => {
      atualizarBarraCaminhos();
    });
  });
  
  function salvarFiltros() {
    atualizarBarraCaminhos();
  }