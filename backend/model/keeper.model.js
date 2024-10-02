import mongoose from "mongoose";

const keeperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Keeper = mongoose.model("Keeper", keeperSchema);

export default Keeper;