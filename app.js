// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaNumSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Muda o texto da tag selecionada.
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

//Trecho de código responsável por verificar se o chute foi correto ou não, verificando se é menor ou maior que a tentativa.
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){ //Caso de acerto
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { //Caso de erro
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor que o chute!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que o chute!');
        }
        tentativas ++;
        limparCampo();
    }
    // Verificação para o dev. 
    console.log(chute == numeroSecreto);
    console.log(`O número secreto é ${numeroSecreto}`);
}

// Gera o número aleatório num intervalo de 1 a 10.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumSorteados.length;

    if(quantidadeElementosLista == numeroLimite) {
        listaNumSorteados = [];
    }

    if (listaNumSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumSorteados.push(numeroEscolhido);
        console.log(listaNumSorteados)
        return numeroEscolhido;
    }
}

// Transforma o campo input em uma string vazia.
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}