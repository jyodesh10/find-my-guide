const Tour = require("../models/tour.model.js");

const createTour = async (req, res) => {
    try {

        const tour = await Tour(req.body);

        if(req.file) {
            tour.image = req.file.path
        }

        await tour.save();

        res.status(200).json({message: "Tour created successfully", data : tour});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id)
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        await Tour.findByIdAndDelete(id);
        res.status(200).json({message: "Tour deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    createTour,
    getAllTours,
    getTour,
    deleteTour
}
