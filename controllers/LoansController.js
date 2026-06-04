const supabase = require("../config/supabase");
const getAllLoans = async (req, res) => {
    const { data: loans, error } = await supabase.from("loans").select("*");

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ loans });
}
   
const addLoan = async (req, res) => {
    const { user_id, book_id, loan_date, return_date } = req.body;

    const { data, error } = await supabase
        .from("loans")
        .insert([{ user_id, book_id, loan_date, return_date }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    
    }

    res.status(201).json({
        status: "success",
        message: "Loan added successfully",
        loan: data[0],
    });
};

const updateLoan = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const { data, error } = await supabase
        .from("loans")
        .update(updateData)
        .eq("id", id)
        .select();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (data.length === 0) {
        return res.status(404).json({ error: "Loan not found" });
    }
    res.json({
        status: "success",
        message: "Loan updated successfully",
        loan: data[0],
    });
}

const deleteLoan = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("loans")
        .delete()
        .eq("id", id)
        .select();
    if (error) {
        return res.status(500).json({ error: error.message });
    }       
    if (data.length === 0) {
        return res.status(404).json({ error: "Loan not found" });
    }
    res.json({
        status: "success",
        message: "Loan deleted successfully",
    });
}

module.exports = {
    getAllLoans,
    addLoan,
    updateLoan,
    deleteLoan
};



