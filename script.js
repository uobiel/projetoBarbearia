console.log('Script em execução');

var closeModalButton = document.querySelector('.close-modal');
var buttonAgenda = document.querySelector('.button-agenda');
var modal = document.querySelector('.fade-modal');
var buttonAgendaPrincipal = document.querySelector('#button-agenda');
var card1 = document.querySelector('.card1');
var card2 = document.querySelector('.card2');
var card3 = document.querySelector('.card3');
var confirmaAgendamento = document.querySelector('.submit-form-modal');
var modalSucss = document.querySelector('.fade-modal-sucess');
var voltarModalSucess = document.querySelector('.button-voltar-modal-sucess');

// Slow para descer na tela ao clicar em um menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

closeModalButton.addEventListener('click', function() {
    console.log("Botão de fechar clicado!"); 
    closeModal();
});

buttonAgenda.addEventListener('click', function(){
    console.log('Modal acionado!');
    openModal();
});

buttonAgendaPrincipal.addEventListener('click', function(){
    console.log('Modal acionado!');
    openModal();
});

card1.addEventListener('click', function(){
    console.log('Modal acionado!');
    openModal();
});

card2.addEventListener('click', function(){
    console.log('Modal acionado!');
    openModal();
});

card3.addEventListener('click', function(){
    console.log('Modal acionado!');
    openModal();
});

confirmaAgendamento.addEventListener('click', function(){
    console.log('Modal sucesso acionado!');
    enviarDadosParaBanco();
});

modalSucss.addEventListener('click', function(){
    console.log('Modal sucesso aberto!');
    closeModal();
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeSuccessModal() {
    modalSucss.style.display = 'none';
}

voltarModalSucess.addEventListener('click', function(){
    console.log('Processo finalizado!');
    closeSuccessModal();
});

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function openSuccessModal() {
    modalSucss.style.display = 'flex';
}

function enviarDadosParaBanco() {
    var nome = document.getElementById('name-modal').value;
    var dataNasc = document.getElementById('data-nasc-modal').value;
    var hora = document.getElementById('hour-modal').value;

    fetch('http://localhost:3000/salvar-no-banco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors', // Adicionado o modo CORS
        body: JSON.stringify({
            nome: nome,
            dataNasc: dataNasc,
            hora: hora,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        if (data.success) {
            closeModal();
            openSuccessModal();
        } else {
            console.error('Erro ao salvar no banco de dados');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}