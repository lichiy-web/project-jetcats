export const getCurrentUserController = async (req, res) => {
  const { _id, email, name } = req.user;

  res.status(200).json({
    status: '200',
    message: 'Current user fetched successfully',
    data: {
      user: {
        id: _id,
        email,
        name,
      },
    },
  });
};
