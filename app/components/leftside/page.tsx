import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  return (
    <div>
      <div className="flex flex-col items-start text-white h-full mb-12">
        <h1 className="text-4xl font-bold mb-4">Gio Edrian L. Yap</h1>
        <h2 className="text-2xl font-medium mb-4">Full Stack Developer</h2>
        <p className="text-base lg:text-lg mb-4 opacity-60">
          Full-stack developer crafting efficient, user-centric systems with
          real-world impact.
        </p>

        {/* Vertical Links */}
        <ul className="space-y-4 mt-8 hidden lg:block">
          <li>
            <a
              href="#about"
              className={`hover:text-teal-400 ${
                activeSection === "about" ? "text-teal-400 font-bold" : ""
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className={`hover:text-teal-400 ${
                activeSection === "experience" ? "text-teal-400 font-bold" : ""
              }`}
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#project"
              className={`hover:text-teal-400 ${
                activeSection === "project" ? "text-teal-400 font-bold" : ""
              }`}
            >
              Project
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6">
        <a
          href="https://github.com/gioyap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-teal-400"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/gio-edrian-yap-4090812ab"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-teal-400"
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href="https://www.facebook.com/gio.0610/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-teal-400"
        >
          <FaFacebook size={24} />
        </a>
      </div>
    </div>
  );
};

export default Header;
