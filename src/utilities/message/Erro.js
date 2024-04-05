export default function msgErro(response) {
    if (response.response.status === 400) {
        let erros = response.response.data.errors
        erros.forEach(element => {
            this.$toast.add({
                severity: "error",
                summary: "Alerta de Erro.",
                detail: element.defaultMessage,
            });
        });
    }
    if (response.response.status !== 400) {
        this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: "Erro na Aplicação! Entre em Contato com T.I",

        });
    }
}