const axios = require('axios');

class Busquedas{

    historial = ['tegucigalpa', 'madrid', 'Concepcion'];

    constructor(){
        //TODO leer DB si existe
    }


    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        };
    }

    async ciudad(lugar = ''){
        //petición http

        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });
    
            const resp = await instance.get();
            console.log(resp.data)
            // console.log('ciudad',lugar);
            return [];
        }catch(err){
            return [];
        }
        
    }

}


module.exports = Busquedas;