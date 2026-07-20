const form = document.getElementById('form-atividade');
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');
const tbody = document.querySelector('tbody');
const tfoot = document.querySelector('tfoot tr');
const modal = document.getElementById('modal');
const inputMediaDesejada = document.getElementById('media-desejada');
const btnDefinirMedia = document.getElementById('btn-definir-media');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnCancelar = document.getElementById('btn-cancelar');

let mediaDesejada = 7; // Valor padrão

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
        <td><img src="./images/${nota >= mediaDesejada ? 'aprovado' : 'reprovado'}.png" alt="Status"></td>
        <td><button class="btn-delete">Apagar</button></td>
    `;
    
    // Adicionar evento de delete ao botão
    const btnDelete = tr.querySelector('.btn-delete');
    btnDelete.addEventListener('click', function() {
        tr.remove();
        atualizarMedia();
    });

    // Adicionar linha à tabela
    tbody.appendChild(tr);

    // Limpar inputs
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';

    // Atualizar média
    atualizarMedia();
});

// Eventos do modal
btnDefinirMedia.addEventListener('click', function() {
    inputMediaDesejada.value = mediaDesejada;
    modal.style.display = 'flex';
});

btnConfirmar.addEventListener('click', function() {
    const novaMedia = parseFloat(inputMediaDesejada.value);
    if (novaMedia < 0 || novaMedia > 10) {
        alert('A média deve estar entre 0 e 10');
        return;
    }
    mediaDesejada = novaMedia;
    modal.style.display = 'none';
    atualizarMedia();
});

btnCancelar.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora dela
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function atualizarMedia() {
    // Pegar todas as notas da tabela
    const linhas = document.querySelectorAll('tbody tr');
    let somaNotas = 0;
    let quantidade = linhas.length;

    if (quantidade === 0) {
        const tdMedia = tfoot.querySelectorAll('td')[1];
        const spanResultado = tfoot.querySelector('.resultado');
        tdMedia.textContent = '0.00';
        spanResultado.textContent = 'Sem atividades';
        spanResultado.classList.remove('aprovado', 'reprovado');
        spanResultado.style.backgroundColor = '#666';
        return;
    }

    linhas.forEach(linha => {
        const nota = parseFloat(linha.querySelectorAll('td')[1].textContent);
        somaNotas += nota;
        
        // Atualizar imagem de aprovado/reprovado de acordo com a nova média desejada
        const img = linha.querySelector('img');
        if (nota >= mediaDesejada) {
            img.src = './images/aprovado.png';
        } else {
            img.src = './images/reprovado.png';
        }
    });

    // Calcular média
    const media = somaNotas / quantidade;
    
    // Atualizar footer com a média
    const tdMedia = tfoot.querySelectorAll('td')[1];
    const spanResultado = tfoot.querySelector('.resultado');
    
    tdMedia.textContent = media.toFixed(2);
    
    // Definir status de aprovação
    if (media >= mediaDesejada) {
        spanResultado.textContent = 'Aprovado';
        spanResultado.classList.remove('reprovado');
        spanResultado.classList.add('aprovado');
    } else {
        spanResultado.textContent = 'Reprovado';
        spanResultado.classList.remove('aprovado');
        spanResultado.classList.add('reprovado');
    }
}

// Inicializar eventos de delete para a atividade 1 padrão
document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('tr').remove();
        atualizarMedia();
    });
});
