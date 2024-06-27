"use client";
const clientId = "67d26cd8e568fc7";

import { useRef, useState } from "react";
import { ImgurClient } from "imgur";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const CreatePostPage = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const link = event.target.imgurl.value;
    const dropdown = event.target.dropdown.value;
    const body = editorRef?.current?.getContent({ format: "text" });
    const htmlBody = editorRef?.current?.getContent();

    const data = { title, description, body, link, dropdown, htmlBody };

    console.log(data);

    fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleOnReset = () => {
    setImageLink("");
  };

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
      <form
        className="grid grid-flow-row  gap-2 my-4"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
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
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="w6q7m6bspz8sqsc3xf8ogte5se9rmnjz0x84aruqxnvb5jek"
          init={{
            plugins: "link",
            default_link_target: "_blank",
          }}
          initialValue=""
        />

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
