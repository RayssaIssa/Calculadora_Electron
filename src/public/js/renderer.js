
window.addEventListener('DOMContentLoaded', () => {    
    //Botão de fechar
    const botaoFechar = document.getElementById('fechar')
    
    if (botaoFechar) {
        botaoFechar.addEventListener('click', () => {
            window.api.fecharApp(); 
        })
    }

    //Variaveis
    const principal= document.querySelector('.principal')
    const previa = document.querySelector('.previa')
    let numAtual = ''
    let numAnterior = ''
    let operacao = null

    //Atualizando visor
    function atualizaVisor(){
        principal.textContent = numAtual || '0'
        previa.textContent = numAnterior && operacao ? `${numAnterior} ${operacao}` : ''
    }

    //Adicionando numeros
    function adicionaNumero(numero){
        //Se o numero que chegou for um . e o já houver um . então retorna
        if(numero === '.' && numAtual.includes('.')) return
        numAtual += numero
        atualizaVisor()
    }

    //Escolhendo a operação
    function escolheOperacao(op){
        //Se não houver um numero antes, sai da função
        if(numAtual === '') return
        if(numAnterior !== '') calcular()
        
        operacao = op
        numAnterior = numAtual
        numAtual = ''
        atualizaVisor()
    }

    //Calculando
    function calcular(){
        let resultado
        const anterior = parseFloat(numAnterior)
        const atual = parseFloat(numAtual)

        if(isNaN(anterior) || isNaN(atual)) return

        switch(operacao){
            case '+':
                resultado = anterior + atual
                break

            case '-':
                resultado = anterior - atual
                break

            case '/':
                resultado = atual === 0 ? 'Erro' : anterior / atual
                break

            case '%':
                resultado = (anterior / 100) * atual
                break 

            case 'x':
                resultado = anterior * atual
                break

            default:
                return
        }
        numAtual = resultado.toString()
        operacao = null
        numAnterior = ''
        atualizaVisor()
    }

    //Limpar visor
    function limparVisor(){
        numAtual = ''
        numAnterior = ''
        operacao = null
        atualizaVisor()
    }

    //Deletar
    function deletar(){
        //Remove o ultimo caracter
        numAtual = numAtual.slice(0, -1)
        atualizaVisor()
    }

    //Adicionando eventos e mapeando
    document.querySelectorAll('.teclas button').forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.textContent

            if(!isNaN(valor) || valor === '.'){
                adicionaNumero(valor)
            }else{
                switch(valor){
                    case 'AC':
                        limparVisor()
                        break
                    case 'DEL':
                        deletar()
                        break
                    case '=':
                        calcular()
                        break
                    case '+':
                    case '-':
                    case 'x':
                    case '/':
                    case '%':  
                        escolheOperacao(valor)
                        break
                    default:
                        break  
                }
            }
        })
    })

    atualizaVisor()
})