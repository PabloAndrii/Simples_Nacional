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
        aliquota = 4.00;
        valorADeduzir = 0.00;
    } else if (rbt12 <= 360000) {
        aliquota = 7.30;
        valorADeduzir = 5940.00;
    } else if (rbt12 <= 720000) {
        aliquota = 9.50;
        valorADeduzir = 13860.00;
    } else if (rbt12 <= 1800000) {
        aliquota = 10.70;
        valorADeduzir = 22500.00;
    } else if (rbt12 <= 3600000) {
        aliquota = 14.30;
        valorADeduzir = 87300.00;
    } else {
        aliquota = 19.00;
        valorADeduzir = 378000.00;
    }

    const alief = (((rbt12 * (aliquota / 100)) - valorADeduzir) / rbt12) * 100;

    let irpjPercentual, csllPercentual, cofinsPercentual, pisPercentual, cssPercentual, icmsPercentual;
    if (rbt12 <= 180000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 12.74;
        pisPercentual = 2.76;
        cppPercentual = 41.50;
        icmsPercentual = 34.00;
    } else if (rbt12 <= 360000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 12.74;
        pisPercentual = 2.76;
        cppPercentual = 41.50;
        icmsPercentual = 34.00;
    } else if (rbt12 <= 720000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 12.74;
        pisPercentual = 2.76;
        cppPercentual = 42.00;
        icmsPercentual = 33.50;
    } else if (rbt12 <= 1800000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 12.74;
        pisPercentual = 2.76;
        cppPercentual = 42.00;
        icmsPercentual = 33.50;
    } else if (rbt12 <= 3600000) {
        irpjPercentual = 5.50;
        csllPercentual = 3.50;
        cofinsPercentual = 12.74;
        pisPercentual = 2.76;
        cppPercentual = 42.00;
        icmsPercentual = 33.50;
    } else {
        irpjPercentual = 13.50;
        csllPercentual = 10.00;
        cofinsPercentual = 28.27;
        pisPercentual = 6.13;
        cppPercentual = 42.10;
        icmsPercentual = 0.00; // Não há ICMS para esta faixa
    }

    const alirpj = (alief * irpjPercentual) / 100;
    const alicsll = (alief * csllPercentual) / 100;
    const alicofins = (alief * cofinsPercentual) / 100;
    const alipis = (alief * pisPercentual) / 100;
    const alicpp = (alief * cppPercentual) / 100;
    const aliicms = (alief * icmsPercentual) / 100;

    let aliimposto;
    if (substituicao === "sem") {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp + aliicms;
    } else {
        aliimposto = alirpj + alicsll + alicofins + alipis + alicpp;
    }

    const imposto = (rbm * aliimposto) / 100;

    document.getElementById('resultado').innerText = `Imposto: R$ ${imposto.toFixed(2)}`;
}
