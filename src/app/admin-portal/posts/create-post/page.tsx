"use client";
const clientId = "67d26cd8e568fc7";

import { useRef, useState } from "react";
import { ImgurClient } from "imgur";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { sendPostNotification } from "@/lib/sendPostNotification";

import { IBM_Plex_Serif } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const CreatePostPage = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();

    try {
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
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data);
              sendPostNotification(title, description, link, data.postId);
            });
          } else {
            console.error("Error creating post:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    } catch (error) {
      console.error("Error creating post:", error);
    }
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
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Create a Post
      </h1>
      <form
        className="grid grid-flow-row gap-2 my-2"
        action="/api/v1/posts"
        method="POST"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          id="title"
          name="title"
          placeholder="Tile"
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="
          outline outline-transparent
          px-3
          block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Description"
        ></textarea>

        <label htmlFor="link">Image Link</label>
        <input
          required
          placeholder="Link"
          type="text"
          id="link"
          name="imgurl"
          className="
          outline outline-transparent
          px-3
          block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />

        <div>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={onFileChange}
          />
          <button
            type="button"
            className="rounded-full bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm"
            onClick={onFileUpload}
          >
            Upload
          </button>
        </div>

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="body"
        >
          Body
        </label>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="w6q7m6bspz8sqsc3xf8ogte5se9rmnjz0x84aruqxnvb5jek"
          init={{
            plugins: "link",
            default_link_target: "_blank",
          }}
          initialValue=""
        />

        <div className="flex flex-row justify-end gap-4">
          <button
            type="reset"
            className="rounded-full py-1.5 px-2.5 text-sm font-semibold leading-6 text-gray-900"
          >
            Clear
          </button>
          <button
            className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
