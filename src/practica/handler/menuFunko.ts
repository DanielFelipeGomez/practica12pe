// import { number } from "yargs";
import { Funko } from "../entities/funko.js";
import { GeneroFunko } from "../enumerables/genero_funko_enum.js";
import { TipoFunko } from "../enumerables/tipo_funko_enum.js";
import { ManejadorJSON } from "./manejadorJSON.js";
import fs from 'fs';
import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";

/**
 * Clase que modela el comportamiento de un menú de Funko
 */
export class MenuFunko {

    /**
     * Arrow Function encargado de contruir el objeto Funko a partir de los argumentos pasados por línea de comandos
     * y agregarlo al archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     * @param nombre nombre del Funko
     * @param descripcion descripción del Funko
     * @param tipo tipo de Funko
     * @param genero genero de Funko
     * @param franquicia franquicia a la que pertenece el Funko
     * @param numero numero dentro de la franquicia
     * @param exclusivo es exclusivo o no
     * @param caracteristica_especial característica especial del Funko
     * @param valor_mercado valor de mercado del Funko
     */
    static agregarFunko = (nombreUsuario: string, id: number, nombre: string, 
        descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, 
        numero: number, exclusivo: boolean, caracteristica_especial: string, valor_mercado: number,  
        callback: ( err: string | undefined, data: Funko | undefined) => void) => {

        const funko = new Funko(id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial, valor_mercado);
        const filePath = './db/' + nombreUsuario + '/' + String(funko.id) + '.json';
        if (!fs.existsSync('./db/' + nombreUsuario)) {
            ManejadorJSON.crearDirectorio('./db/' + nombreUsuario); 
        }
        if (fs.existsSync(filePath)) {
            callback(`¡Ups! Ya existe un funko con el id ${funko.id}`, undefined);
        } else {
            ManejadorJSON.crearJSON(filePath, funko);
            callback(undefined, funko);
        }
    };

    /**
     * Arrow Function encargado de eliminar un Funko del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     * @param nombre nombre del Funko
     * @param descripcion descripción del Funko
     * @param tipo tipo de Funko
     * @param genero genero de Funko
     * @param franquicia franquicia a la que pertenece el Funko
     * @param numero numero dentro de la franquicia
     * @param exclusivo es exclusivo o no
     * @param caracteristica_especial característica especial del Funko
     * @param valor_mercado valor de mercado del Funko
     */
    static modificarFunko = (nombreUsuario: string, id: number, nombre: string, 
        descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, 
        numero: number, exclusivo: boolean, caracteristica_especial: string, valor_mercado: number,  
        callback: ( err: string | undefined, data: Funko | undefined) => void) => {

        const funko = new Funko(id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial, valor_mercado);
        const filePath = './db/' + nombreUsuario + '/' + String(funko.id) + '.json';

        if (fs.existsSync(filePath)) {
            ManejadorJSON.crearJSON(filePath, funko);
            callback(undefined, funko);
        } else {
            callback(`¡Ups! No existe un funko con el id ${funko.id}`, undefined);
        }
    };

    /**
     * Arrow Function encargado de eliminar un Funko del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     */
    static eliminarFunko = (nombreUsuario: string, id: number, callback: (
        err: string | undefined, data: string | undefined) => void) => {

        const filePath = './db/' + nombreUsuario + '/' + String(id) + '.json';
        if (fs.existsSync(filePath)) {
            ManejadorJSON.eliminarJSON(filePath);
            callback(undefined, `Eliminado el funko ${id}`);
        } else {
            callback(`¡Ups! No existe un funko con el id ${id}`, undefined);
        }
    };

    /**
     * Arrow Function encargado de listar todos los Funkos del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     */
    static listarFunkos = (nombreUsuario: string,  callback: (
        err: string | undefined, data: Funko[] | undefined) => void) => {

        const files = fs.readdirSync('./db/' + nombreUsuario + '/');
        let listaFunkos: Funko[] = []
        files.forEach(file => {
            const funkoJSON = ManejadorJSON.leerJSON('./db/' + nombreUsuario + '/' + file);
            if (funkoJSON !== undefined) {
                const funko = new Funko(funkoJSON._id, funkoJSON._nombre, funkoJSON._descripcion, funkoJSON._tipo, funkoJSON._genero, funkoJSON._franquicia, funkoJSON._numero, funkoJSON._exclusivo, funkoJSON._caracteristica_especial, funkoJSON._valor_mercado);
                listaFunkos.push(funko);
            }
        });
        callback(undefined, listaFunkos);
    };

    /**
     * Arrow Function encargado de mostrar un Funko del archivo JSON, según su id
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     */
    static mostrarFunko = (nombreUsuario: string, id: number, callback: (
        err: string | undefined, data: Funko | undefined) => void) => {

        const filePath = './db/' + nombreUsuario + '/' + String(id) + '.json';
        if (fs.existsSync(filePath)) {
            const funkoJSON = ManejadorJSON.leerJSON(filePath);
            if (funkoJSON !== undefined) {
                const funko = new Funko(funkoJSON._id, funkoJSON._nombre, funkoJSON._descripcion, funkoJSON._tipo, funkoJSON._genero, funkoJSON._franquicia, funkoJSON._numero, funkoJSON._exclusivo, funkoJSON._caracteristica_especial, funkoJSON._valor_mercado);
                callback(undefined, funko);
            }
        } else {
            callback(`¡Ups! No existe un funko con el id ${id}`,
            undefined);
        }
    };


 
}