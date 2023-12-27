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
    console.log("Botão de fechar clicado!"); // Adicione isso para verificar se o evento está sendo acionado

    var modal = document.querySelector('.fade-modal');
    modal.style.display = 'none';
});


buttonAgenda.addEventListener('click', function(){
    console.log('Modal acionado!');
    modal.style.display = 'flex';
})

buttonAgendaPrincipal.addEventListener('click', function(){
    console.log('Modal acionado!');
    modal.style.display = 'flex';
})

card1.addEventListener('click', function(){
    console.log('Modal acionado!');
    modal.style.display = 'flex';
})

card2.addEventListener('click', function(){
    console.log('Modal acionado!');
    modal.style.display = 'flex';
})

card3.addEventListener('click', function(){
    console.log('Modal acionado!');
    modal.style.display = 'flex';
})

confirmaAgendamento.addEventListener('click', function(){
    console.log('Modal sucesso acionado!');
    modalSucss.style.display = 'flex';
    modal.style.display = 'none';
});

voltarModalSucess.addEventListener('click', function(){
    console.log('Processo finalizado!');
    modalSucss.style.display = 'none';
})