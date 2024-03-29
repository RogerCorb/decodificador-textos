const buttonCopiar = document.getElementById('buttonCopia');
const buttonDescriptografar = document.getElementById('buttonDescriptogra');
const textAreaCriptografada = document.getElementById('textoCriptografado');
const paragrafoCaracteres = document.getElementById('paragrafo_caracteres');
const paragrafoErro = document.getElementById('paragrafo_erro');
const imagemDetetive = document.getElementById('imagem_detetive');
const paragrafoTituloTextoInformativo = document.getElementById('titulo_textoinformativo');
const paragrafoSsubtituloTextoInformativo = document.getElementById('subtitulo_textoinformativo');
const estilosOriginais = window.getComputedStyle(buttonCopiar);

const chaveTela = ('item2');

textAreaCriptografada.disabled = true;  //Desabilitei a entrada de teclado na textarea descriptografa
offButons();
const textAreaOriginal = document.getElementById('textoOriginal');

let tamanhoArea = Number(textAreaOriginal.getAttribute('maxlength'));
const quantidadeCaracteres=tamanhoArea;

window.addEventListener('load', () => {    
    const larguraTela = window.innerWidth;   
    
    localStorage.setItem(chaveTela, larguraTela); 
    return;      
});

const tamanhoTela=localStorage.getItem(chaveTela);
controlaPlaceholder(tamanhoTela); 

textAreaOriginal.addEventListener('input',(event)=>{  

    
        
    if (event.inputType==='deleteContentBackward' || event.inputType==='insertFromPaste' || event.inputType==='deleteContentForward') {
            const textAreaOriginal = document.getElementById('textoOriginal').value;
            tamanhoArea=quantidadeCaracteres-textAreaOriginal.length-1; 
    } 

    tamanhoArea > 0 && event.inputType === 'insertText' ?  tamanhoArea-- : tamanhoArea++;     
    if (tamanhoTela > 1024) {                 
        if (tamanhoArea < 290) {
           paragrafoCaracteres.innerText = `Caracteres restantes.: ${tamanhoArea}`;
        } else { 
           paragrafoCaracteres.innerText = `Apenas letras minúsculas e sem acento.`;
        }
    }             
    if (event.inputType!=='insertFromPaste') offButons(); 
   
    clearMsgErro();
    alternaImagemTextArea();
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
    const respostaCaracteresEspeciais = textoDigitado.match(caracteresEspeciais); 

    if (textoDigitado.trim()==='') return;

    if (respostaNumeros || respostaMaiusculas || respostaAcentos || respostaCaracteresEspeciais) {                
        let descricaoErro = respostaNumeros ? 'numeros': 'acentos';        
        descricaoErro = respostaMaiusculas ? 'maiusculas': descricaoErro;        
        if (respostaCaracteresEspeciais) descricaoErro = 'caracteres especiais';                
        paragrafoErro.innerText=`Criptografia não realizada, ${descricaoErro} não aceitos.`;
        return;
    }         
    imagemDetetive.style.display='none';
    textAreaCriptografada.style.display='block';                          
    return textoDigitado;       
}

function criptografar() {

    const textoDigitado = verificaTexto();    
    if (!textoDigitado) {
        offButons();
        return;
    } 

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

    const textoZonaCriptografada = verificaTexto(); 
    if (!textoZonaCriptografada){
        offButons();
        return;
    } 
    
    onButtons();
    let textoDesCriptografado=textoZonaCriptografada.replaceAll('enter','e');       
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
                buttonCopiar.innerText='Copiar';
                estilosOriginaisButtonCopiar();
            }, 4500);                       
        } else {
            alert('conteudo vazio cópia não realizada');
        }       
    }; 
    if (tamanhoTela > 1023) {
        paragrafoCaracteres.innerText = `Caracteres restantes.: ${quantidadeCaracteres-textoOriginal.length}`;        
    }      

    textAreaCriptografada.value=' ';
    textAreaCriptografada.style.display='none';

    alternaImagemTextArea(); 
    insereTituloSubtitulo(); 
    //offButons();   
}

function clearMsgErro() {
    let paragrafoErroMsg = document.getElementById('paragrafo_erro');
    paragrafoErroMsg.innerHTML=' '; // limpa a mensagem de erro do parágrafo <p></p>
}

function alternaImagemTextArea() {    

    if (tamanhoTela > 1024) {
        if (imagemDetetive.style.display==='none') {
            imagemDetetive.style.display='block'; 
            textAreaCriptografada.style.display = 'none';        
        }       
    } 
    controlaPlaceholder(tamanhoTela);  
}


function controlaPlaceholder(parametro) { 
    if (parametro < 490) {
        textAreaOriginal.setAttribute('placeholder','Digite seu texto');    
    } else { 
        textAreaOriginal.removeAttribute('placeholder');
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

function estilosOriginaisButtonCopiar() {
    for (const propriedade in estilosOriginais) {
      buttonCopiar.style[propriedade] = estilosOriginais[propriedade];
    }
}