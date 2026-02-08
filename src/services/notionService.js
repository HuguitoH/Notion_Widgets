const axios = require('axios');

async function queryDatabase(databaseId, filterBody = {}) {
  const cleanId = databaseId.trim().replace(/-/g, '');
  
  // Forzamos la concatenación más básica de strings de Javascript
  const p1 = "https://api.notion.com";
  const p2 = "/v1/databases/";
  const p3 = "/query";
  const finalUrl = p1.concat(p2, cleanId, p3);

  console.log("DEBUG - URL:", finalUrl);

  try {
    const response = await axios.post(
      finalUrl,
      filterBody,
      {
        headers: {
          'Authorization': "Bearer " + process.env.NOTION_TOKEN.trim(),
          'Notion-Version': "2022-06-28",
          'Content-Type': "application/json"
        }
      }
    );
    return response.data.results;
  } catch (error) {
    if (error.response) {
      console.error("Error API:", error.response.data);
      throw new Error(error.response.data.message);
    }
    console.error("Error Red:", error.message);
    throw new Error("Fallo de red");
  }
}

module.exports = { queryDatabase };
