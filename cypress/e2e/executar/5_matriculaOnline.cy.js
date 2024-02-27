import 'cypress-wait-until';
const faker = require('faker-br');
const sistema = require("../funcoesSistema.js");
const matricula = require("../functions/functionMatricula.js");
const funcao = require("../functions/function.js")

var tenantId = "111";
// Cypress._.times(10, () => {
// })

  beforeEach(() => {
    // funcao.loginDeUsuario()
  });

  // describe('Matrícula Online', () => {
  //   const cpfCandidato = faker.br.cpf()
  //   const nomeCandidato = faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress'
  //   const cpfResponsavelCandidato = faker.br.cpf()
    
  //   it('Consulta de Unidades Por Nome', () => {        
  //       matricula.consultaUnidadeNome()
  //     })
  //   it('Consulta de Unidades Por Bairro', () => {    
  //       matricula.consultaUnidadeBairro()
  //     })
  //   it('Consulta de Unidades Por Turno', () => {    
  //       matricula.consultaUnidadeTurno()
  //     })
  //   it('Cadastro de antecipado candidato', () => {        
  //       matricula.cadastroAntecipadoCandidato(cpfCandidato, nomeCandidato, cpfResponsavelCandidato)
  //     })
  //   it('Solicitação de Matrícula', () => {        
  //       matricula.cadastroCandidatoMatricula(cpfCandidato)
  //     })
  // })
  describe('Validações de campos Obrigatório Pré-Matrícula.', () => {
  //   before(() => { 
  //     cy.task('getId').then(valorTenant => {      
  //      cy.log("1 " + valorTenant)
  //      if(valorTenant == "0"){
  //      tenantId = attr.dados.idTenantx
  //      }else{
  //      tenantId = valorTenant
  //      }
  //      cy.log("2 " + tenantId)    
  //    })   
  //  })
    it('Cadastrar Candidato CA.', () => {
      matricula.cadastroAntecipadoCandidato()
      })
    // it('Cadastrar Candidato na Pré-Matrícula.', () => {
    //   matricula.cadastrarCandidatoPreMatricula('MATRICULA - 2023')
    //   })
    // it('Pré-Matrícula sem Descrição.', () => {  
    //   matricula.acessarPreMatriculaOnline(tenantId)
    //   matricula.validarDadosCandidato()
    //   })
    // it('Pré-Matrícula sem Ano Letivo.', () => {    
    //   })
    // it('Pré-Matrícula sem Nível.', () => {    
    //   })
    // it('Pré-Matrícula sem Data Início.', () => {    
    //   })
    // it('Pré-Matrícula sem Hora de Início.', () => {       
    //   })
    // it('Pré-Matrícula sem Data Fim.', () => {       
    //   })
    // it('Pré-Matrícula sem Hora Fim.', () => {       
    //   })
    // it('Pré-Matrícula sem Tipo de Contemplação.', () => {       
    //   })
    // it('Pré-Matrícula sem selecionar campo "Anexar comprovante de residência"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar tempo de moradia"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Cartão SUS candidato"', () => {})
    // it('Pré-Matrícula sem selecionar campo "CPF candidato"', () => {})
    // it('Pré-Matrícula sem selecionar campo "CPF responsáveis"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar renda"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar irmão na rede"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar se já é estudante"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar número NIS"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Listagem de Bairros"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar Telefone Principal"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar Telefone Secundário"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar Unidade Consumidora"', () => {})
    // it('Pré-Matrícula sem selecionar campo "Informar Cor/Raça"', () => {})
  })