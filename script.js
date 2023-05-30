window.onload = function(){

    // Função para randomizar array
    function shuffleArray(arr) {
        // Loop em todos os elementos
        for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
            const j = Math.floor(Math.random() * (i + 1));
            // Reposicionando elemento
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Retornando array com aleatoriedade
        return arr;
    }

    function inicializar(){

        let controleClick = 0
        let movimentos = 0
        let acertos = 0
        let itemAnterior = null;
        var posicoes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var posicoesEmbaralhadas = shuffleArray(posicoes);
        let viradosCerto = [] 

        var requestURL = './cavaleiros.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        let todosCavaleiros = null;
        let containerCavaleiros = document.getElementById('containerCavaleiros')
        containerCavaleiros.innerHTML = '';
    
    
        request.onload = function() {
    
            var cavaleiros = request.response;
            todosCavaleiros = cavaleiros;
    
            for(posicao of posicoesEmbaralhadas){
                //cavaleiro.nome
                var cardCavaleiro = document.createElement("div");
                cardCavaleiro.innerHTML += `
                    <div class='flipper'>
                        <div class='front'>
                            <img src='img/capaCard.jpg'>
                        </div>
                        <div class='back'>
                            <img src='img/${posicao}.jpg'>
                        </div>
                    </div>
                `;
                containerCavaleiros.appendChild(cardCavaleiro)
            }
            
            let allflippers = document.getElementsByClassName('flipper')
            
            for(flipper of allflippers){
    
                flipper.onclick = function(){
                    
                    if(viradosCerto.indexOf(this.children.item(1).children.item(0).src) == -1 && this != itemAnterior){
                        
                        controleClick++

                        if(controleClick < 3 && acertos < 12){

                            if(controleClick == 1){
                                itemAnterior = this;
                            }
                            
                            let itemEmQuestao = this

                            itemEmQuestao.children.item(0).style.transform = 'rotateY(180deg)';               
                            itemEmQuestao.children.item(1).style.transform = 'rotateY(0deg)';                            

                            if(controleClick == 2){
        
                                movimentos++
        
                                if(itemEmQuestao.children.item(1).children.item(0).src != itemAnterior.children.item(1).children.item(0).src){
        
                                    window.setTimeout( function(){
        
                                        itemEmQuestao.children.item(0).style.transform = 'rotateY(0deg)';               
                                        itemEmQuestao.children.item(1).style.transform = 'rotateY(180deg)';
                                        
                                        itemAnterior.children.item(0).style.transform = 'rotateY(0deg)';               
                                        itemAnterior.children.item(1).style.transform = 'rotateY(180deg)';

                                        itemEmQuestao = null
                                        itemAnterior = null
        
                                        window.setTimeout(function(){
                                            controleClick = 0
                                        },600)
        
                                    }, 2000);
                                
                                } else {

                                    itemEmQuestao.removeEventListener('click',()=>{})
                                    itemAnterior.removeEventListener('click',()=>{})
                                    
                                    controleClick = 0;
                                    acertos++;
                                    viradosCerto.push(itemEmQuestao.children.item(1).children.item(0).src)
                                    
                                    if(acertos == 12){

                                        if(localStorage.getItem('record')){                                        
                                            
                                            if( movimentos < localStorage.getItem('record')){
                                                
                                                let record = localStorage.getItem('record')
                                                localStorage.setItem('record',movimentos)
                                                window.setTimeout(function(){
                                                    alert('Fim do Jogo! \nPares virados = ' + movimentos+'\n Parabéns você possui um novo record = ' + movimentos)
                                                },600)
                                            
                                            } else {
                                                
                                                window.setTimeout(function(){
                                                    alert('Fim do Jogo! \nPares virados = ' + movimentos)
                                                },600) 
                                            }
                                        
                                        } else {

                                            localStorage.setItem('record', movimentos) == movimentos
                                            window.setTimeout(function(){
                                                alert('Fim do Jogo! \nPares virados = ' + movimentos+'\n Parabéns você possui um novo record = ' + movimentos)
                                            },600)

                                        }
                            
                                    }                        
                                }
                            } 
                        }
                    }
                }
            }
        }
    }

    inicializar()

    document.getElementById('zerar').onclick = function(){
        inicializar()
    }
    document.getElementById('ver').onclick = function(){
        alert(localStorage.getItem('record'))
    }
}