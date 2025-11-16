import mongoose from "mongoose";
import User from "../models/user.model.js";


export const leaderBoard = async (req, res) => {
    try {
        const userId = req.user._id;

        const leaderBoard = await User.aggregate(
            [
                {

                    $setWindowFields: {
                        sortBy: { xp: -1 },
                        output: {   // this adds a new field called "position"
                            position: {
                                $denseRank: {}  // this is a window function which is used to assign a rank to each user based on their xp  which it will get from the sortBy field
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        username: 1,
                        xp: 1,
                        position: 1,
                        level: 1
                    }
                }
            ]
        )

        const currentUser = leaderBoard.find(
            user => user._id.toString() === userId.toString()
        )

        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json(
            {
                success: true,
                message: "Leaderboard fetched successfully",
                leaderBoard,
                userPosition: currentUser.position
            }
        )
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}