const pool = require('../../config/db');

const create = async (id_personal, id_acceso, fecha_turno) => {
  const [result] = await pool.execute(
    'INSERT INTO ASIGNACION_GUARDIA (id_personal, id_acceso, fecha_turno) VALUES (?, ?, ?)',
    [id_personal, id_acceso, fecha_turno]
  );
  const [rows] = await pool.execute(
    `SELECT
      ag.id_asignacion,
      ag.fecha_turno,
      ps.id_personal,
      CONCAT(ps.nombre, ' ', ps.apellido) AS nombre_completo_personal,
      a.id_acceso,
      a.nombre AS nombre_acceso,
      e.id_estacion,
      e.nombre AS nombre_estacion
     FROM ASIGNACION_GUARDIA ag
     JOIN PERSONAL_SEGURIDAD ps ON ag.id_personal = ps.id_personal
     JOIN ACCESO a ON ag.id_acceso = a.id_acceso
     JOIN ESTACION e ON a.id_estacion = e.id_estacion
     WHERE ag.id_asignacion = ?`,
    [result.insertId]
  );
  return rows[0];
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT
      ag.id_asignacion,
      ag.fecha_turno,
      ps.id_personal,
      CONCAT(ps.nombre, ' ', ps.apellido) AS nombre_completo_personal,
      a.id_acceso,
      a.nombre AS nombre_acceso,
      e.id_estacion,
      e.nombre AS nombre_estacion
     FROM ASIGNACION_GUARDIA ag
     JOIN PERSONAL_SEGURIDAD ps ON ag.id_personal = ps.id_personal
     JOIN ACCESO a ON ag.id_acceso = a.id_acceso
     JOIN ESTACION e ON a.id_estacion = e.id_estacion
     ORDER BY ag.fecha_turno DESC`
  );
  return rows;
};

const getByAccesoId = async (id_acceso) => {
    const [rows] = await pool.execute(
        `SELECT
          ag.id_asignacion,
          ag.fecha_turno,
          ps.id_personal,
          CONCAT(ps.nombre, ' ', ps.apellido) AS nombre_completo_personal
         FROM ASIGNACION_GUARDIA ag
         JOIN PERSONAL_SEGURIDAD ps ON ag.id_personal = ps.id_personal
         WHERE ag.id_acceso = ?
         ORDER BY ag.fecha_turno DESC`,
        [id_acceso]
    );
    return rows;
};

const remove = async (id_asignacion) => {
    const [result] = await pool.execute('DELETE FROM ASIGNACION_GUARDIA WHERE id_asignacion = ?', [id_asignacion]);
    return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getByAccesoId,
  remove,
};