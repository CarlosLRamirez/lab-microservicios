const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para permitir peticiones desde otros orígenes (como tu frontend)
app.use(cors());

app.get('/users', (req, res) => {
    res.json({ 
        service: "Usuarios", 
        data: ["Alice", "Bob", "Charlie"], 
        version: "1.0",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servicio Usuarios corriendo en http://localhost:${PORT}`);
}); 