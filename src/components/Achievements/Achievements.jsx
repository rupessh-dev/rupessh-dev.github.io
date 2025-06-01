import { FaTrophy } from "react-icons/fa";
const Achievements = ({ data, CategoryTitle }) => {
  return (
    <>
      <CategoryTitle title="Achievements" navid="achievements"/>
      <div className="p-4">
        <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2a3762] via-[#3a2956] to-[#181826]">
          <div className="rounded-3xl bg-gradient-to-b from-[#232b44] via-[#181826] to-black p-6 space-y-4">
            {data?.achievements?.map((achievement, index) => (
              <div
                key={`achievement_${index}`}
                className="flex items-center gap-2 cursor-default transition-colors"
              >
                <FaTrophy className="text-yellow-400 text-sm flex-shrink-0" />
                <p className="text-white text-base font-normal leading-relaxed flex-1">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Achievements;
