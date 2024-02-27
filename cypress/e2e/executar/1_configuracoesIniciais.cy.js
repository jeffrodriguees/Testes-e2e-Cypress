import 'cypress-wait-until';
import attr from '../../support/variaveis.js';
const funcao = require("../functions/function.js");
const sistema = require("../funcoesSistema.js");

// Cypress._.times(10, () => {
// })

var tenantId = "0";

beforeEach(() => {
  funcao.loginDeUsuario()
});

describe('Validações Configurações Iniciais', () => { 
  before(() => { 
    cy.task('getId').then(valorTenant => {      
     cy.log("1 " + valorTenant)
     if(valorTenant == "0"){
     tenantId = attr.dados.idTenantx
     }else{
     tenantId = valorTenant
     }
     cy.log("2 " + tenantId)    
   })   
 })
 
  it('Cadastrar Tenant - ' + attr.dados.tenant, () => {
    sistema.cadastrarTenant()
  })
  it('Cadastro de unidade - ' + attr.dados.escola, () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastrarUnidades()
  })
  it('Cadastro de Ano Letivo', () => {
    tenantId = sistema.cadastroAnoLetivo() 
    cy.task('salvaId', tenantId)
  })
  it('Cadastro de Calendário Escolar', () => {
    sistema.cadastroCalendário(tenantId)
  })
  it('Cadastro de Composição de Ensino', () => {
    sistema.cadastroComposição(tenantId)
  })
  it('Cadastro de Anos Escolares', () => {
    sistema.cadastroAnosEscolares(tenantId)
  })
  it('Cadastrar Cargo e Nível', () => {
    sistema.cadastroCargo(tenantId)
  })
  it('Cadastrar Função e vincular ao Cargo', () => {
    sistema.cadastroFuncao(tenantId)
  })
  it('Cadastrar Departamento', () => {
    sistema.cadastroDepartamento(tenantId)
  })
  it('Cadastro de Componentes Curriculares', () => {
    sistema.cadastroComponentesCurriculares(tenantId)
  })
  it('Habilitar Modular Professor como Administrativo', () => {
      sistema.habilitarModularProfessor(tenantId)
  })
  it('Cadastro de Fórmula de Aprovação', () => {
    sistema.cadastroFormulaAprovacao(tenantId)
  })
  it('Configurar Composição de Ensino', () => {
    sistema.configurarComposicaoEnsino(tenantId)
  })
  it('Adicionar Anos Escolares a Composição de Ensino', () => {
    sistema.adicionarAnosEscolaresAComposicao(tenantId)
  })
  it('Adicionar Estrutura Curricular aos Anos Escolares', () => {
    sistema.adicionarEstruturaCurricularAnosEscolares(tenantId)
  })
  it('Configurar Plano de Ensino', () => {
    sistema.configurarPlanoDeEnsino(tenantId)
  })
  it('Habilitar Inserção de Conteúdo Aplicado', () => {
    sistema.habilitarConteudoAplicado(tenantId)
  })
  it('Cadastro de Resultado do Histórico Escolar', () => {
    sistema.cadastrarResultadoHistorico(tenantId)
  })
  it('Configurar Anos Escolares (Cadastro da Escola)', () => {
    sistema.configurarAnosEscolaresUnidade (tenantId)
  })
  it('Adicionar Turnos (Cadastro da Escola)', () => {
    sistema.adicionarTurnosUnidade(tenantId)
  })
  it('Cadastro de Movimentação', () => {
    sistema.cadastrarMovimentação(tenantId)
  })
  it('Cadastro de Justificativa', () => {
    sistema.cadastrarJustificativa(tenantId)
  })
  it('Cadastro de Período', () => {
    sistema.cadastrarPeriodo(tenantId)
  }) 
  it('Cadastro de Horário de Trabalho', () => {
    sistema.cadastrarHorario(tenantId)
  })
  it('Adicionar Turmas', () => {
    sistema.adicionarTurmas(tenantId)
  })
  it('Adicionar Horário de Aula', () => {
    sistema.adicionarHorarioAula(tenantId)
  })
})