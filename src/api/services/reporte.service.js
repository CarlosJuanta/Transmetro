const pool = require('../../config/db');

const getReporteEstaciones = async (filtros = {}) => {
    const { id_municipalidad, id_linea } = filtros;
    let query = `
        SELECT 
        e.id_estacion, e.nombre AS nombre_estacion, m.nombre AS nombre_municipalidad,
        l.id_linea, l.nombre AS nombre_linea, b.id_bus, b.placa
        FROM ESTACION e
        LEFT JOIN MUNICIPALIDAD m ON e.id_municipalidad = m.id_municipalidad
        LEFT JOIN RUTA r ON e.id_estacion = r.id_estacion
        LEFT JOIN LINEA l ON r.id_linea = l.id_linea
        LEFT JOIN BUS b ON l.id_linea = b.id_linea
        WHERE 1=1
    `;
    const params = [];
    if (id_municipalidad) { query += ' AND e.id_municipalidad = ?'; params.push(id_municipalidad); }
    if (id_linea) { query += ' AND e.id_estacion IN (SELECT DISTINCT id_estacion FROM RUTA WHERE id_linea = ?)'; params.push(id_linea); }
    query += ' ORDER BY e.nombre, l.nombre, b.placa';
    const [rows] = await pool.execute(query, params);
    if (rows.length === 0) return [];
    const estacionesMap = new Map();
    for (const row of rows) {
        if (!estacionesMap.has(row.id_estacion)) {
            estacionesMap.set(row.id_estacion, {
                id_estacion: row.id_estacion, nombre_estacion: row.nombre_estacion,
                nombre_municipalidad: row.nombre_municipalidad, lineas: new Map()
            });
        }
        if (row.id_linea) {
            const estacion = estacionesMap.get(row.id_estacion);
            if (!estacion.lineas.has(row.id_linea)) {
                estacion.lineas.set(row.id_linea, {
                    id_linea: row.id_linea, nombre_linea: row.nombre_linea, buses_asignados: []
                });
            }
            if (row.id_bus) {
                const linea = estacion.lineas.get(row.id_linea);
                if (!linea.buses_asignados.some(bus => bus.id_bus === row.id_bus)) {
                    linea.buses_asignados.push({ id_bus: row.id_bus, placa: row.placa });
                }
            }
        }
    }
    return Array.from(estacionesMap.values()).map(estacion => ({ ...estacion, lineas: Array.from(estacion.lineas.values()) }));
};

const getDistanciaTotalLinea = async (id_linea) => {
  const [rows] = await pool.execute('SELECT COALESCE(SUM(distancia_siguiente_parada), 0) AS distancia_total_km FROM RUTA WHERE id_linea = ?', [id_linea]);
  return rows[0];
};

const getAccesosPorLinea = async (id_linea) => {
  const [rows] = await pool.execute('SELECT DISTINCT a.id_acceso, a.nombre AS nombre_acceso, e.id_estacion, e.nombre AS nombre_estacion FROM ACCESO a JOIN ESTACION e ON a.id_estacion = e.id_estacion JOIN RUTA r ON e.id_estacion = r.id_estacion WHERE r.id_linea = ? ORDER BY e.nombre ASC, a.nombre ASC', [id_linea]);
  return rows;
};

const getReporteLineasConBuses = async () => {
    const [lineas] = await pool.execute('SELECT id_linea, nombre FROM LINEA ORDER BY nombre ASC');
    const [buses] = await pool.execute('SELECT b.id_bus, b.placa, b.capacidad_maxima, b.id_linea FROM BUS b WHERE b.id_linea IS NOT NULL');
    return lineas.map(linea => ({ ...linea, buses_asignados: buses.filter(bus => bus.id_linea === linea.id_linea) }));
};

const getReporteLineasConEstaciones = async () => {
    const [lineas] = await pool.execute('SELECT id_linea, nombre FROM LINEA ORDER BY nombre ASC');
    const [rutas] = await pool.execute(`SELECT r.id_linea, r.numero_parada, e.nombre as nombre_estacion FROM RUTA r JOIN ESTACION e ON r.id_estacion = e.id_estacion ORDER BY r.id_linea, r.numero_parada ASC`);
    return lineas.map(linea => ({ ...linea, estaciones: rutas.filter(ruta => ruta.id_linea === linea.id_linea).map(ruta => ({ numero_parada: ruta.numero_parada, nombre_estacion: ruta.nombre_estacion })) }));
};

const getReporteEstadoLineas = async () => {
    const [lineas] = await pool.execute('SELECT id_linea, nombre FROM LINEA');
    const [conteoBuses] = await pool.execute('SELECT id_linea, COUNT(*) as totalBuses FROM BUS WHERE id_linea IS NOT NULL GROUP BY id_linea');
    const [conteoEstaciones] = await pool.execute('SELECT id_linea, COUNT(DISTINCT id_estacion) as totalEstaciones FROM RUTA GROUP BY id_linea');

    return lineas.map(linea => {
        const buses = conteoBuses.find(b => b.id_linea === linea.id_linea)?.totalBuses || 0;
        const estaciones = conteoEstaciones.find(e => e.id_linea === linea.id_linea)?.totalEstaciones || 0;
        
        const limiteMinimo = estaciones;
        const limiteMaximo = estaciones * 2;
        
        const esConsistente = estaciones === 0 ? true : (buses >= limiteMinimo);
        
        return {
            id_linea: linea.id_linea,
            nombre: linea.nombre,
            totalBuses: buses,
            totalEstaciones: estaciones,
            limiteMinimo: limiteMinimo,
            esConsistente: esConsistente
        };
    });
};

module.exports = {
  getReporteEstaciones,
  getDistanciaTotalLinea,
  getAccesosPorLinea,
  getReporteLineasConBuses,
  getReporteLineasConEstaciones,
  getReporteEstadoLineas
};