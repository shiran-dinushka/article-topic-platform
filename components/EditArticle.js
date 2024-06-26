import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "../styles/EditingArea.module.css";
import { ARTICLE_ROUTES } from "../public/constants/routes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [text, setText] = useState("");
  const [articleName, setArticleName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const handleChange = (value) => {
    setText(value);
  };

  const handleUpdate = () => {
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      savedType: "saved",
    };

    const config = {
      method: "put",
      url: ARTICLE_ROUTES.UPDATE,
      headers: {
        "Content-Type": "application/json",
      },
      data: articleData,
    };

    axios(config)
      .then((response) => {
        alert("Article saved successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to save article: " + error.message);
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div className={styles.textEditorArea}>
      <input
        type="text"
        placeholder="Name of Article"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
        className={styles.articleNameInput}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Article
      </Button>{" "}
      <br />
      <br />
      {typeof window !== "undefined" && (
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{ height: "530px", width: "1000px" }}
        />
      )}
    </div>
  );
};

export default TextEditor;
