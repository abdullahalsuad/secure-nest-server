import NewsletterModel from "../models/newsletterModel.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
      const { name, email } = req.body;
      
    const subscriber = new NewsletterModel({ name, email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
