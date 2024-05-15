const Sequelize = require("sequelize");
const db = require("../models");

const executeQuery = async (query, options) => {
    try {
        const sequelize = db.sequelize;
        const result = await sequelize.query(query, options);
        return result;
    } catch (error) {
        console.log(`Error executing query: ${error}`);
        throw error;
    }
};

const buildQueryCategoriesByBlogId = () => `
    SELECT "Blogs".id, "Categories".name
    FROM "Categories"
    JOIN "Blogs" ON "Blogs"."categoryId" = "Categories".id
    WHERE "Blogs".id = $blogId;
`;

const buildQueryTotalPerCategory = () => `
    SELECT "Categories".name AS name, COUNT(*) AS count
    FROM "Categories"
    JOIN "Blogs" ON "categoryId" = "Categories".id
    GROUP BY "Categories".name;
`;

const blogRepository = {
    GetCategoriesByBlogId: async (blogId) => {
        const query = buildQueryCategoriesByBlogId();
        const options = {
            bind: { blogId },
            type: Sequelize.QueryTypes.SELECT
        };
        try {
            const categories = await executeQuery(query, options);
            return categories || [];
        } catch (error) {
            console.log('Error in GetCategoriesByBlogId', error);
            throw error;
        }
    },

    GetTotalPerCategory: async () => {
        const query = buildQueryTotalPerCategory();
        const options = { type: Sequelize.QueryTypes.SELECT };
        try {
            const categories = await executeQuery(query, options);
            return categories;
        } catch (error) {
            console.log('Error in GetTotalPerCategory', error);
            throw error;
        }
    }
};

module.exports = blogRepository;
