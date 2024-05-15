// Import required modules
const db = require("../models");
const blogRepo = require('./blog');

const repo = {
    GetAuthorByBlogId: async (id) => {
        try {
            const blog = await blogRepo.GetBlogById(id);
            const author = await db['User'].findOne({
                where: {
                    id: blog.authorId
                },
                raw: true,
            });
            return author;
        } catch (error) {
            console.log('Error in GetAuthorByBlogId', error);
            throw error;
        }
    }
};
module.exports = repo;
