const buttonCopiar = document.getElementById('buttonCopia');
const buttonDescriptografar = document.getElementById('buttonDescriptogra');
const textAreaCriptografada = document.getElementById('textoCriptografado');
const paragrafoCaracteres = document.getElementById('paragrafo_caracteres');
const imagemDetetive = document.getElementById('imagem_detetive');
const paragrafoTituloTextoInformativo = document.getElementById('titulo_textoinformativo');
const paragrafoSsubtituloTextoInformativo = document.getElementById('subtitulo_textoinformativo');

const chaveTela = ('item2');

textAreaCriptografada.disabled = true;  //Desabilitei a entrada de teclado na textarea descriptografa
offButons();
const textAreaOriginal = document.getElementById('textoOriginal');

let tamanhoArea = Number(textAreaOriginal.getAttribute('maxlength'));
const quantidadeCaracteres=tamanhoArea;

window.addEventListener('load', () => {     //pega o tamanho da tela na chamda index.html 
    const larguraTela = window.innerWidth;     
    localStorage.setItem(chaveTela, larguraTela); 
    return      
});


textAreaOriginal.addEventListener('input',(event)=>{  //evento ouve o que esta sendo digitado
    

    if (event.inputType==='deleteContentBackward' || event.inputType==='insertFromPaste') {
        const textAreaOriginal = document.getElementById('textoOriginal').value;
        tamanhoArea=quantidadeCaracteres-textAreaOriginal.length-1; 
    }    
    tamanhoArea > 0 && event.inputType === 'insertText' ?  tamanhoArea-- : tamanhoArea++;    
    paragrafoCaracteres.innerText = `Caracteres restantes.: ${tamanhoArea}`;     
    
    clearMsgErro();
    alternaImagemTextArea();

    if (event.inputType!=='insertFromPaste') offButons(); 
    
    insereTituloSubtitulo();
});

function verificaTexto() { 
    const textoDigitado = textAreaOriginal.value;

    const caracteresEspeciais = /[.,:;?%&*()$#@!]/g;    
    const numeros = /[0-9]/gi;
    const maiusculas = /[A-Z]/g;
    const acentos = /[áàâãéèêíïóôõöúçñ]/gi;
    const respostaNumeros = textoDigitado.match(numeros);  
    const respostaMaiusculas = textoDigitado.match(maiusculas);
    const respostaAcentos = textoDigitado.match(acentos);
    const resposta = textoDigitado.match(caracteresEspeciais);
       

    if (respostaNumeros || respostaMaiusculas || respostaAcentos || resposta) {                
        let escolhido = respostaNumeros ? 'numeros': 'acentos';        
        escolhido = respostaMaiusculas ? 'maiusculas': escolhido;
        if (resposta) escolhido = 'Caracteres'; 
        let mensagemRetorno = `Criptografia não realizada, ${escolhido} não são aceitos.`; 
        const element = document.getElementById('paragrafo_erro');

        element.innerHTML=mensagemRetorno;  //muda  a mensagem no paragrafo <p></p>
        return;        

    } else { 
        if (textoDigitado) {
            imagemDetetive.style.display='none';
            textAreaCriptografada.style.display='block';            
        }
        
        return textoDigitado;
    }    
}

function criptografar() {
    const textoDigitado = verificaTexto();

    if (!textoDigitado) return;        
    onButtons();
    let textoCriptografado =textoDigitado.replaceAll('e','enter');    
    textoCriptografado=textoCriptografado.replaceAll('i','imes');
    textoCriptografado=textoCriptografado.replaceAll('a','ai');
    textoCriptografado=textoCriptografado.replaceAll('o','ober');
    textoCriptografado=textoCriptografado.replaceAll('u','ufat');

    textAreaCriptografada.value=textoCriptografado;    
    paragrafoTituloTextoInformativo.innerHTML=' ';
    paragrafoSsubtituloTextoInformativo.innerHTML=' ';
}

function descriptografa() {

    const textoDigitado = verificaTexto();    

    let textoDesCriptografado=textoDigitado.replaceAll('enter','e');       
    textoDesCriptografado=textoDesCriptografado.replaceAll('imes','i');    
    textoDesCriptografado=textoDesCriptografado.replaceAll('ober','o');    
    textoDesCriptografado=textoDesCriptografado.replaceAll('ufat','u');    
    textoDesCriptografado = textoDesCriptografado.replaceAll('ai','a');
    
    textAreaCriptografada.value=textoDesCriptografado; 
    paragrafoTituloTextoInformativo.innerHTML=' ';
    paragrafoSsubtituloTextoInformativo.innerHTML=' ';  
}

function copiar() { 
    const textoCriptografado = textAreaCriptografada.value; 
    const textoOriginal = textAreaOriginal.value;      

    if(navigator.clipboard.writeText(textoCriptografado)){
        
        if (textoCriptografado.length > 1) {
            buttonCopiar.innerText='copiado para área de transferência';
            buttonCopiar.setAttribute('disabled',true);
            buttonCopiar.style.backgroundColor='red';
            buttonCopiar.style.color='rgb(245, 245, 245)';
            setInterval(() => {
                buttonCopiar.removeAttribute('disabled');
                buttonCopiar.style.backgroundColor='#00008b';
                buttonCopiar.style.Color='rgb(245, 245, 245)';
                buttonCopiar.innerText='Copiar';                
            }, 4000);                       
        } else {
            alert('conteudo vazio cópia não realizada');
        }        
    };    
    paragrafoCaracteres.innerText = `Caracteres restantes.: ${quantidadeCaracteres-textoOriginal.length}`;
    textAreaCriptografada.value=' ';
    //textAreaCriptografada.style.display='none';

    alternaImagemTextArea(); 
    insereTituloSubtitulo();
}

function limpar() {        
    textAreaOriginal.value=' ';
    textAreaCriptografada.value=' ';  
    clearMsgErro();
    paragrafoCaracteres.innerHTML='Apenas letras minúsculas e sem acento.';
    insereTituloSubtitulo();  
    onButtons();    
    tamanhoArea=quantidadeCaracteres;
    alternaImagemTextArea();
}

function clearMsgErro() {
    let paragrafoErroMsg = document.getElementById('paragrafo_erro');
    paragrafoErroMsg.innerHTML=' '; // limpa a mensagem de erro do parágrafo <p></p>
}

function alternaImagemTextArea() {
    
    const tamanhoTela=localStorage.getItem(chaveTela);    

    if (tamanhoTela > 1000) {
        if (imagemDetetive.style.display==='none') {
            imagemDetetive.style.display='block'; 
            textAreaCriptografada.style.display = 'none';        
        }       
    } 
}

function onButtons() { 
    buttonDescriptografar.removeAttribute('disabled');
    buttonCopiar.removeAttribute('disabled');
}

function offButons() { 
    buttonCopiar.setAttribute('disabled',true);
    buttonDescriptografar.setAttribute('disabled',true);
}

function insereTituloSubtitulo() {
    paragrafoTituloTextoInformativo.innerHTML='Nenhuma mensagem encontrada ';
    paragrafoSsubtituloTextoInformativo.innerHTML='Digite um texto que você deseja criptografar ou descriptografar. ';    
}
