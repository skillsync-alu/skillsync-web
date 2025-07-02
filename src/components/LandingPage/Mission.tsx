import React from "react";

function Mission() {
  return (
    <div id="mission" className="w-full">
      {/* Our Mission */}
      <div className="w-full h-fit max-w-[1300px] mx-auto mb-32 max-md:mb-10 grid grid-cols-2 max-lg:flex max-lg:flex-col gap-14 max-lg:gap-5 px-8 max-lg:px-5 ">
        <div className="w-full h-full max-h-[650px] max-lg:h-[300px] relative shadow-xl rounded-3xl">
          <img
            src={
              "https://images.pexels.com/photos/5905483/pexels-photo-5905483.jpeg?_gl=1*1q23k9f*_ga*MjA4NTk4MjE0NC4xNzQwNDczMTc5*_ga_8JE65Q40S6*czE3NTE0Mzg3NzgkbzQkZzEkdDE3NTE0Mzg4OTQkajIyJGwwJGgw"
            }
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full h-full max-h-[650px] py-10 flex flex-col">
          <h1 className="text-sm mb-0 text-text-color-black/80">OUR MISSION</h1>
          <h1 className="text-5xl max-md:text-3xl leading-tight font-medium YoungSerif my-6 text-text-color-black/85">
            Empowering <br /> Tomorrow
          </h1>
          <h1 className="mb-0 font-normal text-lg max-w-[480px] max-lg:max-w-full text-text-color-black/80">
            We bridge the gap between emerging talent across Africa and
            experienced craftspeople, fostering practical education that
            strengthens communities. Our platform enables immersive skill
            development in trades that drive economic growth and open doors to
            sustainable careers.
          </h1>
          <div className="flex-1 w-full flex flex-col items-start justify-end">
            <div className="w-full max-w-[500px] mt-6 grid grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3 text-text-color-black/65">
              <div className="flex items-center rounded-xl justify-start gap-3 font-medium text-lg max-lg:text-lg">
                • Vocational Focus
              </div>
              <div className="flex items-center rounded-xl justify-start gap-3 font-medium text-lg max-lg:text-lg">
                • Expert Matching
              </div>
              <div className="flex items-center rounded-xl justify-start gap-3 font-medium text-lg max-lg:text-lg">
                • Community Impact
              </div>
              <div className="flex items-center rounded-xl justify-start gap-3 font-medium text-lg max-lg:text-lg">
                • Career Pathways
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
