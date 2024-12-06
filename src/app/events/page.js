"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const Events = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const quillRef = useRef(null);
  const [inputs, setinputs] = useState({ type: 'CLAN' })
  const [image, setImageUrl] = useState(null)

  const router = useRouter();

  useEffect(() => {
    const Quill = window.Quill;
    if (Quill) {
      quillRef.current = new Quill("#editor", {
        theme: "snow",
      });
    }
  }, []);

  const deltaToMarkdown = (delta) => {
    let markdown = "";

    delta.ops.forEach((op) => {
      if (op.insert) {
        const text = op.insert;

        if (op.attributes) {
          if (op.attributes.bold) {
            markdown += `**${text}**`;
          } else if (op.attributes.italic) {
            markdown += `*${text}*`;
          } else if (op.attributes.underline) {
            markdown += `<u>${text}</u>`;
          } else if (op.attributes.link) {
            markdown += `[${text}](${op.attributes.link})`;
          } else {
            markdown += text;
          }
        } else {
          markdown += text;
        }
      }
    });

    return markdown;
  };

  const handleClick = () => {
    console.log("inputs");

    let markdown = "";
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      markdown = deltaToMarkdown(delta);
      console.log(markdown);
    }

    const OurBody = { ...inputs, body: markdown, image };
    console.log();
    fetch("/api/events", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(OurBody), // Ensure OurBody is a valid object to be stringified
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response data here
        router.replace(`/events/Register?id=${data.id}&type=AllEvents`);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  };

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      alert("Image uploaded successfully!");
    }
    var form = new FormData();
    form.append("file", file);
    var { data: axres } = await axios.post(
      "https://backend-newton-product-non-admin-1.onrender.com/api/uploadImage",
      form
    );
    console.log(axres.filePath);
    setImageUrl(axres.filePath);

    // fetch('/api/imageupload', { method: 'POST', body:  });
  };

  return (
    <div className="bg-amber-50 text-black">
      <div className="min-h-[45vh] w-full bg-slate-100 flex flex-col md:flex-row items-center md:items-start">
        <div className="flex items-center justify-center pl-12 p-8 min-h-[45vh] w-[370px] lg:w-[390px] bg-slate-200">
          <div className="/h-[80%] w-[80%] border-2 h-[32vh] border-black border-dashed flex items-center justify-center bg-white">
            {selectedImage ? (
              <img
                className="z-3 object-contain h-full w-full"
                src={selectedImage}
                alt="Uploaded preview"
              />
            ) : (
              <p></p>
            )}
            <button
              onClick={handleUploadClick}
              className=" hover:scale-95 cursor-pointer  h-16"
            >
              {selectedImage ? (
                <></>
              ) : (
                <img
                  className="h-20 border-gray-200 border-2"
                  src="https://t3.ftcdn.net/jpg/04/92/94/70/360_F_492947093_LOGkIRfXScJs3PS2tgjJ4lGR74B0hs7Z.jpg"
                ></img>
              )}
            </button>
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="md:p-6 mt-1 w-[90vw] sm:w-[75vw] flex flex-col justify-around mb-16 lg:mb-2 gap-6">
          <div className="flex flex-row flex-wrap gap-2">
            <input
              type="Date"
              value={inputs?.day || ""}
              onChange={(el) => {
                setinputs((prev) => ({ ...prev, day: el.target?.value }));
              }}
              placeholder="Date"
              className="w-36 ml-5 p-3 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
            />
            <input
              type="time"
              placeholder="Time"
              value={inputs?.time || ""}
              onChange={(el) => {
                setinputs((prev) => ({ ...prev, time: el.target?.value }));
              }}
              className="w-32 ml-5 p-3 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
            />
            <input
              type="text"
              placeholder="Location"
              value={inputs?.address || ""}
              onChange={(el) => {
                setinputs((prev) => ({ ...prev, address: el.target?.value }));
              }}
              className="w-52 ml-5 p-3 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
            />
            <div className="flex flex-row">
              <select
                value={inputs?.type || "CLAN"}
                className="w-20 ml-4 rounded-2xl"
                onChange={(el) => {
                  setinputs((prev) => ({ ...prev, type: el.target?.value }));
                }}
              >
                <option value={"CLAN"}>CLAN</option>
                <option value="CLUB">CLUB</option>
              </select>
              <button
                onClick={handleClick}
                className={`${OurBody}  my-auto self-end right-4 absolute mt-8 focus:bg-purple-500/90 hover:scale-95    md:mt-1 text-white w-20 h-10 rounded-xl font-semibold `}
              >
                Add
              </button>
              {/* <button
                onClick={handleClick}
                className="bg-purple-500 my-auto self-end right-28 absolute  mt-8 focus:bg-purple-500/90 hover:scale-95 md:mt-1 text-white w-20 h-10 rounded-xl font-semibold"
              >
                Live it
              </button> */}
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter the title"
            value={inputs?.name || ""}
            onChange={(el) => {
              setinputs((prev) => ({ ...prev, name: el.target?.value }));
            }}
            className="w-[96%] ml-5 p-3 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
          />
          <textarea
            placeholder="Enter the short description"
            value={inputs?.description || ""}
            onChange={(el) => {
              const value = el.target.value;
              // Split the input by spaces and filter out empty strings to count words
              const wordCount = value.trim().split(/\s+/).length;

              // If the word count is less than or equal to 50, update the state
              if (wordCount <= 50) {
                setinputs((prev) => ({ ...prev, description: value }));
              }
            }}
            className="w-[96%] ml-5 p-3 h-40 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
    focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
          />
        </div>
      </div>

      <div className="w-full sm:w-[90vw] mx-auto p-1 sm:p-12 bg-yellow-50/10 md:mt-0 mt-[38vh]">
        <link
          href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css"
          rel="stylesheet"
        />
        <div id="editor">
          <p>Hello World!</p>
          <p>
            Some initial <strong>bold</strong> text
          </p>
          <p>
            <br />
          </p>

          <p className="text-lg text-black">
            Newton School is a prominent online ed-tech platform that aims to
            bridge the gap between talented individuals and the rapidly evolving
            tech industry. Founded in 2019, Newton School focuses on providing
            high-quality, industry-relevant education in software engineering
            and data science. The platform offers live coding classes,
            career-focused mentorship, and job placement assistance to help
            students transition from non-technical backgrounds or early-career
            stages into roles at top tech companies. Key aspects of Newton
            School include: Full-Stack Development Training: The main focus of
            Newton School is on full-stack web development, covering both
            frontend and backend technologies such as HTML, CSS, JavaScript,
            React, Node.js, and databases. Job Assistance: Newton School
            partners with several companies to ensure students get real-world
            job opportunities. They help learners prepare for technical
            interviews and ensure that successful graduates are placed in top
            companies in the tech industry. Zero Fees Until Placement: One of
            the unique features of Newton School is its Pay After Placement
            model. This means students do not have to pay any fees for the
            course upfront. They only pay a fee once they secure a job that
            meets a certain salary threshold. Mentorship and Community: The
            platform offers personalized mentorship, where students are guided
            by industry professionals who provide insights into coding, career
            development, and interview preparation. Diverse Learners: Newton
            School focuses on making tech education accessible to people from
            diverse backgrounds, helping individuals who might not have
            traditional computer science degrees to succeed in the tech
            industry. Siddharth Maheshwari (Co-founder of Newton School):
            Siddharth Maheshwari is the co-founder and CEO of Newton School.
            Before founding Newton School, Siddharth worked in various roles in
            the tech and education sectors. His background includes a strong
            foundation in computer science, and he has been a strong advocate
            for improving access to high-quality tech education, especially for
            individuals from non-technical backgrounds. Siddharth and his team
            launched Newton School to address a critical gap in the traditional
            education system, where many aspiring software engineers and
            developers struggle to find opportunities due to lack of experience,
            resources, or relevant training. His vision for Newton School is to
            democratize access to top-tier education, helping people land jobs
            at leading companies like Amazon, Google, and Microsoft without
            requiring a formal computer science degree. Under his leadership,
            Newton School has seen rapid growth, and it has successfully helped
            thousands of students transition to tech careers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Events;
