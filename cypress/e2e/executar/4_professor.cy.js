const funcao = require("../functions/function.js");
const professor = require("../functions/functionProfessor.js")
const sistema = require("../funcoesSistema.js");

var tenantId = "0"


beforeEach(() => {
  funcao.loginDeProfessor()
});

describe('Validações Visão de Professor', () => {
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
  });
 
  it('Tela Ata de Reunião.', () => {       
    professor.ataDeReuniao()
  })
  it('Visualizar Calendário Escolar.', () => {
    professor.calendarioEscolar()
  })
  it('Visualizar Conteúdos Curriculares.', () => {
    professor.conteudosCurriculares()
  })
  it('Visualizar horário de Professor.', () => {
    professor.horarioProfessor()
  })
  it('Elaborar Plano de Ensino.', () => {
    professor.elaborarPlanoEnsino()
  })
  it('Editar Elaboração de Plano de Ensino.', () => {
    professor.editarElaboracaoPlanoEnsino()
  })
  it('Copiar Elaboração de Plano de Ensino.', () => {
    professor.copiarElaboracaoPlanoEnsino()
  })
  it('Excluir Elaboração de Plano de Ensino.', () => {
    professor.excluirElaboracaoPlanoEnsino()
  })
  it('Enviar Elaboração de Plano de Ensino.', () => {
    professor.enviarElaboracaoPlanoEnsino()
  })
  it('Validar Elaboração de Plano de Ensino.', () => {
    sistema.validarElaboracaoPlanoEnsino(tenantId)
  })
  it('Adicionar Conteúdo Aplicado.', () => {
    professor.adicionarConteudoAplicado()
  })
  it('Editar Conteúdo Aplicado.', () => {
    professor.editarConteudoAplicado()
  })
  it('Enviar Conteúdo Aplicado.', () => {
    professor.enviarConteudoAplicado()
  })
  it('Avaliar Conteúdo Aplicado.', () => {
    sistema.avaliarConteudoAplicado(tenantId)
  })
})