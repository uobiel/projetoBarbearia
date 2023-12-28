document.addEventListener('DOMContentLoaded', function () {
    buscarHorariosDoBanco();
});

function buscarHorariosDoBanco() {
    fetch('http://localhost:3000/buscar-horarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Horários do servidor:', data);
            exibirHorarios(data);
        })
        .catch((error) => {
            console.error('Erro ao buscar horários do banco de dados:', error);
        });
}

function exibirHorarios(horarios) {
    var horariosLista = document.getElementById('horarios-lista');

    // Limpa a lista antes de adicionar os novos horários
    horariosLista.innerHTML = '';

    if (horarios && horarios.length > 0) {
        var tabela = document.createElement('table');

        // Cabeçalho da tabela
        var cabecalho = tabela.createTHead();
        var linhaCabecalho = cabecalho.insertRow(0);

        var abas = ['Nome', 'Data', 'Hora', 'Ações'];

        // Criando abas no cabeçalho
        abas.forEach(function (aba) {
            var th= document.createElement('th');
            th.textContent = aba;
            linhaCabecalho.appendChild(th);
        });

        // Adicionando linhas à tabela
        horarios.forEach(function (horario) {
            var linha = tabela.insertRow(-1);

            // Colunas de dados
            var colunas = [horario.nome, horario.dataNasc, horario.hora];

            colunas.forEach(function (coluna) {
                var celula = linha.insertCell();
                celula.textContent = coluna;
            });

            // Coluna de ações com ícone de conclusão
            var acoesCelula = linha.insertCell();
            acoesCelula.className = 'acoes'; // Adiciona a classe 'acoes' para centralizar

            // Ícone de conclusão
            var iconeConclusao = document.createElement('i');
            iconeConclusao.className = 'fa fa-check'; // Adapte conforme sua biblioteca de ícones
            iconeConclusao.addEventListener('click', function () {
                abrirModalConclusao(horario.id); // Substitua 'id' pelo nome correto da chave primária no seu banco de dados
            });
            acoesCelula.appendChild(iconeConclusao);

            // Adiciona espaço entre os ícones
            var espacoIcones = document.createElement('span');
            espacoIcones.textContent = ' '; // Pode ser ajustado conforme necessário
            acoesCelula.appendChild(espacoIcones);
        });

        horariosLista.appendChild(tabela);
    } else {
        // Caso não haja horários, exiba uma mensagem ou faça o que for apropriado para o seu caso
        horariosLista.textContent = 'Nenhum horário marcado.';
    }
}

function abrirModalConclusao(id) {
    // Lógica para abrir o modal de conclusão
    var modalConclusao = document.querySelector('.fade-modal-sucess');
    var buttonConfirmar = document.getElementById('confirmarConclusao');
    var buttonVoltar = document.getElementById('voltarConclusao');

    modalConclusao.style.display = 'flex';

    buttonConfirmar.addEventListener('click', function () {
        // Ao clicar em "Confirmar", marca o horário como concluído no banco de dados e atualiza a lista
        marcarHorarioComoConcluido(id);

        // Fecha o modal e atualiza a lista após um pequeno intervalo para garantir que a marcação ocorra
        setTimeout(function () {
            modalConclusao.style.display = 'none';
            buscarHorariosDoBanco();
        }, 500);
    });

    buttonVoltar.addEventListener('click', function () {
        // Ao clicar em "Voltar", fecha o modal sem fazer nada
        modalConclusao.style.display = 'none';
    });
}

function marcarHorarioComoConcluido(id) {
    fetch(`http://localhost:3000/marcar-como-concluido/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Horário marcado como concluído com sucesso:', data);
            buscarHorariosDoBanco(); // Atualiza a lista após marcar como concluído
        })
        .catch((error) => {
            console.error('Erro ao marcar horário como concluído:', error);
        });
}

function voltarParaIndex() {
    window.location.href = '../index.html';
}