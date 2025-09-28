const app = require('./src/app');
const { port } = require('./src/config');

app.listen(port, () => {
  console.log(`Servidor de Transmetro corriendo en el puerto ${port}`);
});