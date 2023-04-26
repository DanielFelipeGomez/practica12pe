import 'mocha';
import {expect} from 'chai';
import request from 'request';
 


describe('Probando consultas al servidor a la ruta /funkos', () => {

  it('Consulta de añadir un funko', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test&id=1&nombre=TestFunko&descripcion=TestFunko&tipo=Pop!&genero=test&franquicia=test&numero=1&caracteristica_especial='Hace tests'&valor_mercado=1000"
    request({method: 'POST', url: url, json: true}, (error: Error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.response).to.be.an('object');
        expect(response.body.response.type).to.be.equal('add');
        expect(response.body.response.success).to.be.equal(true);
        expect(response.body.response.funkoData).to.be.an('object');
        expect(response.body.response.funkoData._id).to.be.equal(1);
        expect(response.body.response.funkoData._nombre).to.be.equal('TestFunko');
        expect(response.body.response.funkoData._descripcion).to.be.equal('TestFunko');
        expect(response.body.response.funkoData._tipo).to.be.equal('Pop!');
        expect(response.body.response.funkoData._genero).to.be.equal('test');
        expect(response.body.response.funkoData._franquicia).to.be.equal('test');
        expect(response.body.response.funkoData._numero).to.be.equal(1);
        expect(response.body.response.funkoData._caracteristica_especial).to.be.equal("'Hace tests'");
        expect(response.body.response.funkoData._valor_mercado).to.be.equal(1000);
    });
    done()
  });

  it('Consultar de modificacion de un funko', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test&id=1&nombre=TestFunkoModificado&descripcion=TestFunkoModificado&tipo=Pop!&genero=test&franquicia=test&numero=1&caracteristica_especial='Hace tests'&valor_mercado=1000"
    request({method: 'PATCH', url: url, json: true}, (error: Error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.response).to.be.an('object');
        expect(response.body.response.type).to.be.equal('update');
        expect(response.body.response.success).to.be.equal(true);
        expect(response.body.response.funkoData).to.be.an('object');
        expect(response.body.response.funkoData._id).to.be.equal(1);
        expect(response.body.response.funkoData._nombre).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData._descripcion).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData._tipo).to.be.equal('Pop!');
        expect(response.body.response.funkoData._genero).to.be.equal('test');
        expect(response.body.response.funkoData._franquicia).to.be.equal('test');
        expect(response.body.response.funkoData._numero).to.be.equal(1);
        expect(response.body.response.funkoData._caracteristica_especial).to.be.equal("'Hace tests'");
        expect(response.body.response.funkoData._valor_mercado).to.be.equal(1000);
    });
    done()
  });

  it('Consultar de consulta de un funko', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test&id=1"
    request({method: 'GET', url: url, json: true}, (error: Error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.response).to.be.an('object');
        expect(response.body.response.type).to.be.equal('read');
        expect(response.body.response.success).to.be.equal(true);
        expect(response.body.response.funkoData).to.be.an('object');
        expect(response.body.response.funkoData._id).to.be.equal(1);
        expect(response.body.response.funkoData._nombre).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData._descripcion).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData._tipo).to.be.equal('Pop!');
        expect(response.body.response.funkoData._genero).to.be.equal('test');
        expect(response.body.response.funkoData._franquicia).to.be.equal('test');
        expect(response.body.response.funkoData._numero).to.be.equal(1);
        expect(response.body.response.funkoData._caracteristica_especial).to.be.equal("'Hace tests'");
        expect(response.body.response.funkoData._valor_mercado).to.be.equal(1000);
    });
    done()
  });

  it('Consultar de consulta de todos los funkos', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test"
    request({method: 'GET', url: url, json: true}, (error: Error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.response).to.be.an('object');
        expect(response.body.response.type).to.be.equal('list');
        expect(response.body.response.success).to.be.equal(true);
        expect(response.body.response.funkoData).to.be.an('array');
        expect(response.body.response.funkoData[0]._id).to.be.equal(1);
        expect(response.body.response.funkoData[0]._nombre).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData[0]._descripcion).to.be.equal('TestFunkoModificado');
        expect(response.body.response.funkoData[0]._tipo).to.be.equal('Pop!');
        expect(response.body.response.funkoData[0]._genero).to.be.equal('test');
        expect(response.body.response.funkoData[0]._franquicia).to.be.equal('test');
        expect(response.body.response.funkoData[0]._numero).to.be.equal(1);
        expect(response.body.response.funkoData[0]._caracteristica_especial).to.be.equal("'Hace tests'");
        expect(response.body.response.funkoData[0]._valor_mercado).to.be.equal(1000);
    });
    done()
  });

  it('Consultar de borrado de un funko', (done) => {
    const url = "http://localhost:3000/funkos?nombreUsuario=Test&id=1"
    request({method: 'DELETE', url: url, json: true}, (error: Error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.response).to.be.an('object');
        expect(response.body.response.type).to.be.equal('delete');
        expect(response.body.response.success).to.be.equal(true);
        expect(response.body.response.funkoData).to.be.equal('Eliminado el funko 1')
    });
    done()
  });

});

