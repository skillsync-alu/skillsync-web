import React from "react";
import { MdCheckCircle } from "react-icons/md";

function LandingPageFindTutors() {
  return (
    <>
      <div className="w-full h-fit max-w-[1300px] mx-auto mb-32 max-md:mb-10 grid grid-cols-2 max-lg:flex max-lg:flex-col-reverse gap-14 max-lg:gap-5 px-8 max-lg:px-5">
        <div className="w-full h-full max-h-[650px] py-10 flex flex-col">
          <h1 className="text-sm mb-0 text-text-color-black/80">TUTORS</h1>
          <h1 className="text-5xl max-md:text-3xl leading-tight font-medium YoungSerif my-6 text-text-color-black/85">
            Find the Perfect <br /> Tutor for Your <br /> Journey
          </h1>
          <h1 className="mb-0 font-normal text-lg max-w-[480px] max-lg:max-w-full text-text-color-black/80">
            Discover skilled professionals ready to guide your learning journey.
            Our platform connects you with verified experts in your chosen
            field, offering personalized instruction tailored to your pace and
            goals. Start building real-world expertise with mentors who care
            about your success.
          </h1>
          <div className="flex-1 w-full flex flex-col items-start justify-end">
            <div className="w-full max-w-[500px] mt-7 flex flex-col gap-4 text-text-color-black/65">
              {["1:1 Mentorship", "Hands-on Experience"].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-xl justify-start gap-3 font-medium text-lg max-lg:text-lg"
                >
                  <MdCheckCircle className="text-xl" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-full max-h-[650px] max-lg:h-[300px] relative shadow-xl rounded-3xl">
          <img
            src={
              "https://images.pexels.com/photos/5311405/pexels-photo-5311405.jpeg?_gl=1*1f0kle8*_ga*MjA4NTk4MjE0NC4xNzQwNDczMTc5*_ga_8JE65Q40S6*czE3NTE0Mzg3NzgkbzQkZzEkdDE3NTE0NDEyODIkajU5JGwwJGgw"
            }
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </>
  );
}

export default LandingPageFindTutors;
