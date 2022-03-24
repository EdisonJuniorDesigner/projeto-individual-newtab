// Função de abrir e fechar o menu-mobile
document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("show-menu");
});

document.querySelector("#close").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("close-menu");
});

//---------//

// Local Storage
let transactions = [];
const transactionsRaw = localStorage.getItem("transactions");
if (transactionsRaw) {
    transactions = JSON.parse(transactionsRaw);
}

const bodyExtrato = document.querySelector(".body-extrato");
const totalValues = document.querySelector("#total-values");

// Cria Div
function createDiv() {
    const div = document.createElement("div");
    return div;
}

// Converte valores para real brasileiro
function realConvert(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

// Total das transações
function total() {
    let total = transactions.reduce((prev, curr) => {
        if (curr.type === "Venda") {
            return (
                prev + parseFloat(curr.value.replace(".", "").replace(",", "."))
            );
        } else {
            return (
                prev - parseFloat(curr.value.replace(".", "").replace(",", "."))
            );
        }
    }, 0);

    totalValues.innerHTML = `${realConvert(total)}`;

    if (total > 0) {
        totalValues.innerHTML += `<br><p>[LUCRO]</p>`;
    }

    if (total < 0) {
        totalValues.innerHTML += `<br><p>[PREJUÍZO]</p>`;
    }
}

function editMoney(valueStr) {
    return valueStr.replace(/[^\d,]+/g, "").replace(",", ".");
    // return valueStr.replace(",", ".");
}

// Desenhar transação
function drawTransaction() {
    currentLines = [...document.querySelectorAll(".extrato-desc")];

    currentLines.forEach((element) => {
        element.remove();
    });

    if (!transactions.length) {
        bodyExtrato.innerHTML = `
            <div class="extrato-desc">
            <div class="desc">
                <p>Nenhuma transação cadastrada.</p>
            </div>
        `;
    }

    for (t in transactions) {
        bodyExtrato.innerHTML += `
            <div class="extrato-desc">
                <div class="desc">
                    <p>${transactions[t].type == "Venda" ? "+" : "-"}</p>
                    <p>${transactions[t].desc}</p>
                </div>
                <p class="valor-desc">${realConvert(
                    editMoney(transactions[t].value)
                )}</p>
            </div>
        `;
    }
}

// Form
function transactionForm(e) {
    e.preventDefault();
    let descV = e.target.elements["desc"].value;
    let valueV = e.target.elements["value"].value;
    let typeV = e.target.elements["type"].value;

    transactions.push({
        desc: descV,
        value: valueV,
        type: typeV,
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    drawTransaction();
    total();
    document.querySelector(".form-transacao").reset();
}

// Evento do campo Valor
function testaCampoValor() {
    let valueId = document.getElementById("value");
    let nValue = valueId.value;

    nValue = nValue + "";
    nValue = parseInt(nValue.replace(/[\D]+/g, ""));
    nValue = nValue + "";
    nValue = nValue.replace(/([0-9]{2})$/g, ",$1");

    if (nValue.length > 6) {
        nValue = nValue.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    if (nValue.length > 10) {
        nValue = nValue.replace(
            /([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
            ".$1.$2,$3"
        );
    }

    valueId.value = nValue;
    if (nValue == "NaN") valueId.value = "";
}

// Função para deletar os dados da tabela
function deleteTransactions(e) {
    transactions.splice(e);
    drawTransaction();
    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Os dados foram excluídos com sucesso!");
}

drawTransaction();
total();
