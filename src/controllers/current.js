const getCurrentUserController = async (req, res) => {

  const user = req.user; 
  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }
  res.status(200).json({
    status: "user information found",
    data: { user },
  });
  };

export default getCurrentUserController;