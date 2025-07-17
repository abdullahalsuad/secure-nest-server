import ReviewModel from "../models/reviewModel.js";

export const submitReview = async (req, res) => {
  try {
    const review = new ReviewModel(req.body);

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReview = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
