const bcrypt = require('bcryptjs');

const generarHashParaPrueba = async () => {
  // Pon aquí la contraseña que quieres encriptar
  const passwordEnTextoPlano = 'admin123';

  console.log(`Generando hash para la contraseña: "${passwordEnTextoPlano}"`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordEnTextoPlano, salt);

  console.log('---');
  console.log('¡Hash generado exitosamente!');
  console.log('Copia el siguiente hash completo y úsalo en tu script SQL:');
  console.log(hashedPassword);
  console.log('---');
};

generarHashParaPrueba();