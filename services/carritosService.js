const fs = require('fs');
const path = require('path');

const rutaCarritos = path.join(__dirname, '../data/carritos.json');
const rutaProductos = path.join(__dirname, '../data/productos.json');

function leerJSON(ruta) {
  const data = fs.readFileSync(ruta, 'utf-8');
  return JSON.parse(data);
}

function leer() {
  return leerJSON(rutaCarritos);
}

function guardar(datos) {
  fs.writeFileSync(rutaCarritos, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer();

exports.listarConProductos = () => {
  const carritos = leer();
  const productos = leerJSON(rutaProductos);
  
  return carritos.map(carrito => {
    const productosEnriquecidos = carrito.productos.map(productoId => {
      const producto = productos.find(p => p.id === productoId);
      return producto ? producto : { id: productoId, nombre: 'Producto no encontrado' };
    });
    
    return {
      ...carrito,
      productos: productosEnriquecidos
    };
  });
};

exports.buscarPorId = (id) => {
  return leer().find(c => c.id === id);
};

exports.buscarPorIdConProductos = (id) => {
  const carrito = leer().find(c => c.id === id);
  if (!carrito) return null;
  
  const productos = leerJSON(rutaProductos);
  
  const productosEnriquecidos = carrito.productos.map(productoId => {
    const producto = productos.find(p => p.id === productoId);
    return producto ? producto : { id: productoId, nombre: 'Producto no encontrado' };
  });
  
  return {
    ...carrito,
    productos: productosEnriquecidos
  };
};

exports.crear = (nuevo) => {
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map(c => c.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const index = datos.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  datos[index] = { ...datos[index], ...cambios, id };
  guardar(datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer();
  const index = datos.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  const eliminado = datos.splice(index, 1);
  guardar(datos);
  return eliminado[0];
};