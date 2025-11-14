const carritosService = require('../services/carritosService');

exports.obtenerTodos = (req, res) => {
  try {
    const carritos = carritosService.listarConProductos();
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carritos', error: error.message });
  }
};

exports.obtenerPorId = (req, res) => {
  try {
    const carrito = carritosService.buscarPorIdConProductos(parseInt(req.params.id));
    if (carrito) {
      res.json(carrito);
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito', error: error.message });
  }
};

exports.crear = (req, res) => {
  try {
    if (!req.body.clienteId || !req.body.productos) {
      return res.status(400).json({ 
        mensaje: 'Los campos clienteId y productos son obligatorios' 
      });
    }
    if (!Array.isArray(req.body.productos)) {
      return res.status(400).json({ 
        mensaje: 'El campo productos debe ser un array' 
      });
    }
    const nuevo = carritosService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear carrito', error: error.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = carritosService.actualizar(parseInt(req.params.id), req.body);
    if (actualizado) {
      res.json(actualizado);
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar carrito', error: error.message });
  }
};

exports.eliminar = (req, res) => {
  try {
    const eliminado = carritosService.eliminar(parseInt(req.params.id));
    if (eliminado) {
      res.json({ mensaje: 'Carrito eliminado', carrito: eliminado });
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar carrito', error: error.message });
  }
};