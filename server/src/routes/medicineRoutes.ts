import express from "express";
import { medicineModel } from "../db/stockdb";
const router = express.Router();

router.post("/medicines",async(req,res)=>{
    try {
        const { name, category, price, stock, createdBy }=req.body;

        if (!name || !category || !price || !stock || !createdBy) {
      return res.status(400).json({ error: "All fields are required" });
    }

        const newMed=await medicineModel.create({
            name,
            category,
            price, 
            stock, 
            createdBy 
        })

        res.status(201).json(newMed);
    } catch (e: any) {
    if (e.code === 11000) { // duplicate key error in Mongo
      return res.status(400).json({ error: "Medicine already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
})

// GET /medicines → fetch all medicines
router.get("/medicines", async (req, res) => {
  try {
    const { search, category, status } = req.query;

    // Build filter object
    const filter: any = {};
    if (search) {
      filter.name = { $regex: search as string, $options: "i" }; // case-insensitive search
    }
    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const medicines = await medicineModel.find(filter);
    res.status(200).json(medicines);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /medicines/:id → delete a medicine by id
router.delete("/medicines/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMed = await medicineModel.findByIdAndDelete(id);
    if (!deletedMed) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
