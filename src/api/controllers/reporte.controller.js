const reporteService = require('../services/reporte.service');
const lineaService = require('../services/linea.service');

const generarReporteEstaciones = async (req, res) => {
  try {
    const reporte = await reporteService.getReporteEstaciones(req.query);
    res.status(200).json(reporte);
  } catch (error) { res.status(500).json({ message: 'Error al generar el reporte de estaciones.' }); }
};

const getReporteDistanciaLinea = async (req, res) => {
  const { id_linea } = req.params;
  try {
    const linea = await lineaService.getById(id_linea);
    if (!linea) { return res.status(404).json({ message: 'Línea no encontrada.' }); }
    const reporte = await reporteService.getDistanciaTotalLinea(id_linea);
    res.status(200).json(reporte);
  } catch (error) { res.status(500).json({ message: 'Error al generar el reporte de distancia.' }); }
};

const getReporteAccesosPorLinea = async (req, res) => {
  const { id_linea } = req.params;
  try {
    const linea = await lineaService.getById(id_linea);
    if (!linea) { return res.status(404).json({ message: 'Línea no encontrada.' }); }
    const reporte = await reporteService.getAccesosPorLinea(id_linea);
    res.status(200).json(reporte);
  } catch (error) { res.status(500).json({ message: 'Error al generar el reporte de accesos por línea.' }); }
};

const getReporteGeneralLineasBuses = async (req, res) => {
    try {
        const reporte = await reporteService.getReporteLineasConBuses();
        res.status(200).json(reporte);
    } catch (error) { res.status(500).json({ message: 'Error al generar el reporte general.' }); }
};

const getReporteGeneralLineasEstaciones = async (req, res) => {
    try {
        const reporte = await reporteService.getReporteLineasConEstaciones();
        res.status(200).json(reporte);
    } catch (error) { res.status(500).json({ message: 'Error al generar el reporte de estaciones por línea.' }); }
};

const getReporteEstadoLineas = async (req, res) => {
    try {
        const reporte = await reporteService.getReporteEstadoLineas();
        res.status(200).json(reporte);
    } catch (error) { res.status(500).json({ message: 'Error al generar el reporte de estado de líneas.' }); }
};

module.exports = {
  generarReporteEstaciones,
  getReporteDistanciaLinea,
  getReporteAccesosPorLinea,
  getReporteGeneralLineasBuses,
  getReporteGeneralLineasEstaciones,
  getReporteEstadoLineas
};