const fs = require('fs');
const axios = require('axios');
const capitalize = require('capitalize');


class Busquedas{

    historial = ['tegucigalpa', 'madrid', 'Concepcion'];

    dbPath = './db/database.json';

    constructor(){
        this.cargarDB();
    }


    get historialCapitalizado(){
        // const result = [];
        // this.historial.map((lugar, i) => {
        //     result[i] = capitalize.words(lugar)
        //     // capitalize.words(lugar)
        // });
        // return result;

        return this.historial.map(lugar =>{
            return capitalize.words(lugar)
        }); 
    }


    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        };
    }

    get paramsWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es'
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
            return resp.data.features.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng:lugar.center[0],
                lat: lugar.center[1]
            }));
        }catch(err){
            return [];
        }
        
    }


    async climaLugar ( lat, lng ){

        try{


            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, 'lat':lat, 'lon':lng}
            });
    
            const resp = await instance.get();

            // console.log(resp.data)
            // console.log(resp.data.main)
            // console.log(resp.data.weather[0].description, 'clima')

            const {weather, main} = resp.data;

            return {
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max:main.temp_max,
                description: weather[0].description,
            }

        }catch(err){
            console.log(err, 'es un catch');
        }
    }


    agregarHistorial(lugar = ''){
        //TODO prevenir duplicados

        if(!this.historial.includes(lugar.toLocaleLowerCase())){
            this.historial.unshift(lugar.toLocaleLowerCase())

            this.guardarDB();
        }
    
        
    }

    guardarDB(){

        const payload = {
            historial: this.historial,
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    cargarDB(){
        if(!fs.existsSync(this.dbPath)) return ;

        this.historial = this.historial.splice(0, 5);
        
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
        const data  = JSON.parse(info);
        this.historial = data.historial;
        
    }

}


module.exports = Busquedas;