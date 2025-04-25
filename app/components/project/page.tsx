"use client"
import { useState } from "react";
import type { ProjectItem } from "@/app/data/project";

interface ProjectProps {
  projects: ProjectItem[];
}

const Project: React.FC<ProjectProps> = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="project" className="mb-24 lg:mb-36">
      <h1 className="lg:hidden text-teal-400 font-bold pb-4 uppercase text-xl">
        Project
      </h1>
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block lg:flex mb-8 p-4 transition-all duration-300 ${
            hoveredProject === null || hoveredProject === index
              ? "opacity-100"
              : "opacity-30"
          }`}
          onMouseEnter={() => setHoveredProject(index)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className="lg:w-1/3 mb-4 lg:mb-0">
            <img
              src={project.imgSrc}
              alt={project.title}
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div className="lg:w-2/3 lg:pl-6">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="text-base mb-4 opacity-60">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-teal-700 text-teal-400 font-bold bg-opacity-30 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
      <a
        href="/archive"
        className="font-bold hover:text-teal-400 opacity-100 cursor-pointer"
      >
        View Full Project Archive
      </a>
    </section>
  );
};

export default Project;
