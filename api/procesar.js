export default function handler(req, res) {
    try {
        const nombre = req.query.nombre || "anónimo";
        
        // Simular error si el nombre es "error"
        if (nombre.toLowerCase() === "error") {
            // Simulamos un error interno del servidor
            return res.status(500).json({
                error: "Error simulado: Nombre no permitido",
                mensaje: "Se solicitó un nombre que genera error de prueba",
                timestamp: new Date().toISOString()
            });
        }
        
        // Procesamiento normal
        const resultado = `Nombre procesado: ${nombre.toUpperCase()}`;
        const timestamp = new Date().toISOString();  // Agregar timestamp
        
        res.status(200).json({
            resultado: resultado,
            timestamp: timestamp,
            procesadoEn: "Función /api/procesar"
        });
        
    } catch (err) {
        // Manejo de errores inesperados
        res.status(500).json({
            error: "Error interno en /api/procesar",
            detalle: String(err),
            timestamp: new Date().toISOString()
        });
    }
}
