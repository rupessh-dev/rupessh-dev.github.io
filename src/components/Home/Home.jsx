import {memo, useEffect, useRef} from "react";
import Navbar from "../Navbar/Navbar";
import CategoryTitle from "../../hooks/CategoryTitle";
import About from "../About/About";
import Experience from "../Experience/Experience";
import Projects from "../Projects/Projects";
import Skills from "../Skills/Skills";
import Achievements from "../Achievements/Achievements";
import Education from "../Education/Education";
import Footer from "../Footer/Footer";
import AnimatedBackground from "../AnimatedBackground";

const MemoizedNavbar = memo(Navbar);
const MemoizedCategoryTitle = memo(CategoryTitle);
const MemoizedAbout = memo(About);
const MemoizedExperience = memo(Experience);
const MemoizedProjects = memo(Projects);
const MemoizedSkills = memo(Skills);
const MemoizedAchievements = memo(Achievements);
const MemoizedEducation = memo(Education);
const MemoizedFooter = memo(Footer);
const MemoizedAnimatedBackground = memo(AnimatedBackground);

const Home = ({ data }) => {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const achievementsRef = useRef(null);
  const educationRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const refs = [aboutRef, experienceRef, projectsRef, skillsRef, achievementsRef, educationRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <MemoizedAnimatedBackground />
      <div className="relative z-10">
        <MemoizedNavbar data={data} />
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5 min-h-[60vh] pt-30">
          <div className="w-full max-w-full flex flex-col">
            <div ref={aboutRef} className="opacity-0">
              <MemoizedAbout CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
            <div ref={experienceRef} className="opacity-0">
              <MemoizedExperience CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
            <div ref={projectsRef} className="opacity-0">
              <MemoizedProjects CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
            <div ref={skillsRef} className="opacity-0">
              <MemoizedSkills CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
            <div ref={achievementsRef} className="opacity-0">
              <MemoizedAchievements CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
            <div ref={educationRef} className="opacity-0">
              <MemoizedEducation CategoryTitle={MemoizedCategoryTitle} data={data} />
            </div>
          </div>
        </div>
        <MemoizedFooter data={data}/>
      </div>

      {/* Add custom animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          /* Add smooth transitions for interactive elements */
          a, button {
            transition: all 0.3s ease;
          }

          /* Add hover effects for cards and interactive elements */
          .hover-scale {
            transition: transform 0.3s ease;
          }

          .hover-scale:hover {
            transform: scale(1.02);
          }

          /* Add smooth transitions for category titles */
          .category-title {
            transition: all 0.3s ease;
          }

          /* Add smooth transitions for skill bars */
          .skill-bar {
            transition: width 1s ease-in-out;
          }

          /* Add smooth transitions for project cards */
          .project-card {
            transition: all 0.3s ease;
          }

          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          /* Add smooth transitions for experience items */
          .experience-item {
            transition: all 0.3s ease;
          }

          .experience-item:hover {
            transform: translateX(5px);
          }

          /* Add smooth transitions for achievement items */
          .achievement-item {
            transition: all 0.3s ease;
          }

          .achievement-item:hover {
            transform: scale(1.02);
          }

          /* Add smooth transitions for education items */
          .education-item {
            transition: all 0.3s ease;
          }

          .education-item:hover {
            transform: translateX(5px);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
