const Experience = ({ CategoryTitle, data }) => {
  return (
    <>
      <CategoryTitle title="Work Experience" navid="experience"/>
      <div className="space-y-6 px-4 py-6">
        <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2a3762] via-[#3a2956] to-[#181826]">
          <div className="rounded-3xl bg-gradient-to-b from-[#232b44] via-[#181826] to-black p-4 sm:p-8 space-y-6">
            {data.workExperience.map((item, index) => (
              <div
                className="flex flex-col gap-2"
                key={`${item.company}-${index}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.company}
                    className="w-10 h-10 rounded-md shrink-0 bg-white p-1"
                  />
                  <div className="flex-1 flex flex-wrap justify-between items-center">
                    <div>
                      <p className="text-white text-base font-medium">
                        {item.company}
                      </p>
                      <p className="text-[#90aecb] text-sm">
                        {item.designation}
                      </p>
                    </div>
                    <p className="text-[#90aecb] text-sm whitespace-nowrap">
                      {item.duration}
                    </p>
                  </div>
                </div>
                <ul className="list-disc list-outside mt-2 text-[#90aecb] text-sm space-y-1 pl-14 sm:pl-14">
                  {item.summary.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Experience;
