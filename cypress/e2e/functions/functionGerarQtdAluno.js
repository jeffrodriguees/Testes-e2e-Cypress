import attr from '../../support/variaveis.js';
const funcao = require("./function.js")
const faker = require('faker-br');

// var tenantId;
var alunoAutenticado;
var alunoAutenticado2;
var colaboradorAutenticado;
// const alunoAutenticado = '5049210'

module.exports = {
  idAluno: function () {
    return alunoAutenticado;
  },
  // nomeAluno: function () {
  //   return nomeAluno;
  // },
  // nomeAluno2: function () {
  //   return nomeAluno2;
  // },
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  atualizarAlunoAutenticado: function (alunoId) {
    alunoAutenticado = alunoId
  },
  atualizarAlunoAutenticado2: function (alunoId2) {
    alunoAutenticado2 = alunoId2
  },
  cadastrarAluno: function (tenantId) {
    const nomeAluno = faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName()
    const cpfAluno = faker.br.cpf()
    const matricAluno = attr.dados.anoLetivo + faker.random.number()
    const rgAluno = faker.random.number()
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 30000 }).should('be.visible').type(matricAluno)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(nomeAluno)
    cy.get('#SerieEntradaId').select(1)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('Wanderli{enter}')
    cy.get('#UtilizaTransporteEscolar').select(1)
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })        
    cy.request({
      method: 'GET',
      url: 'Colaborador/GetCidadesPorUf?uf=GO',
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.wait(1500)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(cpfAluno)
    cy.get('#RG').type(rgAluno)
    cy.get('#RGDataEmissao').type('01012000')
    cy.get('#OrgaoExp').type('SSP')
    cy.get('#RGEstado').select(8)
    cy.get('#ComplementoRG').type('2ª VIA')
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()       
    cy.intercept('GET','/Aluno/GetCidadesPorUf?uf=GO').as('cep')
    cy.wait('@cep', { timeout: 40000 })
    // cy.request({
    //   method: 'GET',
    //   url: '/Aluno/ObtenhaEnderecoPeloCep?cep=74.810-100',
    // }).then((response) => {
    //   expect(response.status).to.eq(200, { timeout: 30000 });
    //   cy.wrap(null)
    // });
    cy.get('.swal2-confirm', { timeout: 30000 }).should('be.visible').click()
    cy.wait(2000)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#tabAluno > :nth-child(4) > a').click()
    cy.get('#PessoaEmail').type('novoaluno@cypress.com')
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor = $input.val();
        return valor !== '' && valor !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado)
      });
    });
  },
  cadastrarResponsavelAluno: function (tenantId) {
    const nomeResponsavel = faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress'
    const cpfResponsavel = faker.br.cpf()
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.get('#btnAddNovoResponsavel').click()
    cy.contains('Pessoa Responsável', { timeout: 30000 }).should('be.visible')
    cy.get('#Pessoa_CPF').type(cpfResponsavel)
    cy.get('#Pessoa_DataNascimento').click()
    // cy.intercept('GET', '/Aluno/GetResponsavelCpf?cpf=' + cpfResponsavel).as('verificaResponsavel')
    // cy.wait('@verificaResponsavel', { timeout: 30000 })
    cy.request({
      method: 'GET',
      url: '/Aluno/GetResponsavelCpf?cpf=' + cpfResponsavel,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.wait(1000)
    cy.get('#Pessoa_DataNascimento').type('01/01/1989')
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click()
    cy.wait(300)
    cy.get('#Pessoa_Nome').type(nomeResponsavel)
    cy.get('#s2id_Pessoa_Sexo > .select2-choice').type('Não{enter}')
    cy.get('#s2id_NivelParentesco > .select2-choice').type('Tio{enter}')
    cy.get('#Pessoa_Celular').type('62999999999')
    cy.get(':nth-child(1) > .toggle > .toggle-group > .active').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.wait(1000)
    cy.contains('Sucesso', { timeout: 30000 }).click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('#tabAluno > :nth-child(5) > a').should('be.visible').click()
    cy.get('.btn-editar-responsavel > .fa').click()
    cy.contains('Pessoa Responsável', { timeout: 20000 }).should('be.visible').click()
    cy.get('[rel="popover-hover"] > .input > .toggle').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },  
  alocarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#AlocarNaTurmaTurmaId', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#RecebeEscolarizacaoEmOutroEspaco', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#btnSubmit').click()
    cy.wait(1000)
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').type(attr.dados.dataHoje.format('DD/MM/YYYY'))  
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').type(attr.dados.dataHoje.format('DD/MM/YYYY'))  
    cy.get('.jconfirm-buttons > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  //----------Lançamento de Notas em massa------------//
  cadastrarAlunoGyn: function (tenantId, nome, cpf) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()    
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(nome)
    cy.get('#SerieEntradaId').select(7)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('EM JALLES MACHADO DE SIQUEIRA{enter}')
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    cy.request({
      method: 'GET',
      url: 'Colaborador/GetCidadesPorUf?uf=GO',
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.wait(1500)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(cpf)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()       
    cy.intercept('GET','/Aluno/GetCidadesPorUf?uf=GO').as('cep')
    cy.wait('@cep', { timeout: 40000 })
    cy.get('.swal2-confirm', { timeout: 30000 }).should('be.visible').click()
    cy.wait(2000)
    
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#tabAluno > :nth-child(4) > a').click()
    cy.get('#PessoaEmail').type('novoaluno@cypress.com')    
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor = $input.val();
        return valor !== '' && valor !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado)
      });
    });    
  },
  alocarAlunoGyn: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAlunoGyn(alunoAutenticado)
    cy.get('#AlocarNaTurmaTurmaId', { timeout: 20000 }).should('be.visible').select(2)
    cy.get('#RecebeEscolarizacaoEmOutroEspaco', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#btnSubmit').click()
    cy.wait(1000)
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').click().type('Cypress.io{enter}')
    cy.get('.jconfirm-buttons > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  lancarNotasAlunoGyn: function (tenantId, nome) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAlunoGyn(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabTurma > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', nome, { timeout: 20000 }).should('be.visible').click()
    // cy.contains('td', 'Nancy Saraiva Saraiva Cypress', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Notas e Faltas', { timeout: 20000 }).should('be.visible')
    cy.get('.table-responsive > :nth-child(1) > tbody > tr').should('have.length', 16)
    // cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.$('.notaPrimeiro, .notaSegundo, .notaTerceiro, .notaQuarto').text('8').trigger('change'))
    cy.window().then(win => win.$('.faltaPrimeiro, .faltaSegundo, .faltaTerceiro, .faltaQuarto').text('5').trigger('change'))
    cy.get('#btnSubmitTable').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  verificarDuplicidadeDisciplinasGyn: function (tenantId, nome) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAlunoGyn(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabTurma > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', nome, { timeout: 20000 }).should('be.visible').click()
    // cy.contains('td', 'Nancy Saraiva Saraiva Cypress', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Notas e Faltas', { timeout: 20000 }).should('be.visible')    
    cy.get('.table-responsive > :nth-child(1) > tbody > tr').should('have.length', 16)    
  },
  lancarNotasComponentesGyn: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAlunoGyn(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()    
    this.lancaNotasComponentesGyn('LÍNGUA PORTUGUESA')
    this.lancaNotasComponentesGyn('LÍNGUA INGLESA')
    this.lancaNotasComponentesGyn('ARTE')
    // this.lancaNotasComponentesGyn('EDUCAÇÃO FÍSICA')
    // this.lancaNotasComponentesGyn('MATEMÁTICA')
    // this.lancaNotasComponentesGyn('CIÊNCIAS')
    // this.lancaNotasComponentesGyn('HISTÓRIA')
    // this.lancaNotasComponentesGyn('GEOGRAFIA')
    // this.lancaNotasComponentesGyn('ESTUDOS MATEMÁTICOS')
    // this.lancaNotasComponentesGyn('TUTORIA')
    // this.lancaNotasComponentesGyn('PRATICAS DE LEITURA')
    // this.lancaNotasComponentesGyn('PRATICAS DE ESCRITA')
    // this.lancaNotasComponentesGyn('PROJETOS COMPLEMENTARES I')
    // this.lancaNotasComponentesGyn('PROJETOS COMPLEMENTARES II')
    // this.lancaNotasComponentesGyn('PROJETOS COMPLEMENTARES III')
    // this.lancaNotasComponentesGyn('ABPI - APRENDIZAGEM BASEADA EM PROJETOS INOVADORES')
  },
  lancaNotasComponentesGyn: function (disciplina) {
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabTurma > :nth-child(4) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('[class="table table-bordered table-striped table-condensed table-hover smart-form table-row-link"]').find('tbody').find('tr').contains(disciplina).click()
    // cy.contains('tr', disciplina, { timeout: 20000 }).should('be.visible').click()
    // cy.contains('td', 'Nancy Saraiva Saraiva Cypress', { timeout: 20000 }).should('be.visible').click()
    cy.contains('h4', 'Notas', { timeout: 20000 }).should('be.visible')
    // cy.get('.table-responsive > :nth-child(1) > tbody > tr').should('have.length', 16)
    // cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.$('.notaPrimeiro, .notaSegundo, .notaTerceiro, .notaQuarto').text('9').trigger('change'))
    cy.get('#btnSubmitTable').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.get('.col-9 > .btn-default').click()
  },
    //------Lançamento de colaboradores em massa------//
  cadastroDeColaborador: function (tenantId, nome, cpf) {
      funcao.logarTenantAutenticado(tenantId)
      cy.get(attr.dados.menuColaborador).click()
      cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
      cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
      cy.get('.col-lg-4.pull-right > button.btn').click()
      cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')
      cy.get('#PessoaNome').type(nome)
      cy.get('#PessoaCPFFormatado').type(cpf)
  
      //aba de dados pessoais
      cy.get('#tabServidor > :nth-child(2) > a').click()
      cy.get('#PessoaDataNascimento').type('01/01/1999')
      cy.get('#PessoaSexo').select(3)
      cy.get('#EstadoCivil').select(1)
      cy.get('#CorRaca').select(1)
      cy.get('#PessoaNacionalidade').select(1)
      cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
      // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
      // cy.wait('@carregaCidades', { timeout: 40000 })
      cy.request({
        method: 'GET',
        url: '/Colaborador/GetCidadesPorUf?uf=GO',
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
      cy.get('#Observacao').type(attr.dados.colaboradorObservacao)
    
      //aba de Endereço//
      cy.get('#tabServidor > :nth-child(4) > a').click()
      cy.get('#PessoaPessoaEnderecoCep').type('74810100')
      cy.get('#btnBuscarCep').click()
      cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
      cy.contains('Informações de endereço do CEP obtidas com sucesso', { timeout: 20000 }).should('be.visible')
      cy.get('.swal2-confirm').click()
  
      cy.get('#PessoaPessoaEnderecoZona', { timeout: 40000 }).should('not.be.disabled')
      cy.wait(500)
      cy.get('#PessoaPessoaEnderecoZona').select(1)
      cy.get('#PessoaPessoaEnderecoLocalizacaoDiferenciada').select(1)
  
      //aba de Contato//
      cy.get('#tabServidor > :nth-child(5) > a').click()
      cy.get('#PessoaEmail').type("novocolaborador@cypress.com")
  
      cy.get('#btn-submitFormColaborador').click()
      cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible') 
      cy.get('#Id', { timeout: 20000 }).should('exist', { timeout: 50000})
      // this.verificarID()
      cy.waitUntil(() => {
        return cy.get('#Id').then(($input) => {
          const valor = $input.val();
          return valor !== '' && valor !== '0';
        });
      }, { timeout: 50000, interval: 1000 }).then(() => {
        cy.get('#Id').then(($input) => {
          colaboradorAutenticado = $input.val();
          cy.log('Deu Bão, ID: ' + colaboradorAutenticado)
        });
      });
  },
  cadastrarContratoColaborador: function (tenantId) {
      funcao.logarTenantAutenticado(tenantId)
      funcao.autenticarCadastroColaborador(colaboradorAutenticado)
      cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
      cy.get('td > .btn').click()
      cy.get(':nth-child(2) > :nth-child(4) > .label', { timeout: 20000 }).should('be.visible')
      cy.get('#Matricula').type(attr.dados.colaboradorMatriculaContrato)
      cy.get('#DataAdmissao').type(attr.dados.colaboradorDataDeAdmissao + '{enter}')
      cy.get('#s2id_NivelDoCargoCargoId > .select2-choice').type('Prof{enter}')
      cy.wait(2500)
      cy.get('#s2id_NivelDoCargoId > .select2-choice').type('1{enter}')
      cy.get('#s2id_TipoContratoDeTrabalho > .select2-choice').type('Contrato{enter}')
      cy.get('#s2id_HorarioContratoDeTrabalhoId > .select2-choice').type('Horário{enter}')
      cy.get('#QuantidadeHorasSemanais').type('44')
      cy.get('#QuantidadeAulasSemanais').type('20')
      cy.get('#btn-save').click()
      cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
      cy.contains('Contrato de trabalho foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
      cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()      
  },
  adicionarAlunoRota: function (tenantId) {
      funcao.logarTenantAutenticado(tenantId)
      cy.get('[title="Transporte escolar"] > .menu-item-parent').click()
      cy.get('[style="display: block;"] > :nth-child(4) > a').click()
      cy.contains('Consulta de Rotas', { timeout: 20000 }).should('be.visible')
      cy.contains('td', 'route').click()
      cy.contains('Editar Rota', { timeout: 20000 }).should('be.visible')
      Cypress._.times(52, () => {
      this.adicioneAlunoRota()
  })
  },
  adicioneAlunoRota: function () {
    cy.get('#tabRota > :nth-child(2) > a').click()
    cy.get('#s2id_AlunoId > .select2-choice').type('2{enter}')
    cy.get('#s2 > .row > .col.col-lg-2 > .btn').click()
    cy.contains('Dados do Aluno na Rota', { timeout: 20000 }).should('be.visible')
    cy.get('#DataEntrada').type('2711' + attr.dados.anoLetivo)
    cy.get('.modal-footer').click()
    cy.get('#addAluno').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.wait(1000)
},

}