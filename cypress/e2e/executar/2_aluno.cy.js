import 'cypress-wait-until';
import attr from '../../support/variaveis.js';
const funcao = require("../functions/function.js");
const aluno = require("../functions/functionAluno.js");

// Cypress._.times(10, () => {
// })

var sus;
var suss;
var tituloEleitor;
var pis;
var tenantId = "0";

const alunoId = '5395423'
  

// before(() => {
//   cy.waitUntil(() => {
//     return cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1').then((response) => {
//       const dados = response.body;
//       sus = dados.values + "";
//       if(sus.length > 15){
//         cy.log('if: ' + sus);
//       }
//     });
//   }, { timeout: 50000, interval: 300 }).then(() => {    
//     var qtd = sus.length;
//     cy.log('qtd: ' + qtd);
//     cy.log('Sus: ' + sus);
//   });
//   cy.waitUntil(() => {
//     return cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1').then((response) => {
//       const dados2 = response.body;
//       suss = dados2.values + "";
//       if(suss.length > 15){
//         cy.log('if: ' + suss);
//       }
//     });
//   }, { timeout: 50000, interval: 300 }).then(() => {    
//     var qtd2 = suss.length;
//     cy.log('qtd: ' + qtd2);
//     cy.log('Sus2: ' + suss);
//   });
//   cy.waitUntil(() => {
//     return cy.request('GET', 'https://geradorbrasileiro.com/api/faker/titulo?limit=1').then((response) => {
//       const dados3 = response.body;
//       tituloEleitor = dados3.values + "";
//     });
//   }, { timeout: 50000, interval: 300 }).then(() => {      
//     cy.log('Título de Eleitor: ' + tituloEleitor);  

//   });
//   cy.waitUntil(() => {
//     return cy.request('GET', 'https://geradorbrasileiro.com/api/faker/pispasep?limit=1').then((response) => {
//       const dados4 = response.body;
//       pis = dados4.values.toString().replace("-,","").replace(".,","").replace(",.,","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","");;
      
//     });
//   }, { timeout: 50000, interval: 300 }).then(() => {     
//     cy.log('Pis: ' + pis);  
//   });
// });

beforeEach(() => {
  funcao.loginDeUsuario()
});

