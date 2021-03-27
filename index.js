require('dotenv').config()

const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");


const main = async() => {


    const busquedas = new Busquedas();
   
    let opt;
    do{
        const opt  = await inquirerMenu();


        switch(opt){
          case 1:

            const lugar = await leerInput('Ciudad : ');


            await busquedas.ciudad(lugar);

            console.log(lugar);
               //mostrar mensaje 
               //buscar lugar
               //seleccionar lugar
               //clima
               //mostrar resultados
               console.log('\ninformacion del lugar\n'.green);
               console.log('\n Ciudad: \n', );
               console.log('\n Lat: \n', );
               console.log('\n Long: \n', );
               console.log('\n Temperature: \n', );


              break;  
        }


        if(opt !== 0) await pausa();
    }while(opt !== 0);
   
}



main();