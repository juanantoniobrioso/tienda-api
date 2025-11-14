const clientesService = require('../services/clientesService');

exports.obtenerTodos = (req, res) => {
  try {
    const clientes = clientesService.listar();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
  }
};

exports.obtenerPorId = (req, res) => {
  try {
    const cliente = clientesService.buscarPorId(parseInt(req.params.id));
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
  }
};

exports.crear = (req, res) => {
  try {
    if (!req.body.nombre || !req.body.email) {
      return res.status(400).json({ 
        mensaje: 'Los campos nombre y email son obligatorios' 
      });
    }
    const nuevo = clientesService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = clientesService.actualizar(parseInt(req.params.id), req.body);
    if (actualizado) {
      res.json(actualizado);
    } else {
      res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error: error.message });
  }
};

exports.eliminar = (req, res) => {
  try {
    const eliminado = clientesService.eliminar(parseInt(req.params.id));
    if (eliminado) {
      res.json({ mensaje: 'Cliente eliminado', cliente: eliminado });
    } else {
      res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
  }
};