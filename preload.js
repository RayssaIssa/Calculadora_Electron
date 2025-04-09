const { 
    contextBridge, 
    // Permite fazer a reenderização dos processos
    ipcRenderer     
    } = require ('electron')

//Processos
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,

    // Envia uma mensagem para o processo principal fechar o app
    fecharApp: () => ipcRenderer.send('fechar-app'),

    //Envia uma menssagem ao processo principal
    send: (message) => ipcRenderer.send('renderer-message', message),   
    
    //Recebe uma menssagem do processo principal
    on: (message) => ipcRenderer.on('main-message', message)   
})

//Manipulação do DOM
/*window.addEventListener('DOMContentLoaded', () => {
const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})*/