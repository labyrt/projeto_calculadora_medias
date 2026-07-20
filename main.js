const form = document.getElementById('form-atividade');
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');
const tbody = document.querySelector('tbody');
const tfoot = document.querySelector('tfoot tr');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar se a nota está entre 0 e 10
    const nota = parseFloat(inputNotaAtividade.value);
    if (nota < 0 || nota > 10) {
        alert('A nota deve estar entre 0 e 10');
        return;
    }

    // Criar nova linha
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${inputNomeAtividade.value}</td>
        <td>${nota}</td>
        <td><img src="./images/${nota >= 7 ? 'aprovado' : 'reprovado'}.png" alt="Status"></td>
    `;
    
    // Adicionar linha à tabela
    tbody.appendChild(tr);

    // Limpar inputs
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';

    // Atualizar média
    atualizarMedia();
});

function atualizarMedia() {
    // Pegar todas as notas da tabela
    const linhas = document.querySelectorAll('tbody tr');
    let somaNotas = 0;
    let quantidade = linhas.length;

    linhas.forEach(linha => {
        const nota = parseFloat(linha.querySelectorAll('td')[1].textContent);
        somaNotas += nota;
    });

    // Calcular média
    const media = somaNotas / quantidade;
    
    // Atualizar footer com a média
    const tdMedia = tfoot.querySelectorAll('td')[1];
    const spanResultado = tfoot.querySelector('.resultado');
    
    tdMedia.textContent = media.toFixed(2);
    
    // Definir status de aprovação
    if (media >= 7) {
        spanResultado.textContent = 'Aprovado';
        spanResultado.classList.remove('reprovado');
        spanResultado.classList.add('aprovado');
    } else {
        spanResultado.textContent = 'Reprovado';
        spanResultado.classList.remove('aprovado');
        spanResultado.classList.add('reprovado');
    }
}
