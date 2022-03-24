function transactionForm(e) {
    e.preventDefault();
    let descV = e.target.elements["desc"].value;
    let valueV = e.target.elements["value"].value;
    let typeV = e.target.elements["type"].value;

    // Regex para saber se o usuário digitou apenas números
    let valuePattern = /[^0-9-() ]+/g;
    if (valuePattern.test(telValue)) {
        alert("Apenas números são permitidos no campo telefone!");
        e.preventDefault();
        return false;
    }
}
