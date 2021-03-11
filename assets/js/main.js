const prazoMeses = document.getElementById("prazoMeses");
const jurosMensal = document.getElementById("jurosMensal");
const jurosAcumulados = document.getElementById("jurosAcumulados");

function simularFinanciamento() {
  const valor = document.getElementById("valorFinanciado").value;

  const prazoAnos = document.getElementById("prazoFinanciamento").value;

  const juros = document.getElementById("jurosAnual").value;

  if (valor != "" && prazoAnos != "" && juros != "") {
    prazoMeses.value = calcularPrazo(prazoAnos);

    let amortizacao = calcularAmortizacao(valor, prazoMeses.value);

    jurosMensal.value = calcularJurosMensal(juros);

    jurosAcumulados.value = calcularJurosAcumulado(
      valor,
      jurosMensal.value,
      amortizacao
    );

    criarTabela(valor, amortizacao, jurosMensal.value);
  }
}

function calcularPrazo(prazoAnos) {
  return prazoAnos * 12;
}

function calcularJurosMensal(juros) {
  let jurosMensal = Math.pow(1 + parseFloat(juros), 1 / 12) - 1;
  return jurosMensal;
}

function calcularAmortizacao(valor, prazoMeses) {
  let amortizacao = valor / prazoMeses;
  return amortizacao;
}

function calcularJurosAcumulado(valor, jurosMensal, amortizacao) {
  let saldoDevedor = valor;
  let jurosAcumulados = 0;
  for (let i = 0; i < prazoMeses.value; i++) {
    let juros = saldoDevedor * jurosMensal;
    jurosAcumulados += juros;
    saldoDevedor -= amortizacao;
  }
  return jurosAcumulados.toFixed(2);
}

function criarTabela(valor, amortizacao, jurosMensal) {
  let tbody = document.querySelector(".tbodySimulacao").children;

  for (let i = 0; i < tbody.length; i++) {
    let saldoDevedor = valor - amortizacao * i;
    let juros = saldoDevedor * jurosMensal;
    let total = amortizacao + juros;

    tbody[i].children[0].textContent = i + 1;
    tbody[i].children[1].textContent = amortizacao.toFixed(2);
    tbody[i].children[2].textContent = juros.toFixed(2);
    tbody[i].children[3].textContent = total.toFixed(2);
  }
}

function reset() {
  document.getElementById("valorFinanciado").value = "";
  document.getElementById("prazoFinanciamento").value = "";
  document.getElementById("jurosAnual").value = "";

  document.getElementById("prazoMeses").value = "";
  document.getElementById("jurosMensal").value = "";
  document.getElementById("jurosAcumulados").value = "";

  let tbody = document.querySelector(".tbodySimulacao").children;
  for (let i = 0; i < tbody.length; i++) {
    for (let j = 0; j < tbody[i].children.length; j++) {
      tbody[i].children[j].textContent = "";
    }
  }
}
