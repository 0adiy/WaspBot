import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const favPlaylistSchema = new Schema(
  {
    _id: {
      // Discord UID
      type: String,
      required: true,
    },
    favouritePlaylist: {
      // Array of URLs
      type: Array,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.favPlaylist || model("favPlaylist", favPlaylistSchema);
