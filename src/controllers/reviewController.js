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
