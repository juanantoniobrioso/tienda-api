const express = require('express');
const app = express();

app.use(express.json());

// Importar todas las rutas
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));
app.use('/api/carritos', require('./routes/carritosRoutes'));
app.use('/api/proveedores', require('./routes/proveedoresRoutes'));

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));