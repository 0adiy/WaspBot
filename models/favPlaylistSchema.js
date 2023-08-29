import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const urlRegex =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const favPlaylistSchema = new Schema(
  {
    _id: {
      // Discord UID
      type: String,
      required: true,
    },
    favouritePlaylist: {
      // Array of URLs
      type: [String],
      required: true,
      // unique: true,
      validate: {
        // Checking for valid urls
        validator: function (v) {
          return v.every(url => urlRegex.test(url));
        },
        message: props =>
          `Invalid URL found in favouritePlaylist: ${props.value}`,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.favPlaylist || model("favPlaylist", favPlaylistSchema);
