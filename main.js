const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];

let notaMinima;

// 🔐 Valida entrada do usuário até ser um número válido entre 0 e 10
do {
    const entrada = prompt("Digite qual a nota média que o aluno precisa ter (entre 4 e 10):");
    notaMinima = parseFloat(entrada.replace(',', '.'));
} while (isNaN(notaMinima) || notaMinima < 4 || notaMinima > 10);


let linhas = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // 🔹 Padroniza o nome: remove espaços e coloca em minúsculas
    const nomeAtividade = inputNomeAtividade.value.trim().toLowerCase();
    const notaAtividade = parseFloat(inputNotaAtividade.value.replace(',', '.'));

    // 🔒 Verifica se essa atividade já foi inserida
    if (atividades.includes(nomeAtividade)) {
        alert(`A atividade "${inputNomeAtividade.value.trim()}" já foi inserida.`);
        return;
    }

    // 🔹 Salva no array já padronizado
    atividades.push(nomeAtividade);
    notas.push(notaAtividade);

    // 🔹 Adiciona à tabela exibindo o nome como digitado, mas limpo
    let linha = `
        <tr>
            <td>${inputNomeAtividade.value.trim()}</td>
            <td>${notaAtividade}</td>
            <td>${notaAtividade >= notaMinima ? imgAprovado : imgReprovado}</td>
        </tr>
    `;

    linhas += linha;

    // 🔹 Limpa os campos
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML =
        mediaFinal >= notaMinima
            ? '<span class="resultado aprovado">Aprovado</span>'
            : '<span class="resultado reprovado">Reprovado</span>';
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}
