import attr from '../../support/variaveis.js';
const faker = require('faker-br');
const funcao = require("../functions/function.js")
const sistema = require("../funcoesSistema.js");

var tenantAutenticado;
var colaboradorAutenticado;
var contratoColaboradorAutenticado;
// const alunoAutenticado = '5049210'

module.exports = {     
  loginDeProfessor: function () {
    cy.viewport(1600, 900)
    cy.visit(attr.dados.urlHom)
    cy.get('#usuario').type(attr.dados.cpfColaborador)
    cy.get('#senha').type(attr.dados.cpfColaborador)
    cy.get('#btn-entrar').click()
    cy.get('#menu-gestao > :nth-child(1) > a', { timeout: 20000 }).should('be.visible')
  },
  nomeColaborador: function () {
    return nomeColaborador;
  },    
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  atualizarColaboradorAutenticado: function (colaboradorId) {
    colaboradorAutenticado = colaboradorId
  },
  cadastroDeColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-4.pull-right > button.btn').click()
    cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')
    cy.get('#PessoaNome').type(attr.dados.nomeColaborador)
    cy.get('#PessoaCPF').type(attr.dados.cpfColaborador)

    //aba de dados pessoais
    cy.get('#tabServidor > :nth-child(2) > a').click()
    cy.get('#NomeMae').type(attr.dados.colaboradorNomeMae)
    cy.get('#NomePai').type(attr.dados.colaboradorNomePai)
    cy.get('#PessoaDataNascimento').type('01/01/1999')
    cy.get('#PessoaSexo').select(3)
    cy.get('#EstadoCivil').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#Apelido').type(attr.dados.colaboradorApelido)
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

    //aba de Documentos
    cy.get('#tabServidor > :nth-child(3) > a').click()
    cy.get('#NumeroRG').type(attr.dados.colaboradorRG)
    cy.get('#DataRG').type('01012015{enter}')
    cy.get('#Rgssp').type('SSP')
    cy.get('#s2id_RGUf > .select2-choice').type('GO{enter}')
    cy.get('#CarteiraTrabalhoNumero').type(attr.dados.colaboradorCTPS)
    cy.get('#CarteiraTrabalhoSerie').type(attr.dados.colaboradorSerie)
    cy.get('#CarteiraTrabalhoDataEmissao').type('01012015{enter}')
    cy.get('#s2id_CarteiraTrabalhoUf > .select2-choice').type('GO{enter}')
    // cy.get('#TituloEleitorNumero').type(tituloEleitor)
    cy.get('#TituloEleitorSecao').type(attr.dados.colaboradorSecao)
    cy.get('#TituloEleitorZona').type(attr.dados.colaboradorZona.toString().substring(0,4))
    cy.get('#s2id_TituloEleitorUf > .select2-choice').type('GO{enter}')
    // cy.get('#NumeroPisPasep').type(pis)    
    // cy.get('#NumeroNIS').type(pis)
    // cy.get('#CartaoSusNumero').type(sus)
    cy.get('#CRN_Numero').type(attr.dados.colaboradorCRN)
    cy.get('#CRN_TipoProfissional').select(1)
    cy.get('#CRN_TipoInscricao').select(1)
    cy.get('#CRN_JurisdicaoRegional').select(1)

    //aba de Endereço//
    cy.get('#tabServidor > :nth-child(4) > a').click()
    cy.get('#PessoaPessoaEnderecoCep').type(attr.dados.cep)
    cy.get('#btnBuscarCep').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
    cy.contains('Informações de endereço do CEP obtidas com sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()

    // cy.get('#PessoaPessoaEnderecoZona', { timeout: 40000 }).should('not.be.disabled')
    cy.wait(2000)
    cy.get('#PessoaPessoaEnderecoZona').select(1)
    cy.get('#PessoaPessoaEnderecoLocalizacaoDiferenciada').select(1)
    cy.get('#PessoaPessoaEnderecoComplemento').type(attr.dados.complemento)
    cy.get('#PessoaPessoaEnderecoNumero').type(attr.dados.numero)
    cy.get('#PessoaPessoaEnderecoTipoDeLogradouro').select(18)

    //aba de Contato//
    cy.get('#tabServidor > :nth-child(5) > a').click()
    cy.get('#PessoaEmail').type(attr.dados.email)

    cy.get('#btn-submitFormColaborador').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible') 
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
  validarCamposColaborador: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-4.pull-right > button.btn').click()
    cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')
    cy.get('#PessoaNome').type(attr.camposDeValidacao.nomeColaborador)
    cy.get('#PessoaCPF').type(attr.camposDeValidacao.cpfColaborador)
    //aba de dados pessoais
    cy.get('#tabServidor > :nth-child(2) > a').click()
    cy.get('#PessoaDataNascimento').type(attr.camposDeValidacao.dataNasc)
    cy.get('#PessoaSexo').select(attr.camposDeValidacao.pessoaSexo)
    cy.get('#CorRaca').select(attr.camposDeValidacao.raca)
    cy.get('#PessoaNacionalidade').select(attr.camposDeValidacao.nacionalidade)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type(attr.camposDeValidacao.ufNaturalidade + '{enter}' + '{esc}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })
    cy.request({
      method: 'GET',
      url: '/Colaborador/GetCidadesPorUf?uf=' + attr.camposDeValidacao.ufNaturalidade,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type(attr.camposDeValidacao.naturalidade + '{enter}' + '{esc}')
    cy.get('#tabServidor > :nth-child(4) > a').click()
    cy.get('#PessoaPessoaEnderecoCep').type(attr.camposDeValidacao.cep)
    cy.get('#btnBuscarCep').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
    cy.contains('Informações de endereço do CEP obtidas com sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#PessoaPessoaEnderecoZona', { timeout: 40000 }).should('not.be.disabled')
    cy.wait(500)
    cy.get('#PessoaPessoaEnderecoZona').select(attr.camposDeValidacao.zona)
    cy.get('#PessoaPessoaEnderecoLocalizacaoDiferenciada').select(attr.camposDeValidacao.locDifer)
    cy.get('#tabServidor > :nth-child(5) > a').click()
    cy.get('#PessoaEmail').type(attr.camposDeValidacao.email)
    cy.get('#btn-submitFormColaborador').click()
    cy.contains('Verifique os dados informados', { timeout: 30000 }).should('be.visible')  
    cy.contains(mensagem, { timeout: 20000 }).should('be.visible')    
  },  
  validarCadastroColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)    
    cy.contains('Editar Colaborador', { timeout: 20000 }).should('be.visible')
    cy.get('#PessoaNome').should('have.value', attr.dados.nomeColaborador)    
    cy.get('#PessoaCPF').should('have.value', attr.dados.cpfColaborador.substring(0,3) +"." + attr.dados.cpfColaborador.substring(3,6) +"." + attr.dados.cpfColaborador.substring(6,9) +"-" + attr.dados.cpfColaborador.substring(9,11))

    //aba de dados pessoais
    cy.get('#tabServidor > :nth-child(2) > a').click()
    cy.get('#NomeMae').should('have.value', attr.dados.colaboradorNomeMae)
    cy.get('#NomePai').should('have.value', attr.dados.colaboradorNomePai)
    cy.get('#PessoaDataNascimento').should('have.value', '01/01/1999')
    cy.get('#PessoaSexo').should('have.value', "NaoInformado")
    cy.get('#EstadoCivil').should('have.value', "NaoEspecificado")
    cy.get('#CorRaca').should('have.value', "Branca")
    cy.get('#Apelido').should('have.value', attr.dados.colaboradorApelido)
    cy.get('#PessoaNacionalidade').should('have.value', "Brasileira")
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').should('have.text', '   GO   ')    
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').should('have.text', '   Aparecida de Goiânia   ')
    cy.get('#Observacao').should('have.value', attr.dados.colaboradorObservacao)
    //aba de Documentos
    cy.get('#tabServidor > :nth-child(3) > a').click()
    cy.get('#NumeroRG').should('have.value', attr.dados.colaboradorRG)
    cy.get('#DataRG').should('have.value', '01/01/2015')
    cy.get('#Rgssp').should('have.value', 'SSP')
    cy.get('#s2id_RGUf > .select2-choice').should('have.text', '   GO   ')
    cy.get('#CarteiraTrabalhoNumero').should('have.value',attr.dados.colaboradorCTPS)
    cy.get('#CarteiraTrabalhoSerie').should('have.value', attr.dados.colaboradorSerie)
    cy.get('#CarteiraTrabalhoDataEmissao').should('have.value', '01/01/2015')
    cy.get('#s2id_CarteiraTrabalhoUf > .select2-choice').should('have.text', '   GO   ')
    // cy.get('#TituloEleitorNumero').should('have.value', tituloEleitor.replace(".","").replace(".",""))
    cy.get('#TituloEleitorSecao').should('have.value', attr.dados.colaboradorSecao)
    cy.get('#TituloEleitorZona').should('have.value', attr.dados.colaboradorZona.toString().substring(0,4))
    cy.get('#s2id_TituloEleitorUf > .select2-choice').should('have.text', '   GO   ')
    // cy.get('#NumeroNIS').should('have.value', pis)
    // cy.get('#CartaoSusNumero').should('have.value', sus)
    cy.get('#CRN_Numero').should('have.value', attr.dados.colaboradorCRN)
    cy.get('#CRN_TipoProfissional').should('have.value', 'Nutricionista')
    cy.get('#CRN_TipoInscricao').should('have.value', 'Definitiva')
    cy.get('#CRN_JurisdicaoRegional').should('have.value', 'CRN_1')

    //aba de Endereço//
    cy.get('#tabServidor > :nth-child(4) > a').click()
    cy.get('#PessoaPessoaEnderecoCep').should('have.value', '74.810-180')
    cy.get('#PessoaPessoaEnderecoZona').should('have.value', 'Urbana')
    cy.get('#PessoaPessoaEnderecoLocalizacaoDiferenciada').should('have.value', 'NaoEstaEmAreaDeLocalizacaoDiferenciada')
    cy.get('#PessoaPessoaEnderecoComplemento').should('have.value',attr.dados.complemento)
    cy.get('#PessoaPessoaEnderecoNumero').should('have.value', attr.dados.numero)
    cy.get('#PessoaPessoaEnderecoTipoDeLogradouro').should('have.value', 'Avenida')

    //aba de Contato//
    cy.get('#tabServidor > :nth-child(5) > a').click()
    cy.get('#PessoaEmail').should('have.value', attr.dados.email)
  },
  validarCamposColaboradorCEP: function (tenantId, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-4.pull-right > button.btn').click()
    cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')    
    cy.get('#tabServidor > :nth-child(4) > a').click()
    cy.get('#PessoaPessoaEnderecoCep').type(attr.camposDeValidacao.cep)
    cy.get('#btnBuscarCep').click()
    cy.get('.swal2-error', { timeout: 30000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible') 
  },        
  validarCamposColaboradorInvalido: function (tenantId, campo, valor, mensagem) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-4.pull-right > button.btn').click()
    cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')    
    cy.get('#tabServidor > :nth-child(3) > a').click()    
    cy.get(campo).type(valor)
    cy.get('#TituloEleitorSecao').click()
    cy.get('.swal2-warning', { timeout: 30000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible') 
  },      
  consultaColaboradorNome: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.nomeColaborador)
    // cy.get('#searchTerm').type('Fernando')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          // cy.get('tbody > tr').find('td','Fernando') 
          cy.get('tbody > tr').find('td',attr.dados.nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
    });    
  },
  consultaColaboradorMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.colaboradorMatriculaContrato)
    // cy.get('#searchTerm').type('00000')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          // cy.get('tbody > tr').find('td','00000') 
          cy.get('tbody > tr').find('td', attr.dados.nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
    });    
  },
  consultaColaboradorCpf: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Cadastro').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(attr.dados.cpfColaborador)
    // cy.get('#searchTerm').type('00000')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => { 
        if (length <= 1) {
          cy.get('tbody > tr').find('td', attr.dados.nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
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
    cy.wait(800)
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor2 = $input.val();
        return valor2 !== '' && valor2 !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        contratoColaboradorAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + contratoColaboradorAutenticado)
      });
    });
  },
  afastarColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Professor', { timeout: 20000 }).click()
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#btn-afastar').click()
    cy.contains('Adicionar Afastamento', { timeout: 20000 }).should('be.visible')
    cy.get('.select2-choice').type('Ates{enter}')
    cy.get('#DataInicio').type('Cypress.io{enter}')
    cy.contains('span', 'Informação!', { timeout: 20000 }).should('be.visible')
    cy.contains('i', 'A Data Fim Prevista foi sugerida com base no prazo da justificativa.', { timeout: 20000 }).should('be.visible')
    cy.get('#form_afastamento > .smart-form > footer > .btn-primary').click()
    cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#formContratoDeTrabalho > footer > .btn-default').click()
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Afastado', { timeout: 20000 }).should('be.visible')
    cy.get('#tabServidor > :nth-child(8) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Atestado').parent().find('[class="removerAfastamentoColaborador"]').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('span', 'Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('i', 'Afastamento excluido com sucesso!', { timeout: 20000 }).should('be.visible')
  },
  rescindirContrato: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Professor', { timeout: 20000 }).click()
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_rescindir').click()
    cy.contains('Justificativa de Rescisão', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_JustificativaId > .select2-choice').type('Ates{enter}')
    cy.get('#ModalDataRescisao').click()
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').type('Cypress.io{enter}')
    cy.get('#botao_confirmar_rescisao').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('Contrato rescindido com sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#botao_estornar_rescisao').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('A rescisão do contrato foi estornada com sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  cadastrarDiretrizAdministrativa: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Diretriz Escolar').click()
    cy.get(attr.dados.menu3).contains('a', 'Administrativo').click()
    cy.contains('Consulta de Diretrizes', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-2 > .btn').click()
    cy.contains('Adicionar Diretriz', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc' + '{enter}')
    cy.get('#s2id_FuncaoId > .select2-choice').type('Diretor{enter}')
    cy.get('#QuantidadeHorasSemanais').type('44')
    cy.get('#QuantidadeDeVagas').type('1')
    cy.get('#form_diretriz > footer > .btn-primary').click()
    cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible')
  },  
  modulacaoAdministrativa: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Modulação Escolar').click()
    cy.get(attr.dados.menu3).contains('a', 'Administrativo').click()
    cy.get('.col-lg-2 > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Modulação Administrativo', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_DiretrizEscolaId > .select2-choice').type('Esc{enter}')
    cy.request({
      method: 'GET',
      url: '/ModulacaoColaborador/GetFuncoesPorDiretrizJson?escolaId=9836&funcaoId=&turnoId='
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.wait(500)
    cy.get('#s2id_DiretrizFuncaoId > .select2-choice').type('Diretor{enter}')
    cy.get('#btnCarregarVagas').click()
    cy.contains('td', '44', { timeout: 20000 }).should('be.visible').parent().find('[class="select"]').find('[class="select2-container select2 criterioDeAcesso"]').type('eleitoral{enter}')
    cy.get('.p-row > :nth-child(1) > .checkbox > i', { timeout: 20000 }).should('be.visible').click()
    cy.get('.select2-choices').type('Matu{enter}')
    cy.get('#btnDecretoPortaria').click()
    cy.get('.modal-title', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('#DecretoPortaria').type(faker.random.number())
    cy.get('#DecretoPortariaData').click().type('0101'+ attr.dados.anoLetivo)
    cy.get('#btnSalvarDecretoPortaria').click()
    cy.get('#s2id_ContratoDeTrabalhoNivelDoCargoCargoId > .select2-choice').type('Professor{enter}')
    cy.wait(7000)
    cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type(attr.dados.nomeColaborador + '{enter}')
    // cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type('Farley{enter}')
    cy.wait(3000)
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice').type('Professor{enter}')
    cy.get('#s2id_DepartamentoId > .select2-choice').type('Dire{enter}')
    cy.get('#DataInicio').click().type('Cypress.io{enter}')    
    cy.get('#btnModular').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  modulacaoMagisterio: function (tenantId) {
    const link = "'/modulacaoprofessor/editar'"
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Modulação Escolar').click()
    cy.get(attr.dados.menu3).contains('a', 'Magistério').click()
    cy.get('button[onclick="CarregarPaginaAjax('+ link + ')"]', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Modulação Magistério', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_AnoLetivoId > .select2-choice').type(attr.dados.anoLetivo + '{enter}')
    cy.get('#s2id_TipoDeModulacao > .select2-choice').type('Componente{enter}')
    cy.get('#s2id_TurmaEscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#btnCarregarCargosDisponiveis').click()
    cy.get('#s2id_ContratoDeTrabalhoCargoId > .select2-choice').type('Profe{enter}')
    cy.wait(4500)
    cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type(attr.dados.nomeColaborador +'{enter}')
    // cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type('Lorena{enter}')
    cy.wait(4500)
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice').type('Prof{enter}')
    cy.wait(4500)
    cy.get('#s2id_FuncaoId > .select2-choice').type('Prof{enter}')
    cy.get('#DataInicio').click().type('Cypress.io{enter}')
    cy.contains('td.p-descricao-turma', '1º ANO B', { timeout: 20000 }).should('be.visible').parent().find('[data-id]').find('[class="checkbox"]').click().parent().parent().find('[class="p-quantidade-aulas-assumidas somentenumerosmodulacao"]').clear().type('2')
    cy.contains('td.p-descricao-turma', '1º ANO', { timeout: 20000 }).should('be.visible').parent().find('[data-id]').find('[class="checkbox"]').click().parent().parent().find('[class="p-quantidade-aulas-assumidas somentenumerosmodulacao"]').clear().type('2')
    cy.get('#btnSalvarModular').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },  
  gerarFolha: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Ponto').click()
    cy.get(attr.dados.menu3).contains('a', 'Folha de ponto').click()
    cy.contains('Horário > Espelho', { timeout: 30000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#s2id_ColaboradorId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#s2id_ColaboradorId > .select2-choice').type(attr.dados.nomeColaborador +'{enter}')
    // cy.get('#s2id_ColaboradorId > .select2-choice').type('SAMIRA' +'{enter}')
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')    
    cy.get('#DataReferencia').click()
    cy.get('.datepicker-months > .table-condensed > tbody > tr > td > :nth-child(2)').click()
    cy.get('#DataInicial', { timeout: 20000 }).should('not.have.value','')
    cy.get('#btnVerificarHorario').click()
    cy.get('.table-hover', { timeout: 20000 }).should('be.visible')
  },  
  imprimirFolha: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get(attr.dados.menuColaborador).click()
    cy.get(attr.dados.menu2).contains('a', 'Ponto').click()
    cy.get(attr.dados.menu3).contains('a', 'Folha de ponto').click()
    cy.contains('Horário > Espelho', { timeout: 30000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#s2id_ColaboradorId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#s2id_ColaboradorId > .select2-choice').type(attr.dados.nomeColaborador +'{enter}')
    // cy.get('#s2id_ColaboradorId > .select2-choice').type('EDJANE' +'{enter}')
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#DataReferencia', { timeout: 20000 }).should('be.visible').click()
    cy.get('.datepicker-months > .table-condensed > tbody > tr > td > :nth-child(2)').click()
    cy.get('#DataInicial', { timeout: 20000 }).should('not.have.value','')
    // cy.get('#DataInicial', { timeout: 20000 }).should('have.value', (attr.dados.dataHoje))
    cy.get('#btnVerificarHorario', { timeout: 20000 }).should('be.visible').click()
    cy.get('.table-hover', { timeout: 20000 }).should('be.visible')
    cy.get('#btnImprimirHorario > .fa', { timeout: 20000 }).should('be.visible').click()
    // cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    // cy.readFile("c:\\Users\\Ponto ID\\Documents\\AUTOMAMENTO\\automamento\\cypress\\downloads\\FolhaDePonto_" + attr.dados.nomeColaborador + ".pdf", { timeout: 20000 }).should('exist')   
  },  
  criarLoginColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)   
    funcao.autenticarCadastroColaborador(colaboradorAutenticado) 
    cy.get(':nth-child(1) > .pull-right > .btn > .fa').click()
    cy.contains('Adicionar Usuário do Colaborador', { timeout: 20000 }).should('be.visible')
    cy.get('#Login').type(attr.dados.cpfColaborador)
    cy.get('#Senha').type(attr.dados.cpfColaborador)
    cy.get('#btnSalvar').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('Usuário criado.', { timeout: 20000 }).should('be.visible')
  },  
  loginColaborador: function () {    
    funcao.deslogarUsuario()
    cy.get('#usuario').type(attr.dados.cpfColaborador)
    cy.get('#senha').type(attr.dados.cpfColaborador)
    cy.get('#btn-entrar').click()
    cy.get('small > strong', { timeout: 20000 }).should('be.visible')
    cy.contains(attr.dados.nomeColaborador, { timeout: 20000 }).should('be.visible')
    // return cpfColaborador;
  },
  apagaDiretriz: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('.menu.open > :nth-child(2) > :nth-child(4) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()    
    cy.contains('Consulta de Diretrizes', { timeout: 20000 }).should('be.visible')
    cy.get('tbody > :nth-child(1) > :nth-child(4)').click()
    cy.contains('Editar Diretriz', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_excluir').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')    
  },      
}
