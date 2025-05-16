const getCategoriesController = async (req, res) => {
    const data = [];
    res.json({
      status: 200,
      message: "Successfully found all categories!",
      data,
    });

  };

export default getCategoriesController;