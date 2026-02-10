export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";
  
  // SIMPLIFICADO para el taller básico
  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toLowerCase()}`
  });
}
