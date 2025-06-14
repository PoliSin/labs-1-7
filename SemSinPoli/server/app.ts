import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import taskRoutes from './routes/tasks';
=======
import taskRoutes from './routes/taskRoutes';
>>>>>>> cbe9866 (add project files)

const app = express();

// Настраиваем CORS с нужными опциями сразу после создания app
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

// Роуты
app.use('/api/tasks', taskRoutes);

export default app;
