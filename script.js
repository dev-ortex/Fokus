const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('.app__card-primary-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgComecarBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somComecar = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somFinalizado = new Audio('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add("active");
    tempoDecorridoEmSegundos = 10;
    mostrarTempo();
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add("active");
    tempoDecorridoEmSegundos = 300;
    mostrarTempo();
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add("active");
    tempoDecorridoEmSegundos = 900;
    mostrarTempo();
})

function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;

            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superficie?<br>
                <strong class="app__title-strong">Faça uma pausa longa</strong>
            `;
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somFinalizado.play();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return 1;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId) {
        zerar();
        somPause.play();
        return 1;
    }
    somComecar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    imgComecarBt.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    iniciarOuPausarBt.textContent = "Comecar";
    imgComecarBt.setAttribute('src', '/imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

//https://cursos.alura.com.br/course/javascript-manipulando-elementos-dom/task/136972
//Data
//https://cursos.alura.com.br/course/javascript-manipulando-elementos-dom/task/136979