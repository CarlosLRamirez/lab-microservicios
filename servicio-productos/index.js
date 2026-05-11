const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware para permitir peticiones desde otros orígenes
app.use(cors());

app.get('/products', (req, res) => {
  res.json({
    service: "Productos",
    data: ["Laptop", "Mouse", "Teclado"],
    version: "1.0",
    timestamp: new Date().toISOString()
  });
});


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servicio Productos corriendo en http://localhost:${PORT}`);
});
