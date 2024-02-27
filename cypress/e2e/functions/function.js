import attr from '../../support/variaveis.js';

module.exports = {

    loginDeUsuario: function () {
        cy.viewport(1600, 900)
        cy.visit(attr.dados.urlHom)
        cy.get('#usuario').type(attr.dados.usuario)
        cy.get('#senha').type(attr.dados.senha)
        cy.get('#btn-entrar').click()
        cy.get('#menu-gestao > :nth-child(1) > a', { timeout: 35000 }).should('be.visible')
    },
    loginDeProfessor: function () {
        cy.viewport(1600, 900)
        cy.visit(attr.dados.urlHom)
        // cy.get('#usuario').type('48609675505')
        // cy.get('#senha').type('48609675505')
        cy.get('#usuario').type(attr.dados.cpfColaborador)
        cy.get('#senha').type(attr.dados.cpfColaborador)
        cy.get('#btn-entrar').click()
        cy.get('#menu-gestao > :nth-child(1) > a', { timeout: 20000 }).should('be.visible')
    },
    loginDeUsuarioGP: function () {
        cy.viewport(1366, 720)
        cy.visit(attr.dados.urlWeb)
        cy.get('#usuario').type(attr.dados.usuario)
        cy.get('#senha').type(attr.dados.senha)
        cy.get('#btn-entrar').click()
        cy.get('#menu-gestao > :nth-child(2) > :nth-child(1)', { timeout: 20000 }).should('be.visible')
    }, 
    deslogarUsuario: function () {
        cy.get('#logout > span > a > .fa', { timeout: 20000 }).should('be.visible').click()
        cy.get('#bot2-Msg1').click()
        cy.get('#usuario', { timeout: 20000 }).should('be.visible')
    },   
    logarTenantAutenticado: function (tenantAutenticado) {
        cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Index'))
        cy.contains('Consulta de Secretaria', { timeout: 20000 }).should('be.visible')
        cy.window().then(win => win.autenticarTenant(tenantAutenticado))
        cy.get('small > strong', { timeout: 60000 }).should('be.visible')
    },
    logarTenantAutenticadoGP: function (tenantAutenticadoGP) {
        cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Index'))
        cy.contains('Consulta de Secretaria', { timeout: 20000 }).should('be.visible')
        cy.window().then(win => win.autenticarTenant(tenantAutenticadoGP))
        cy.wait(1000)
        cy.get('small > strong', { timeout: 20000 }).should('be.visible')
        // cy.wait(2000)
    },
    autenticarCadastroAluno: function (alunoAutenticado) {
        cy.window().then(win => win.CarregarPaginaAjax('/aluno/editar/' + alunoAutenticado))
        cy.contains('Editar Aluno', { timeout: 30000 }).should('be.visible')
    },
    autenticarCadastroAlunoGyn: function (alunoAutenticado) {
        cy.window().then(win => win.CarregarPaginaAjax('/aluno/editar/' + alunoAutenticado))
        cy.contains('Editar Estudante / Criança', { timeout: 30000 }).should('be.visible')
    },
    autenticarCadastroAluno2: function (alunoAutenticado2) {
        cy.window().then(win => win.CarregarPaginaAjax('/aluno/editar/' + alunoAutenticado2))
        cy.contains('Editar Aluno', { timeout: 20000 }).should('be.visible')
    },
    autenticarCadastroColaboradorGP: function (colaboradorAutenticadoGP) {
        cy.window().then(win => win.CarregarPaginaAjax('/colaborador/editar/' + colaboradorAutenticadoGP))
        cy.get('small > strong', { timeout: 20000 }).should('be.visible')
        cy.contains('Editar Colaborador', { timeout: 20000 }).should('be.visible')
    },
    autenticarCadastroColaborador: function (colaboradorAutenticado) {
        cy.window().then(win => win.CarregarPaginaAjax('/colaborador/editar/' + colaboradorAutenticado))
        cy.get('small > strong', { timeout: 20000 }).should('be.visible')
        cy.contains('Editar Colaborador', { timeout: 20000 }).should('be.visible')
    },
    autenticarContratoColaboradorGP: function (contratoColaboradorAutenticadoGP) {
        cy.window().then(win => win.CarregarPaginaAjax('/contratoDeTrabalho/Editar/' + contratoColaboradorAutenticadoGP))
        cy.get('small > strong', { timeout: 20000 }).should('be.visible')
        cy.contains('Unidade de Trabalho', { timeout: 20000 }).should('be.visible')
    },
    acessarMatriculaOnline: function () {
        cy.viewport(1366, 720)
        cy.visit(attr.dados.urlMat)
        cy.get('.dados-inicio > .row', { timeout: 35000 }).should('be.visible')
    },
    cadastrarAnosEscolares: function () {
        //IR ATÉ A TELA DE ADICIONAR ANOS ESCOLARES
        cy.get(attr.dados.menuCadastro).click()
        cy.get(attr.dados.menu2).contains('span', 'Ensino').click()
        cy.get(attr.dados.menu3).contains('a', 'Ano Escolar').click()
        cy.contains('Consulta de Ano Escolar', { timeout: 20000 }).should('be.visible')

        //Cadastrar 1º Ano
        this.cadastrarAnoEscolar('1º ANO', '1A', 'fundam', '14');

        //Cadastrar 2º Ano
        this.cadastrarAnoEscolar('2º ANO', '2A', 'fundam', '15');

        //Cadastrar 3º Ano
        this.cadastrarAnoEscolar('3º ANO', '3A', 'fundam', '16');

        //Cadastrar 4º Ano
        this.cadastrarAnoEscolar('4º ANO', '4A', 'fundam', '17');
    },
    cadastrarAnoEscolar: function (descricao, codigoParaTurma, composicao, etapa) {
        //ADICIONA OS ANOS ESCOLARES                   
        cy.contains('Adicionar').click()
        cy.get('#Nome', { timeout: 20000 }).should('be.visible').type(descricao)
        cy.get('#CodigoParaGeracaoDaTurma').type(codigoParaTurma)
        cy.get('#s2id_ComposicaoEnsinoId > .select2-choice').type(composicao + '{enter}')
        cy.request({
        method: 'GET',
        url: '/Serie/ObtenhaListaDeEtapaEnsino?modalidadeId=1',
        }).then((response) => {
        expect(response.status).to.eq(200, { timeout: 20000 });
        });
        cy.wait(2000)
        cy.get('#s2id_EtapaEnsinoId > .select2-choice').type(etapa + '{enter}')
        cy.get('#btnSubmit > .fa').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Consulta de Ano Escolar', { timeout: 20000 }).should('be.visible')
    },
    cadastrarComponentesCurriculares: function () {
        cy.get(attr.dados.menuCadastro).click()
        cy.get(attr.dados.menu2).contains('span', 'Ensino').click()
        cy.get(attr.dados.menu3).contains('a', 'Componentes').click()
        cy.contains('Consulta de Componentes', { timeout: 20000 }).should('be.visible')

        //Cadastrar PORTUGUÊS
        this.cadastrarComponenteCurricular('PORTUGUÊS', 'PORT', 'PORT01', 'literatura port');

        //Cadastrar MATEMÁTICA
        this.cadastrarComponenteCurricular('MATEMÁTICA', 'MAT', 'MAT01', 'mat');

        //Cadastrar HISTÓRIA
        this.cadastrarComponenteCurricular('HISTÓRIA', 'HIST', 'HIST01', 'hist');

        //Cadastrar GEOGRAFIA
        this.cadastrarComponenteCurricular('GEOGRAFIA', 'GEO', 'GEO01', 'geog');
    },
    cadastrarComponenteCurricular: function (descricao, abreviacao, codigoComp, compCurric) {
        cy.contains('Adicionar').click()
        cy.get('.col-6 > .input > #Nome', { timeout: 20000 }).should('be.visible').type(descricao)
        cy.get('#Abreviacao').type(abreviacao)
        cy.get('#Codigo').type(codigoComp)
        cy.get('#s2id_MateriaEscolar > .select2-choice').type('Comp{enter}')
        cy.wait(1500)
        cy.get('#s2id_ComponenteCurricularId > .select2-choice').type(compCurric + '{enter}')
        cy.get('#s2id_CargoId > .select2-choices > .select2-search-field').type('Prof{enter}')
        cy.get('#btn_salvar').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
        cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
        cy.get('#form_disciplina > footer > .btn-default > .fa').click()
        cy.contains('Consulta de Componentes', { timeout: 20000 }).should('be.visible')
    },
    adicionarAnosEscolaresComposicaodeEnsino: function () {
        cy.get(attr.dados.menuEnsino).click()
        cy.get(attr.dados.menu2).contains('a', 'Configurar Composição de Ensino').click()
        cy.get('#searchTerm', { timeout: 20000 }).should('be.visible').type('FUNDAMENTAL I')
        cy.contains('td', 'FUNDAMENTAL I', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Editar Configuração de Composição De Ensino', { timeout: 20000 }).should('be.visible')

        // Adicionar 1º Ano
        this.adicionarAnoEscolarComposicaodeEnsino('1', 'indivi', 'Nota', '2º ANO - FUNDAMEN');

        // Adicionar 2º Ano
        cy.wait(1000)
        this.adicionarAnoEscolarComposicaodeEnsino('2', 'indivi', 'Nota', '3º ANO - FUNDAMEN');

        //Adicionar 3º Ano
        cy.wait(1000)
        this.adicionarAnoEscolarComposicaodeEnsino('3', 'indivi', 'Nota', '4º ANO - FUNDAMEN');
    },
    adicionarAnoEscolarComposicaodeEnsino: function (anoEscolar, tipoDiario, formaAva, anoEscolarDest) {
        cy.get('#gridSerieComposicao > thead > :nth-child(1) > .text-align-center > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Adicionar Configuração de Ano Escolar da Composição De Ensino', { timeout: 20000 }).should('be.visible')
        cy.wait(1000)
        cy.get('#s2id_SerieId > .select2-choice', { timeout: 20000 }).should('be.visible').type(anoEscolar + '{enter}')
        cy.get('#s2id_TipoDiario > .select2-choice').type(tipoDiario + '{enter}')
        cy.get('#s2id_FormaAvaliacao > .select2-choice').type(formaAva + '{enter}')
        cy.get('#s2id_SerieDestinoId > .select2-choice').type(anoEscolarDest + '{enter}')
        cy.get(':nth-child(4) > .input > .toggle > .toggle-group > .active').click()
        cy.get('#formSerieComposicao > footer > .btn-primary').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
        cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
        cy.get('#btn_excluir', { timeout: 20000 }).should('be.visible')
        cy.get('#formSerieComposicao > footer > .btn-default > .fa', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Editar Configuração de Composição De Ensino', { timeout: 20000 }).should('be.visible')
    },
    configurarPlanoDeEnsino: function () {
        cy.get(attr.dados.menuEnsino).click()
        cy.get(attr.dados.menu2).contains('a', 'Configurar Composição de Ensino').click()
        cy.get('#searchTerm', { timeout: 20000 }).should('be.visible').type('FUNDAMENTAL I')
        cy.contains('td', 'FUNDAMENTAL I', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Editar Configuração de Composição De Ensino', { timeout: 20000 }).should('be.visible')
        cy.get('#tabComposicaoCalendario > :nth-child(3) > a').click()
        cy.wait(500)
        cy.get('#s2id_ConfiguracaoDoPlanoDeEnsinoPeriodicidade > .select2-choice').type('Definida{enter}')
        cy.get('[width="5%"] > .btn > .fa').click()
        cy.contains('Agrupador do Plano de Ensino', { timeout: 20000 }).should('be.visible')
        cy.get('#Descricao', { timeout: 20000 }).should('be.visible').type('Plano de Ensino')
        cy.get('.modal-footer > .btn-primary > .fa', { timeout: 20000 }).click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
        cy.get('.swal2-confirm').click()

        // Adicionar 1º Ano
        this.configurarPlanosDeEnsino('Descrição');

        // Adicionar 2º Ano
        cy.wait(1000)
        this.configurarPlanosDeEnsino('Conclusão');

        //Adicionar 3º Ano
        cy.wait(1000)
        this.configurarPlanosDeEnsino('Referências');
    },
    configurarPlanosDeEnsino: function (titulo) {   
        cy.get('#btnAdicionarItem > .fa').click()
        cy.contains('Item do Plano de Ensino', { timeout: 20000 }).should('be.visible')
        cy.get('#s2id_Tipo > .select2-choice').type('Outro{enter}')
        cy.get('#Titulo').type(titulo)
        cy.get('#TamanhoMaximoDoCampo').type('5000')
        cy.get('.modal-footer > .btn-primary > .fa').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
        cy.get('.swal2-confirm').click()
    },
    adicionarEstruturasCurriculares: function () {
        //IR ATÉ A TELA DE ADICIONAR ANOS ESCOLARES
        cy.get(attr.dados.menuEnsino).click()
        cy.get(attr.dados.menu2).contains('a', 'Configurar Composição de Ensino').click()
        cy.contains('Consulta de Configuração de Composição de Ensino', { timeout: 20000 }).should('be.visible')
        cy.get('#searchTerm').type('FUNDAMENTAL I')
        cy.contains('td', 'FUNDAMENTAL I', { timeout: 20000 }).should('be.visible').click()

        for (let i = 1; i <= 3; i++) {
            this.adicioneEstruturaCurricular(i + 'º ANO')
        }
    },
    adicioneEstruturaCurricular: function (serie) {
        cy.contains(serie).should('be.visible').click()
        cy.get('#tabSerieComposicao > :nth-child(2) > a', { timeout: 20000 }).should('be.visible').click()
        //Cadastrar PORTUGUÊS
        cy.wait(1000)
        this.adicionarEstruturaCurricular('PORT');
        // Cadastrar MATEMÁTICA
        cy.wait(1000)
        this.adicionarEstruturaCurricular('MATE');
        //Cadastrar HISTÓRIA
        cy.wait(1000)
        this.adicionarEstruturaCurricular('HIST');
        //Cadastrar GEOGRAFIA
        cy.wait(1000)
        this.adicionarEstruturaCurricular('GEOG');

        cy.get('#formSerieComposicao > footer > .btn-default > .fa').click()
    },
    adicionarEstruturaCurricular: function (disciplina) {
        cy.get('#btn-add-grade > .fa', { timeout: 20000 }).should('be.visible').click()
        cy.wait(500)
        cy.get('#s2id_DisciplinaId > .select2-choice', { timeout: 20000 }).should('be.visible').type(disciplina + '{enter}')
        cy.get('#QuantidadeAulasSemanais').type('5')
        cy.get('.modal-footer > .btn-primary').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
        cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    },
    adicioneTurno: function () {
        cy.get('tbody > :nth-child(1) > :nth-child(3)', { timeout: 20000 }).should('be.visible').click()
        this.adicionarTurnos()
    },
    adicionarTurnos: function () {
        //Adicionar MATUTINO
        this.adicionarTurno('0700', '1200', '0630', '1130', '0730', '1230', '0830', '40');

        //Adicionar VESPERTINO
        this.adicionarTurno('1300', '1700', '1230', '1630', '1330', '1730', '1430', '40');

        // //Adicionar NOTURNO
        this.adicionarTurno('1900', '2300', '1830', '2230', '1930', '2330', '2030', '40');

    },
    adicionarTurno: function (entrada, saida, entAntec, saidaAntec, entToler, saidaToler, horaMax, porcentMax) {
        cy.get('#tabEscola > :nth-child(4) > a', { timeout: 20000 }).should('be.visible').click()
        cy.get('#tabTurnos > fieldset > footer > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
        cy.get('#TurnoEnum', { timeout: 20000 }).should('be.visible').select(1)
        cy.get('#Entrada').type(entrada)
        cy.get('#Saida').type(saida)
        cy.get('#EntradaAntecipacao').type(entAntec)
        cy.get('#SaidaAntecipacao').type(saidaAntec)
        cy.get('#EntradaTolerancia').type(entToler)
        cy.get('#SaidaTolerancia').type(saidaToler)
        cy.get('#HoraMaximaMensagem').type(horaMax)
        cy.get('#PorcentagemMaximaFaltas').type(porcentMax)
        cy.get('#formturno > footer > .btn-primary > .fa').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
        cy.contains('Editar Unidade Escolar', { timeout: 30000 }).should('be.visible')
    },
    adicioneTurma: function () {
        cy.get(attr.dados.menuEscola).click()
        cy.get(attr.dados.menu2).contains('span', 'Turma').click()
        cy.get(attr.dados.menu3).contains('a', 'Cadastro').click()
        cy.contains('Consulta de Turmas', { timeout: 20000 }).should('be.visible')

        this.adicionarTurmas()
    },
    adicionarTurmas: function () {
        // Adicionar MATUTINO
        this.adicionarTurma('Esc', attr.dados.anoLetivo, attr.dados.anoLetivo, 'FUNDAM', '1º ANO', 1, '1º ANO', 1, 1, 'não', '2000');

        // Adicionar MATUTINO
        this.adicionarTurma('Esc', attr.dados.anoLetivo, attr.dados.anoLetivo, 'FUNDAM', '1º ANO', 1, '1º ANO B', 1, 1, 'não', '2000');

        //Adicionar VESPERTINO
        cy.wait(1000)
        this.adicionarTurma('ESC', attr.dados.anoLetivo, attr.dados.anoLetivo, 'FUNDAM', '2º ANO', 2, '2º ANO', 2, 1, 'não', '2000');
       
        //Adicionar NOTURNO
        cy.wait(1000)
        this.adicionarTurma('ESC', attr.dados.anoLetivo, attr.dados.anoLetivo, 'FUNDAM', '3º ANO', 3, '3º ANO', 3, 1, 'não', '2000');
    },
    adicionarTurma: function (escolaTur, anoLetTur, calendTur, ComposiTur, anoEscTur, TurnoTur, DescTur, altColTur, mediaçTur, localDifTur, cargaHorTur) {
        cy.get('.col-lg-4.col-md-2 > .btn-group > .btn', { timeout: 20000 }).should('be.visible').click()
        cy.get('.btn-group > .dropdown-menu > :nth-child(1) > a', { timeout: 20000 }).should('be.visible').click()
        // cy.get('#s2id_EscolaId > .select2-choice').click()
        cy.contains('Adicionar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
        cy.get('#s2id_EscolaId > .select2-choice').type(escolaTur + '{enter}')     
        cy.get('#s2id_SerieComposicao_ComposicaoCalendario_CalendarioEscolar_AnoLetivoId > .select2-choice').type(anoLetTur + '{enter}')
        cy.wait(9000)
        cy.get('#s2id_SerieComposicao_ComposicaoCalendario_CalendarioEscolarId > .select2-choice').type(calendTur + '{enter}')
        cy.wait(9000)
        cy.get('#s2id_SerieComposicao_ComposicaoCalendarioId > .select2-choice').type(ComposiTur + '{enter}')
        cy.wait(9000)
        cy.get('#s2id_SerieComposicaoId > .select2-choice').type(anoEscTur + '{enter}')
        cy.wait(800)
        cy.get('#CapacidadeMaxima').clear().type('30')
        cy.wait(500)
        cy.get('#Turno').select(TurnoTur)
        cy.wait(8000)
        cy.get('#Descricao').type(DescTur)
        cy.wait(500)
        cy.get('#AlturaColetor').select(altColTur)
        cy.wait(1000)
        cy.get('#TipoMediacaoDidaticoPedagogica').select(mediaçTur)
        cy.wait(1000)
        cy.get('#s2id_LocalDeFuncionamentoDiferenciadoDaTurma > .select2-choice').type(localDifTur + '{enter}')
        cy.wait(1000)
        cy.get('#CargaHoraria').type(cargaHorTur)
        cy.wait(300)
        cy.get('#s2id_FormaDeOrganizacaoId > .select2-choice').type('Série{enter}')
        cy.get('#btnSubmitTurma > .fa').click()
        cy.wait(1000)
        cy.contains('Sucesso').click()
        cy.get('.swal2-confirm').click()
        cy.get('#btn_excluir', { timeout: 20000 }).should('be.visible')
        cy.get(':nth-child(12) > .btn-default', { timeout: 20000 }).should('be.visible').click()
        cy.contains('Consulta de Turmas', { timeout: 20000 }).should('be.visible')
    },
    horarioAula: function () {
        cy.get(attr.dados.menuEscola).click()
        cy.get(attr.dados.menu2).contains('span', 'Turma').click()
        cy.get(attr.dados.menu3).contains('a', 'Cadastro').click()
        cy.contains('Consulta de Turmas', { timeout: 20000 }).should('be.visible')

        this.adicioneHorarioAula()
    },
    adicioneHorarioAula: function () {
        this.adicionarHorarioAulaMesmaDuracao('1º ANO B');  
        this.adicionarHorarioAulaDuracaoDiferente('2º ANO');   
         
    },
    adicionarHorarioAulaMesmaDuracao: function (turma1) {
        cy.contains('td', turma1).click()
        cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
        cy.get('button.btn-expand > i.fa.fa-clock-o').click();
        cy.get('.row > :nth-child(2) > .btn', { timeout: 20000 }).should('be.visible').click()
        cy.get('#btn_adicionar_vigencia').click()
        cy.contains('Cadastrar nova vigência de horário', { timeout: 20000 }).should('be.visible')
        cy.get('#s2id_HDiasSemana > .select2-choices').type('SEG{enter}').type('TER{enter}').type('QUA{enter}').type('QUI{enter}').type('SEX{enter}')
        cy.get('#HQtdAulas').type('4')        
        cy.get('#HDuracao').type('60')
        cy.get('#HInicioAula').type('0700')
        cy.get('#s2id_HAulaIntervalos > .select2-choices').type('2ª aula{enter}')
        cy.get('.btn-success').click()
        cy.get('#HDintervalo_2').type('10')
        cy.get('.btn-success').click()
        cy.contains('Disciplinas - Configuração', { timeout: 20000 }).should('be.visible')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .1_disciplina').select(1)

        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .2_disciplina').select(2)

        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .3_disciplina').select(3)

        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .4_disciplina').select(4)

        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .5_disciplina').select(1)
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .5_disciplina').select(2)
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .5_disciplina').select(3)
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .5_disciplina').select(4)

        cy.get('.btn-success').click()
        cy.contains('Vigência - Configuração', { timeout: 20000 }).should('be.visible')
        cy.get('.btn-success').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
        cy.get('.swal2-confirm').click()
    },
    adicionarHorarioAulaDuracaoDiferente: function (turma1) {
        cy.get('.open > ul > :nth-child(1) > .menu-2', { timeout: 20000 }).should('be.visible').click()

        cy.contains('td', turma1).should('be.visible').click()
        cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
        cy.get('button.btn-expand > i.fa.fa-clock-o').click();

        cy.get('.row > :nth-child(2) > .btn', { timeout: 20000 }).should('be.visible').click({force: true})
        cy.get('#btn_adicionar_vigencia').click()
        cy.contains('Cadastrar nova vigência de horário', { timeout: 20000 }).should('be.visible')
        cy.get('#s2id_HDiasSemana > .select2-choices').type('SEG{enter}').type('TER{enter}').type('QUA{enter}').type('QUI{enter}').type('SEX{enter}')
        cy.get('#s2id_HTipoAula > .select2-choice').type('dife{enter}')
        cy.get('#HQtdAulas').type('4')      
        cy.get('#HInicioAula').type('1300')
        cy.get('#s2id_HAulaIntervalos > .select2-choices').type('2ª aula{enter}')
        cy.get('.btn-success').click()
        cy.get('#HDintervalo_2').type('10')
        cy.get('.btn-success').click()
        cy.contains('Disciplinas - Configuração', { timeout: 20000 }).should('be.visible')
        
        cy.get('#FinalAula_1_1').type('1400')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .1_disciplina').select(1)        
        cy.get('#FinalAula_1_2').type('1500')
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        cy.get('#FinalAula_1_3').type('1600')        
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        cy.get('#FinalAula_1_4').type('1700')        
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .1_disciplina').select(1)
        
        cy.wait(700)
        cy.get('#FinalAula_2_1').type('1400')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('#FinalAula_2_2').type('1500')
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('#FinalAula_2_3').type('1600')
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .2_disciplina').select(2)
        cy.get('#FinalAula_2_4').type('1700')
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .2_disciplina').select(2)

        cy.wait(700)
        cy.get('#FinalAula_3_1').type('1400')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('#FinalAula_3_2').type('1500')
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('#FinalAula_3_3').type('1600')
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .3_disciplina').select(3)
        cy.get('#FinalAula_3_4').type('1700')
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .3_disciplina').select(3)

        cy.wait(700)
        cy.get('#FinalAula_4_1').type('1400')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('#FinalAula_4_2').type('1500')
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('#FinalAula_4_3').type('1600')
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .4_disciplina').select(4)
        cy.get('#FinalAula_4_4').type('1700')
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .4_disciplina').select(4)

        cy.wait(700)
        cy.get('#FinalAula_5_1').type('1400')
        cy.get('[data-aula="1"] > .recipiente-pagina > .select > .5_disciplina').select(1)
        cy.get('#FinalAula_5_2').type('1500')
        cy.get('[data-aula="2"] > .recipiente-pagina > .select > .5_disciplina').select(2)
        cy.get('#FinalAula_5_3').type('1600')
        cy.get('[data-aula="3"] > .recipiente-pagina > .select > .5_disciplina').select(3)
        cy.get('#FinalAula_5_4').type('1700')
        cy.get('[data-aula="4"] > .recipiente-pagina > .select > .5_disciplina').select(4)

        cy.get('.btn-success').click()
        cy.contains('Vigência - Configuração', { timeout: 20000 }).should('be.visible')
        cy.get('.btn-success').click()
        cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
        cy.get('.swal2-confirm').click()
    },
    vinculeResponsavel: function (nomeAluno) {
        cy.contains('td', nomeAluno).should('be.visible').click()
        cy.get('#tabAluno > :nth-child(5) > a', { timeout: 20000 }).should('be.visible').click()

        this.vincularResponsaveis()
    },
    vincularResponsaveis: function () {
        //Adicionar MATUTINO
        this.vincularResponsavel('Mãe');

        //Adicionar VESPERTINO
        cy.wait(1000)
        this.vincularResponsavel('Pai');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Primo');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Avô');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Cunhado');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Irmão');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Madrasta');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Padrasto');

        //Adicionar NOTURNO
        cy.wait(1000)
        this.vincularResponsavel('Conjugê');
    },
    vincularResponsavel: function (nivel) {
        cy.get('.btn-editar-responsavel > .fa').click()
        cy.contains('Pessoa Responsável', { timeout: 20000 }).should('be.visible').click()
        cy.get('#s2id_NivelParentesco > .select2-choice')
        cy.get('#s2id_NivelParentesco > .select2-choice').type(nivel + '{enter}')
        cy.get('#btn-addnovoresponsavel').click()
        cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    }
}