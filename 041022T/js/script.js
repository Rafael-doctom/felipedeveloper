//variavel globais para contagem de tempo
let countdown;

//seleciona a div onde o timer será mostrado
const timerDisplay = document.querySelector('.display__time-left');

//selecionar a div onde o horario após o timer irá ser exibido
const endTime = document.querySelector('.display__end-time');

//selecionar os botoes que vao determinar o tempo do timer
const buttons = document.querySelectorAll('[data-time]');

//carregar os audios
var ini_a = new Audio();
var fim_a = new Audio();
//informa o source dos audios
ini_a.src='som/Jump.mp3';
fim_a.src='som/Bike.mp3';

//Função de contagem do tempo
function timer(seconds){
    //abaixo quando iniciarmos o timer ele limpara qualquer outro que exista
    clearInterval(countdown);

    //verificar o momento inicial da contagem de tempo
    const now = Date.now();
    //abaixo atuliza segundo a segundo o tempo restante
    const then = now + seconds * 1000;

    //exibe a contagem antes do interval, que mostratá o tempo total
    displayTimeLeft(seconds);
    //exibe a horaaapós a contagem
    displayEndTime(then);

    //Contagem do tempo decrescente
    countdown = setInterval(() => {     
        //ao usar a função abaixo, pode ver no console que ao diminuir e passar do zero ele começa a contar negativo, 
        //por isso é necessario parar a função quando chegar em um valor menos que zero
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            fim_a.play();
            clearInterval(countdown);  
            return;
        }
        //exibir o contador no console
        displayTimeLeft(secondsLeft);
    }, 1000); 
}

//ao usar apenas o interval, ele começa a rodar a partir do tempo que foi colocado, no caso, 1 segundo, 
//por isso caso tenha 10 segundos ele vai começar a contar a partir do 9, por isso precisamos criar uma função para exibir o tempo que falta
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ?'0':''}${remainderSeconds}`;
    //Adicionar o timer ao Title da pagina
    document.title = display;
    timerDisplay.textContent = display;
}
//Exibir a hora  exata que o timer findará
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Seu timer findará ${hour}:${minutes < 10 ? '0':''}${minutes}`;
}
//Função para iniciar o Timer ao clicar no botão
function startTimer(){
    ini_a.play();
    //Pegar o valor do data-time do botão que foi clicado e transformar em inteiro
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

}

//identificar o evento do click no botao e atribuir a função 
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    ini_a.play();
    e.preventDefault();
    //pegar o que foi digitado
    const mins = this.minutes.value;
    //atribuir como parametro da funcao, transformando em segundos
    timer(mins * 60);
    //limpar cada vez que for digitado outro
    this.reset();
});