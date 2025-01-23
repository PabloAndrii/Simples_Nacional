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
        aliquota = 4.50;
        valorADeduzir = 0.00;
    } else if (rbt12 <= 360000) {
        aliquota = 9.00;
        valorADeduzir = 8100,00;
    } else if (rbt12 <= 720000) {
        aliquota = 10.20;
        valorADeduzir = 12420.00;
    } else if (rbt12 <= 1800000) {
        aliquota = 14.00;
        valorADeduzir = 39780.00;
    } else if (rbt12 <= 3600000) {
        aliquota = 22.00;
        valorADeduzir = 183780.00;
    } else {
        aliquota = 33.00;
        valorADeduzir = 828000.00;
    }

    const alief = (((rbt12 * (aliquota / 100)) - valorADeduzir) / rbt12) * 100;

    let irpjPercentual, csllPercentual, cofinsPercentual, pisPercentual, cssPercentual, icmsPercentual;
    if (rbt12 <= 180000) {
        irpjPercentual = 18.80;
        csllPercentual = 15.20;
        cofinsPercentual = 17.67;
        pisPercentual = 3.83;
        issPercentual = 44.50;
    } else if (rbt12 <= 360000) {
        irpjPercentual = 19.80;
        csllPercentual = 15.20;
        cofinsPercentual = 20.55;
        pisPercentual = 4.45;
        issPercentual = 40.00;
    } else if (rbt12 <= 720000) {
        irpjPercentual = 20.80;
        csllPercentual = 15.20;
        cofinsPercentual = 19.73;
        pisPercentual = 4.27;
        issPercentual = 40.00;
    } else if (rbt12 <= 1800000) {
        irpjPercentual = 17.80;
        csllPercentual = 19.20;
        cofinsPercentual = 18.90;
        pisPercentual = 4.10;
        issPercentual = 40.00;
    } else if (rbt12 <= 3600000) {
        irpjPercentual = 18.80;
        csllPercentual = 19.20;
        cofinsPercentual = 18.08;
        pisPercentual = 3.92;
        issPercentual = 40.00;
    } else {
        irpjPercentual = 53.50;
        csllPercentual = 21.50;
        cofinsPercentual = 20.55;
        pisPercentual = 4.45;
        issPercentual = 0.00; // Não há ICMS para esta faixa
    }

    const alirpj = (alief * irpjPercentual) / 100;
    const alicsll = (alief * csllPercentual) / 100;
    const alicofins = (alief * cofinsPercentual) / 100;
    const alipis = (alief * pisPercentual) / 100;
    const aliiss = (alief * issPercentual) / 100;

    let aliimposto;
    if (substituicao === "sem") {
        aliimposto = alirpj + alicsll + alicofins + alipis + aliiss;
    } else {
        aliimposto = alirpj + alicsll + alicofins + alipis;
    }

    const imposto = (rbm * aliimposto) / 100;

    document.getElementById('resultado').innerText = `Imposto: R$ ${imposto.toFixed(2)}`;
}
