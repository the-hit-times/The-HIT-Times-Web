"use client";

import { useState } from "react";
import { ImgurClient } from "imgur";
import { IBM_Plex_Serif } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const clientId = "67d26cd8e568fc7"; // Imgur Client ID

const CreatePostPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]);
    }
  };

const onFileUpload = async () => {
  if (!file) return;

  console.log("Uploading file:", file.name);
  
  const formData = new FormData();
  formData.append("image", file); 
  formData.append("type", "file");

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setImageLink(result.data.link);
      console.log("✅ Image uploaded successfully:", result.data.link);
    } else {
      console.error("❌ Image upload failed:", result);
    }
  } catch (error) {
    console.error("❌ Error uploading image:", error);
  }
};

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting notification with title:", title, "and body:", body);

    if (!title || !body) {
      alert("Title and body are required!");
      console.error("❌ Title or body is missing!");
      return;
    }

    try {
      const response = await fetch("/api/v1/sendnotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, imageURL: imageLink }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        console.log("✅ Notification sent successfully:", result.msg);
      } else {
        console.error("❌ Error sending notification:", result.msg);
      }
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  };

  return (
    <div>
      <h1 className={`${ibmPlexSerif.className} text-zinc-800 text-5xl font-semibold py-8`}>
        Notify
      </h1>

      <form className="grid grid-flow-row gap-2 my-2" onSubmit={handleOnSubmit}>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log("Title updated:", e.target.value);
          }}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        />

        <label htmlFor="image" className="block text-sm font-medium text-gray-900">
          Image
        </label>
        <input
          type="text"
          id="image"
          name="imgurl"
          required
          placeholder="Image URL"
          value={imageLink}
          onChange={(e) => {
            setImageLink(e.target.value);
            console.log("Image URL updated:", e.target.value);
          }}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        />

        <div>
          <input type="file" id="imageInput" accept="image/*" onChange={onFileChange} />
          <button
            type="button"
            onClick={onFileUpload}
            className="rounded-full bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          >
            Upload
          </button>
        </div>

        <label htmlFor="body" className="block text-sm font-medium text-gray-900">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          placeholder="Message"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            console.log("Body updated:", e.target.value);
          }}
          rows={5}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        ></textarea>

        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="rounded-full py-1.5 px-2.5 text-sm font-semibold text-gray-900"
            onClick={() => {
              setTitle("");
              setBody("");
              setImageLink("");
              console.log("Form cleared");
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-indigo-600"
          >
            Notify
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;