import 'cypress-wait-until';
import attr from '../../support/variaveis.js';
const funcao = require("../functions/function.js");
const colaborador = require("../functions/functionColaborador.js")

// Cypress._.times(10, () => {
// })
var tenantId = "0";

// const colaboradorId = '5049840'
  
beforeEach(() => {
  funcao.loginDeUsuario()
});

describe('Validações Colaboradores', () => {
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
 
  it('Cadastrar Colaborador - ' + attr.dados.nomeColaborador , () => {
    colaborador.cadastroDeColaborador(tenantId)
  })    
  it('Validar Cadastro do Colaborador - ' + attr.dados.nomeColaborador, () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.validarCadastroColaborador(tenantId)
  })
  it('Cadastrar Contrato do Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.cadastrarContratoColaborador(tenantId)
  })
  it('Consulta de Colaborador - Por Nome', () => {
    colaborador.consultaColaboradorNome(tenantId)
  })  
  it('Consulta de Colaborador - Por Matrícula', () => {
    colaborador.consultaColaboradorMatricula(tenantId)
  })    
  it('Consulta de Colaborador - Por CPF', () => {
    colaborador.consultaColaboradorCpf(tenantId)
  })    
  it('Afastar Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.afastarColaborador(tenantId)
  })  
  it('Rescindir Contrato', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.rescindirContrato(tenantId)
  })  
  it('Cadastrar Diretriz Administrativa', () => {
    colaborador.cadastrarDiretrizAdministrativa(tenantId)
  })  
  it('Modulação Administrativa', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.modulacaoAdministrativa(tenantId)
  })  
  it('Modulação Magistério', () => {
    colaborador.modulacaoMagisterio(tenantId)
  })
  it('Gerar Folha de Ponto', () => {
    colaborador.gerarFolha(tenantId)
  })  
  it('Imprimir Folha de Ponto', () => {
    colaborador.imprimirFolha(tenantId)
  })
  it('Criar Login de Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.criarLoginColaborador(tenantId)
  })  
  it('Login de Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.loginColaborador()
  }) 
})

describe('Validações de Campos do Cadastro do Colaborador', () => {
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
  it('Validar Campo Nome.', () => {      
    attr.camposDeValidacao.nomeColaborador = ' ';
    colaborador.validarCamposColaborador(tenantId, 'Nome é obrigatório.')
    attr.camposDeValidacao.nomeColaborador = attr.dados.nomeColaboradorValidacao;
  })
  it('Validar Campo CPF.', () => {      
    attr.camposDeValidacao.cpfColaborador = ' ';
    colaborador.validarCamposColaborador(tenantId, 'CPF é obrigatório.')
    attr.camposDeValidacao.cpfColaborador = attr.dados.cpfColaboradorValidacao;
  })  
  it('Validar Campo Data de Nascimento.', () => {      
    attr.camposDeValidacao.dataNasc = ' ';
    colaborador.validarCamposColaborador(tenantId, 'Data de nascimento é obrigatória.')
    attr.camposDeValidacao.dataNasc = '01/01/1999';
  })  
  it('Validar Campo Sexo.', () => {      
    attr.camposDeValidacao.pessoaSexo = '';
    colaborador.validarCamposColaborador(tenantId, 'Sexo é obrigatório.')
    attr.camposDeValidacao.pessoaSexo = 3;
  })  
  it('Validar Campo Cor/Raça.', () => {      
    attr.camposDeValidacao.raca = '';
    colaborador.validarCamposColaborador(tenantId, 'Cor/Raça é obrigatório.')
    attr.camposDeValidacao.raca = 1;
  })  
  it('Validar Campo Nacionalidade.', () => {      
    attr.camposDeValidacao.nacionalidade = '';
    colaborador.validarCamposColaborador(tenantId, 'A nacionalidade é obrigatória.')
    attr.camposDeValidacao.nacionalidade = 1;
  })  
  it('Validar Campo UF de Naturalidade.', () => {      
    attr.camposDeValidacao.ufNaturalidade = ' ';    
    attr.camposDeValidacao.naturalidade = 'xxx';    
    colaborador.validarCamposColaborador(tenantId, 'A UF da naturalidade é obrigatória.')
    attr.camposDeValidacao.ufNaturalidade = 'GO';
    attr.camposDeValidacao.naturalidade = 'GOIÂNIA';
  })  
  it('Validar Campo Munícipio de Naturalidade.', () => {  
    attr.camposDeValidacao.naturalidade = 'xxx';    
    colaborador.validarCamposColaborador(tenantId, 'O município de nascimento é obrigatório.')
    attr.camposDeValidacao.naturalidade = 'GOIÂNIA';
  })  
  it('Validar Campo CEP - CEP Inválido.', () => {  
    attr.camposDeValidacao.cep = '75748468';    
    colaborador.validarCamposColaboradorCEP(tenantId, 'Endereço não encontrado para o cep informado')
    attr.camposDeValidacao.cep = '74810180';
  }) 
  it('Validar Campo Localização/Zona de Residência.', () => {  
    attr.camposDeValidacao.zona = '';    
    colaborador.validarCamposColaborador(tenantId, 'A localização/Zona de residência deve ser informada.')
    attr.camposDeValidacao.zona = 1;
  })  
  it('Validar Campo Localização Diferenciada de Residência.', () => {  
    attr.camposDeValidacao.locDifer = '';    
    colaborador.validarCamposColaborador(tenantId, 'A localização diferenciada de residência deve ser informada.')
    attr.camposDeValidacao.locDifer = 1;
  })  
  it('Validar Campo Título de Eleitor - Número Inválido.', () => {  
    colaborador.validarCamposColaboradorInvalido(tenantId, attr.camposDeValidacao.campoTituloEleitor, attr.camposDeValidacao.tituloEleitor, 'Informe um título de eleitor válido.')
  })  
  it('Validar Campo PIS/PASEP - Número inválido.', () => {  
    colaborador.validarCamposColaboradorInvalido(tenantId, attr.camposDeValidacao.campoPIS, attr.camposDeValidacao.pis, 'Informe um número PIS/PASEP válido.')
  })  
  it('Validar Campo Número NIS - Número inválido.', () => {  
    colaborador.validarCamposColaboradorInvalido(tenantId, attr.camposDeValidacao.campoNIS, attr.camposDeValidacao.nis, 'Informe um número NIS válido.')
  })  
  it('Validar Campo SUS(CNS) - Número inválido.', () => {  
    colaborador.validarCamposColaboradorInvalido(tenantId, attr.camposDeValidacao.campoSUS,  attr.camposDeValidacao.sus, 'Informe um número de cartão SUS (CNS) válido.')
  })     
})
