"use client"
import { useEffect } from "react";
const Events = () => {

    useEffect(()=>{
        const Quill = window.Quill
        if(Quill){
        const quill = new Quill("#editor", {
            theme: "snow",
        })
    }
    }, [])

    return(
        <div className="bg-amber-50">

            <div className="h-[45vh] w-full bg-slate-100 flex flex-col md:flex-row items-center md:items-start ">

                <div className="items-center justify-center flex pl-12 p-8 h-full w-[370px] lg:w-[390px] bg-slate-200 "> <img className="h-[90%]" src="https://ukfcet.ac.in/education4.0/wp-content/uploads/2021/04/hackathon.jpg"></img> </div>
                <div className="  mt:p-6 mt-6 lg:mt-12 w-[90vw] sm:w-[75vw] flex   flex-col justify-start mb-16 lg:justify-evenly lg:mb-2">
                    
                    <div><h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold p-2 font-sans mb-2 bg-gray-200/50"><span className="font-bold underline">Title</span>: NST web dev hackathon</h1></div>
                    <div ><h1 className="text-base sm:text-xl lg:text-2xl font-semibold p-2 font-sans bg-gray-200/50"><span className="font-bold underline">Short Description</span>: In this hackathon participants are going to get 24 hours time to make a project from a theme selected from the provided ones and will submit that on the platform nxtup. If you face any difficulty you can solve that yourself then maybe using gpt or anything, if you would be unable to solve your own probelm you can quit</h1></div>
                </div>


            </div>

            <div className="w-full sm:w-[90vw] mx-auto p-1 sm:p-12 bg-yellow-50/10 md:mt-0 mt-[38vh]">
            
            <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />


            <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br /></p>
            <p className="text-lg">
Newton School is a prominent online ed-tech platform that aims to bridge the gap between talented individuals and the rapidly evolving tech industry. Founded in 2019, Newton School focuses on providing high-quality, industry-relevant education in software engineering and data science. The platform offers live coding classes, career-focused mentorship, and job placement assistance to help students transition from non-technical backgrounds or early-career stages into roles at top tech companies.

Key aspects of Newton School include:

Full-Stack Development Training: The main focus of Newton School is on full-stack web development, covering both frontend and backend technologies such as HTML, CSS, JavaScript, React, Node.js, and databases.
Job Assistance: Newton School partners with several companies to ensure students get real-world job opportunities. They help learners prepare for technical interviews and ensure that successful graduates are placed in top companies in the tech industry.
Zero Fees Until Placement: One of the unique features of Newton School is its "Pay After Placement" model. This means students do not have to pay any fees for the course upfront. They only pay a fee once they secure a job that meets a certain salary threshold.
Mentorship and Community: The platform offers personalized mentorship, where students are guided by industry professionals who provide insights into coding, career development, and interview preparation.
Diverse Learners: Newton School focuses on making tech education accessible to people from diverse backgrounds, helping individuals who might not have traditional computer science degrees to succeed in the tech industry.
Siddharth Maheshwari (Co-founder of Newton School):
Siddharth Maheshwari is the co-founder and CEO of Newton School. Before founding Newton School, Siddharth worked in various roles in the tech and education sectors. His background includes a strong foundation in computer science, and he has been a strong advocate for improving access to high-quality tech education, especially for individuals from non-technical backgrounds.

Siddharth and his team launched Newton School to address a critical gap in the traditional education system, where many aspiring software engineers and developers struggle to find opportunities due to lack of experience, resources, or relevant training. His vision for Newton School is to democratize access to top-tier education, helping people land jobs at leading companies like Amazon, Google, and Microsoft without requiring a formal computer science degree.

Under his leadership, Newton School has seen rapid growth, and it has successfully helped thousands of students transition to tech careers.</p>
            </div>


            <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>


            </div>

        </div>
    )
}

export default Events;