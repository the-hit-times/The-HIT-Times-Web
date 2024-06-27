"use client";

import { useState } from "react";

const CreatePostPage = () => {
  const [file, setFile] = useState();
  const onFileChange = (event: any) => {
    // Updating the state
    setFile({ file: event.target.files[0] });
  };

  const onFileUpload = async () => {
    // Client ID
    const clientId = "67d26cd8e568fc7",
      auth = "Client-ID " + clientId;

    // Creating an object of formData
    const formData = new FormData();

    // Adding our image to formData
    formData.append("file", file);

    // Making the post request
    await fetch("https://api.imgur.com/3/image/", {
      // API Endpoint
      method: "POST", // HTTP Method
      body: formData, // Data to be sent
      headers: {
        // Setting header
        Authorization: auth,
        Accept: "application/json",
      },
    })
      // Handling success
      .then((res) => alert("image uploaded") && console.log(res))
      .catch((err) => alert("Failed") && console.log(err));
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
