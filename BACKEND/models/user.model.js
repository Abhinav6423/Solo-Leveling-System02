import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // ✅ Added import

// ==============================================
// 👤 User Schema Definition
// ==============================================
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // unique: true // You can enable this if usernames must be unique
        },
        email: {
            type: String,
            required: true,
            unique: true, // Prevent duplicate emails
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        xp: {
            type: Number,
            default: 0,
            min: 0,
            index: true
        },
        totalXp: {
            type: Number,
            default: 0,
            min: 0
        },
        totalXpEarned: {
            type: Number,
            default: 0
        },
        xpToNextlevel: {
            type: Number,
            default: 50,

        },
        level: {
            type: Number,
            default: 1,
            min: 1,
            index: true
        },
        rank: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
            default: "Beginner",
        },
        streak: {
            current: {
                type: Number,
                default: 0,
                min: 0
            },
            longest: {
                type: Number,
                default: 0,
                min: 0
            },
            lastLogin: {
                type: Date,
                default: null,
                index: true
            },
        },
        totalTasks: {
            type: Number,
            default: 0,
            min: 0
        },
        pendingTasks: {
            type: Number,
            default: 0,
            min: 0
        },
        completedTasks: {
            type: Number,
            default: 0,
        },
        failedTasks: {
            type: Number,
            default: 0,
            min: 0
        },
        completedChallenges: {
            type: Number,
            default: 0,
            min: 0
        },
        failedChallenges: {
            type: Number,
            default: 0,
            min: 0
        },
        totalChallenges: {
            type: Number,
            default: 0,
            min: 0
        },
        badges: [
            {
                name: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },


            }

        ]

    },
    {
        timestamps: true, // Automatically adds createdAt & updatedAt
    }
);

// ==============================================
// 🧩 Compound Indexes for Advanced Queries
// ==============================================

// ✅ Leaderboard (sort by XP + Level)
userSchema.index({ xp: -1, level: -1 });

// ✅ Analytics (sort by lastLogin + XP)
userSchema.index({ "streak.lastLogin": -1, xp: -1 });


// ==============================================
// 🔒 Hash Password Before Saving
// ==============================================
// We use a normal function (not arrow) to access `this`
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password not changed

    try {
        // Hash password with salt rounds = 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// ==============================================
// 🧩 Compare Entered Password With Hashed Password
// ==============================================
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ==============================================
// 🔑 Generate Access Token (Short-Lived)
// ==============================================
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d", // Access token valid for 1 day
        }
    );
};


// ==============================================
// 🔁 Generate Refresh Token (Long-Lived)
// ==============================================
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET, // ✅ Fixed typo here
        {
            expiresIn: "7d", // Refresh token valid for 7 days
        }
    );
};

// ==============================================
// 📦 Export Model
// ==============================================
const User = mongoose.model("User", userSchema);
export default User;
