export default class Config {

    /*DEFININDO PARAMETROS DE CONFIGURAÇÃO PARA CONSUMO DA API DE CLIENTES */
    constructor() {
        this._api_url = 'http://localhost:8080/';

    }
    get api_url() {
        return this._api_url;
    }

    set api_url(value) {
        this._api_url = value;
    }
}