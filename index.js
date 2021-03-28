require('dotenv').config()

const { leerInput, pausa, inquirerMenu,listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");


const main = async() => {


    const busquedas = new Busquedas();
   
    let opt;
    do{
        const opt  = await inquirerMenu();


        switch(opt){
            case 1:

                const termino = await leerInput('Ciudad : ');
                const lugares  = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);

                if(id === '0') continue;

                const lugarSel = lugares.find(l => (l.id == id));
                busquedas.agregarHistorial(lugarSel.nombre);


                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //mostrar mensaje 
                //buscar lugar
                //seleccionar lugar
                //clima
                //    console.log(clima);
                //mostrar resultados
                console.log('\ninformacion del lugar\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Long: ', lugarSel.lng);
                console.log('Temperature: ', clima.temp);
                console.log('Minima: ', clima.temp_min);
                console.log('Maxima: ', clima.temp_max );
                console.log('Como esta el clima: ', `${clima.description}`.green );


              break;  

            case 2:

                    // console.log(busquedas.historialCapitalizado);
                
                    busquedas.historialCapitalizado?.forEach((lugar, i )=> {

                        const idx = `${i + 1}`.green;
                        console.log(`${idx}. ${lugar}`);
                    });  

                break;
        }


        if(opt !== 0) await pausa();
    }while(opt !== 0);
   
}



main();