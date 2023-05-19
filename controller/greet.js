export const greet = (req, res) => {
  try {
    res.status(200).json({ data: "Hello World" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
