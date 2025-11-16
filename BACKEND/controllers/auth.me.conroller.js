export const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user, // this comes from verifyToken middleware
    });
};
