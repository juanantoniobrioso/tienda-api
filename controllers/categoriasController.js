const categoriasService = require('../services/categoriasService');

exports.obtenerTodos = (req, res) => {
  try {
    const categorias = categoriasService.listar();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
  }
};

exports.obtenerPorId = (req, res) => {
  try {
    const categoria = categoriasService.buscarPorId(parseInt(req.params.id));
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categoría', error: error.message });
  }
};

exports.crear = (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    }
    const nuevo = categoriasService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear categoría', error: error.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = categoriasService.actualizar(parseInt(req.params.id), req.body);
    if (actualizado) {
      res.json(actualizado);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar categoría', error: error.message });
  }
};

exports.eliminar = (req, res) => {
  try {
    const eliminado = categoriasService.eliminar(parseInt(req.params.id));
    if (eliminado) {
      res.json({ mensaje: 'Categoría eliminada', categoria: eliminado });
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar categoría', error: error.message });
  }
};