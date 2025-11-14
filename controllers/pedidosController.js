const pedidosService = require('../services/pedidosService');

exports.obtenerTodos = (req, res) => {
  try {
    const pedidos = pedidosService.listarConProductos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos', error: error.message });
  }
};

exports.obtenerPorId = (req, res) => {
  try {
    const pedido = pedidosService.buscarPorIdConProductos(parseInt(req.params.id));
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedido', error: error.message });
  }
};

exports.crear = (req, res) => {
  try {
    if (!req.body.clienteId || !req.body.productos || !req.body.total) {
      return res.status(400).json({ 
        mensaje: 'Los campos clienteId, productos y total son obligatorios' 
      });
    }
    if (!Array.isArray(req.body.productos)) {
      return res.status(400).json({ 
        mensaje: 'El campo productos debe ser un array' 
      });
    }
    const nuevo = pedidosService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear pedido', error: error.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = pedidosService.actualizar(parseInt(req.params.id), req.body);
    if (actualizado) {
      res.json(actualizado);
    } else {
      res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar pedido', error: error.message });
  }
};

exports.eliminar = (req, res) => {
  try {
    const eliminado = pedidosService.eliminar(parseInt(req.params.id));
    if (eliminado) {
      res.json({ mensaje: 'Pedido eliminado', pedido: eliminado });
    } else {
      res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar pedido', error: error.message });
  }
};