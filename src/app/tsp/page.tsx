<<<<<<< HEAD
export default function TspBanner() {
  return (
    <>
      <div>
        <header className="w-1/3 mx-auto  mt-4 mb-3">
          <img src="./tht_logo.png" alt="" />
          <div className="flex flex-col items-center justify-center text-center space-y-3 ">
            <i className="text-5xl font-semibold text-[#0C2D58]">presents</i>
            <i className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse leading-[1.2]">TRAINEE SCHOLARS PROGRAM</i>

           
          </div>
        </header>

        <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-1/2 mx-auto mt-8" />
        <div className="min-h-screen mt-8  p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Domains Section */}
              <div className=" shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 ">Domains</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>Writing</strong> - Language is not a barrier to a writer, be it Hindi, English, Bengali, or any other language. If you want to write, join in. If you are already a writer, you will love this community.
                  </li>
                  <li>
                    <strong>Graphics designing</strong> - Playing around with shapes in Paint is fun, but only until you touch the tools in Photoshop. Explore the world of editing with live interactive sessions.
                  </li>
                  <li>
                    <strong>Photography</strong> - Ask around and you will find photographers everywhere, but somebody certified by Nat Geo is rare. Learn and join us in the Photo walks.
                  </li>
                  <li>
                    <strong>Technical</strong> - The curriculum assumes you are an expert in programming languages already, we won't. If you want to start from scratch, we are here for you. If you want to jump to the next level, we are still here for you.
                  </li>
                  <li>
                    <strong>Digital art</strong> - To all the artists and those who wish to learn digital painting. This is 'THE OPPORTUNITY' to learn digital painting. We will teach you to hold the digital paintbrush and create freely.
                  </li>
                  <li>
                    <strong>Video editing</strong> - The beat drops and the frame shifts, qualties of an exquisite clips. If you wish to make mind-blowing videos, explore the world of Premiere Pro with us and let your creativity run wild.
                  </li>
                </ul>
              </div>

              {/* Rules Section */}
              <div className=" shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 ">Rules</h2>
                <ul className="space-y-4">
                  <li>We are not going to mark the best work, but the best efforts across all domains to choose the final winners.</li>
                  <li>Each session you attend gets you 2 additional points.</li>
                  <li>For each task you complete,there will be a total marking of 10 points, which will be split as follows:</li>
                  <ul className="list-disc ml-6">
                    <li>Satisfactory work delivered - 2 points</li>
                    <li>Documentation (word doc or PDF) - 5 points</li>
                    <li>Creative initiatives (don't just follow the rules and steps, explore as wildly as you can) - 3 points</li>
                    <li>On completing of an attendance streak for 5 meetings earns a bonus of 5 points.</li>
                    <li>An extra point per meet will be awarded for effective interactions during the meetings. Each meeting will be continuously monitored by our volunteers.</li>
                  </ul>
                  <li>The prizes are alluring, but the competition will be even more adventurous. So jump in and let your imagination run wild and don't be  satisfied until you achieve the top prize.</li>

                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg" />

        <div className="flex flex-col items-center mt-10  h-screen">
          <img className="w-1/3 mb-5" src="./tht_logo.png" alt="" />
          <div className=" flex items-center justify-center p-5">
            <div className="max-w-3xl shadow-lg p-6 rounded-lg">
=======
"use client";
import ScheduleComponent from "@/components/formcomponents/tspSchedule";

export default function TspBanner() {
  return (
    <>
      <div className="relative bg-gradient-to-r from-teal-700 to-orange-600 text-white mb-10">
        <header className="sm:w-3/4 w-screen  mx-auto mt-4 mb-[20px]">
          {/* <img src="./tht_logo.png" alt="" /> */}
          <div className="flex flex-col items-center px-2 justify-center text-center space-y-3 ">
            {/* <i className="text-[25px] font-semibold text-[#0C2D58]">presents</i> */}
            <img src="./tsp-banner-2025.png" alt="" className="mx-auto mt-5" />

          </div>
        </header>
        {/* <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-3/4 mx-auto" /> */}

            {/* <i className="flex flex-col items-center justify-center text-center text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse leading-[1.2]">TRAINEE SCHOLARS PROGRAM</i> */}
        <div className="flex flex-col items-center mt-10 mb-10">
          <img className="w-auto h-20 sm:h-28 mb-[10px]" src="./tht_logo.png" alt="" />
          <button
              onClick={
                ()=>{
                  window.location.href="/forms/tsp-form"
                }
              }
              className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
            >
            
              <span
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-xl transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
              ></span>

              <span
                className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
              ></span>

              <div
                className="relative flex items-center justify-between py-2 sm:py-3 px-3 sm:px-6 text-sm sm:text-lg text-white rounded-xl transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
              >
                <span className="select-none">Fill Out the Form</span>

                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                >
                  <path
                    // clip-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    // fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
          </button>
          <div className=" flex items-center justify-center p-5">
            <div className="max-w-3xl bg-slate-300/30 shadow-2xl p-6 rounded-lg">
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
              <p className="text-lg">
                <strong>The Trainee Scholars Program</strong>, brought to you by{" "}
                <strong>The HIT Times</strong>, presents the
                opportunity for young and enthusiastic minds to follow their passion
                and excel in something they truly want to do.
              </p>

              <p className="mt-4">
<<<<<<< HEAD
                As a part of the college's official media and literary club, we
=======
                As a part of the college&apos;s official media and literary club, we
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
                promote a creative culture inside the campus and provide room for
                each and everyone to grow in the field they choose. The senior
                members of our team have had a variety of experiences. Ranging from
                creative creations to cracking placement drives, each one of their
                encounters has taught them a great deal. They are all here for you;
                if you have the zeal to learn, we will be your guiding post to
                success.
              </p>

              <p className="mt-4">
                Join us in this adventure and nurture your passion amongst like minds.
              </p>

              <p className="mt-4">
                We wish you a successful journey ahead.
              </p>

              <p className="mt-6 text-xl font-bold text-right">- The HIT Times</p>
            </div>
          </div>
        </div>
<<<<<<< HEAD

        <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg" />

        <div className="min-h-screen flex items-center justify-center  p-6 mt-10">
          <div className="max-w-2xl bg-white text-gray-900 shadow-2xl p-8 rounded-2xl">
=======
        {/* <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-3/4 mx-auto mt-5" /> */}
        <div className="mt-2 p-6 mb-5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Domains Section */}
              <div className=" shadow-2xl p-6 bg-slate-300/30 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 ">Domains</h2>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-amber-300">Content Writing</strong> - Language is not a barrier to a writer, be it Hindi, English, Bengali, or any other language. If you want to write, join in. If you are already a writer, you will love this community.

                  </li>
                  <li>
                    <strong className="text-amber-300">Graphics designing</strong> - Playing around with shapes in Paint is fun, but only until you touch the tools in Photoshop. Explore the world of editing with live interactive sessions.

                  </li>
                  <li>
                    <strong className="text-amber-300">Photography</strong> - Ask around and you will find photographers everywhere, but somebody certified by National Geographic is rare. Learn and join us in the Photo walks.

                  </li>
                  <li>
                    <strong className="text-amber-300">Web Development</strong> - Transform from coding newbie to digital deity in our intensive program.  Learn HTML, CSS, JavaScript, and React – and build a real-world project. No experience needed – just a healthy dose of caffeine and a willingness to embrace the chaos. Prepare for rapid learning, occasional frustration, and the ultimate reward: actually understanding what you&apos;re doing.

                  </li>
                  <li>
                    <strong className="text-amber-300">Digital art</strong> - To all the artists and those who wish to learn digital painting. This is &apos;THE OPPORTUNITY&apos; to learn digital painting. We will teach you to hold the digital paintbrush and create freely.
                  </li>
                  <li>
                    <strong className="text-amber-300">Video editing</strong> - The beat drops and the frame shifts, qualities of an exquisite clip. If you wish to make mind-blowing videos, explore the world of Premiere Pro with us and let your creativity run wild.
                  </li>
                </ul>
              </div>

              {/* Rules Section */}
              <div className=" shadow-2xl p-6 bg-slate-300/30 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 ">Rules</h2>
                <ul className="space-y-4">
                  <li>We are not going to mark the best work, but the best efforts across all domains to choose the final winners.</li>
                  <li>Each session you attend gets you 2 additional points.</li>
                  <li>For each task you complete,there will be a total marking of 10 points, which will be split as follows:</li>
                  <ul className="list-disc ml-6">
                    <li>Satisfactory work delivered - 2 points</li>
                    <li>Documentation (word doc or PDF) - 5 points</li>
                    <li>Creative initiatives (don&apos;t just follow the rules and steps, explore as wildly as you can) - 3 points</li>
                    <li>On completing of an attendance streak for 5 meetings earns a bonus of 5 points.</li>
                    <li>An extra point per meet will be awarded for effective interactions during the meetings. Each meeting will be continuously monitored by our volunteers.</li>
                  </ul>
                  <li>The prizes are alluring, but the competition will be even more adventurous. So jump in and let your imagination run wild and don&apos;t be  satisfied until you achieve the top prize.</li>

                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* <hr className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-3/4 mx-auto" /> */}

        <div className="bg-transparent flex items-center justify-center p-6 mt-0 mb-10">
          <div className="max-w-2xl bg-slate-300/30 text-white  shadow-2xl p-8 rounded-2xl">
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
            <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 border-b-4 border-yellow-500 inline-block">
              🎉 Exciting Prizes
            </h2>

<<<<<<< HEAD
            <p className="text-lg text-center text-gray-700 mb-6">
=======
            <p className="text-lg text-center  mb-6">
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
              Upon successful completion of the program, the top participants will be awarded based on their performance.
            </p>

            {/* Prize List */}
            <div className="space-y-6">
              <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-md">
<<<<<<< HEAD
                <h3 className="text-2xl font-bold">🥇 1st Winner</h3>
                <p>
                  T-Shirt by <strong>STREET SQUAD</strong> + Flat ₹100 OFF on orders
                  above ₹300 by <strong>CAFE CELESTE</strong>.
                </p>
              </div>

              <div className="bg-gray-400 text-white p-5 rounded-lg shadow-md">
=======
                <h3 className="text-2xl font-bold text-center">🥇 Winner</h3>
                {/* <p>
                  T-Shirt by <strong>STREET SQUAD</strong> + Flat ₹100 OFF on orders
                  above ₹300 by <strong>CAFE CELESTE</strong>.
                </p> */}
              </div>

              {/* <div className="bg-gray-400 text-white p-5 rounded-lg shadow-md">
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
                <h3 className="text-2xl font-bold">🥈 2nd Winner</h3>
                <p>
                  Get <strong>40% OFF</strong> on a T-Shirt by{" "}
                  <strong>STREET SQUAD</strong> + Flat ₹75 OFF on orders above ₹300
                  by <strong>CAFE CELESTE</strong>.
                </p>
              </div>

              <div className="bg-orange-500 text-white p-5 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold">🥉 3rd Winner</h3>
                <p>
                  Get <strong>30% OFF</strong> on a T-Shirt by{" "}
                  <strong>STREET SQUAD</strong> + Flat ₹50 OFF on orders above ₹300
                  by <strong>CAFE CELESTE</strong>.
                </p>
<<<<<<< HEAD
              </div>
            </div>

            {/* Extra Reward */}
            <p className="mt-8 text-lg text-gray-800 font-medium text-center">
              🎖 Above this, all participants will be awarded with{" "}
=======
              </div> */}
            </div>

            {/* Extra Reward */}
            <p className="mt-8 text-lg  font-medium text-center">
              🎖 Apart from this, all participants will be awarded with{" "}
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
              <strong>MAR certificates</strong>.
            </p>
          </div>
        </div>
<<<<<<< HEAD

        

      </div>
=======
        <ScheduleComponent/>
        <div className="flex items-center justify-center">
          <button
            onClick={
              ()=>{
                window.location.href="/forms/tsp-form"
              }
            } 
           className="overflow-hidden mb-5 w-32 p-2 h-12 bg-violet-500 shadow-2xl  text-white border-none rounded-xl text-base font-bold cursor-pointer relative z-10 group"
          >
            Fill The Form!
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
            ></span>
            <span
              className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
              >Explore!
              </span>
          </button>

        </div>

      </div>
      
      
>>>>>>> c9be2c02421cae2c6d127e81e4ed3811d5ee591f
    </>
  );
}

// {/* Background Image */}
// <img
//   src="/tsp-header.png"
//   alt="TSP Header"
//   className="absolute top-0 left-0 w-full h-full object-cover"
// />

// {/* Overlay Content */ }
// <div className="relative z-10 text-center space-y-8 px-6">
//   {/* Main Heading */}
//   <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse leading-[1.2]">
//     TSP - Coming Soon
//   </h1>

//   {/* Subtext */}
//   <p className="text-xl text-gray-200 mt-6 leading-relaxed">
//     We're crafting something incredible. Stay tuned for the big reveal!
//   </p>

//   {/* Call-to-action */}
//   <a
//     href="/"
//     className="mt-12 inline-block px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
//   >
//     Back to Home
//   </a>
// </div>
// </div > 