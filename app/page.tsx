"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Portfolio() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [activeSection, setActiveSection] = useState("about");
	const [hoveredExperience, sethoveredExperience] = useState<number | null>(
		null
	);
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup on unmount
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			// Select the scrollable container
			const scrollContainer = document.getElementById("scrollContainer");
			if (scrollContainer) {
				// Adjust scroll position programmatically
				scrollContainer.scrollTop += event.deltaY * 4;
			}
		};

		// Attach wheel event listener to the window
		window.addEventListener("wheel", handleScroll);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, []);

	useEffect(() => {
		// Create an Intersection Observer to detect when sections are in view
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id); // Update active section
					}
				});
			},
			{
				threshold: 0.5, // Trigger when 50% of the section is in view
			}
		);

		// Observe the sections
		const sections = ["about", "experience", "project"];
		sections.forEach((section) => {
			const element = document.getElementById(section);
			if (element) observer.observe(element);
		});

		// Cleanup on unmount
		return () => {
			sections.forEach((section) => {
				const element = document.getElementById(section);
				if (element) observer.unobserve(element);
			});
		};
	}, []);

	const experiences = [
		{
			title: "MIS-IT Analyst and Programmer",
			period: "May / 2024 - Present",
			description:
				"Responsible for contributing to the creation and maintenance of UI components with a focus on web accessibility. In addition to this, manage the company's e-commerce website using Shopify, ensuring the timely updates of banners, product images, and applying promotional discounts when necessary.",
			skills: ["PHP", "Javascript", "HTML", "CSS", "Shopify"],
			link: "https://flawless.com.ph/",
		},
		{
			title: "Internship Junior Software Developer",
			period: "Jan / 2024 - May / 2024",
			description:
				"Gained hands-on experience with a wide range of technologies, fueling a passion for continuous learning. Focused on QA testing, bug fixing, and contributing to website improvements to enhance performance and functionality.",
			skills: [
				"Next.js",
				"Docker",
				"Typescript",
				"Tailwind CSS",
				"MongoDB",
				"GraphQL",
				"React Native",
				"Expo Go",
				"Kafka",
				"Temporal",
			],
			link: "https://www.itemcount.io/",
		},
	];

	const projects = [
		{
			title: "Church Ministry Platform",
			description:
				"An official website for a Presbyterian church designed to connect the community. It features donation support, detailed branch information, leadership profiles, event announcements, and an 'About Us' section, ensuring easy access to essential church resources.",
			skills: [
				"Typescript",
				"Tailwind CSS",
				"Next.js",
				"Supabase",
				"Netlify",
				"GoDaddy",
				"Donorbox",
				"Tawk.to",
			],
			imgSrc: "/images/grace.png",
			link: "https://grace.ph/",
		},
		{
			title: "Reservation System",
			description:
				"A room reservation system for Flawless head office, streamlining the process of booking meeting rooms. Employees can easily reserve rooms, view current bookings, and ensure smooth scheduling. The admin panel allows administrators to manage reservations by accepting or denying requests, enhancing operational efficiency.",

			skills: ["Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Netlify"],
			imgSrc: "/images/rsc.png",
			// link: "#",
		},
		{
			title: "Smart Plastic Bottle Bin",
			description:
				"A capstone project designed to promote environmental awareness on campus by encouraging students to recycle plastic bottles. The smart bin rewards students with tokens for each bottle deposited, which can be converted into recitation grades with professor discretion. Developed with guidance from academic advisors, the system aims to blend sustainability with educational incentives.",

			skills: [
				"Node.js",
				"MongoDB",
				"Tailwind CSS",
				"Next.js",
				"Vercel",
				"Shadcn",
			],
			imgSrc: "/images/bin.png",
			link: "https://smart-bin-steel.vercel.app/",
		},
	];

	return (
		<div className="flex flex-col lg:flex-row w-full h-screen py-16 lg:gap-x-12">
			<div
				className="absolute pointer-events-none rounded-full"
				style={{
					width: 700,
					height: 700,
					top: mousePosition.y - 350,
					left: mousePosition.x - 350,
					background:
						"radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0.02) 50%, rgba(15, 23, 42, 0) 100%)",
					zIndex: 10,
				}}
			/>
			{/* Left Side: Header Component */}
			<div className="w-full lg:w-2/5 h-full flex flex-col justify-between z-20 mb-32 opacity-80">
				<div className="flex flex-col items-start text-white h-full mb-12">
					<h1 className=" text-4xl font-bold mb-4">Gio Edrian L. Yap</h1>
					<h2 className=" text-2xl font-medium mb-4">Full Stack Developer</h2>
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
									activeSection === "experience"
										? "text-teal-400 font-bold"
										: ""
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

			{/* Right Side: Content */}
			<div
				id="scrollContainer"
				className="w-full lg:w-2/4 lg:overflow-y-scroll scrollbar-hide text-white relative z-0 opacity-80"
				style={{ scrollBehavior: "smooth" }}
			>
				{/* Content Sections */}
				<section id="about" className="mb-24 lg:mb-36 lg:p-4">
					<h1 className="lg:hidden text-teal-400 font-bold pb-4 uppercase text-xl">
						About
					</h1>
					<p className="mb-4 p-4 lg:p-0">
						I'm a dedicated developer passionate about building efficient,
						user-friendly systems that support business operations and improve
						employee workflows. My{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							experience
						</span>{" "}
						focuses on creating practical solutions that address real-world
						challenges, ensuring they are reliable, easy to use, and tailored to
						meet organizational needs.
					</p>
					<p className="mb-4 p-4 lg:p-0">
						Currently, I'm an{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							MIS - IT Analyst and Programmer at Forever Flawless
						</span>
						. I develop custom projects tailored to meet the needs of various
						departments within the head office, optimizing workflows and
						improving internal processes. Additionally, I maintain the company’s
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							{" "}
							e-commerce website
						</span>
						, ensuring smooth operations and providing technical support to
						employees when they encounter system-related challenges.
					</p>
					<p className="mb-4 p-4 lg:p-0">
						In 2024, I graduated from{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							Bulacan State University - Hagonoy Campus with a major in Web and
							Mobile Development
						</span>
						, laying the foundation for my journey in software development.
						Since then, I've embraced
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							{" "}
							continuous learning
						</span>{" "}
						and applied my skills in real-world projects. Alongside my full-time
						work, I've collaborated with a client on freelance projects, which
						has further honed my expertise and deepened my commitment to
						delivering impactful software solutions.
					</p>
					<p className="p-4 lg:p-0">
						Beyond work, I cherish spending quality time with my{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							girlfriend
						</span>{" "}
						and finding balance outside of coding. Every{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							Sunday
						</span>
						, I attend church and enjoy meaningful moments with my church
						family, strengthening my
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							{" "}
							faith
						</span>{" "}
						and{" "}
						<span className="font-bold hover:text-teal-400 opacity-100 cursor-pointer">
							connections
						</span>
						.
					</p>
				</section>

				<section id="experience" className="mb-24 lg:mb-36">
					<h1 className=" lg:hidden text-teal-400 font-bold pb-4 uppercase text-xl">
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
							onMouseEnter={() => sethoveredExperience(index)}
							onMouseLeave={() => sethoveredExperience(null)}
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
								<p className="text-base mb-4 opacity-60">
									{experience.description}
								</p>
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

				<section id="project" className="mb-24 lg:mb-36">
					<h1 className=" lg:hidden text-teal-400 font-bold pb-4 uppercase text-xl">
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
								<h3 className="text-lg font-bold text-white">
									{project.title}
								</h3>
								<p className="text-base mb-4 opacity-60">
									{project.description}
								</p>
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
			</div>
		</div>
	);
}
