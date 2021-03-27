const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer")


const main = async() => {
   
    let opt;
    do{
        const opt  = await inquirerMenu('hola: ');
        if(opt !== 0) await pausa();
    }while(opt !== 0);
   
}



main();