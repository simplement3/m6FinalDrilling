import express from "express";
import path from 'path';
import hbs from 'hbs';

import animeRoutes from './routes/animeRoutes.js';

const app = express();
const port = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Configuración de hbs como motor de vistas
app.set('view engine', 'hbs');

app.set('views', path.resolve(__dirname, 'views'));
// app.set('views', path.join(__dirname, '..', 'views'));

// Registro de los parciales
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas relacionadas con los animes
app.use('data/anime', animeRoutes);

// Ruta principal para renderizar la vista index.hbs
app.get('/', (req, res) => {
  const viewsDirectory = path.resolve(__dirname, 'views');
  const indexViewPath = path.join(viewsDirectory, 'index.hbs');
  res.sendFile(indexViewPath);
  
});

// Ruta para cualquier otra ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
