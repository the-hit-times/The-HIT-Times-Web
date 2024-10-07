"use client";
import { Alumni } from "@/models/Alumnus";
import { useEffect, useState } from "react";

interface AlumniFormProps {
  alumniId?: string;
}

const AlumniForm = ({ alumniId }: AlumniFormProps) => {
  const [message, setMessage] = useState({
    error: false,
    success: false,
    message: "",
  });

  const [alumniDetails, setAlumniDetails] = useState({
    name: "",
    linkedin: "",
    profile_image: "",
    position: "",
    session_start: new Date().getFullYear() - 4,
    session_end: new Date().getFullYear(),
  });

  const loadAlumni = async(alumniId: string) => {
    try {
      const response = await fetch(`/api/v1/alumnus/${alumniId}`);
      if (response.ok) {
        const data = await response.json();
        const alumniData = data.data;
        setAlumniDetails({
          name: alumniData.name,
          profile_image: alumniData.profile_image,
          linkedin: alumniData.linkedin,
          position: alumniData.position,
          session_start: alumniData.session_start,
          session_end: alumniData.session_end,
        });
      } else {
        console.error("Error loading alumni:", response.statusText);
      }
    } catch (error) {
      console.error("Error loading alumni:", error);
    }
  };

  useEffect(() => {
    if (alumniId) {
      loadAlumni(alumniId);
    }
  }, [alumniId]);

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const {
        name,
        linkedin,
        profile_image,
        position,
        session_start,
        session_end,
      } = alumniDetails;
      const data = {
        name,
        linkedin,
        position,
        profile_image,
        session_start,
        session_end,
      };

      const response = await fetch(
        alumniId ? `/api/v1/alumnus/${alumniId}` : "/api/v1/alumnus/",
        {
          method: alumniId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setMessage({
          error: false,
          success: true,
          message: alumniId
            ? "Alumni updated successfully"
            : "Alumni created successfully",
        });

        if (!alumniId) {
          setAlumniDetails({
            name: "",
            profile_image: "",
            linkedin: "",
            position: "",
            session_start: 0,
            session_end: 0,
          });
        }
      } else {
        setMessage({
          error: true,
          success: false,
          message: `Error ${alumniId ? "updating" : "creating"} alumni: ${
            response.statusText
          }`,
        });
        console.error(
          `Error ${alumniId ? "updating" : "creating"} alumni:`,
          response.statusText
        );
      }
    } catch (error: any) {
      setMessage({
        error: true,
        success: false,
        message: `Error ${alumniId ? "updating" : "creating"} alumni: ${
          error.message
        }`,
      });
      console.error(
        `Error ${alumniId ? "updating" : "creating"} alumni:`,
        error
      );
    }
  };

  const handleOnReset = () => {
    setAlumniDetails({
      name: "",
      profile_image: "",
      linkedin: "",
      position: "",
      session_start: 0,
      session_end: 0,
    });
  };

  return (
    <div>
      {message.error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg relative">
          {message.message}
        </div>
      )}

      {message.success && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg relative">
          {message.message}
        </div>
      )}

      <form
        className="grid grid-flow-row gap-2 my-2"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={alumniDetails.name}
          onChange={(e) =>
            setAlumniDetails({ ...alumniDetails, name: e.target.value })
          }
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="profile_image"
        >
          Profile Image
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          id="profile_image"
          name="profile_image"
          placeholder="Profile Image URL"
          value={alumniDetails.profile_image}
          onChange={(e) =>
            setAlumniDetails({
              ...alumniDetails,
              profile_image: e.target.value,
            })
          }
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="linkedin"
        >
          LinkedIn
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          id="linkedin"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          value={alumniDetails.linkedin}
          onChange={(e) =>
            setAlumniDetails({ ...alumniDetails, linkedin: e.target.value })
          }
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="position"
        >
          Position
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          id="position"
          name="position"
          placeholder="Position"
          value={alumniDetails.position}
          onChange={(e) =>
            setAlumniDetails({ ...alumniDetails, position: e.target.value })
          }
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="session_start"
        >
          Session Start
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="number"
          id="session_start"
          name="session_start"
          placeholder="Session Start Year"
          value={alumniDetails.session_start}
          onChange={(e) =>
            setAlumniDetails({
              ...alumniDetails,
              session_start: parseInt(e.target.value),
            })
          }
        />

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="session_end"
        >
          Session End
        </label>
        <input
          className="
        outline outline-transparent
        px-3
        block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="number"
          id="session_end"
          name="session_end"
          placeholder="Session End Year"
          value={alumniDetails.session_end}
          onChange={(e) =>
            setAlumniDetails({
              ...alumniDetails,
              session_end: parseInt(e.target.value),
            })
          }
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
            {alumniId ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlumniForm;
