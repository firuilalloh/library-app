const supabase = require("../config/supabase");

const getAllBooks = async (req, res) => {
  const { data: books, error } = await supabase.from("books").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(books);
};

const addBook = async (req, res) => {
  const { title, author, isbn, stock } = req.body;

  const { data, error } = await supabase
    .from("books")
    .insert([{ title, author, isbn, stock }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    status: "success",
    message: "Book added successfully",
    book: data[0],
  });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No updates provided." });
  }

  const { data, error } = await supabase
    .from("books")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Book not found." });
  }

  res.status(200).json({
    status: "success",
    message: "Book updated successfully",
    book: data[0],
  });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("books")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Book not found." });
  }

  res.status(200).json({
    status: "success",
    message: "Book deleted successfully",
  });
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
