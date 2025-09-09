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

// PATCH /medicines/:id/stock → update stock
router.patch("/medicines/:id/stock", async (req, res) => {
  try {
    const { id } = req.params;
    const { change } = req.body; // +1 or -1

    if (typeof change !== "number") {
      return res.status(400).json({ error: "Change must be a number" });
    }

    const medicine = await medicineModel.findById(id);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    const newStock = medicine.stock + change;
    if (newStock < 0) {
      return res.status(400).json({ error: "Stock cannot be negative" });
    }

    medicine.stock = newStock;

    // auto-update status
    if (newStock === 0) medicine.status = "out-of-stock";
    else if (newStock <= 10) medicine.status = "low-stock";
    else medicine.status = "in-stock";

    await medicine.save();
    res.status(200).json(medicine);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /medicines/:id → update medicine details
router.put("/medicines/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedMed = await medicineModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedMed) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.status(200).json(updatedMed);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
