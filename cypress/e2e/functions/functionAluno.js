import attr from '../../support/variaveis.js';
const funcao = require("../functions/function.js")
const faker = require('faker-br');

var alunoAutenticado;
var alunoAutenticado2;
var alunoAutenticado3;

module.exports = {
  cadastroEscola: function () {
    cy.get(attr.dados.menuCadastro).click()
    cy.get(attr.dados.menu2).contains('span', 'Escolas').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()
  },
  idAluno: function () {
    return alunoAutenticado;
  },
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  atualizarAlunoAutenticado: function (alunoId) {
    alunoAutenticado = alunoId
  },
  atualizarAlunoAutenticado2: function (alunoId2) {
    alunoAutenticado2 = alunoId2
  },
  atualizarAlunoAutenticado3: function (alunoId) {
    alunoAutenticado3 = alunoId
  },
  cadastrarAluno: function (tenantId, sus) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 30000 }).should('be.visible').type(attr.dados.matricAluno)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(attr.dados.nomeAluno)
    cy.get('#SerieEntradaId').select(1)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('escola {enter}')
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
    cy.get('#PessoaCPF').type(attr.dados.cpfAluno)
    cy.get('#Cracha').type(attr.dados.cracha)
    // cy.get('#NumeroNIS').type(nis)
    // cy.get('#NumeroSUS').type(sus)
    // cy.get('#CodigoInep').type(inep)
    // cy.get('#NumeroBolsaFamilia').type(sus)
    cy.get('#RG').type(attr.dados.rgAluno)
    cy.get('#RGDataEmissao').type('01012000')
    cy.get('#OrgaoExp').type('SSP')
    cy.get('#RGEstado').select(8)
    cy.get('#ComplementoRG').type('2ª VIA')
    cy.get('#NumeroPassaporte').type(attr.dados.passaporte)
    cy.get('#PessoaNumeroTituloEleitor').type(attr.dados.pessoaNumeroTituloEleitor)
    cy.get('#PessoaZonaEleitoral').type(attr.dados.pessoaZonaEleitoral.toString().substr(0,4))
    cy.get('#PessoaSecaoEleitoral').type(attr.dados.pessoaSecaoEleitoral)
    cy.get('#PessoaNumeroReservista').type(attr.dados.pessoaNumeroReservista)
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
    cy.get('#Pessoa_PessoaEndereco_Numero').type(attr.dados.numero)
    cy.get('#Pessoa_PessoaEndereco_Complemento').type(attr.dados.complemento)
    cy.get('#Latitude').type(attr.dados.latitude)
    cy.get('#Longitude').type(attr.dados.longitude)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#Pessoa_PessoaEndereco_TipoDeLogradouro').select(18)
    cy.get('#UnidadeConsumidora').type(attr.dados.unidadeConsumidora)
    cy.get('#tabAluno > :nth-child(4) > a').click()
    cy.get('#PessoaEmail').type('novoaluno@cypress.com')
    cy.get('#tabAluno > :nth-child(6) > a').click()    
    cy.get('#s2id_DadosSocioeconomicos_TipoMoradia > .select2-choice').type('Alvenaria{enter}')
    cy.get('#s2id_DadosSocioeconomicos_SituacaoMoradia > .select2-choice').type('Quitada{enter}')
    cy.get('#DadosSocioeconomicos_QtdFamiliaresMoramNaCasa').type('4')
    cy.get('#DadosSocioeconomicos_QtdFamiliaresCompoeRenda').type('2')
    cy.get('#s2id_DadosSocioeconomicos_RendaFamiliar > .select2-choice').type('Até 1{enter}')
    cy.get('#s2id_DadosSocioeconomicos_ListaDependenciaFisica > .select2-choices').type('Banheiro{enter}')
    cy.get('#s2id_DadosSocioeconomicos_ListaDispositivoAcessoInternet > .select2-choices').type('Celular{enter}')
    cy.get('#s2id_DadosSocioeconomicos_AcessoPrincipalInternet > .select2-choice').type('Fibra{enter}')
    cy.get('#s2id_DadosSocioeconomicos_ListaAbastecimentoAgua > .select2-choices').type('Rede Pública{enter}')
    cy.get('#s2id_DadosSocioeconomicos_ListaFonteEnergiaEletrica > .select2-choices').type('Rede Pública{enter}')
    cy.get('#s2id_DadosSocioeconomicos_ListaDestinacaoLixo > .select2-choices').type('Serviço de coleta{enter}')
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
  validarCamposAluno: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 30000 }).should('be.visible').type(attr.camposDeValidacao.alunoMatric)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(attr.camposDeValidacao.alunoNome)
    cy.get('#SerieEntradaId').select(attr.camposDeValidacao.serie)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(attr.camposDeValidacao.turno)
    cy.get('#UtilizaTransporteEscolar').select(attr.camposDeValidacao.transporte)
    cy.get('#s2id_EscolaId > .select2-choice').type(attr.camposDeValidacao.escola + '{enter}' + '{esc}')
    cy.get('#PessoaNacionalidade').select(attr.camposDeValidacao.nacionalidade)    
    cy.wait(1000)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type(attr.camposDeValidacao.ufNaturalidade + '{enter}'+ '{esc}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })        
    cy.request({
      method: 'GET',
      url: 'Colaborador/GetCidadesPorUf?uf=' + attr.camposDeValidacao.ufNaturalidade,
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.wait(1500)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type(attr.camposDeValidacao.naturalidade + '{enter}' + '{esc}')
    cy.get('#PessoaDataNascimento').type(attr.camposDeValidacao.dataNasc)
    cy.get('#PessoaSexo').select(attr.camposDeValidacao.sexoAluno)
    cy.get('#CorRaca').select(attr.camposDeValidacao.raca)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(attr.camposDeValidacao.alunoCPF)
    cy.get('#NumeroSUS').type(attr.camposDeValidacao.numSus)
    cy.get('#RG').type(attr.camposDeValidacao.alunoRg)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type(attr.camposDeValidacao.cep)
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
    cy.get('#Pessoa_PessoaEndereco_Zona').select(attr.camposDeValidacao.zona)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(attr.camposDeValidacao.locDifer)
    cy.get('#btnSubmit').click()
    cy.contains('.alert-danger','Verifique os dados informados', { timeout: 15000 }).should('be.visible')
    cy.contains(mensagem, { timeout: 15000 }).should('be.visible').click()    
  },
  validarCamposAlunoCPF: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(attr.camposDeValidacao.alunoCPF)
    cy.get('#CodigoInep').click()
    cy.get('.swal2-warning', { timeout: 15000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 15000 }).should('be.visible') 
  },
  validarCamposAlunoSUS: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#NumeroSUS').type(attr.camposDeValidacao.numSus)
    cy.get('#CodigoInep').click()
    cy.get('.swal2-warning', { timeout: 15000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 15000 }).should('be.visible') 
  },
  validarCamposAlunoCEP: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type(attr.camposDeValidacao.cep)
    cy.get('#btnBuscarCep > .fa').click()
    cy.get('.swal2-error', { timeout: 15000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 15000 }).should('be.visible') 
  },
  validarAluno: function (tenantId, sus) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.nomeAluno)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ attr.dados.nomeAluno +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest'      
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.contains('td', attr.dados.nomeAluno, { timeout: 20000 }).should('be.visible').click()
    // cy.contains('td', 'Elizaerte', { timeout: 20000 }).should('be.visible').click()    
    cy.get('#MatriculaEscola', { timeout: 20000 }).should('have.value', attr.dados.matricAluno)
    // cy.get('#MatriculaEscola', { timeout: 20000 }).should('have.value', '57570')
    cy.get('#PessoaNome', { timeout: 20000 }).should('have.value', attr.dados.nomeAluno)
    // cy.get('#PessoaNome').should('have.value', 'Escola Municipal de Jeosadaque (Cypress)')
    cy.get('#EscolaNomeFantasia', { timeout: 20000 }).should('contain.value','Escola Municipal de')
    cy.get('#PessoaNacionalidade', { timeout: 20000 }).should('have.value','0')
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice', { timeout: 20000 }).should('have.text', '   GO   ')    
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').should('have.text','   Aparecida de Goiânia   ')
    cy.get('#PessoaDataNascimento').should('have.value','01/01/2016')
    cy.get('#PessoaSexo').should('have.value','0')
    cy.get('#CorRaca').should('have.value','Branca')
    cy.get('#tabAluno > :nth-child(2) > a').click()    
    cy.get('#PessoaCPF').should('have.value', attr.dados.cpfAluno.substr(0, 3) + '.' + attr.dados.cpfAluno.substr(3, 3) + '.' + attr.dados.cpfAluno.substr(6, 3) + '-' + attr.dados.cpfAluno.substr(9, 2))
    // cy.get('#PessoaCPF').should('have.value','631.151.148-77')
    cy.get('#Cracha').should('have.value', attr.dados.cracha)
    // cy.get('#NumeroNIS').should('have.value', nis)
    // cy.get('#CodigoInep').should('have.value', inep)
    cy.get('#RG').should('have.value', attr.dados.rgAluno)
    cy.get('#RGDataEmissao').should('have.value','01/01/2000')
    cy.get('#OrgaoExp').should('have.value','SSP')
    cy.get('#RGEstado').should('have.value', '7')
    cy.get('#ComplementoRG').should('have.value','2ª VIA')
    cy.get('#NumeroPassaporte').should('have.value', attr.dados.passaporte)
    cy.get('#PessoaNumeroTituloEleitor').should('have.value', attr.dados.pessoaNumeroTituloEleitor)
    cy.get('#PessoaZonaEleitoral').should('have.value', attr.dados.pessoaZonaEleitoral.toString().substr(0,4))
    cy.get('#PessoaSecaoEleitoral').should('have.value', attr.dados.pessoaSecaoEleitoral)
    cy.get('#PessoaNumeroReservista').should('have.value', attr.dados.pessoaNumeroReservista)
    // cy.get('#NumeroSUS').should('have.value', sus)
    // cy.get('#NumeroSUS').should('have.value', '978936195455992')
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#s2id_Pessoa_PessoaEndereco_PaisId > .select2-choice').should('have.text', '   Brasil   ') 
    cy.get('#Pessoa_PessoaEndereco_Cep').should('have.value', '74.810-100')
    cy.get('#Pessoa_PessoaEndereco_Numero').should('have.value', attr.dados.numero)
    cy.get('#Pessoa_PessoaEndereco_Complemento').should('have.value', attr.dados.complemento)
    cy.get('#Latitude').should('have.value', attr.dados.latitude)
    cy.get('#Longitude').should('have.value', attr.dados.longitude)
    cy.get('#Pessoa_PessoaEndereco_TipoDeLogradouro').should('have.value', 17)
    cy.get('#Pessoa_PessoaEndereco_Zona').should('have.value', '1')
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').should('have.value', '0')
    cy.get('#UnidadeConsumidora').should('have.value', attr.dados.unidadeConsumidora)
    cy.get('#PessoaEmail').should('have.value','novoaluno@cypress.com')
    cy.get('#tabAluno > :nth-child(7) > a').click()   
    cy.get('#s2id_DadosSocioeconomicos_TipoMoradia > .select2-choice').should('have.text', '   Alvenaria   ')
    cy.get('#s2id_DadosSocioeconomicos_SituacaoMoradia > .select2-choice').should('have.text', '   Quitada (própria)   ')
    cy.get('#DadosSocioeconomicos_QtdFamiliaresMoramNaCasa').should('have.value', '4')
    cy.get('#DadosSocioeconomicos_QtdFamiliaresCompoeRenda').should('have.value', '2')
    cy.get('#s2id_DadosSocioeconomicos_RendaFamiliar > .select2-choice').should('have.text', '   Até 1 salário mínimo   ')
    cy.get('#s2id_DadosSocioeconomicos_ListaDependenciaFisica > .select2-choices').should('have.text', '      Banheiro(s)              ')
    cy.get('#s2id_DadosSocioeconomicos_ListaDispositivoAcessoInternet > .select2-choices').should('have.text', '      Celular              ')
    cy.get('#s2id_DadosSocioeconomicos_AcessoPrincipalInternet > .select2-choice').should('have.text', '   Fibra ótica   ')
    cy.get('#s2id_DadosSocioeconomicos_ListaAbastecimentoAgua > .select2-choices').should('have.text', '      Rede Pública              ')
    cy.get('#s2id_DadosSocioeconomicos_ListaFonteEnergiaEletrica > .select2-choices').should('have.text', '      Rede pública              ')
    cy.get('#s2id_DadosSocioeconomicos_ListaDestinacaoLixo > .select2-choices').should('have.text', '      Serviço de coleta              ')

  },  
  cadastrarResponsavelAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.get('#btnAddNovoResponsavel').click()
    cy.contains('Pessoa Responsável', { timeout: 30000 }).should('be.visible')
    cy.wait(500)
    cy.get('#Pessoa_CPF', { timeout: 30000 }).type(attr.dados.cpfResponsavel)
    cy.get('#Pessoa_DataNascimento').click()
    // cy.intercept('GET', '/Aluno/GetResponsavelCpf?cpf=' + cpfResponsavel).as('verificaResponsavel')
    // cy.wait('@verificaResponsavel', { timeout: 30000 })
    cy.request({
      method: 'GET',
      url: '/Aluno/GetResponsavelCpf?cpf=' + attr.dados.cpfResponsavel,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.wait(1000)
    cy.get('#Pessoa_DataNascimento').type('01/01/1989')
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click()
    cy.wait(300)
    cy.get('#Pessoa_Nome').type(attr.dados.nomeResponsavel)
    cy.get('#s2id_Pessoa_Sexo > .select2-choice').type('Não{enter}')
    cy.get('#s2id_NivelParentesco > .select2-choice').type('Tio{enter}')
    cy.get('#Pessoa_Celular').type('62999999999')
    cy.get(':nth-child(1) > .toggle > .toggle-group > .active').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.wait(1000)
    cy.contains('Sucesso', { timeout: 30000 }).click()
    cy.get('.swal2-confirm').click()
  },
  vincularResponsavelAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno2(alunoAutenticado2)
    cy.wait(1000)
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.wait(300)
    cy.get('.col > .btn-group > .dropdown-toggle').click()
    cy.get('#btnVincularNovoResponsavel').click()
    cy.get('#formVincularNovoResponsavel > fieldset > .row > .col > .label', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_Aluno > .select2-choice').type(attr.dados.nomeAluno)
    cy.get('tbody > tr > [valign="top"]', { timeout: 20000 }).should('be.visible').click()
    cy.get('#VincularResponsavel', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnVincular').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible')
  },
  consultarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.table', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.nomeAluno + '{enter}')
    cy.contains('td', attr.dados.nomeAluno, { timeout: 20000 }).should('be.visible')
  },
  consultaDeAlunoNome: function (tenantId) {
    this.consultaDeAluno(tenantId, attr.dados.nomeAluno)
  },
  consultaDeAlunoCPF: function (tenantId) {
    this.consultaDeAluno(tenantId, attr.dados.cpfAluno, attr.dados.nomeAluno)
  },
  consultaDeAlunoMatricula: function (tenantId) {
    this.consultaDeAluno(tenantId, attr.dados.matricAluno, attr.dados.nomeAluno)
  },
  consultaDeAlunoResponsavel: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Alunos', { timeout: 30000 }).should('be.visible')
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#btnFiltros').click()
    cy.get('#NomeResponsavel').type(attr.dados.nomeResponsavel)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22'+ attr.dados.nomeResponsavel +'%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm=&Matricula=&EscolaId=&TurmaId=&NomeResponsavel='+ attr.dados.nomeResponsavel +'&DataNascimento=&X-Requested-With=XMLHttpRequest'
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td', attr.dados.nomeAluno) 
        } else {   
          cy.log('Deu Ruim.');

        }
    });
  },
  consultaDeAluno: function (tenantId, pesquisa, nome) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#searchTerm').type(pesquisa)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ pesquisa +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest'      
    }).then((response) => {
      cy.wait(2000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td',nome) 
        } else {   
          cy.log('Deu Ruim.');
        }
    });
  },
  cadastrarAluno2: function (tenantId, suss) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 20000 }).should('be.visible').type(attr.dados.matricAluno2)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(attr.dados.nomeAluno2)
    cy.get('#SerieEntradaId').select(1)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('escola {enter}')
    cy.get('#UtilizaTransporteEscolar').select(1)
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    cy.wait(3000)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(attr.dados.cpfAluno2)
    cy.get('#NumeroSUS').type(suss.replace(',', ''))
    cy.get('#RG').type(attr.dados.rgAluno2)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor2 = $input.val();
        return valor2 !== '' && valor2 !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado2 = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado2)
      });
    });
  },
  cadastrarAluno3: function (tenantId, suss) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 20000 }).should('be.visible').type(attr.dados.matricAluno3)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(attr.dados.nomeAluno3)
    cy.get('#SerieEntradaId').select(3)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(3)
    cy.get('#s2id_EscolaId > .select2-choice').type('escola {enter}')
    cy.get('#UtilizaTransporteEscolar').select(1)
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    cy.wait(3000)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(attr.dados.cpfAluno3)
    cy.get('#NumeroSUS').type(suss.replace(',', ''))
    cy.get('#RG').type(attr.dados.rgAluno3)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor3 = $input.val();
        return valor3 !== '' && valor3 !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado3 = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado3)
      });
    });
  },
  loginAluno2: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.get('.table', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.nomeAluno2 + '{enter}')
    cy.contains('td', attr.dados.nomeAluno2, { timeout: 20000 }).should('be.visible').click()
    cy.contains('Editar Aluno', { timeout: 20000 }).should('be.visible')
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Usuário"]').click()
    cy.contains('Adicionar acesso ao Portal do Aluno', { timeout: 20000 }).should('be.visible')
    cy.get('#gerarLogin').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    cy.get('.swal2-confirm').click()
  },
  acessoResponsavelApp: function () {
    cy.contains('td', attr.dados.nomeAluno, { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabAluno > :nth-child(5) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('.btn-editar-responsavel > .fa').click()
    cy.contains('Pessoa Responsável', { timeout: 20000 }).should('be.visible').click()
    cy.get('[rel="popover-hover"] > .input > .toggle').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  loginResponsavel: function () {
    cy.get('#logout > span > a > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#bot2-Msg1').click()
    cy.get('#usuario', { timeout: 20000 }).should('be.visible').type(attr.dados.cpfResponsavel)
    cy.get('#senha').type(attr.dados.cpfResponsavel.substr(0, 5))
    cy.get('#btn-entrar').click()
    cy.get('small > strong', { timeout: 20000 }).should('be.visible')
  },
  vinculoResponsavel: function () {
    funcao.vinculeResponsavel(attr.dados.nomeAluno)
  },
  alocarAluno1: function (tenantId) {
    this.alocarAluno(tenantId,alunoAutenticado)
  },
  alocarAluno2: function (tenantId) {
    this.alocarAluno(tenantId,alunoAutenticado2)
  },
  alocarAluno3: function (tenantId) {
    this.alocarAluno(tenantId,alunoAutenticado3)
  },
  alocarAluno: function (tenantId, aluno) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(aluno)
    cy.get('#AlocarNaTurmaTurmaId', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#RecebeEscolarizacaoEmOutroEspaco', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#btnSubmit').click()
    cy.wait(1000)
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').clear().type(attr.dados.dataHoje)  
    cy.wait(300)
    cy.get('.jconfirm-icon-c > .fa').click()    
    cy.get('.jconfirm-buttons > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  imprimirRelatorioDeclaracaoTransferenciaSimplificada: function (tenantId) {
    this.matriculaTransferido(tenantId)    
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnDeclaracaoTransferencia').click()
    cy.get('#s2id_RelatorioSimplificado > .select2-choice').type('Simplific{enter}')
    cy.get('#btnPrintComprovanteTransferencia').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()
    cy.get('#btn_close_dialog_t').click()
    cy.get(':nth-child(11) > :nth-child(1) > :nth-child(2) > .btn > .fa').click()
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('.btnEstornar').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()  
  },
  imprimirRelatorioDeclaracaoTransferenciaComNotas: function (tenantId) {
    this.matriculaTransferido(tenantId)    
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnDeclaracaoTransferencia').click()
    cy.get('#s2id_RelatorioSimplificado > .select2-choice').type('notas{enter}')
    cy.get('#btnPrintComprovanteTransferencia').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()  
    cy.get('#btn_close_dialog_t').click()
    cy.get(':nth-child(11) > :nth-child(1) > :nth-child(2) > .btn > .fa').click()
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('.btnEstornar').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()  
  },
  imprimirRelatorioDeclaracaoDesistente: function (tenantId) {
    this.matriculaDesistente(tenantId)    
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnDeclaracaoDesistente').click()
    cy.contains('Imprimir Comprovante de Desistência', { timeout: 20000 }).should('be.visible')
    cy.get('#XComprovanteMatriculaResponsavelId').select(1)
    cy.get('#btnPrintComprovanteDesistente').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()  
    cy.get('#btn_close_dialog_x').click()
    cy.get(':nth-child(11) > :nth-child(1) > :nth-child(2) > .btn > .fa').click()
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('.btnEstornar').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()  
  },
  imprimirRelatorioComprovanteMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUp').click()
    cy.get('#dialogComprovanteMatricula > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovanteMatricula').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioComprovanteFrequência: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUpFrequencia').click()
    cy.get('#dialogComprovanteFrequencia', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovanteFrequencia').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()    
  },
  imprimirRelatorioComprovantePreMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUpPreMatricula').click()
    cy.get('#dialogComprovantePreMatricula', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovantePreMatricula').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirResumoDadosAluno').click()
    cy.get('#formParametroFichaDoAluno > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnImprimirFichaDoAluno > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaIndividual: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirFichaIndividual').click()
    // cy.get('#formParametroFichaIndividualDoAluno > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('.modal-footer > .btn-danger', { timeout: 20000 }).click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaMedica: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirFichaMedica').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  remanejarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.get('.input-group-btn > .dropdown-menu > :nth-child(1) > a').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', attr.dados.nomeAluno).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_transferiraluno').click()
    cy.contains('Turma de destino', { timeout: 20000 }).should('be.visible')
    cy.get('.select2-choice').type('1º ANO B{enter}')
    cy.get('#btnSalvarRemanejar').click()
    cy.contains('Sucesso', { timeout: 25000 }).should('be.visible').click()
  },
  reclassificarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.get('.input-group-btn > .dropdown-menu > :nth-child(1) > a').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', attr.dados.nomeAluno).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_transferiraluno').click()
    cy.contains('Turma de destino', { timeout: 20000 }).should('be.visible')
    cy.get('#dialog_trasferiraluno > [style="width:98%;"] > :nth-child(2) > .inline-group > :nth-child(2) > i').click()
    cy.wait(1500)
    cy.get('.select2-choice').type('2º ANO{enter}')
    cy.get('#btnSalvarRemanejar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },    
  matriculaTransferido: function (tenantId) {
       this.matriculas(tenantId, '1')
  },
  matriculaDesistente: function (tenantId) {
    this.matriculasSMot(tenantId, '2')
  },
  matriculaCancelado: function (tenantId) {
    this.matriculasSMot(tenantId, '3')
  },
  matriculaEvadido: function (tenantId) {
    this.matriculas(tenantId, '4')
  },
  matriculaFalecido: function (tenantId) {
    this.matriculasSMot(tenantId, '5')
  },
  matriculaConcluido: function (tenantId) {
    this.matriculasSMot(tenantId, '6')
  },
  matriculas: function (tenantId, tipo) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child('+ tipo +') > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.get('#s2id_Motivo > .select2-choice').type('DECIS{enter}')
    cy.get('fieldset > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculasSMot: function (tenantId, tipo) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child('+ tipo +') > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    // cy.get('#s2id_Motivo > .select2-choice').type('DECIS{enter}')
    // cy.get('fieldset > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  estornar: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get(':nth-child(11) > :nth-child(1) > :nth-child(2) > .btn > .fa').click()
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('.btnEstornar').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  buscaUnificada: function (tenantId, pesquisa) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuAluno).click()
    cy.get(attr.dados.menu2).contains('a', 'Busca Unificada').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(pesquisa)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', attr.dados.nomeAluno2).should('be.visible')
  },
  buscaUnificadaNome: function (tenantId) {
    this.buscaUnificada(tenantId,attr.dados.nomeAluno2)
  },
  buscaUnificadaCPF: function (tenantId) {
    this.buscaUnificada(tenantId,attr.dados.cpfAluno2)
  },
  buscaUnificadaSUS: function (tenantId, sus2) {
    this.buscaUnificada(tenantId,attr.dados.sus2)
  },
  buscaUnificadaRG: function (tenantId) {
    this.buscaUnificada(tenantId,attr.dados.rgAluno2)
  },
  buscaUnificadaMatric: function (tenantId) {
    this.buscaUnificada(tenantId,attr.dados.matricAluno2)
  },
  lancarNotasAluno1: function (tenantId) {
    this.lancarNotasAluno(tenantId, alunoAutenticado, attr.dados.nomeAluno, '9', '5')
  },
  lancarNotasAluno2: function (tenantId) {
    this.lancarNotasAluno(tenantId, alunoAutenticado2, attr.dados.nomeAluno2, '9', '5')
  },
  lancarNotasAluno3: function (tenantId) {
    this.lancarNotasAluno(tenantId, alunoAutenticado3, attr.dados.nomeAluno3, '8', '1')
  },
  lancarNotasAluno: function (tenantId, aluno, nome, notas, faltas) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(aluno)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('.input-group-btn > .dropdown-menu > :nth-child(1) > a').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', nome, { timeout: 20000 }).should('be.visible').click()
    cy.contains('Notas e Faltas', { timeout: 20000 }).should('be.visible')
    // cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.$('.notaPrimeiro, .notaSegundo, .notaTerceiro, .notaQuarto').text(notas).trigger('change'))
    cy.window().then(win => win.$('.faltaPrimeiro, .faltaSegundo, .faltaTerceiro, .faltaQuarto').text(faltas).trigger('change'))
    cy.get('#btnSubmitTable').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  adicionarHistorico: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Histórico"]').click();
    cy.contains('Editar Histórico Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#tabs > :nth-child(2) > a').click()
    cy.get('#tableSerieHistorico > tbody > .trEstatico > td > .pull-right > .addNovaLinha > .fa').click()
    cy.get('#AnoLetivo', { timeout: 20000 }).should('be.visible').type(attr.dados.anoLetivo)
    cy.get('#bodyHistorico').find('.form-group').find('#elSerieComp').select(1)
    cy.get('#bodyHistorico').find('.form-group').find('#elSeries').select(1)
    cy.get('#CargaHorariaTotal').type('200')
    cy.get('#PercentualFrequenciaEstudante').type('100,00')
    cy.get('#s2id_elEscola > .select2-choice').type('Escola Municipal{enter}')
    cy.wait(1000)
    cy.get('#DiaLetivo').type('232')
    cy.get('#Ordem').type('1')
    cy.get('#elResultado').select(1)
    cy.get('#botaoAdicionarHist').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('td', attr.dados.anoLetivo, { timeout: 20000 }).should('be.visible')
    cy.get('#tabs > :nth-child(3) > a').click()
    cy.get('#tableDisciplinaHistorico > tbody > .trEstatico > td > .pull-right > .addNovaLinha > .fa').click().click().click().click()

    cy.get(':nth-child(1) > :nth-child(4) > div > .input > .inputClass').type('PORT')
    cy.get(':nth-child(2) > :nth-child(4) > div > .input > .inputClass').type('MATE')
    cy.get(':nth-child(3) > :nth-child(4) > div > .input > .inputClass').type('HIST')
    cy.get(':nth-child(4) > :nth-child(4) > div > .input > .inputClass').type('GEOG')

    cy.get(':nth-child(1) > :nth-child(5) > div > .input > .inputClass').type('PORTUGUÊS')
    cy.get(':nth-child(2) > :nth-child(5) > div > .input > .inputClass').type('MATEMÁTICA')
    cy.get(':nth-child(3) > :nth-child(5) > div > .input > .inputClass').type('HISTÓRIA')
    cy.get(':nth-child(4) > :nth-child(5) > div > .input > .inputClass').type('GEOGRAFIA')

    cy.get('#btnDisciplinaHistorico').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'PORTUGUÊS', { timeout: 20000 }).should('be.visible')
    cy.wait(1500)
    cy.get('#tabs > :nth-child(4) > a').click()
    cy.contains('.tdEstastico','PORTUGUÊS').parent().find('.nota').type('8{enter}').parent().find('.cargaHoraria').type('200{enter}')
    cy.contains('.tdEstastico','MATEMÁTICA').parent().find('.nota').type('8{enter}').parent().find('.cargaHoraria').type('200{enter}')
    cy.contains('.tdEstastico','HISTÓRIA').parent().find('.nota').type('8{enter}').parent().find('.cargaHoraria').type('200{enter}')
    cy.contains('.tdEstastico','GEOGRAFIA').parent().find('.nota').type('8{enter}').parent().find('.cargaHoraria').type('200{enter}')
    cy.get('#btnNotaHistorico').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')    
  },
  processarHistorico: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    this.cadastroEscola()
    cy.get('#btnAutenticador > .fa').click()
    cy.get('[title="Unidade logada"] > small', { timeout: 35000 }).should('be.visible')
    funcao.autenticarCadastroAluno(alunoAutenticado3)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Histórico"]').click();
    cy.contains('Editar Histórico Escolar', { timeout: 20000 }).should('be.visible')   
    cy.contains('td', '3º ANO', { timeout: 20000 }).should('be.visible').parent().find('[type="checkbox"]').click()
    cy.get('#tab1 > fieldset > footer > .btn').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 15000 }).should('be.visible')    
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    // cy.wait(2000)
    cy.contains('td', 'Aprovado', { timeout: 20000 }).should('be.visible')
  },
  imprimirHistoricoFundamental: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Histórico"]').click();
    cy.contains('Editar Histórico Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#tabs > :nth-child(4) > a').click()
    cy.get('.btn-success').click()
    cy.contains('Imprimir Histórico Escolar', { timeout: 20000 }).should('be.visible')  
    cy.get('#botaoImprimirHistorico').click()
    cy.contains('Sucesso', { timeout: 15000 }).should('be.visible')    
  },
  imprimirHistoricoTodasSeries: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Histórico"]').click();
    cy.contains('Editar Histórico Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#tabs > :nth-child(4) > a').click()
    cy.get('.btn-success').click()
    cy.contains('Imprimir Histórico Escolar', { timeout: 20000 }).should('be.visible')  
    cy.get('#s2id_Tipo > .select2-choice').type('Todas{enter}')
    cy.get('#botaoImprimirHistorico').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')    
  },
  desalocarAluno1: function (tenantId) {
    this.desalocarAluno(tenantId, alunoAutenticado, attr.dados.nomeAluno, '1')
  },
  desalocarAluno2: function (tenantId) {
    this.desalocarAluno(tenantId, alunoAutenticado2, attr.dados.nomeAluno2, '2')
  },
  desalocarAluno: function (tenantId, aluno, nome, tipo) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(aluno)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.get('.input-group-btn > .dropdown-menu > :nth-child(1) > a').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nome).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_DesalocarAluno > .fa').click()
    cy.get('#dialog_desalocaAlunos > [style="width:98%;"] > :nth-child(2) > .inline-group > :nth-child('+ tipo + ') > i', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnSalvarDesaloca > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },  
  calcularResultadoFinalTurma: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado3)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.get('.input-group-btn > .dropdown-menu > :nth-child(1) > a').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#c4 > .btn').click()
    cy.get('#btn_resultadoFinal').click()
    cy.get('.swal2-popup', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
    cy.get('#tabTurma > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', attr.dados.nomeAluno3).should('be.visible').parent().find('td > span', 'Aprovado')

    
    // cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
}