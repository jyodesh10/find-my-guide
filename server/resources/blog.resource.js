import Blog from "../models/blog.model.js";

export default {
    resource: Blog,
    options: {
        properties: {
            content: {
                type: 'textarea',
                props: {
                    rows: 20,
                },
            }
        },
        listProperties: ['title', 'createdAt'],
    }
};