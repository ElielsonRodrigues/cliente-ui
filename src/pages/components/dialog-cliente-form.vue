<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '450px' }"
    header="Formulário de Cliente"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="nome">Nome</label>
      <InputText
        id="nome"
        v-model="v$.cliente.nome.$model"
        maxlength="150"
        placeholder="Digite o nome do cliente"
        autofocus
        :class="{ 'p-invalid': submitted && v$.cliente.nome.$invalid }"
      />
      <small
        class="p-error"
        v-if="submitted && v$.cliente.nome.$invalid"
        >Nome é obrigatório.</small
      >
    </div>
   
    <div class="field">
      <label for="cpf">Cpf</label>
      <InputMask 
        id="cpf" 
        v-model="v$.cliente.cpf.$model" 
        placeholder="Digite o Cpf" 
        mask="999.999.999-99"
        unmask="true"
        :class="{ 'p-invalid': submitted && v$.cliente.cpf.$invalid }"
      />
      <small
        class="p-error"
        v-if="submitted && v$.cliente.cpf.$invalid"
        >Cpf é obrigatório.</small
      >
    </div>
    <div class="field">
      <label for="idade">Idade</label>
      <InputNumber
        id="idade"
        v-model="v$.cliente.idade.$model"
        mode="decimal" showButtons :min="1" :max="100" 
        placeholder="Digite a idade"
        :class="{ 'p-invalid': submitted && v$.cliente.idade.$invalid }"
      />
      <small
        class="p-error"
        v-if="submitted && v$.cliente.idade.$invalid"
        >Idade é obrigatório.</small
      >
    </div>
    <template #footer>
      <Button
        label="Salvar"
        icon="pi pi-check"
        class="p-button-text"
        @click="send(!v$.cliente.$invalid)"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
    </template>
  </Dialog>
</template>

<script>
//Models
import Cliente from "../../model/cliente/ClienteModel";

//Services
import ClienteService from "../../service/cliente/ClienteService";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["clienteSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      cliente: new Cliente(),
      clienteService: new ClienteService(),
      submitted: false,
    };
  },
  validations() {
    return {
      cliente: new Cliente().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.cliente.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.cliente.dialogForm = value;
      },
    },
  },
  methods: {
    /* METODO QUE REALIZA CHECK DE OPERAÇÃO CADASTRO/ATUALIZAÇÃO
    E VALIDAÇÃO DOS CAMPOS DO FORMULARIO */
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.cliente.codigo) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return;
      }
    },
    /* METODO QUE CADASTRA UM NOVO CLIENTE */
    create() {
      this.submitted = true;
      this.clienteService
        .create(this.cliente)
        .then((data) => {
          if (data.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro cadastrado com sucesso.",
              life: 3000,
            });
            this.$emit("findAll");
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    /* METODO QUE ATUALIZA UM CLIENTE */
    update() {
      this.submitted = true;
      this.clienteService
        .update(this.cliente)
        .then((data) => {
          if (data.status === 200) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro alterado com sucesso.",
              life: 3000,
            });
            this.$emit("findAll");
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    /* METODO QUE FECHA E LIMPA A MODAL QUANDO FECHA */
    hideDialog() {
      this.cliente = new Cliente();
      this.submitted = false;
      this.visibleDialog = false;
    },
    /* METODO QUE RESGATA INFORMAÇÕES */
    getData() {
      this.cliente = this.clienteSelected;
    },
  },
};
</script>
<style scoped></style>

