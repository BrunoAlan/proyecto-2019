var Fancy = require('fancygrid');
var grid
document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems);
});

// PATU LEE ESTO!!

// PARA USAR EL METODO, CAMBIAR DENTRO DEL MODULO
// EN node_modules -> require('./client/fancy.full.js');
// fancy.full.js está modificado por ALAN


generateGrid();

window.addEventListener('resize', () => {
  grid.destroy();
  generateGrid();
})


document.getElementById('btn').addEventListener('click', () => {
  const palabrasSeleccionadas = [];
  const selection = grid.getSelection();
  selection.forEach((element) => {
    // console.log(element.id)
    palabrasSeleccionadas.push(element.id);
  });


  selector = document.getElementById('mySelector');
  const tipoImagen = selector.M_FormSelect.input.value;

  if (palabrasSeleccionadas.length >= 2) {
    localStorage.setItem('configuracion', JSON.stringify({ palabras: palabrasSeleccionadas, tipo: tipoImagen }));
    console.log(JSON.stringify({ palabras: palabrasSeleccionadas, tipo: tipoImagen }));
    // console.log(JSON.stringify(palabrasSeleccionadas))
    location.href = 'denominacion4.html';
  } else {
    alert('Necesita seleccionar al menos dos palabras para trabajar');
  }
});

function generateGrid() {

  grid = new Fancy.Grid({
    renderTo: document.getElementById('wordsContainer'),
    theme: 'material',
    tbar: [{
      type: 'search',
      width: 350,
      emptyText: 'Buscar',
    }],
    height: (screen.height - 350),
    width: (screen.width),
    paging: {
      pageSize: 8,
      pageSizeData: [5, 10, 20, 50],

    },
    selModel: {
      type: 'rows',
      memory: true,
    },
    data: {
      proxy: {
        url: 'http://localhost:3000/palabras',
      },
    },
    columns: [{
      type: 'select',
      locked: true,
    }, {
      index: 'id',
      title: 'ID',
      type: 'number',
    }, {
      index: 'palabra',
      title: 'Palabra',
      type: 'string',
      flex: 1,
    }],
  });
}