const fs = require('fs');
const path = require('path');

const rutaPedidos = path.join(__dirname, '../data/pedidos.json');
const rutaProductos = path.join(__dirname, '../data/productos.json');

function leerJSON(ruta) {
  const data = fs.readFileSync(ruta, 'utf-8');
  return JSON.parse(data);
}

function leer() {
  return leerJSON(rutaPedidos);
}

function guardar(datos) {
  fs.writeFileSync(rutaPedidos, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer();

exports.listarConProductos = () => {
  const pedidos = leer();
  const productos = leerJSON(rutaProductos);
  
  return pedidos.map(pedido => {
    const productosEnriquecidos = pedido.productos.map(productoId => {
      const producto = productos.find(p => p.id === productoId);
      return producto ? producto : { id: productoId, nombre: 'Producto no encontrado' };
    });
    
    return {
      ...pedido,
      productos: productosEnriquecidos
    };
  });
};

exports.buscarPorId = (id) => {
  return leer().find(p => p.id === id);
};

exports.buscarPorIdConProductos = (id) => {
  const pedido = leer().find(p => p.id === id);
  if (!pedido) return null;
  
  const productos = leerJSON(rutaProductos);
  
  const productosEnriquecidos = pedido.productos.map(productoId => {
    const producto = productos.find(p => p.id === productoId);
    return producto ? producto : { id: productoId, nombre: 'Producto no encontrado' };
  });
  
  return {
    ...pedido,
    productos: productosEnriquecidos
  };
};

exports.crear = (nuevo) => {
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
  if (!nuevo.fecha) {
    nuevo.fecha = new Date().toISOString().split('T')[0];
  }
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  datos[index] = { ...datos[index], ...cambios, id };
  guardar(datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer();
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const eliminado = datos.splice(index, 1);
  guardar(datos);
  return eliminado[0];
};