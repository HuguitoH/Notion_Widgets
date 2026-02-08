// src/controllers/leetCodeController.js

const notionService = require('../services/notionService');

// El número total de problemas que estás siguiendo (NeetCode 150)
const TOTAL_PROBLEMS = 141; // Ajusta este número si tu lista es diferente a la de 141

/**
 * Controlador para obtener el progreso de problemas completados.
 */
async function getProgress(req, res) {
  const databaseId = process.env.DATABASE_ID_LEETCODE;

  // Definimos el filtro: buscar todos los elementos con 'Estado' igual a 'Listo'
    const filter = {
        filter: {
            property: 'Estado', // Asegúrate que 'Estado' es el nombre exacto de tu columna Status
            status: {
                equals: 'Listo', // Asegúrate que 'Listo' es el nombre exacto del estado
            },
        },
    };
    
    

  try {
    const results = await notionService.queryDatabase(databaseId, filter);
    const completedCount = results.length;
    const percentage = (completedCount / TOTAL_PROBLEMS) * 100;

    // Enviamos los datos como respuesta JSON a quien llame a este endpoint
    res.json({
      total: TOTAL_PROBLEMS,
      completed: completedCount,
      percentage: percentage.toFixed(2), // Formatea el porcentaje a 2 decimales
    });

  } catch (error) {
    // Si hay un error en el servicio de Notion, lo manejamos aquí
    res.status(500).json({ error: error.message });
  }
}


async function getStreak(req, res) {
  const databaseId = process.env.DATABASE_ID_LEETCODE;

  try {
    // 1. Consultar problemas listos ordenados por fecha (de más reciente a más antiguo)
    const results = await notionService.queryDatabase(databaseId, {
      filter: {
        property: 'Estado',
        status: { equals: 'Listo' }
      },
      sorts: [
        {
          property: 'Date', // <--- Tu columna de Notion
          direction: 'descending'
        }
      ]
    });

    if (!results || results.length === 0) return res.json({ streak: 0 });

    // 2. Extraer fechas únicas (formato YYYY-MM-DD)
    const dates = results
      .map(page => page.properties.Date.date?.start)
      .filter(d => d) // Quitar nulos
      .map(d => d.split('T')[0]); // Solo fecha, sin hora

    const uniqueDates = [...new Set(dates)];

    // 3. Calcular racha
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentCheck = new Date(today);

    for (let i = 0; i < uniqueDates.length; i++) {
      const logDate = new Date(uniqueDates[i]);
      logDate.setHours(0, 0, 0, 0);

      // Calculamos la diferencia de días entre la fecha esperada y la del log
      const diffTime = currentCheck - logDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 0) {
        // Marcado hoy
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else if (diffDays === 1 && i === 0) {
        // No marcado hoy todavía, pero marcado ayer (la racha sigue viva)
        streak++;
        currentCheck = new Date(logDate);
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else if (diffDays === 1) {
        // Día consecutivo normal
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else {
        // Hueco detectado, se acabó la racha
        break;
      }
    }

    res.json({ streak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getHeatmap(req, res) {
  const databaseId = process.env.DATABASE_ID_LEETCODE;
  try {
    const results = await notionService.queryDatabase(databaseId, {
      filter: { property: 'Estado', status: { equals: 'Listo' } }
    });
    // Extraemos solo las fechas YYYY-MM-DD
    const dates = results
      .map(page => page.properties.Date.date?.start)
      .filter(d => d)
      .map(d => d.split('T')[0]);

    res.json({ dates }); // Enviamos el array de fechas
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCurrentCategory(req, res) {
  const databaseId = process.env.DATABASE_ID_LEETCODE;
  try {
    const results = await notionService.queryDatabase(databaseId, {
      filter: {
        property: 'Estado',
        status: { does_not_equal: 'Listo' }
      },
      sorts: [{ property: '#', direction: 'ascending' }], // O el orden que uses
      page_size: 1
    });

    const category = results.length > 0 
      ? results[0].properties.Category.select.name 
      : "¡Completado!";

    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Exportamos la función para usarla en las rutas
module.exports = {
    getProgress,
    getStreak,
    getHeatmap,
    getCurrentCategory
};
