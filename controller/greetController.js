export const greet = (req, res) => {
  try {
    // TODO: Create sendResponse module
    res.status(200).json({ data: "Hello World" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
