const pool = require('../../config/db');

const create = async (id_piloto, id_bus, fecha_turno) => {
  const [result] = await pool.execute(
    'INSERT INTO ASIGNACION_PILOTO (id_piloto, id_bus, fecha_turno) VALUES (?, ?, ?)',
    [id_piloto, id_bus, fecha_turno]
  );
  const [rows] = await pool.execute(
    `SELECT
      ap.id_asignacion,
      ap.fecha_turno,
      p.id_piloto,
      CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo_piloto,
      b.id_bus,
      b.placa
     FROM ASIGNACION_PILOTO ap
     JOIN PILOTO p ON ap.id_piloto = p.id_piloto
     JOIN BUS b ON ap.id_bus = b.id_bus
     WHERE ap.id_asignacion = ?`,
    [result.insertId]
  );
  return rows[0];
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT
      ap.id_asignacion,
      ap.fecha_turno,
      p.id_piloto,
      CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo_piloto,
      b.id_bus,
      b.placa
     FROM ASIGNACION_PILOTO ap
     JOIN PILOTO p ON ap.id_piloto = p.id_piloto
     JOIN BUS b ON ap.id_bus = b.id_bus
     ORDER BY ap.fecha_turno DESC`
  );
  return rows;
};

const getByBusId = async (id_bus) => {
    const [rows] = await pool.execute(
        `SELECT
          ap.id_asignacion,
          ap.fecha_turno,
          p.id_piloto,
          CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo_piloto
         FROM ASIGNACION_PILOTO ap
         JOIN PILOTO p ON ap.id_piloto = p.id_piloto
         WHERE ap.id_bus = ?
         ORDER BY ap.fecha_turno DESC`,
        [id_bus]
    );
    return rows;
};

const remove = async (id_asignacion) => {
    const [result] = await pool.execute('DELETE FROM ASIGNACION_PILOTO WHERE id_asignacion = ?', [id_asignacion]);
    return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getByBusId,
  remove, 
};