const SkillList = (data, key) => {
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
    {data?.map((item, index) => (
      <div
        key={`${key}_${index}`}
        className="flex flex-col items-start justify-center gap-y-1 rounded-xl px-4 py-2 hover:bg-[#4a5568] transition-colors duration-150 cursor-default bg-[#000000] p-3 text-white border-gray-800 border-1"
      >
        <div className="flex items-center gap-x-2 text-gray-300 text-sm font-medium leading-normal">
          {/* <img src={item.icon} alt={item.name} className="w-4 h-4" /> */}
          {item.name}
        </div>
  
        {item.subSkills && (
          <div className="flex flex-wrap gap-2">
            {item.subSkills.map((subSkill, subIndex) => (
              <span key={`${key}_${index}_${subIndex}`} className="text-xs text-gray-300">
                {subSkill}
              </span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
  
  );
};
export default SkillList;