describe('Validações Aluno', () => {   
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
 
  it('Cadastrar Aluno 1 - ' + attr.dados.nomeAluno, () => {
    aluno.cadastrarAluno(tenantId, `${sus}`)
  })
  it('Validar Dados do Aluno - ' + attr.dados.nomeAluno, () => {
    aluno.validarAluno(tenantId, `${sus}`)
  })
  it('Cadastrar Responsável', () => {
    aluno.cadastrarResponsavelAluno(tenantId)
  })
  it('Consultar Aluno Por Nome', () => {
    aluno.consultaDeAlunoNome(tenantId)
  })
  it('Consultar Aluno Por CPF', () => {
    aluno.consultaDeAlunoCPF(tenantId)
  })
  it('Consultar Aluno Por Matrícula', () => {
    aluno.consultaDeAlunoMatricula(tenantId)
  })
  it('Consultar Aluno Por Responsável' , () => {
    aluno.consultaDeAlunoResponsavel(tenantId)
  })
  it('Cadastrar aluno 2 - ' + attr.dados.nomeAluno2, () => {
    aluno.cadastrarAluno2(tenantId, `${suss}`)
  })    
  it('Liberar acesso do APP ao responsável', () => {
    aluno.consultaDeAlunoResponsavel(tenantId)
    aluno.acessoResponsavelApp()
  })
  it('Vincular Responsável Existente no aluno - alunoNome2', () => {
    aluno.vincularResponsavelAluno(tenantId)
  })
  it('Vínculo de tipos diferentes de responsável', () => {
    aluno.consultarAluno(tenantId)
    aluno.vinculoResponsavel()
  })
  it('Alocar Aluno 1', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.alocarAluno1(tenantId)
  })

  it('Imprimir Declaração de Transferência Simplificada', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.imprimirRelatorioDeclaracaoTransferenciaSimplificada(tenantId)
  })
  it('Imprimir Declaração de Transferência Com Notas', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.imprimirRelatorioDeclaracaoTransferenciaComNotas(tenantId)
  })

  it('Imprimir Declaração de Matrícula', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)    
    aluno.imprimirRelatorioComprovanteMatricula(tenantId)
  })
  it('Imprimir Declaração de Frequência', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)        
    aluno.imprimirRelatorioComprovanteFrequência(tenantId)
  })
  it('Imprimir Declaração de Pré-Matrícula', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioComprovantePreMatricula(tenantId)
  })
  it('Imprimir Ficha do Aluno', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaAluno(tenantId)
  })
  it('Imprimir Ficha Individual', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaIndividual(tenantId)
  })
  it('Imprimir Ficha Médica', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaMedica(tenantId)
  })
  it('Remanejar Aluno', () => {
    aluno.remanejarAluno(tenantId)
  })
  it('Reclassificar Aluno', () => {
    aluno.reclassificarAluno(tenantId)
  })
  it('Alocar Aluno 2', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.alocarAluno2(tenantId)
  }) 
  it('Criar Login Portal do Aluno', () => {
    aluno.loginAluno2(tenantId)
  })
  it('Busca Unificada - Por Nome', () => {
    aluno.buscaUnificadaNome(tenantId)
  })
  it('Busca Unificada - Por CPF', () => {
    aluno.buscaUnificadaCPF(tenantId)
  })
  // it('Busca Unificada - Por SUS', () => {
  //   aluno.buscaUnificadaSUS(tenantId, `${suss}`)
  // })
  it('Busca Unificada - Por RG', () => {
    aluno.buscaUnificadaRG(tenantId)
  })
  it('Busca Unificada - Por Matrícula', () => {
    aluno.buscaUnificadaMatric(tenantId)
  })
  it('Lançamento de Notas para Aluno1', () => {
    aluno.lancarNotasAluno1(tenantId)
  })
  it('Lançamento de Notas para Aluno2', () => {
    aluno.lancarNotasAluno2(tenantId)
  })
  it('Cadastrar aluno 3 - ' + attr.dados.nomeAluno3, () => {
    aluno.cadastrarAluno3(tenantId, `${suss}`)
  }) 
  it('Alocar Aluno 3', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.alocarAluno3(tenantId)
  })
  it('Lançamento de Notas para Aluno3', () => {
    aluno.lancarNotasAluno3(tenantId)
  })
  it('Calcular Resultado Final Turma ', () => {
    // aluno.atualizarAlunoAutenticado3(alunoId)  
    aluno.calcularResultadoFinalTurma(tenantId)
  })
  it('Processar Histórico para aluno 3', () => {
      // aluno.atualizarAlunoAutenticado(alunoId)
      aluno.processarHistorico(tenantId)
  })  
  it('Adicionar Histórico Manualmente para aluno 1', () => {
      // aluno.atualizarAlunoAutenticado(alunoId)
      aluno.adicionarHistorico(tenantId)
  })  
  it('Imprimir Histórico Ensino Fundamental (1º ao 9º)', () => {
      // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.imprimirHistoricoFundamental(tenantId)
  })
  it('Imprimir Histórico Todas as Séries', () => {
      // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.imprimirHistoricoTodasSeries(tenantId)
  })
  it('Desalocar Aluno 1 - Excluindo histórico', () => {
    aluno.desalocarAluno1(tenantId)
  })
  it('Desalocar Aluno 2 - Mantendo histórico', () => {
    aluno.desalocarAluno2(tenantId)
  })
})

describe('Validações de Movimentações de Matrículas', () => {
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
  it('Status Transferido', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaTransferido(tenantId)
  })
  it('Estornar Transferência', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Desistente', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaDesistente(tenantId)
  })
  it('Estornar Desistente', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Cancelado', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaCancelado(tenantId)
  })
  it('Estornar Cancelado', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Evadido', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaEvadido(tenantId)
  })
  it('Estornar Evadido', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })  
  it('Status Concluído', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaConcluido(tenantId)
  })
  it('Estornar Concluído', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })
  /*it('Status Falecido', () => {
    // aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.matriculaFalecido(tenantId)
  })
  it('Estornar Falecido', () => {
    aluno.atualizarAlunoAutenticado2(alunoId)
    aluno.estornar(tenantId)
  })*/
}) 

