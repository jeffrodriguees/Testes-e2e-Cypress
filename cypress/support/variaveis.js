const faker = require('faker-br');
const dataHoje = require('dayjs')

const dados = {
    dataHoje: dataHoje().format('DD/MM/YYYY'),
    dataHoraHoje: dataHoje().format('DD/MM/YYYY hh:mm a'),
    //------------MENU------------//
    menuEnsino: '#menu-gestao > :nth-child(2) > :nth-child(1) > .menu-item-parent',
    menuAluno: '#menu-gestao > :nth-child(3) > :nth-child(1) > .menu-item-parent',
    menuEscola: '#menu-gestao > :nth-child(4) > :nth-child(1) > .menu-item-parent',
    menuColaborador: '#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent',
    menuCadastro: '#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent',
    menuConfiguracoes: '#menu-gestao > :nth-child(9) > :nth-child(1) > .menu-item-parent',
    menu2: '[class="menu open"]',
    menu3: '[class="open"]',

    //------------URLS------------//
    urlHom: 'xxxxxxxxxxxxxxx',
    urlWeb: 'xxxxxxxxxxxxxxx',
    urlMat: 'xxxxxxxxxxxxxxx',

    //------------LOGIN------------//
    // idTenant: '161',
    idTenantx: "266",
    idTenantGyn: "107",
    usuario: 'xxxxxx',
    senha: 'xxxxxxxxx',

    //------------SISTEMA------------//
    tenant: 'Z Secretaria Municipal de' + " " + faker.name.firstName() + " " + '(Cypress)',
    tenantAlterado: 'ZSecretaria Municipal de' + " " + faker.name.firstName() + " " + '(Cypress)',
    escola: 'Escola Municipal de' + " " + faker.name.firstName() + " " + '(Cypress)',
    cidade: "xxxxxxxxxxx",
    cidadeAlterada: "Palmas",
    cep: "xxxxxxxxxxx",
    cepAlterado: "xxxxxxxxx",
    anoLetivo: "2024",
    cpfColaboradorGP: faker.br.cpf(),
    qtdHorasGP: '44',
    InicioPrimeiroBimestre: "0101",
    FimPrimeiroBimestre: "3103",
    InicioSegundoBimestre: "0104",
    FimSegundoBimestre: "3006",
    InicioTerceiroBimestre: "0107",
    FimTerceiroBimestre: "3009",
    InicioQuartoBimestre: "0110",
    FimQuartoBimestre: "3112",
    composicao: "FUNDAMENTAL I",
    composicaoAb: "FUNI",
    serie1: '1º ANO',
    serie2: '2º ANO',
    serie3: '3º ANO',
    serie4: '4º ANO',
    link: "'/escola'",
    telefone: faker.phone.phoneNumber(),

    //------------COLABORADOR------------//
    nomeColaborador: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfColaborador: faker.br.cpf(),
    nomeColaboradorValidacao: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfColaboradorValidacao: faker.br.cpf(),
    colaboradorNomeMae: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    colaboradorNomePai:faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    colaboradorApelido: "Apelido Colaborador",
    colaboradorRG: faker.random.number(),
    colaboradorCTPS: faker.random.number(),
    colaboradorSerie: faker.random.number(),
    colaboradorSecao: faker.random.number(),
    colaboradorZona: faker.random.number(),
    colaboradorNis: faker.random.number(),
    colaboradorCRN: faker.random.number(),
    colaboradorMatriculaContrato: faker.random.number(),
    colaboradorDataDeAdmissao: '02/02/2019',
    colaboradorObservacao: "Observação Colaborador",
    email: 'novocolaborador@cypress.com',
    

    //------------ALUNO------------//
    matricAluno: "2024" + faker.random.number(),
    nomeAluno: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfAluno: faker.br.cpf(),    
    rgAluno: faker.random.number() + faker.random.number(),

    matricAluno2: "2024" + faker.random.number(),
    nomeAluno2: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfAluno2: faker.br.cpf(),
    rgAluno2: faker.random.number() + faker.random.number(),

    matricAluno3: "2024" + faker.random.number(),
    nomeAluno3: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfAluno3: faker.br.cpf(),
    rgAluno3: faker.random.number() + faker.random.number(),

    cracha: faker.random.number(),
    inep: faker.random.number(),
    passaporte: faker.random.number(),
    pessoaNumeroTituloEleitor: faker.random.number(),
    pessoaZonaEleitoral: faker.random.number(),
    pessoaSecaoEleitoral: faker.random.number(),
    pessoaNumeroReservista: faker.random.number(),
    nomeAlunoValidacao: faker.name.lastName() + " " + faker.name.firstName() + " " + 'Cypress',
    cpfAlunoValidacao: faker.br.cpf(),
    matricAlunoValidacao: "2024" + faker.random.number(),    
    nomeResponsavel: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfResponsavel: faker.br.cpf(),
    numero: faker.random.number(),
    complemento: "Complemento do endereço.",
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    unidadeConsumidora: "546334815",

    //------------PROFESSOR------------//
    conteudoAplicado: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    conteudoAplicadoAlterado: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop ',    
    turma: '1º ANO B',
    //------------MATRÍCULA ONLINE------------//
    escolaMatricula: 'ARASAKA',
    escolaMatriculaVesp: 'STAR LABS',
    escolaMatriculaNot: 'HOGWARTS',
    bairroMatricula: 'CENTRO',

  };
var camposDeValidacao = {   
    alunoMatric:  "2024" + faker.random.number(), 
    alunoNome: faker.name.lastName() + " " + faker.name.firstName() + " " + 'Cypress',
    transporte: 1,
    serie: 1,
    turno: 1,
    escola: 'Escola',
    nacionalidade:  1,
    ufNaturalidade: 'GO',
    naturalidade: 'xxxxxxxxxxxxxx',
    dataNasc: '01012000',
    sexoAluno: 3,
    raca: 1,
    alunoCPF: faker.br.cpf(),
    numSus: '874959850656979',
    alunoRg: faker.random.number() + faker.random.number(),
    cep: 'xxxxxxxxxx',
    zona: 1,
    locDifer: 2,

    //Colaborador
    nomeColaborador: faker.name.firstName() + " " + faker.name.lastName() + " " + faker.name.lastName() + " " + 'Cypress',
    cpfColaborador: faker.br.cpf(),
    pessoaSexo: 3,
    localizacaoDiferenciada: 1,//
    email: 'novocolaborador@cypress.com',
    tituloEleitor: '266896071432',
    pis: "32134324156",
    nis: "32165416544",
    sus: "37851688542",
    campoTituloEleitor: '#TituloEleitorNumero',
    campoPIS: '#NumeroPisPasep',
    campoNIS: '#NumeroNIS',
    campoSUS: '#CartaoSusNumero',
  };
  
  module.exports = { dados, camposDeValidacao };