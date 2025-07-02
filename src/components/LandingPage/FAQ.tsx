import React, { useState } from "react";
import { LuArrowRight } from "react-icons/lu";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const Questions = [
    {
      question: "Why choose SkillSync?",
      answer:
        "SkillSync connects Africa’s youth with experienced professionals for hands-on training in high-demand vocational skills. Our platform focuses on real-world learning, personalized mentorship, and long-term career growth.",
    },
    {
      question: "What types of skills can I learn?",
      answer:
        "We offer training in a variety of vocational trades such as carpentry, electrical work, plumbing, tailoring, and more—skills that drive community development and open doors to sustainable careers.",
    },
    {
      question: "How does the mentorship work?",
      answer:
        "We match learners with verified, skilled tutors for 1:1 mentorship. You’ll receive practical guidance, personalized instruction, and support tailored to your pace and goals from your Tutor.",
    },
    {
      question: "How can I join SkillSync as a learner?",
      answer:
        "Simply sign up on our platform, choose a skill you’re passionate about, and get matched with a qualified mentor to begin your learning journey.",
    },
    {
      question: "Can I become a tutor on SkillSync?",
      answer:
        "Absolutely. If you're an experienced craftsperson or skilled professional, you can apply to become a mentor and share your knowledge with the next generation of learners.",
    },
    {
      question: "Is SkillSync available across all of Africa?",
      answer:
        "Availability may vary by region, so check our website for current locations and supported areas.",
    },
  ];

  const toggleAnswer = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-start gap-0 max-w-[1300px] mx-auto px-8 max-lg:px-5">
        <h1 className="text-5xl max-md:text-3xl leading-tight font-medium YoungSerif mb-10 text-text-color-black/85">
          FAQs
        </h1>
        {Questions.map((item, index) => (
          <div
            key={index}
            className=" py-4 max-md:px-0 max-lg:px-0 bg-transparent border-b w-full flex justify-between items-start gap-5"
          >
            <div className="flex flex-col items-start justify-start">
              <h1
                onClick={() => toggleAnswer(index)}
                className="cursor-pointer font-normal tracking-tight text-lg leading-5 min-h-[40px] w-full flex items-center justify-start"
              >
                {index + 1}. {item.question}
              </h1>
              <p
                className={`text-base text-textWeak leading-normal font-normal transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                {item.answer}
              </p>
            </div>
            <button
              onClick={() => toggleAnswer(index)}
              className=" h-[30px] aspect-square rounded-full transition duration-150 text-dark-text/50 hover:bg-card-bg hover:text-main-color flex items-center justify-center   "
            >
              <LuArrowRight className="text-lg text-textWeak stroke-[2px] " />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQ;