describe('Validações de Campos do Cadastro do Aluno', () => {
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

  it('Validar Campo Matrícula.', () => {      
    attr.camposDeValidacao.alunoMatric = ' ';
    aluno.validarCamposAluno(tenantId, 'Matricula é obrigatória.')
    attr.camposDeValidacao.alunoMatric = attr.dados.matricAlunoValidacao;
  })
  it('Validar Campo Nome.', () => {       
    attr.camposDeValidacao.alunoNome = ' ';
    aluno.validarCamposAluno(tenantId, 'Nome é obrigatório.')
    attr.camposDeValidacao.alunoNome = attr.dados.nomeAlunoValidacao;
  })  
  it('Validar Campo Transporte Escolar.', () => {       
    attr.camposDeValidacao.transporte = '';
    aluno.validarCamposAluno(tenantId, 'Utiliza transporte escolar é obrigatório.')
    attr.camposDeValidacao.transporte = 1;
  })  
  it('Validar Campo Ano Escolar de Entrada.', () => {    
    attr.camposDeValidacao.serie = '';   
    aluno.validarCamposAluno(tenantId, 'Serie de entrada é obrigatória para cadastro de aluno.')  
    attr.camposDeValidacao.serie = 1;  
  });
  it('Validar Campo Turno.', () => {    
    attr.camposDeValidacao.turno = '';   
    aluno.validarCamposAluno(tenantId, 'Turno entrada é obrigatório.')
    attr.camposDeValidacao.turno = 1;   
  }) 
  it('Validar Campo Escola.', () => {    
    attr.camposDeValidacao.escola = 'xxx';   
    aluno.validarCamposAluno(tenantId, 'Escola é obrigatória.')
    attr.camposDeValidacao.escola = 'Escola';   
  })
  it('Validar Campo Tipo Nacionalidade.', () => {    
    attr.camposDeValidacao.nacionalidade = '';   
    aluno.validarCamposAluno(tenantId, 'A nacionalidade é obrigatória.')
    attr.camposDeValidacao.nacionalidade = 1;   
  })
  it('Validar Campo UF de Naturalidade.', () => {    
    attr.camposDeValidacao.ufNaturalidade = ' ';   
    attr.camposDeValidacao.naturalidade = 'xxx';   
    aluno.validarCamposAluno(tenantId, 'A UF de naturalidade é obrigatória.')
    attr.camposDeValidacao.ufNaturalidade = 'GO';   
    attr.camposDeValidacao.naturalidade = 'Goiânia';   
  })
  it('Validar Campo Município de Naturalidade.', () => {    
    attr.camposDeValidacao.naturalidade = 'xxx';   
    aluno.validarCamposAluno(tenantId, 'O município de nascimento é obrigatório.')
    attr.camposDeValidacao.naturalidade = 'Goiânia';   
  })
  it('Validar Campo Data de Nascimento.', () => {    
    attr.camposDeValidacao.dataNasc = ' ';   
    aluno.validarCamposAluno(tenantId, 'Data de Nascimento é obrigatório.')
    attr.camposDeValidacao.dataNasc = '01012016';   
  })
  it('Validar Campo Sexo.', () => {    
    attr.camposDeValidacao.sexoAluno = '';   
    aluno.validarCamposAluno(tenantId, 'Sexo é obrigatório.')
    attr.camposDeValidacao.sexoAluno = 1;   
  })
  it('Validar Campo Raça.', () => {    
    attr.camposDeValidacao.raca = '';   
    aluno.validarCamposAluno(tenantId, 'A Cor/Raça é obrigatória.')
    attr.camposDeValidacao.raca = 1;   
  })
  it('Validar Campo CPF.', () => {    
    attr.camposDeValidacao.alunoCPF = ' ';   
    aluno.validarCamposAluno(tenantId, 'O CPF é obrigatório.')
    attr.camposDeValidacao.alunoCPF = attr.dados.cpfAlunoValidacao;   
  })
  it('Validar Campo CPF - Número Inválido.', () => {    
    attr.camposDeValidacao.alunoCPF = '123432165156151';   
    aluno.validarCamposAlunoCPF(tenantId, 'Informe um CPF válido.')
    attr.camposDeValidacao.alunoCPF = attr.dados.cpfAlunoValidacao;   
  })
  it('Validar Campo SUS - Número Inválido.', () => {    
    attr.camposDeValidacao.numSus = '123432165156151';   
    aluno.validarCamposAlunoSUS(tenantId, 'Informe um número SUS válido.')
    attr.camposDeValidacao.numSus = '874959850656979';   
  })
  it('Validar Campo CEP - CEP Inválido.', () => {    
    attr.camposDeValidacao.cep = '75748468';   
    aluno.validarCamposAlunoCEP(tenantId, 'Endereço não encontrado para o cep informado')
    attr.camposDeValidacao.cep = '74810180';   
  })
  it('Validar Campo Zona Residencial.', () => {    
    attr.camposDeValidacao.zona = '';   
    aluno.validarCamposAluno(tenantId, 'A localização/Zona de residência deve ser informada.')
    attr.camposDeValidacao.zona = 1;   
  })
  it('Validar Campo Localização Diferenciada de Residência.', () => {    
    attr.camposDeValidacao.locDifer = '';   
    aluno.validarCamposAluno(tenantId, 'A localização diferenciada de residência deve ser informada.')
    attr.camposDeValidacao.locDifer = 2;   
  })
  it('Validar Campo Turno.', () => {    
    attr.camposDeValidacao.turno = '';   
    aluno.validarCamposAluno(tenantId, 'Turno entrada é obrigatório.')
    attr.camposDeValidacao.turno = 1;   
  })
})