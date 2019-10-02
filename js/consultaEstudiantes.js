var Fancy = require('fancygrid');
//PATU LEE ESTO!!

//PARA USAR EL METODO, CAMBIAR DENTRO DEL MODULO
//EN node_modules -> require('./client/fancy.full.js'); 
//fancy.full.js está modificado por ALAN

var grid = new Fancy.Grid({
  renderTo: document.getElementById('container'),
  theme: 'material',
  tbar: [{
    type: 'search',
    width: 350,
    emptyText: 'Buscar'
  }],
  height: (screen.height - 250),
  width: screen.width,
  paging: {
    pageSize: 20,
    pageSizeData: [5, 10, 20, 50]

  },
  selModel: {
    type: 'rows',
    memory: true
  },
  data: {
    proxy: {
      url: 'http://localhost:3000/estudiantes'
    }
  },
  columns: [{
    type: 'select',
    locked: true
  }, {
    index: 'id',
    title: 'ID',
    type: 'number'
  }, {
    index: 'nombre',
    title: 'Nombre',
    type: 'string',
    flex: 1

  }, {
    index: 'apellido',
    title: 'Apellido',
    type: 'string',
    flex: 1,
    sortable: true,
  }, {
    index: 'edad',
    title: 'Edad',
    type: 'number',

    sortable: true
  }, {
    index: 'descripcion',
    title: 'Descripcion',
    type: 'string',
    flex: 2,
  }]
});

document.getElementById("btn").addEventListener("click", () => {
  var selection = grid.getSelection();
  selection.forEach(element => {
    console.log(element.nombre)
  });
})
