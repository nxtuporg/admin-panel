"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Events = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [date, setDate] = useState("");
  const [image, setImage] = useState(
    "https://loremflickr.com/200/200?random=1"
  );
  const [eventBody, seteventBody] = useState("");

  useEffect(() => {
    // fetchData();

    const Quill = window.Quill;
    if (Quill) {
      const quill = new Quill("#editor", {
        theme: "snow",
      });
    };
  }, []);

  async function handleClick() {
    const quill = new Quill("#editor");
    const delta = quill.getContents();
    // console.log(delta)

    function deltaToMarkdown(delta) {
      let markdown = "";

      delta.ops.forEach((op) => {
        if (op.insert) {
          const text = op.insert;

          // Check for attributes like bold, italic, etc.
          if (op.attributes) {
            if (op.attributes.bold) {
              markdown += `**${text}**`;
            } else if (op.attributes.italic) {
              markdown += `*${text}*`;
            } else if (op.attributes.underline) {
              markdown += `<u>${text}</u>`; // Markdown does not natively support underline.
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
    }

    const markdown = deltaToMarkdown(delta);

    // seteventBody(markdown);
    // const fetchData = async () => {
    try {
      var { data: axres } = await axios.post("/api/events", {
        name,
        description,
        date: 1243567,
        image,
        body: markdown,
      });
      if (axres.status) {
        toast.success(axres.message);
        router.push("/");
      } else {
        toast.error(axres.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    // };
  }
  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      alert("Image uploaded successfully!");
    }
    var form = new FormData();
    form.append("file", file);
    var { data: axres } = axios.post("/api/imageupload", form);

    // fetch('/api/imageupload', { method: 'POST', body:  });
  };

  return (
    <div className="bg-amber-50 text-black">
      <div className="h-[45vh] w-full bg-slate-100 flex flex-col md:flex-row items-center md:items-start ">
        <div className=" items-center justify-center flex pl-12 p-8 h-full w-[370px] lg:w-[390px] bg-slate-200 ">
          {" "}
          <img
            className="h-[90%]"
            src="https://loremflickr.com/200/200?random=1"
          ></img>{" "}
        </div>
        <div className="  md:p-6 mt-1 w-[90vw] sm:w-[75vw] flex   flex-col justify-around mb-16  lg:mb-2 gap-6">
          <button
            onClick={handleClick}
            className="bg-purple-500 self-end mr-6 mt-8 focus:bg-purple-500/90  hover:scale-95 md:mt-1 text-white w-20 h-10 rounded-xl font-semibold "
          >
            Add
          </button>

          <input
            type="text"
            value={name}
            onChange={(el) => setName(el.currentTarget.value)}
            placeholder="Enter the title "
            className="w-[96%] ml-5 p-3 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
          />

          <textarea
            value={description}
            onChange={(el) => setDescription(el.currentTarget.value)}
            placeholder="Enter the short description"
            className="w-[96%] ml-5 p-3 h-40 rounded-lg border border-gray-300 shadow-md bg-white text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:shadow-lg transition-all"
          ></textarea>
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
          <p className="text-lg">
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
