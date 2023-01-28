import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; //this is all the frontend will send
    //need the userId, description and  picturePath
    const user = await User.findById(userId); // grab the user information
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); // to make sure i saved it into the mongodb

    const post = await Post.find();
    res.status(201).json(post); // and then i can grab all the post
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}; // grab the user feed posts

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id); //grab the post information
    const isLiked = post.likes.get(userId); //check in the likes if the user id exist

    if (isLiked) {
      post.likes.delete(userId); //delete if it liked
    } else {
      post.likes.set(userId, true); // if not existence then set it
    }

    //update the frontend once you hit the like button
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    ); // update a specify post

    res.status(200).json(updatedPost); // finally updated the post in ohter to update the frontend
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
