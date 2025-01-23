function formatCurrency(input) {
  let value = input.value.replace(/[^\d]+/g, '');
  if (value.length === 0) {
    input.value = 'R$ 0,00';
  } else {
    value = (parseFloat(value) / 100).toFixed(2).replace('.', ',');
    input.value = 'R$ ' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

function calcularImposto() {
  const RBT12 = parseFloat(document.getElementById('receitaBruta').value.replace(/[^0-9,-]+/g, '').replace('.', '').replace(',', '.'));
  const valor = parseFloat(document.getElementById('valor').value.replace(/[^0-9,-]+/g, '').replace('.', '').replace(',', '.'));
  const substituicaoTributaria = document.getElementById('substituicaoTributaria').value;
  const issqnRetido = document.getElementById('issqnRetido').value;

  // Dados da 1ª Faixa do Anexo I
  const ALIE = 4;
  const VLD = 0;
  const icms = 34;

  console.log(`ALIE: ${ALIE}`);
  console.log(`VLD: ${VLD}`);
  console.log(`ICMS: ${icms}`);

  // Calcular a alíquota efetiva (ALIEf)
  let ALIEf = ((RBT12 * ALIE) - VLD) / RBT12;
  console.log(`ALIEf: ${ALIEf}`);

  // Calcular o ICMS da faixa (ICMSR)
  let ICMSR = ALIEf * (icms / 100);
  console.log(`ICMSR: ${ICMSR}`);

  // Calcular a alíquota resultado (ALIR)
  let ALIR = ALIEf - ICMSR;
  console.log(`ALIR: ${ALIR}`);

  // Calcular o valor do imposto a pagar
  let imposto = substituicaoTributaria === 'sim' ? valor * (ALIR / 100) : valor * (ALIEf / 100);
  console.log(`Imposto antes de ajustes: ${imposto}`);

  // Ajustar para ISSQN retido
  if (issqnRetido === 'sim') {
    imposto *= 0.95; // Exemplo de ajuste
  }

  // Explicação do cálculo
  let explicacao = `Você está na 1ª Faixa do Anexo I.\n`;
  explicacao += `Cálculo do imposto: Valor * ${(substituicaoTributaria === 'sim' ? 'ALIR' : 'ALIEf')} = ${valor.toFixed(2)} * ${(substituicaoTributaria === 'sim' ? (ALIR / 100).toFixed(4) : (ALIEf / 100).toFixed(4))}\n`;
  explicacao += issqnRetido === 'sim' ? 'Ajuste para ISSQN retido aplicado (95% do valor calculado).\n' : '';

  console.log(`Imposto após ajustes: ${imposto}`);

  // Exibir resultado
  document.getElementById('resultado').innerText = `Imposto a pagar: R$ ${imposto.toFixed(2)}\n\n${explicacao}`;
}
