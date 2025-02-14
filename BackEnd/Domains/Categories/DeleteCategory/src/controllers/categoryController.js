const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const Category = require("../models/category");

const GRAPHQL_GATEWAY_URL = "http://52.4.35.158:4000/graphql";

// 🔹 Verificar que la variable se está cargando
console.log("🔍 GRAPHQL_GATEWAY_URL:", GRAPHQL_GATEWAY_URL);

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Intentando eliminar la categoría con ID: ${id}`);

    try {
        if (!GRAPHQL_GATEWAY_URL) {
            console.error("❌ ERROR: GRAPHQL_GATEWAY_URL no está definido en .env");
            return res.status(500).json({ error: "Configuración incorrecta del servidor" });
        }

        const token = req.headers.authorization;
        if (!token) {
            console.error("❌ No se proporcionó token en la solicitud.");
            return res.status(401).json({ error: "No se proporcionó un token." });
        }

        // 🔹 Consultar GraphQL para ver si hay productos asociados
        console.log("🔍 Consultando GraphQL para verificar productos asociados...");
        const query = {
            query: `{ getProductsByCategory(categoryId: "${id}") { id name } }`,
        };

        const response = await axios.post(GRAPHQL_GATEWAY_URL, query, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,  // 🔹 Agregar el token JWT
            },
        });

        const products = response.data.data.getProductsByCategory;

        if (products && products.length > 0) {
            console.log("❌ No se puede eliminar. Hay productos asociados:", products);
            return res.status(400).json({ error: "No se puede eliminar la categoría, hay productos asociados." });
        }

        // 🔹 Proceder con la eliminación si no hay productos asociados
        console.log("✅ No hay productos asociados. Eliminando categoría...");
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        console.log("✅ Categoría eliminada correctamente:", deletedCategory);
        res.status(200).json({ message: "Categoría eliminada correctamente" });

    } catch (error) {
        console.error("❌ Error al eliminar la categoría:", error);
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};

module.exports = { deleteCategory };
