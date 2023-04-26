import 'mocha';
import {expect} from 'chai';
import { MongoClient } from 'mongodb';
import {Funko} from "../../src/practica/entities/funko.js"
import request from 'request';
import { doesNotMatch } from 'assert';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';

interface FunkoInterface {
    id: number,
    funko: Funko
}

describe('Se espera poder hacer peticiones get post patch y delete', () => {
  it('weatherInfoPromises should get weather information', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test"
    request({method: 'GET', url: url, json: true}, (error: Error, response) => {
        console.log(response.body.response)
        
    });
    done();
  });

  
});
