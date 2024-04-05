import axios from "axios";

import Config from "../auth/Config";

/* CLASSE DE SERVIÇOS RESPONSAVEL POR MANTER OS METODOS DE CONSUMOS AOS END-POINT'S DA API DE CLIENTE SENDO ELES GET,POST,PUT E DELETE */
export default class clienteService extends Config {

    /* CONSUMINDO END-POINT QUE LISTA TODOS OS CLIENTES */
    findAll() {
        return axios({
            method: "get",
            url: this.api_url + "cliente",
        }).then((res) => res.data);
    }

    /* CONSUMINDO END-POINT QUE CRIA/SALVA UM CLIENTE */
    create(cliente) {
        return axios({
            method: "post",
            url: this.api_url + "cliente",
            data: cliente,
        });
    }

    /* CONSUMINDO END-POINT QUE ATUALIZA UM CLIENTE UM CLIENTE */
    update(cliente) {
        return axios({
            method: 'put',
            url: this.api_url + 'cliente/'+ cliente.codigo,
            data: cliente,
        });

    }

    /* CONSUMINDO END-POINT QUE EXCLUI UM CLIENTE */
    delete(id) {
        return axios({
            method: 'delete',
            url: this.api_url + 'cliente/' + id,
        });
    }
}
