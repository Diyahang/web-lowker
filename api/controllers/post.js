import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.job
    ? "SELECT * FROM post WHERE job=?"
    : "SELECT * FROM post";

  db.query(q, [req.query.job], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `kandidat`, `description`, `pendidikan`, `created`, `startDate`, `finishDate`, `job` FROM user u JOIN post p ON u.id = p.uid WHERE p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("not aunthenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid.");

    const q =
      "INSERT INTO post(`title`, `kandidat`, `pendidikan`, `startDate`, `finishDate`, `description`, `created`, `uid` VALUES (?)";

    const values = [
      req.body.title,
      req.body.kandidat,
      req.body.pendidikan,
      req.body.startDate,
      req.body.finishDate,
      req.body.description,
      req.body.created,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("post telah dibuat");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("not aunthenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid.");

    const postId = req.params.id;
    const q = "DELETE FROM post WHERE `id`= ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("hanya bisa hapus post yang anda buat!");

      return res.json("post berhasil dihapus");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("not aunthenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid.");

    const postId = req.params.id;
    const q =
      "UPDATE post SET `title`=?, `kandidat`=?, `pendidikan`=?, `startDate`=?, `finishDate`=?, `description`=? WHERE `id` =? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.kandidat,
      req.body.pendidikan,
      req.body.startDate,
      req.body.finishDate,
      req.body.description,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("post telah diupdate");
    });
  });
};
