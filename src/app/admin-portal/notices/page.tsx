"use client";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";

const tspFormUrl = "/api/v1/tsps/exportform";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

interface noticeProps {
  noticeTitle?: string;
  noticeLink?: string;
}

const tspNotice = {
  noticeTitle: "Join TSP 24-25",
  noticeLink: "/forms/tsp-form",
};

const recruitmentNotice = {
  noticeTitle: "Fill Recruitment Form 2K25",
  noticeLink: "/recruitment",
};

const EventsPage = () => {
  async function publishForm(notice: noticeProps): Promise<any> {
    const url = "/api/v1/notice";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notice),
      });

      if (response.status != 201) {
        toast.error("Something went wrong");
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        toast.success("Published successfully");
      }

      const data: any = await response.json();
    } catch (error) {
      toast.error("Try submitting again");
    }
  }

  async function removeForm(): Promise<any> {
    const url = "/api/v1/notice";
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.status != 201) {
        toast.error("Something went wrong");
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        toast.success("Removed successfully");
      }

      const data: any = await response.json();
    } catch (error) {
      toast.error("Try removing again");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="my-5">
        <h2
          className={
            ibmPlexSerif.className +
            " text-zinc-800 text-5xl font-semibold py-8"
          }
        >
          Control Recruitment Forms
        </h2>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <button
            onClick={() => publishForm(recruitmentNotice)}
            className={
              nunitoSans.className +
              " bg-white rounded-lg py-8 text-3xl font-bold text-center"
            }
          >
            Publish Recruitment Form
          </button>

          <button
            onClick={removeForm}
            className={
              nunitoSans.className +
              " bg-white rounded-lg py-8 text-3xl font-bold text-center"
            }
          >
            Remove Recruitment Form
          </button>
        </div>
      </div>
      <div className="mt-6 flex-auto ">
        <Link
          href={"http://localhost:3000/api/v1/recruitment/dev/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                Developers Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/cartoonist/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                Cartoonist Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/photographer/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                Photographers Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/cw/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                Content Writers Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/pr/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                PR Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/video-editor/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                video Editor Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
        <Link
          href={"http://localhost:3000/api/v1/recruitment/gd/export"}
          className="my-6 mr-6"
        >
          <button>
            <span className="flex flex-row bg-slate-200 p-5 rounded-xl my-6">
              <div
                className={
                  poppins.className +
                  " text-xl font-bold text-emerald-500 text-center pr-2"
                }
              >
                Graphics-Designer Recruitment Data
              </div>
              <div>
                <ArrowDownCircleIcon width={30} className="text-emerald-500" />
              </div>
            </span>
          </button>
        </Link>
      </div>
      <div className="my-5">
        <h2
          className={
            ibmPlexSerif.className +
            " text-zinc-800 text-5xl font-semibold py-8"
          }
        >
          Control TSP form
        </h2>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <button
            onClick={() => publishForm(tspNotice)}
            className={
              nunitoSans.className +
              " bg-white rounded-lg py-8 text-3xl font-bold text-center"
            }
          >
            Publish TSP-form
          </button>

          <button
            onClick={removeForm}
            className={
              nunitoSans.className +
              " bg-white rounded-lg py-8 text-3xl font-bold text-center"
            }
          >
            Remove TSP-form
          </button>
        </div>
      </div>
      <Link href={tspFormUrl}>
        <button>
          <span className="flex flex-row bg-slate-200 p-5 rounded-xl mb-12">
            <div
              className={
                poppins.className +
                " text-xl font-bold text-emerald-500 text-center pr-2"
              }
            >
              TSP Submitted data
            </div>
            <div>
              <ArrowDownCircleIcon width={30} className="text-emerald-500" />
            </div>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default EventsPage;
