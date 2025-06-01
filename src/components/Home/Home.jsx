import {memo} from "react";
import Navbar from "../Navbar/Navbar";
import CategoryTitle from "../../hooks/CategoryTitle";
import About from "../About/About";
import Experience from "../Experience/Experience";
import Projects from "../Projects/Projects";
import Skills from "../Skills/Skills";
import Achievements from "../Achievements/Achievements";
import Education from "../Education/Education";
import Footer from "../Footer/Footer";
const MemoizedNavbar = memo(Navbar);
const MemoizedCategoryTitle = memo(CategoryTitle);
const MemoizedAbout = memo(About);
const MemoizedExperience = memo(Experience);
const MemoizedProjects = memo(Projects);
const MemoizedSkills = memo(Skills);
const MemoizedAchievements = memo(Achievements);
const MemoizedEducation = memo(Education);
const MemoizedFooter = memo(Footer);
const Home = ({ data }) => {
  return (
    <>
      <MemoizedNavbar data={data} />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5 min-h-[60vh] pt-30">
        <div className="w-full max-w-full flex flex-col">
          <MemoizedAbout CategoryTitle={MemoizedCategoryTitle} data={data} />
          <MemoizedExperience CategoryTitle={MemoizedCategoryTitle} data={data} />
          <MemoizedProjects CategoryTitle={MemoizedCategoryTitle} data={data} />
          <MemoizedSkills CategoryTitle={MemoizedCategoryTitle} data={data} />
          <MemoizedAchievements CategoryTitle={MemoizedCategoryTitle} data={data} />
          <MemoizedEducation CategoryTitle={MemoizedCategoryTitle} data={data} />
        </div>
      </div>
      <MemoizedFooter data={data}/>
    </>
  );
};
export default Home;
