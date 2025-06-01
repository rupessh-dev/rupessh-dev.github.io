const EducationList = (data, key) => {
  return (
    <>
      <div className="p-4">
        <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2a3762] via-[#3a2956] to-[#181826]">
          <div className="rounded-3xl bg-gradient-to-b from-[#232b44] via-[#181826] to-black p-6 space-y-6">
            {data?.map((item, index) => (
              <div key={`${key}_${index}`} className="flex items-start gap-4">
                {/* Logo */}
                <img
                  src={item.image} // add this to your data or replace with placeholder
                  alt={`${item.college} logo`}
                  className="w-10 h-10 rounded-md shrink-0 bg-white p-1"
                />

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start flex-wrap gap-y-1">
                    <div>
                      <p className="text-white text-base font-medium">
                        {item.college}
                      </p>
                      <p className="text-[#90aecb] text-sm">{item.degree}</p>
                    </div>
                    <p className="text-[#90aecb] text-sm whitespace-nowrap">
                      {item.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default EducationList;
