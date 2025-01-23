$(document).ready(function(){
            $('#rbt12, #rbm').on('input', function() {
                const value = this.value.replace(/\D/g, '');
                this.value = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value / 100);
            });
        });

function calcularImposto() {
    const rbt12 = parseFloat(document.getElementById('rbt12').value.replace(/[R$\s.]/g, '').replace(',', '.'));
    const rbm = parseFloat(document.getElementById('rbm').value.replace(/[R$\s.]/g, '').replace(',', '.'));
    const substituicao = document.getElementById('substituicao').value;

    let aliquota, valorADeduzir;
    if (rbt12 <= 180000) {
        aliquota = 6.00;
        valorADeduzir = 0.00;
    } else if (rbt12 <= 360000) {
        aliquota = 11.20;
        valorADeduzir = 9360.00;
    } else if (rbt12 <= 720000) {
        aliquota = 13.50;
        valorADeduzir = 17640.00;
    } else if (rbt12 <= 1800000) {
        aliquota = 16.00;
        valorADeduzir = 35640.00;
    } else if (rbt12 <= 3600000) {
        aliquota = 21.00;
        valorADeduzir = 125640.00;
    } else {
        aliquota = 33.00;
        valorADeduzir = 648000.00;
    }

    const alief = (((rbt12 * (aliquota / 100)) - valorADeduzir) / rbt12) * 100;

    let irpjPercentual, csllPercentual, cofinsPercentual, pisPercentual, cssPercentual, icmsPercentual;
    if (rbt12 <= 180000) {
        irpjPercentual = 4.00;
        csllPercentual = 3.50;
        cofinsPercentual = 12.82;
        pisPercentual = 2.78;
        cppPercentual = 43.40;
        issPercentual = 33.50;
    } else if (rbt12 <= 360000) {
        irpjPercentual = 4.00;
        csllPercentual = 3.50;
        cofinsPercentual = 14.05;
        pisPercentual = 3.05;
        cppPercentual = 43.40;
        issPercentual = 32.00;
    } else if (rbt12 <= 720000) {
        irpjPercentual = 4.00;
        csllPercentual = 3.50;
        cofinsPercentual = 13.64;
        pisPercentual = 2.96;
        cppPercentual = 43.40;
        issPercentual = 32.50;
    } else if (rbt12 <= 1800000) {
        irpjPercentual = 4.00;
        csllPercentual = 3.50;
        cofinsPercentual = 13.64;
        pisPercentual = 2.96;
        cppPercentual = 43.40;
        issPercentual = 32.50;
    } else if (rbt12 <= 3600000) {
        irpjPercentual = 4.00;
        csllPercentual = 3.50;
        cofinsPercentual = 12.82;
        pisPercentual = 2.78;
        cppPercentual = 43.40;
        issPercentual = 33.50;
    } else {
        irpjPercentual = 35.00;
        csllPercentual = 15.00;
        cofinsPercentual = 16.03;
        pisPercentual = 3.47;
        cppPercentual = 30.50;
        issPercentual = 0.00; // Não há ICMS para esta faixa
    }

    const alirpj = (alief * irpjPercentual) / 100;
    const alicsll = (alief * csllPercentual) / 100;
    const alicofins = (alief * cofinsPercentual) / 100;
    const alipis = (alief * pisPercentual) / 100;
    const alicpp = (alief * cppPercentual) / 100;
    const aliiss = (alief * issPercentual) / 100;

    let aliimposto;
    if (substituicao === "sem") {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp + aliiss;
    } else {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp;
    }

    const imposto = (rbm * aliimposto) / 100;

    document.getElementById('resultado').innerText = `Imposto: R$ ${imposto.toFixed(2)}`;
}
