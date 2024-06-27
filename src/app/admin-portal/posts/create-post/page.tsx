"use client";
const clientId = "67d26cd8e568fc7";

import { useState } from "react";
import { ImgurClient } from "imgur";

const CreatePostPage = () => {
  const [fileN, setFile] = useState();
  const [imageLink, setImageLink] = useState("");
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!fileN) {
      return;
    }
    const client = new ImgurClient({ clientId });
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result !== "string") {
        console.error("Invalid file type");
        return;
      }
      const imageData = reader.result.split(",")[1]; // Get base64 part of the Data URL
      try {
        const response = await client.upload({
          image: imageData,
          type: "base64",
        });
        if (response.success) {
          setImageLink(response.data.link);
        } else {
          console.error("Image upload failed:", response.data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(fileN);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form className="grid grid-flow-row grid-cols-2 gap-2 my-4">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Tile" />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
        ></textarea>

        <label htmlFor="link">Image Link</label>
        <input
          required
          placeholder="Link"
          type="text"
          id="link"
          name="imgurl"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={onFileChange}
        />
        <button type="button" onClick={onFileUpload}>
          Upload
        </button>

        <label htmlFor="category">Category</label>
        <select
          className=""
          id="dropdown"
          name="dropdown"
          aria-label="Default select example"
        >
          <option value="00">Monday Hues</option>
          <option value="01">Campus Raid</option>
          <option value="02">Thursday Article</option>
          <option value="03">Funny Friday</option>
          <option value="04">Viral Corner</option>
          <option value="05">Word Worth Millions</option>
          <option value="06">College Heracles</option>
          <option value="07">Nanotips</option>
          <option value="08">Vernacular</option>
          <option value="09">Gazette</option>
          <option value="10">Reportopolis</option>
        </select>

        <label htmlFor="body">Body</label>
        <textarea
          id="mytextarea"
          name="body"
          rows={10}
          cols={5}
          placeholder="Body"
        ></textarea>

        <button type="reset" className="bg-yellow-300 rounded-2xl">
          Clear
        </button>
        <button type="submit" className="bg-blue-300 rounded-2xl">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
