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
        aliquota = 7.80;
        valorADeduzir = 5940.00;
    } else if (rbt12 <= 720000) {
        aliquota = 10.00;
        valorADeduzir = 13860.00;
    } else if (rbt12 <= 1800000) {
        aliquota = 11.20;
        valorADeduzir = 22500.00;
    } else if (rbt12 <= 3600000) {
        aliquota = 14.70;
        valorADeduzir = 85500.00;
    } else {
        aliquota = 30.00;
        valorADeduzir = 720000.00;
    }

    const alief = (((rbt12 * (aliquota / 100)) - valorADeduzir) / rbt12) * 100;

    let irpjPercentual, csllPercentual, cofinsPercentual, pisPercentual, cssPercentual, icmsPercentual;
    if (rbt12 <= 180000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 11.51;
        pisPercentual = 2.49;
        cppPercentual = 37.50;
        icmsPercentual = 34.00;
	ipiPercentual = 7.50;
    } else if (rbt12 <= 360000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 11.51;
        pisPercentual = 2.49;
        cppPercentual = 37.50;
        icmsPercentual = 34.00;
	ipiPercentual = 7.50;
    } else if (rbt12 <= 720000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 11.51;
        pisPercentual = 2.49;
        cppPercentual = 37.50;
        icmsPercentual = 33.50;
	ipiPercentual = 7.50;
    } else if (rbt12 <= 1800000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 11.51;
        pisPercentual = 2.49;
        cppPercentual = 37.50;
        icmsPercentual = 33.50;
	ipiPercentual = 7.50;
    } else if (rbt12 <= 3600000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 11.51;
        pisPercentual = 2.49;
        cppPercentual = 37.50;
        icmsPercentual = 33.50;
	ipiPercentual = 7.50;
    } else {
        irpjPercentual = 8.50;
        csllPercentual = 7.50;
        cofinsPercentual = 20.96;
        pisPercentual = 4.54;
        cppPercentual = 23.50;
        icmsPercentual = 0.00; // Não há ICMS para esta faixa
	ipiPercentual = 35.00;
    }

    const alirpj = (alief * irpjPercentual) / 100;
    const alicsll = (alief * csllPercentual) / 100;
    const alicofins = (alief * cofinsPercentual) / 100;
    const alipis = (alief * pisPercentual) / 100;
    const alicpp = (alief * cppPercentual) / 100;
    const aliicms = (alief * icmsPercentual) / 100;
    const aliipi = (alief * ipiPercentual) / 100;

    let aliimposto;
    if (substituicao === "sem") {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp + aliicms + aliipi;
    } else {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp + aliipi;
    }

    const imposto = (rbm * aliimposto) / 100;

    document.getElementById('resultado').innerText = `Imposto: R$ ${imposto.toFixed(2)}`;
}
