import { useState } from "react";

interface ExperienceItem {
  title: string;
  period: string;
  description: string;
  link: string;
  skills: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );

  return (
    <section id="experience" className="mb-24 lg:mb-36">
      <h1 className="lg:hidden text-teal-400 font-bold pb-4 uppercase text-xl">
        Experience
      </h1>
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`mb-6 relative p-4 group transition-all duration-300 rounded-lg hover:bg-gray-700 hover:bg-opacity-30 ${
            hoveredExperience === null || hoveredExperience === index
              ? "opacity-100"
              : "opacity-30"
          }`}
          onMouseEnter={() => setHoveredExperience(index)}
          onMouseLeave={() => setHoveredExperience(null)}
        >
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                {experience.title}
              </h3>
              <span className="text-sm font-medium text-teal-400">
                {experience.period}
              </span>
            </div>
            <p className="text-base mb-4 opacity-60">{experience.description}</p>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-teal-700 text-teal-400 font-bold bg-opacity-30 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </a>
        </div>
      ))}
      <a
        href="/gioyapcvresume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold hover:text-teal-400 opacity-100 cursor-pointer"
      >
        View Full Resume
      </a>
    </section>
  );
};

export default Experience;
