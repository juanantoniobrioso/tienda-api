const proveedoresService = require('../services/proveedoresService');

exports.obtenerTodos = (req, res) => {
  try {
    const proveedores = proveedoresService.listar();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedores', error: error.message });
  }
};

exports.obtenerPorId = (req, res) => {
  try {
    const proveedor = proveedoresService.buscarPorId(parseInt(req.params.id));
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedor', error: error.message });
  }
};

exports.crear = (req, res) => {
  try {
    if (!req.body.nombre || !req.body.pais) {
      return res.status(400).json({ 
        mensaje: 'Los campos nombre y pais son obligatorios' 
      });
    }
    const nuevo = proveedoresService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proveedor', error: error.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = proveedoresService.actualizar(parseInt(req.params.id), req.body);
    if (actualizado) {
      res.json(actualizado);
    } else {
      res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar proveedor', error: error.message });
  }
};

exports.eliminar = (req, res) => {
  try {
    const eliminado = proveedoresService.eliminar(parseInt(req.params.id));
    if (eliminado) {
      res.json({ mensaje: 'Proveedor eliminado', proveedor: eliminado });
    } else {
      res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proveedor', error: error.message });
  }
};