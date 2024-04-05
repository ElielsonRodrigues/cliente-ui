import { required } from "@vuelidate/validators";

export default class Cliente {
    constructor() {
        this.codigo = null;
        this.nome = null;
        this.cpf = null;
        this.idade = null;

    }

    validations() {
      return {
        nome: {
          required,
        },
        cpf: {
          required,
        },
        idade: {
          required,
        },
      };
    }
}
