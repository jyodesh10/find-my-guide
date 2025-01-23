import Tour from "../models/tour.model.js";


export default {
    resource: Tour,
    options: {
        listProperties: ['title', 'description', 'price'],
        actions : {}
        // showProperties: ['title', 'description', 'price', 'image'],
        // filterProperties: ['title', 'description', 'price', 'image'],
        // editProperties: ['title', 'description', 'price', 'image'],
    }
};