console.log("Processo principal")
//Importando as funções electron
const {
    app,
    BrowserWindow,
    nativeTheme,
    Menu,
    ipcMain
} = require('electron')

//Referente ao preload
const path = require('node:path')   

//Janela da calculadora
const criarJanelaPrincipal = () => {
    //Permite a janela no tema do sistema do usuário
    nativeTheme.themeSource = 'system' 
    
    const win = new BrowserWindow({
        //Definindo tamanho da janela
        width: 280,
        height: 410,

        //Definindo o icone
        icon: './src/public/img/icon.png',

        //Definindo que a janela não pode ser redimencionada
        resizable: false,

        //Definindo que a janela não pode ser maximizada
        maximizable: false,

        //Indicando para ir ao preload
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },

        //Escondendo a barra de menu padrão
        autoHideMenuBar: true,

        titleBarStyle: 'hidden'
    })
    //Carregando o arquivo principal da calculadora
    win.loadFile('./src/views/index.html')
}

app.whenReady().then(() => {
    criarJanelaPrincipal()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows.length === 0) criarJanelaPrincipal()
    })

    ipcMain.on('fechar-app', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            focusedWindow.close();
        } else {
            console.log("Nenhuma janela focada.");
        }
    })
})

