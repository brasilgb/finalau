const statusOrdemByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Ordem Aberta";
        case 2:
            return "Ordem Fechada";
        case 3:
            return "Orçamento Gerado";
        case 4:
            return "Orçamento Aprovado";
        case 5:
            return "Executando reparo";
        case 6:
            return "(CA)Serviço concluído";
        case 7:
            return "(CN)Serviço concluído";
        case 8:
            return "Entregue ao cliente";
    }
};

const statusUserByValue = (value: any) => {
    switch (value) {
        case 'active':
            return "Ativo";
        case 'inactive':
            return "Inativo";
    }
};

const roleUserByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Administrador";
        case 2:
            return "Usuário";
    }
};

const statusAgendaByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Agenda Aberta";
        case 2:
            return "Em Atendimento";
        case 3:
            return "Agenda Fechada";
    }
};
const statusMessageByValue = (value: any) => {
    switch (value) {
        case 0:
            return "Não lida";
        case 1:
            return "lida";
    }
};

export {
    statusOrdemByValue,
    statusUserByValue,
    roleUserByValue,
    statusAgendaByValue,
    statusMessageByValue
};
