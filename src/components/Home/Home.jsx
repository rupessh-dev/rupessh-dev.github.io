import Navbar from "../Navbar/Navbar";
import CategoryTitle from "../../hooks/CategoryTitle";
import About from "../About/About";
import Experience from "../Experience/Experience";
import Projects from "../Projects/Projects";
import Skills from "../Skills/Skills";
import Achievements from "../Achievements/Achievements";
import Education from "../Education/Education";
import Footer from "../Footer/Footer";
const Home = ({ data }) => {
  return (
    <>
      <Navbar data={data} />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5 min-h-[60vh]">
        <div className="w-full max-w-full flex flex-col">
          <About CategoryTitle={CategoryTitle} data={data} />
          <Experience CategoryTitle={CategoryTitle} data={data} />
          <Projects CategoryTitle={CategoryTitle} data={data} />
          <Skills CategoryTitle={CategoryTitle} data={data} />
          <Achievements CategoryTitle={CategoryTitle} data={data} />
          <Education CategoryTitle={CategoryTitle} data={data} />
        </div>
      </div>
      <Footer data={data}/>
    </>
  );
};
export default Home;
