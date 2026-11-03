import User from "../models/User.js";

export const getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" })
      .select("name email isActive createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error("Get clients error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch clients.",
    });
  }
};