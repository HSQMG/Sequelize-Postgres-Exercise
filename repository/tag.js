const db = require("../models");
const { Op } = require("sequelize");

const buildBlogTagsQuery = (blogId) => `
    SELECT ARRAY_AGG("Tags".name) AS tags
    FROM "BlogTags"
    JOIN "Tags" ON "Tags".id = "BlogTags"."tagId"
    WHERE "blogId" = ${blogId}
    GROUP BY "blogId"
`;

const repo = {
    GetTagByBlogId: async (blogId) => {
        try {
            const sequelize = db.sequelize;
            const query = buildBlogTagsQuery(blogId);
            const [blogTags] = await sequelize.query(query);
            return blogTags ? blogTags.tags : [];
        } catch (error) {
            console.error('Error in GetTagByBlogId:', error);
            throw error;
        }
    },

    GetAllTags: async () => {
        try {
            return db.Tag.findAll({
                attributes: ['name'],
                distinct: true,
                raw: true,
            });
        } catch (error) {
            console.error('Error in GetAllTags:', error);
            throw error;
        }
    }
};

module.exports = repo;
