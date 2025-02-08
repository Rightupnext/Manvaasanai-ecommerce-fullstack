const ShippingAndTax = require("../models/ShippingAndTax");

// Create shipping and tax

exports.createShippingAndTax = async (req, res) => {
  try {
    const { tax, ShippingAmount } = req.body;

    const existingShippingAndTax = await ShippingAndTax.findOne({
      tax,
      ShippingAmount,
    });

    if (existingShippingAndTax) {
      await ShippingAndTax.findByIdAndDelete(existingShippingAndTax._id);
    }

    const newShippingAndTax = new ShippingAndTax({
      tax,
      ShippingAmount,
    });

    await newShippingAndTax.save();

    res.status(201).json({
      success: true,
      message: "Shipping and Tax details added successfully.",
      data: newShippingAndTax,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add shipping and tax details.",
      error: error.message,
    });
  }
};

exports.getShippingAndTax = async (req, res) => {
  try {
    const shippingAndTax = await ShippingAndTax.find();

    if (!shippingAndTax) {
      return res.status(404).json({
        success: false,
        message: "No shipping and tax details found.",
      });
    }

    res.status(200).json({
      success: true,
     shippingAndTax, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch shipping and tax details.",
      error: error.message,
    });
  }
};

// Update shipping and tax details
exports.updateShippingAndTax = async (req, res) => {
  try {
    const { tax, ShippingAmount } = req.body;
    const { id } = req.params;

    const updatedShippingAndTax = await ShippingAndTax.findByIdAndUpdate(
      id,
      {
        tax,
        ShippingAmount,
      },
      { new: true }
    );

    if (!updatedShippingAndTax) {
      return res.status(404).json({
        success: false,
        message: "Shipping and Tax details not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipping and Tax details updated successfully.",
      data: updatedShippingAndTax,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update shipping and tax details.",
      error: error.message,
    });
  }
};

// Delete shipping and tax details
exports.deleteShippingAndTax = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShippingAndTax = await ShippingAndTax.findByIdAndDelete(id);

    if (!deletedShippingAndTax) {
      return res.status(404).json({
        success: false,
        message: "Shipping and Tax details not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipping and Tax details deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete shipping and tax details.",
      error: error.message,
    });
  }
};
