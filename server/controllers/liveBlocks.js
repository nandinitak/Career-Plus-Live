const User = require("../models/User");
const sign = require("jsonwebtoken");
const Liveblocks = require("@liveblocks/node");

const liveblocks = new Liveblocks.Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

const authenticateUser = async (req, res) => {
  try {
    // Get the current user from your database
    const { token, room } = req.body;

    const user = await User.findById(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const grantAccess = await liveblocks.createRoom(room, {
      defaultAccesses: ["room:read", "room:presence:write"],
    });

    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.username,
      },
      {
        userInfo: {
          avatar: user.avatar,
          name: `${user.firstName} ${user.lastName}`,
        },
      }
    );

    return res.status(status).end(body);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  authenticateUser,
};
