const { defineConfig } = require("cypress");

var idTenant = "0";
var  idAluno1 = "0";
module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
      mochaFile: 'results/TEST-[hash].xml',
      toConsole: false    
  },
  env: {
    },        
    projectId: 'xxxx',
    recordKey: 'xxxxxxxxxxxxxxxxxx',
    video: false,
    // screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    e2e: {
      // numTestsKeptInMemory: 0,
      experimentalRunAllSpecs: true,
      // experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {      
      on('task',{
      salvaId(id) {
        idTenant = id
        return idTenant
        },
        getId() {
          return idTenant
        }
      })
      return config;    
    },
  },
  
})