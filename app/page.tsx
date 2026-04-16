"use client";

import { useEffect, useState } from "react";
import {
	FaEnvelope,
	FaExternalLinkAlt,
	FaGithub,
	FaLinkedin,
} from "react-icons/fa";

type Experience = {
	title: string;
	company: string;
	period: string;
	description: string;
	skills: string[];
	link?: string;
};

type Project = {
	title: string;
	description: string;
	outcome: string;
	role: string;
	skills: string[];
	imgSrc: string;
	link: string;
};

const experiences: Experience[] = [
	{
		title: "Jr. Programmer",
		company: "Fisher Farms Inc.",
		period: "April 2025 - Present",
		description:
			"Own updates and improvements for internal operations systems, including inventory workflows and department-specific tools for head office teams.",
		skills: ["PHP", "JavaScript", "HTML", "CSS", "MySQL", "Supabase", "Next.js"],
		link: "https://fisherfarms.ph/",
	},
	{
		title: "MIS-IT Analyst and Programmer",
		company: "Forever Flawless",
		period: "May 2024 - March 2025",
		description:
			"Maintained business-critical web assets, supported e-commerce updates, and built UI improvements across internal and customer-facing systems.",
		skills: ["WordPress", "PHP", "JavaScript", "HTML", "CSS", "Shopify"],
	},
	{
		title: "Junior Software Developer Intern",
		company: "Itemcount",
		period: "January 2024 - May 2024",
		description:
			"Contributed to QA, bug fixes, and feature improvements while working with a modern product stack and production development practices.",
		skills: [
			"Next.js",
			"Docker",
			"TypeScript",
			"Tailwind CSS",
			"MongoDB",
			"GraphQL",
			"React Native",
			"Kafka",
		],
		link: "https://www.itemcount.io/",
	},
];

const projects: Project[] = [
	{
		title: "Plant Performance Management System",
		description:
			"Production monitoring platform for tracking plant performance indicators and supporting data-driven operational decisions.",
		outcome: "Built for real-time operational visibility",
		role: "Full-stack developer",
		skills: [
			"Synology NAS DSM",
			"Docker",
			"TypeScript",
			"Tailwind CSS",
			"Next.js",
			"Supabase",
		],
		imgSrc: "/images/ppms.png",
		link: "https://demoplantperformance.netlify.app",
	},
	{
		title: "RSC Intern Hub",
		description:
			"Internal reporting tool where interns log daily tasks and export reports, reducing manual tracking for supervisors.",
		outcome: "Led two interns from planning to delivery",
		role: "Project manager and senior developer",
		skills: ["TypeScript", "Tailwind CSS", "Next.js", "Netlify", "Supabase"],
		imgSrc: "/images/intern.png",
		link: "https://rscinternhub.netlify.app/",
	},
	{
		title: "RSC University",
		description:
			"Learning management system for HR with modules, quizzes, Google Slides materials, and video-based learning content.",
		outcome: "Delivered a custom LMS for company training",
		role: "Full-stack developer",
		skills: ["TypeScript", "Tailwind CSS", "Next.js", "Netlify", "Supabase"],
		imgSrc: "/images/lms.png",
		link: "https://rscgroupuniversity.netlify.app/",
	},
	{
		title: "Online Patient Record Management System",
		description:
			"Radiology record management platform for secure patient data handling and smoother collaboration between staff and doctors.",
		outcome: "Combined Next.js frontend with Java backend services",
		role: "Full-stack developer",
		skills: [
			"TypeScript",
			"Next.js",
			"Java",
			"Spring Boot",
			"MySQL",
			"Google Cloud",
		],
		imgSrc: "/images/oprms.png",
		link: "https://demo-opr.vercel.app/",
	},
];

const stats = [
	{ value: "2+", label: "years building for real teams" },
	{ value: "8+", label: "shipped web projects" },
	{ value: "3", label: "companies supported" },
];

