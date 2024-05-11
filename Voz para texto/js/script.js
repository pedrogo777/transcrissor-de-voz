const botao = document.querySelector('#gravar')
let gravarAtivo = false;
const btnExcluir = document.querySelector('.final span')
const textarea = document.querySelector('textarea')
let conteudoDoTexto = "";

const reconhecimento = new webkitSpeechRecognition(); //instancia da api do reconhecimento de voz
reconhecimento.lang = 'pt-BR';
reconhecimento.interimResults = true;
reconhecimento.continuous = true;

botao.addEventListener('click', function () {

    if(gravarAtivo == true){
        gravarAtivo = false;
        reconhecimento.stop()
        botao.style.background = "white"
    }
    else
    {

        botao.style.background = "red"
        gravarAtivo = true;

        reconhecimento.start()
    
        reconhecimento.onresult = function(event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
              if (event.results[i].isFinal) { 
                /*isFinal é definido pela própria API, quando reconhece que uma fala esta no final */

    
                conteudoDoTexto += event.results[i][0].transcript.trim() + " ";
                textarea.textContent = conteudoDoTexto;
              } 
            }
        }
    
        
    }
})

btnExcluir.addEventListener('click', function(){
    conteudoDoTexto = ""
    textarea.textContent = "";
})
