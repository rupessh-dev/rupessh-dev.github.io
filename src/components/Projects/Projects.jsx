const Projects = ({ CategoryTitle, data }) => {
  return (
    <>
      <CategoryTitle title="Projects" navid="projects"/>
      <div className="p-4">
        <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2a3762] via-[#3a2956] to-[#181826]">
          <div className="rounded-3xl bg-gradient-to-b from-[#232b44] via-[#181826] to-black p-8 space-y-6">
            {data.projects.map((project, index) => (
              <div key={`${project.title}-${index}`}>
                <div
                  className="flex flex-col gap-2"
                 
                >
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={project.image}
                        alt={`${project.title} logo`}
                        className="w-10 h-10 rounded-md shrink-0 bg-white p-1"
                      />
                      <div className="truncate">
                        <p className="text-white text-base font-bold leading-tight truncate">
                          {project.title}
                        </p>
                        <p className="text-[#90aecb] text-sm font-semibold truncate">
                          {project.company}
                        </p>
                      </div>
                    </div>
                    {project.link !== "" && (
                      <div className="shrink-0 order-1 hidden sm:block">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="flex items-center justify-center h-8 px-4 text-sm font-medium hover:bg-[#2c475f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90aecb] transition-all rounded-xl bg-[#000000] p-3 text-white border-gray-800 border-1">
                            View Project
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                  <ul className="text-[#90aecb] text-sm list-disc pl-14 space-y-1 pt-2">
                    {project.summary.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  {project.link !== "" && (
                    <div className="shrink-0 block sm:hidden mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="flex items-center justify-center h-8 px-4 text-sm font-medium hover:bg-[#2c475f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90aecb] transition-all w-full rounded-xl bg-[#000000] p-3 text-white border-gray-800 border-1">
                          View Project
                        </button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