export default function Portfolio() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [activeSection, setActiveSection] = useState("about");
	const [hoveredExperience, setHoveredExperience] = useState<number | null>(
		null
	);
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveSection(entry.target.id);
				});
			},
			{ rootMargin: "-35% 0px -55% 0px", threshold: 0 }
		);

		const sections = ["about", "experience", "project"];
		sections.forEach((section) => {
			const element = document.getElementById(section);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<main className="relative flex min-h-screen flex-col gap-16 py-20 text-slate-200 lg:flex-row lg:gap-20 lg:py-24">
			<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
				<div
					className="absolute rounded-full"
					style={{
						width: 720,
						height: 720,
						top: mousePosition.y - 360,
						left: mousePosition.x - 360,
						background:
							"radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(15, 23, 42, 0.04) 45%, rgba(15, 23, 42, 0) 72%)",
					}}
				/>
			</div>

			<header className="relative z-10 lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-12rem)] lg:w-[42%] lg:flex-col lg:justify-between">
				<div>
					<p className="mb-5 inline-flex rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-sm font-semibold text-teal-200">
						Open to remote full-stack roles
					</p>
					<h1 className="max-w-2xl text-4xl font-bold tracking-normal text-white sm:text-5xl">
						Gio Edrian L. Yap
					</h1>
					<h2 className="mt-4 text-xl font-semibold text-slate-100 sm:text-2xl">
						Full-stack developer for internal tools, dashboards, and business
						workflow systems.
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
						I build practical web applications for teams that need cleaner
						operations: inventory systems, LMS platforms, reporting tools,
						reservation flows, and production dashboards.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="mailto:gioedrian.yap.l@gmail.com"
							className="inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-200"
						>
							<FaEnvelope aria-hidden="true" />
							Contact Me
						</a>
						<a
							href="/GYapCV2026.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-4 py-3 text-sm font-bold text-white transition hover:border-teal-300 hover:text-teal-200"
						>
							View Resume
							<FaExternalLinkAlt aria-hidden="true" className="text-xs" />
						</a>
					</div>

					<nav className="mt-12 hidden lg:block" aria-label="Section navigation">
						<ul className="space-y-4 text-sm font-bold uppercase tracking-[0.16em]">
							{["about", "experience", "project"].map((section) => (
								<li key={section}>
									<a
										href={`#${section}`}
										className={`group flex items-center gap-4 transition hover:text-teal-300 ${
											activeSection === section
												? "text-teal-300"
												: "text-slate-500"
										}`}
									>
										<span
											className={`h-px transition-all ${
												activeSection === section
													? "w-12 bg-teal-300"
													: "w-6 bg-slate-600 group-hover:w-12 group-hover:bg-teal-300"
											}`}
										/>
										{section === "project" ? "Projects" : section}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="mt-10 flex gap-5">
					<a
						href="https://github.com/gioyap"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub profile"
						className="text-slate-400 transition hover:text-teal-300"
					>
						<FaGithub size={24} />
					</a>
					<a
						href="https://www.linkedin.com/in/gio-edrian-yap-4090812ab"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn profile"
						className="text-slate-400 transition hover:text-teal-300"
					>
						<FaLinkedin size={24} />
					</a>
				</div>
			</header>

			<div className="relative z-10 lg:w-[58%]">
				<section id="about" className="scroll-mt-24 pb-20 lg:pb-28">
					<h2 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-teal-300 lg:hidden">
						About
					</h2>
					<div className="grid gap-3 sm:grid-cols-3">
						{stats.map((item) => (
							<div
								key={item.label}
								className="rounded-lg border border-slate-800 bg-slate-900/45 p-4"
							>
								<p className="text-3xl font-bold text-white">{item.value}</p>
								<p className="mt-2 text-sm leading-5 text-slate-400">
									{item.label}
								</p>
							</div>
						))}
					</div>

					<div className="mt-8 space-y-5 leading-7 text-slate-400">
						<p>
							I am a web developer from the Philippines with two years of
							hands-on experience turning workplace problems into shipped
							software. My strongest projects are business tools: systems that
							help people track work, manage records, train employees, and make
							decisions faster.
						</p>
						<p>
							What makes me useful on a remote team is ownership. I can talk to
							users, understand the workflow, build the interface, connect the
							database, deploy the product, and keep improving it after launch.
						</p>
						<p>
							Right now, I am focused on full-stack roles where I can work with
							Next.js, TypeScript, PHP, SQL, Supabase, and practical product
							thinking to deliver reliable tools for real teams.
						</p>
					</div>
				</section>

				<section id="experience" className="scroll-mt-24 pb-20 lg:pb-28">
					<h2 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-teal-300 lg:hidden">
						Experience
					</h2>
					<div className="space-y-4">
						{experiences.map((experience, index) => {
							const content = (
								<article
									className={`rounded-lg border border-transparent p-4 transition duration-300 hover:border-slate-700 hover:bg-slate-900/55 ${
										hoveredExperience === null ||
										hoveredExperience === index
											? "opacity-100"
											: "opacity-45"
									}`}
									onMouseEnter={() => setHoveredExperience(index)}
									onMouseLeave={() => setHoveredExperience(null)}
								>
									<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
										<div>
											<h3 className="text-lg font-bold text-white">
												{experience.title}
											</h3>
											<p className="font-semibold text-teal-300">
												{experience.company}
											</p>
										</div>
										<p className="text-sm font-semibold text-slate-400 sm:text-right">
											{experience.period}
										</p>
									</div>
									<p className="mt-4 leading-7 text-slate-400">
										{experience.description}
									</p>
									<div className="mt-4 flex flex-wrap gap-2">
										{experience.skills.map((skill) => (
											<span
												key={skill}
												className="rounded-full bg-teal-300/10 px-3 py-1 text-sm font-bold text-teal-200"
											>
												{skill}
											</span>
										))}
									</div>
								</article>
							);

							return experience.link ? (
								<a
									key={experience.title}
									href={experience.link}
									target="_blank"
									rel="noopener noreferrer"
									className="block"
								>
									{content}
								</a>
							) : (
								<div key={experience.title}>{content}</div>
							);
						})}
					</div>
				</section>

				<section id="project" className="scroll-mt-24 pb-20">
					<div className="mb-6 flex items-end justify-between gap-4">
						<h2 className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300 lg:hidden">
							Projects
						</h2>
						<a
							href="/archive"
							className="ml-auto text-sm font-bold text-slate-300 transition hover:text-teal-300"
						>
							Project archive
						</a>
					</div>

					<div className="space-y-6">
						{projects.map((project, index) => (
							<a
								key={project.title}
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className={`group grid gap-5 rounded-lg border border-transparent p-4 transition duration-300 hover:border-slate-700 hover:bg-slate-900/55 sm:grid-cols-[170px_1fr] ${
									hoveredProject === null || hoveredProject === index
										? "opacity-100"
										: "opacity-45"
								}`}
								onMouseEnter={() => setHoveredProject(index)}
								onMouseLeave={() => setHoveredProject(null)}
							>
								<img
									src={project.imgSrc}
									alt={`${project.title} screenshot`}
									className="aspect-video w-full rounded-md border border-slate-800 object-cover"
								/>
								<div>
									<p className="mb-2 text-sm font-bold text-teal-300">
										{project.outcome}
									</p>
									<h3 className="flex items-center gap-2 text-lg font-bold text-white transition group-hover:text-teal-300">
										{project.title}
										<FaExternalLinkAlt
											aria-hidden="true"
											className="text-xs opacity-70"
										/>
									</h3>
									<p className="mt-1 text-sm font-semibold text-slate-300">
										{project.role}
									</p>
									<p className="mt-3 leading-7 text-slate-400">
										{project.description}
									</p>
									<div className="mt-4 flex flex-wrap gap-2">
										{project.skills.map((skill) => (
											<span
												key={skill}
												className="rounded-full bg-teal-300/10 px-3 py-1 text-sm font-bold text-teal-200"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</a>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
