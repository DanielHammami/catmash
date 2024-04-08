import axios from "axios";

const CATS_API_URL = "https://data.latelier.co/cats.json";

const getCats = async () => {
  try {
    const response = await axios.get(CATS_API_URL);
    return response.data.images;
  } catch (error) {
    console.error("Erreur lors du chargement des données des chats:", error);
    throw error;
  }
};

export default getCats;
