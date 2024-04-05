<template>
  <Panel header="Gerenciamento de Clientes">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="Novo Cliente"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="showCreate"
              />
            </div>
          </template>
          <template v-slot:end>
            <Button
              label="Exporta CSV"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>
        <DataTable
          ref="dt"
          :value="allClientes"
          v-model:selection="selectedCliente"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Exibindo de {first} a {last} no total de {totalRecords} clientes"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Lista de Clientes</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Pesquisar..."
                />
              </span>
            </div>
          </template>

          <Column field="codigo" header="Código" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Código</span>
              {{ slotProps.data.codigo }}
            </template>
          </Column>
          <Column field="nome" header="Nome do Cliente" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.nome }}
            </template>
          </Column>
          <Column field="cpf" header="Cpf" :sortable="true">
            <template #body="slotProps">
              {{ formatCpf(slotProps.data.cpf) }}
            </template>
          </Column>
          <Column field="idade" header="Idade" :sortable="true">
            <template #body="slotProps">
              {{ checkIdade(slotProps.data.idade) }}
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="showUpdate(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="showRemove(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Panel>
  <ConfirmDialog></ConfirmDialog>
  <DialogCliente :clienteSelected="cliente" @findAll="findAll" />
</template>

<script>
import { FilterMatchMode } from "primevue/api";

/* INSTANCIANDO CLASSE DE MODELO DE CLIENTES */
import Cliente from "../model/cliente/ClienteModel";

/* INSTANCIANDO CLASSE DE SERVIÇO API DE CLIENTES*/
import ClienteService from "../service/cliente/ClienteService";

/* INSTANCIANDO MODAL DE CLIENTE*/
import DialogCliente from "./components/dialog-cliente-form.vue";

export default {
  components: {
    DialogCliente,
  },
  data() {
    return {
      allClientes: [],
      clienteService: new ClienteService(),
      cliente: new Cliente(),
      clienteDialog: false,
      selectedCliente: null,
      filters: {},
      submitted: false,
    };
  },
  created() {
    /* CHAMANDO FUNÇÃO DE FILTRAGEM */
    this.initFilters();
  },
  mounted() {
    /* NA MONTAGEM/RENDERIZAÇÃO DA PAGE CHAMANDO O METODO QUE LISTA OS CLIENTES */
    this.findAll();
  },
  methods: {
    /* METODO RESPONSAVEL POR BUSCAR REGISTROS NA LISTA DO DATATABLE*/
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    /* METODO QUE RETORNA TODOS OS CLIENTES*/
    findAll() {
      this.loading = true;
      this.clienteService.findAll(this.lazyParams).then((data) => {
        this.allClientes = data;
        this.loading = false;
      });
    },
    /* METODO QUE DISPARA A MODAL DE CADASTRO */
    showCreate() {
      this.cliente = { ...new Cliente() };
      this.$store.state.views.cliente.dialogForm = true;
    },
    /* METODO QUE DISPARA A MODAL DE ATUALIZAÇÃO */
    showUpdate(cliente) {
      this.cliente = { ...cliente };
      this.$store.state.views.cliente.dialogForm = true;
    },
    /* METODO QUE DISPARA A MODAL DE EXCLUSÃO */
    showRemove(cliente) {
      this.$confirm.require({
        message: `Deseja excluir o cliente ${cliente.nome} | CPF: ${cliente.cpf}? Se sim, confirme a exclusão.`,
        header: "Confirmação de Exclusão.",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.clienteService
            .delete(cliente.codigo)
            .then((data) => {
              this.$msgSuccess(data);
              this.findAll();
            })
            .catch((error) => {
              this.$msgErro(error);
            });
        },
      });
    },
    /* EXPORTANDO LISTA DE CLIENTES NO FORMATO CSV*/
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    /* FORMATANDO CPF NA DATATABLE */
    formatCpf(cpf) {
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },
    /* VERIFICANDO IDADE E PRINTANDO PALAVRA PLURAL/SINGULAR */
    checkIdade(idade) {
      return idade === 1 ? `${idade} ano.` : `${idade} anos.`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
