const faker = require('faker-br');
const funcao = require("../e2e/functions/function.js")
import attr from '../support/variaveis.js';

var tenantAutenticado;

module.exports = {
  cadastroEscola: function () {
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Escolas').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()
  },
  nomeTenant: function () {
    return tenant;
  },
  idTenant: function () {
    return tenantAutenticado;
  },
  nomeEscola: function () {
    return escola;
  },  
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  cadastrarTenant: function () {    
    cy.contains('Cadastro', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Secretaria').click()
    cy.contains('Consulta de Secretaria', { timeout: 20000 }).should('be.visible').click()
    // cy.titlePage('Consulta de Secretaria')
    cy.contains('Adicionar').click()
    cy.contains('Adicionar Tenant', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Nome').type(attr.dados.tenant)
    cy.get('#s2id_Estado > .select2-choice').type('GOI{enter}')
    cy.get('.swal2-confirm').click()
    cy.request({
      method: 'GET',
      url: '/Tenant/ObtenhaCidades?uf=GO',
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#s2id_Cidade2Id > .select2-choice').type(attr.dados.cidade + '{enter}')
    cy.get('#Latitude').type(attr.dados.latitude)
    cy.get('#Longitude').type(attr.dados.longitude)
    cy.get('#ServerUrl').type(attr.dados.urlHom)
    cy.get('#Dns').type(attr.dados.urlHom)
    cy.get('#ChatSuporteTecnico').type('5562999999999')
    cy.get('#MensagemChatSuporteTecnico').type('Olá, Me Ajuda.')
    cy.get('#tabConfiguracoes').click()
    cy.get('#s2id_FusoHorario > .select2-choice').type('bras{enter}')
    cy.get('#s2id_RedeAtendimento > .select2-choice').type('muni{enter}')    
    cy.get(':nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .active').click()
    cy.wait(500)
    cy.get('#btn-save').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const ten = $input.val();
        return ten !== '' && ten !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        tenantAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + tenantAutenticado)
      });
    });
  },  
  alterarDadosTenant: function () {
    cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Editar/' + tenantAutenticado))
    cy.contains('Editar Tenant', { timeout: 20000 }).should('be.visible').click()
    cy.wait(1000)
    cy.get('#Nome').clear().type(attr.dados.tenantAlterado)
    cy.get('#s2id_Estado > .select2-choice').type('Tocan{enter}')
    cy.wait(1000)
    cy.get('#s2id_Cidade2Id > .select2-choice').type(attr.dados.cidadeAlterada+'{enter}')
    cy.get('#Latitude').clear().type(attr.dados.latitude)
    cy.get('#Longitude').clear().type(attr.dados.longitude)
    cy.get('#tabConfiguracoes').click()
    cy.get('#s2id_RedeAtendimento > .select2-choice').type('Esta{enter}')
    cy.wait(500)
    cy.get('#btn-save').click()
    cy.wait(500)
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()    
  },    
  cadastrarUnidades: function () {

    //Localica o Tenant Criado para adicionar uma unidade.    
    cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Editar/' + tenantAutenticado))
    cy.get(':nth-child(2) > div > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Unidade Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#Nome').type(attr.dados.escola).should('not.have.value', '')
    cy.get('#NomeFantasia').type(attr.dados.escola).should('not.have.value', '')
    cy.get('#TipoDeUnidadeValue').select(3).should('not.have.value', '')
    cy.get('#DependenciaAdministrativa').select(3).should('not.have.value', '')
    cy.get('.select2-choices').type('Rede{enter}')
    cy.get('#tabEscola > :nth-child(2) > a').click()
    cy.get('#Cep').type(attr.dados.cep).should('not.have.value', '')
    cy.get('#btnBuscarCep > .fa').click()
    cy.wait(800)
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Endereco', { timeout: 20000 }).should('not.have.value', '')
    cy.get('#LocalizacaoZonaEscola').select(1)
    cy.get('#s2id_DistritoId').type('Goi{enter}')
    cy.get('#s2id_LocalizacaoDiferenciada > .select2-choice').type('Não {enter}')
    cy.get('#Email').type('escola@teste.com')
    cy.wait(200)
    cy.get('#TipoTelefone').select(2)
    cy.get('#DDD').select(52)
    cy.get('#NumeroTelefone').type(attr.dados.telefone)
    cy.get('#TipoTelefoneParaEnvioEducaCenso').select(1)
    cy.get('.btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },  
    /**
     * Cadastra um Ano Letivo
     * 
     * @returns {tenantAutenticado}
     */   
  cadastroAnoLetivo: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get(attr.dados.menuEnsino).click()
    cy.get(attr.dados.menu2).contains('a', 'Ano Letivo').click()
    cy.contains('Consulta de Ano Letivo', { timeout: 20000 }).should('be.visible')
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Ano', { timeout: 20000 }).should('be.visible').type(attr.dados.anoLetivo)
    cy.get('#MetaAproveitamento').type('6000')
    cy.get('#MetaMedia').type('7,0')
    cy.get(':nth-child(7) > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    return tenantAutenticado;
  },
  cadastroCalendário: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuEnsino).click()
    cy.get(attr.dados.menu2).contains('a', 'Calendário Escolar').click()
    cy.contains('Consulta de Calendário Escolar', { timeout: 20000 }).should('be.visible')
    cy.contains('Adicionar').click()
    cy.get('#AnoLetivoId').select(1)
    cy.get('#Descricao').type('Calendário' + " " + attr.dados.anoLetivo)
    cy.get('#InicioPrimeiroBimestre').type(attr.dados.InicioPrimeiroBimestre + attr.dados.anoLetivo)
    cy.get('#FimPrimeiroBimestre').type(attr.dados.FimPrimeiroBimestre + attr.dados.anoLetivo)
    cy.get('#InicioSegundoBimestre').type(attr.dados.InicioSegundoBimestre + attr.dados.anoLetivo)
    cy.get('#FimSegundoBimestre').type(attr.dados.FimSegundoBimestre + attr.dados.anoLetivo)
    cy.get('#InicioTerceiroBimestre').type(attr.dados.InicioTerceiroBimestre + attr.dados.anoLetivo)
    cy.get('#FimTerceiroBimestre').type(attr.dados.FimTerceiroBimestre + attr.dados.anoLetivo)
    cy.get('#InicioQuartoBimestre').type(attr.dados.InicioQuartoBimestre + attr.dados.anoLetivo)
    cy.get('#FimQuartoBimestre').type(attr.dados.FimQuartoBimestre + attr.dados.anoLetivo)
    cy.get('#FimPrimeiroSemestre').type(attr.dados.FimSegundoBimestre + attr.dados.anoLetivo)
    cy.get('#FimSegundoSemestre').type(attr.dados.FimQuartoBimestre + attr.dados.anoLetivo)
    cy.get('#formCalendarioEscolar > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_excluir > .fa', { timeout: 20000 }).should('be.visible')
    cy.get('.btn-info > .fa').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.wait(1000)
    cy.get('#tabCalendarioEscolar > :nth-child(3) > a').click()
    cy.get('#dropDownPreencher > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPreencherAutomatico').click()
    cy.contains('Preencher dias letivos automático', { timeout: 20000 }).should('be.visible')
    cy.get('section > :nth-child(3) > i').click()
    cy.get('#btnIniciarPreencherAutomatico').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastroComposição: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Ensino').click()
    cy.get(attr.dados.menu3).contains('a', 'Composição De Ensino').click()    
    cy.contains('Consulta de Composição de Ensino', { timeout: 20000 }).should('be.visible')
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Descricao', { timeout: 20000 }).should('be.visible').type(attr.dados.composicao)
    cy.get('#CodigoParaGeracaoDaTurma').type(attr.dados.composicaoAb)
    cy.get('#s2id_NivelModalidadeEnsino > .select2-choice').type('fundam{enter}')
    cy.wait(1500)
    cy.get('#s2id_Modalidade').type('regular{enter}')
    cy.get('#form_composicaoensino > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  cadastroAnosEscolares: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.cadastrarAnosEscolares()
  },
  cadastroComponentesCurriculares: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.cadastrarComponentesCurriculares()
  },
  cadastroCargo: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Colaborador').click()
    cy.get(attr.dados.menu3).contains('a', 'Cargo').click()
    cy.contains('Consulta de Cargos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('#Descricao').type('Professor')
    cy.get('#Tipo').select(1)
    cy.get(':nth-child(5) > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(1000)
    cy.get('fieldset > :nth-child(1) > footer > .btn').click()
    cy.contains('Adicionar Nível do cargo', { timeout: 20000 }).should('be.visible')
    cy.get('#Descricao').type('Nível 1')
    cy.get('#form_nivelcargo > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
  },
  cadastroFuncao: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Colaborador').click()
    cy.get(attr.dados.menu3).contains('a', 'Função').click()
    cy.contains('Consulta de Funções', { timeout: 30000 }).should('be.visible')

    this.cadastrarFuncao()
  },
  cadastrarFuncao: function () {
    this.cadastrarFuncoes('Professor', 'Prof', 'Docente', 'Professor','Profe')

    this.cadastrarFuncoes('Diretor', 'Dire', 'Diretor', 'Diretor', 'Profe')
  },
  cadastrarFuncoes: function (descFuncao, abrevFuncao, tipoFuncao, tdFuncao, cargoFuncao) {
    cy.get(':nth-child(3) > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Função', { timeout: 20000 }).should('be.visible')
    cy.get('.col-4 > .input > #Nome').type(descFuncao)
    cy.get('#Abreviacao').type(abrevFuncao)
    cy.get('#s2id_TipoFuncionario > .select2-choice').type(tipoFuncao + '{enter}')
    cy.get('#CargaHoraria').clear().type('20')
    cy.get(':nth-child(3) > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(1000)
    cy.contains('Consulta de Funções', { timeout: 20000 }).should('be.visible')
    cy.contains('td', tdFuncao).should('be.visible').click()
    cy.contains('Editar Função', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_CargoId > .select2-choice').type(cargoFuncao + '{enter}')
    cy.wait(1000)
    cy.get('#btnAdicionarCargo').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(1000)
    cy.contains('button','Voltar').click()
    cy.contains('Consulta de Funções', { timeout: 30000 }).should('be.visible')
  },
  habilitarModularProfessor: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuConfiguracoes).click()
    cy.get(attr.dados.menu2).contains('a', 'Geral').click()
    cy.get('#NomePrefeitura', { timeout: 20000 }).should('be.visible').clear().type(tenant)
    cy.get('#NomeSecretaria', { timeout: 20000 }).should('be.visible').clear().type(tenant)
    cy.get('#tabConfiguracoes > :nth-child(2) > a').click()
    cy.get('#CpfResponsavel').type(faker.br.cpf())
    cy.wait(500)
    cy.get('#CpfGestor').type(faker.br.cpf())
    cy.get('#tabConfiguracoes > :nth-child(4) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(4) > :nth-child(12) > .input > .toggle > .toggle-group > .active', { timeout: 20000 }).should('be.visible').click()
    cy.get('#form_config > footer > [type="submit"]').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastroDepartamento: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Colaborador').click()
    cy.get(attr.dados.menu3).contains('a', 'Departamento').click()
    cy.contains('Consulta de Departamentos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('.col-xs-9 > .input > #Nome', { timeout: 20000 }).should('be.visible').type('Direção')
    cy.get('#Abreviacao').type('Dir')
    cy.get('#btn_salvar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.wait(1000)
    cy.get('#form_departamento > footer > .btn-default').click()
    cy.contains('Consulta de Departamentos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Departamento', { timeout: 20000 }).should('be.visible')
    cy.get('.col-xs-9 > .input > #Nome', { timeout: 20000 }).should('be.visible').type('Sala de Aula')
    cy.get('#Abreviacao').type('Sala')
    cy.get('#btn_salvar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  cadastroFormulaAprovacao: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuEnsino).click()
    cy.get(attr.dados.menu2).contains('a', 'Fórmula de Aprovação').click()
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()   
    cy.get('#Descricao', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('#Descricao').type('Fórmula de Aprovação 2 ' + attr.dados.composicao)
    cy.get('#FrequenciaMinima').type('75')
    cy.get('#ArredondamentoNota').select(1)
    cy.get('#DropDownConselhoDeClasse').select(1)
    cy.get('#DropDownLancamentos').select(1)
    cy.get('#FormulaDeAprovacao').type('(NB1+NB2+NB3+NB4)/4')
    cy.get('#FormulaDeAprovacaoConceito').type('(NB1+NB2+NB3+NB4)/4')
    cy.get('#s2id_ConfiguracaoDeCasasDecimais').type('Sem{enter}')
    cy.get('#NotaMaximaMediaFinal').type('10')
    cy.get('#MediaAprovacao').type('7')
    cy.get('#QuantidadeDisciplinaRecuperacao').type('3')
    cy.get('.modal-footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  configurarComposicaoEnsino: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuEnsino).click()
    cy.get(attr.dados.menu2).contains('a', 'Configurar Composição de Ensino').click()
    cy.contains('Consulta de Configuração de Composição de Ensino', { timeout: 20000 }).should('be.visible')
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Configuração de Composição De Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#CalendarioEscolarAnoLetivoId').select(1)
    cy.get('#CalendarioEscolarId').select(1)
    cy.get('#ComposicaoEnsinoId').select(1)
    cy.get('#TipoAtendimento').select(1)
    cy.get('#Periodicidade').select(1)
    cy.get('#MateriaEscolar').select(1)
    cy.get('#OrigemCargaHoraria').select(1)
    cy.get('.select2-choice').type(attr.dados.composicao + '{enter}')
    cy.get('#formComposicaoCalendario > footer > .btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  adicionarAnosEscolaresAComposicao: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.adicionarAnosEscolaresComposicaodeEnsino()
  },
  configurarPlanoDeEnsino: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.configurarPlanoDeEnsino()
  },
  habilitarConteudoAplicado: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuEnsino).click()
    cy.get(attr.dados.menu2).contains('a', 'Configurar Composição de Ensino').click()
    cy.get('#searchTerm', { timeout: 20000 }).should('be.visible').type('FUNDAMENTAL I')
    cy.contains('td', 'FUNDAMENTAL I', { timeout: 20000 }).should('be.visible').click()
     cy.contains('Editar Configuração de Composição De Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#tabComposicaoCalendario > :nth-child(5) > a').click()
    cy.get('#s6 > fieldset > :nth-child(1) > :nth-child(1) > .input > :nth-child(1) > .toggle > .toggle-group > .active').click()
    cy.get('#formComposicaoCalendario > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastrarResultadoHistorico: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuConfiguracoes).click()
    cy.get(attr.dados.menu2).contains('a', 'Histórico Escolar').click()
    cy.contains('Configuração do Histórico Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#tab > :nth-child(2) > a').click()
    cy.get('thead > :nth-child(1) > :nth-child(4) > .btn > .fa').click()
    cy.contains('Situação do Histórico Escolar', { timeout: 20000 }).should('be.visible')
    cy.wait(350)
    cy.get('#Descricao').type('Aprovado')
    cy.get('#s2id_ResultadoEquivalente > .select2-choice').type('Aprovado{enter}')
    cy.get('.modal-footer > .btn-primary').click()   
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  adicionarEstruturaCurricularAnosEscolares: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.adicionarEstruturasCurriculares()
  },
  configurarAnosEscolaresUnidade: function (tenantId) {    
    funcao.logarTenantAutenticado(tenantId)
    this.cadastroEscola()
    cy.get('tbody > tr > :nth-child(3)', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabEscola > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabSeries > fieldset > footer > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.get('#gridModalSeries > tbody > tr > td').contains(attr.dados.serie1).parent().find('[type="checkbox"]').click()
    cy.get('#gridModalSeries > tbody > tr > td').contains(attr.dados.serie2).parent().find('[type="checkbox"]').click()
    cy.get('#gridModalSeries > tbody > tr > td').contains(attr.dados.serie3).parent().find('[type="checkbox"]').click()
    cy.get('#gridModalSeries > tbody > tr > td').contains(attr.dados.serie4).parent().find('[type="checkbox"]').click()
    cy.get('#btnSalvarSerie').click()
    // cy.get('#gridSeries').contains('td',Cypress.env('serie1')).should('be.visible')
    // cy.get('#gridSeries').contains('td',Cypress.env('serie2')).should('be.visible')
    // cy.get('#gridSeries').contains('td',Cypress.env('serie3')).should('be.visible')
    // cy.get('#gridSeries').contains('td',Cypress.env('serie4')).should('be.visible')
  },
  adicionarTurnosUnidade: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    this.cadastroEscola()
    funcao.adicioneTurno()
  },
  cadastrarMovimentação: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('a', 'Motivos de Movimentação').click()
    cy.contains('Consulta de Motivos de Movimentação', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn > .fa').click()
    cy.contains('Adicionar Motivo de Movimentação', { timeout: 20000 }).should('be.visible')
    cy.get('#Descricao').type('DECISÃO DOS PAIS')
    cy.get('#form_motivo > footer > .btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
  },
  cadastrarJustificativa: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Ponto').click()
    cy.get(attr.dados.menu3).contains('a', 'Justificativa').click()    
    cy.contains('Consulta de Justificativa', { timeout: 30000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Justificativa', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Atestado')
    cy.get('#Sigla').type('ATE')
    cy.get('#Prazo').type('30')
    cy.get('#form_justificativa > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastrarPeriodo: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Ponto').click()
    cy.get(attr.dados.menu3).contains('a', 'Períodos').click()
    cy.contains('Consulta de Períodos', { timeout: 30000 }).should('be.visible')    
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Período', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Padrão')
    cy.get('.select2-choice').type('1{enter}')
    cy.get('#form_pontoperiodo > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('O período foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
  },
  cadastrarHorario: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Ponto').click()
    cy.get(attr.dados.menu3).contains('a', 'Horários').click()    
    cy.contains('Consulta de Horários', { timeout: 30000 }).should('be.visible')    
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Horário', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Horário Geral')
    cy.get('#s2id_TipoCargaHoraria > .select2-choice').type('Mensal{enter}')
    cy.get('#form_pontoHorario > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('O horário foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
  },
  adicionarTurmas: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.adicioneTurma()
  },
  adicionarHorarioAula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.horarioAula()
  },
  validarElaboracaoPlanoEnsino: function (tenantId) {
    funcao.deslogarUsuario()
    funcao.loginDeUsuario()
    if(tenantAutenticado == undefined){
      cy.log('Tenant ID')
      funcao.logarTenantAutenticado(tenantId)
    }else{
      cy.log('Autenticado')
      funcao.logarTenantAutenticado(tenantAutenticado) 
    }
    this.cadastroEscola()   
    cy.contains('Unidade Escolar', { timeout: 20000 }).should('be.visible')
    // cy.contains('td', escola).parent().find('[title="Autenticar Unidade"]').find('[class="fa fa-key"]').click()
    cy.contains('td','Escola').parent().find('[title="Autenticar Unidade"]').find('[class="fa fa-key"]').click()
    cy.get('[title="Unidade logada"] > small', { timeout: 20000 }).should('be.visible')
    cy.get(attr.dados.menuEscola).click()
    cy.get(attr.dados.menu2).contains('span', 'Plano de Ensino').click()
    cy.get(attr.dados.menu3).contains('a', 'Avaliar').click()
    cy.contains('Gerenciar de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('PORTUG{enter}')
    cy.get('#btnBuscar > .fa').click()
    cy.get('#tabelaAvaliacaoElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td','Aguardando Avaliação').parent().find('[data-content="Aprovar elaboração"]').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  avaliarConteudoAplicado: function (tenantId) {
    funcao.deslogarUsuario()
    funcao.loginDeUsuario()
    if(tenantAutenticado == undefined){
      cy.log('Tenant ID')
      funcao.logarTenantAutenticado(tenantId)
    }else{
      cy.log('Autenticado')
      funcao.logarTenantAutenticado(tenantAutenticado) 
    }   
    this.cadastroEscola()
    cy.contains('Unidade Escolar', { timeout: 20000 }).should('be.visible')
    // cy.contains('td', escola).parent().find('[title="Autenticar Unidade"]').find('[class="fa fa-key"]').click()
    cy.contains('td','Escola').parent().find('[title="Autenticar Unidade"]').find('[class="fa fa-key"]').click()
    cy.get('[title="Unidade logada"] > small', { timeout: 20000 }).should('be.visible')
    cy.get(attr.dados.menuEscola).click()
    cy.get(attr.dados.menu2).contains('span', 'Conteúdo Aplicado').click()
    cy.get(attr.dados.menu3).contains('a', 'Avaliar Registro').click()
    cy.contains('Avaliar Registro - Conteúdo Aplicado', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('PORTUG{enter}')
    cy.get('#btnCarregarConteudo').click()
    cy.get('td').find('[class="checkbox"]').click()
    // cy.get('#btnAprovarConteudo').click()
    // cy.get('#bot2-Msg1').click()
    // cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  apagarConteudos: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(4) > :nth-child(1)').click()
    cy.get('[style="display: block;"] > :nth-child(3) > :nth-child(1) > .menu-item-parent').click()
    cy.get('.open > ul > li > .menu-2').click()
    cy.contains('Registro - Conteúdo Aplicado', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('Escola Ponto ID{enter}')
    cy.get('#s2id_AnoLetivoId > .select2-choice').type('2023{enter}')
    cy.request({
      method: 'GET',
      url: '/ConteudoAplicado/GetTurmasJson?anoLetivoId=365&escolaId=1095',
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('#s2id_TurmaId > .select2-choice').type('6ANO-1{enter}')
    cy.request({
      method: 'GET',
      url: '/ConteudoAplicado/GetDadosDaTurma?turmaId=142183',
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('PORTUGUESA{enter}')
    Cypress._.times(90, () => {
    cy.get('#tabelaConteudoAplicado', { timeout: 60000 }).should('be.visible')
    cy.get(':nth-child(1) > :nth-child(7) > .btn > .fa', { timeout: 60000 }).should('be.visible').click()
    cy.get('.swal2-confirm', { timeout: 60000 }).should('be.visible').click()
    cy.wait(10000)
    })
  }
}
