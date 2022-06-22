var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Projeto CQL',
  description: 'Serviço do projeto CQL para servir paginas e realizar as buscas',
  script: require('path').join(__dirname,'server.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
//svc.uninstall();

svc.install();