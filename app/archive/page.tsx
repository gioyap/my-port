"use client";
import React, { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";

const projects = [
	{
		year: "2025",
		title: "RSC Intern Hub",
		company: "Forever Flawless Face and Body Clinic",
		technologies: [
			"Typescript",
			"Tailwind CSS",
			"Next.js",
			"Supabase",
			"Netlify",
		],
		link: "https://rscinternhub.netlify.app"
	},
	{
		year: "2025",
		title: "RSC University",
		company: "Forever Flawless Face and Body Clinic",
		technologies: [
			"Typescript",
			"Tailwind CSS",
			"Next.js",
			"Supabase",
			"Netlify",
		],
		link: "https://rscgroupuniversity.netlify.app"
	},
	{
		year: "2025",
		title: "Online Patient Record Management System",
		company: "Capstone project of group of student in Richwell Colleges, Inc.",
		technologies: [
			"Typescript",
			"Tailwind CSS",
			"Next.js",
			"Vercel",
			"Java",
			"Spring Boot",
			"MySQL",
			"Google App Engine",
			"Google Cloud SQL",
			"Hostinger",
		],
		link: "https://demo-opr.vercel.app/",
	},
	{
		year: "2024",
		title: "Church Ministry Platform",
		company: "Grace Presbyterian",
		technologies: [
			"Typescript",
			"Tailwind CSS",
			"Next.js",
			"Supabase",
			"Netlify",
			"GoDaddy",
			"Donorbox",
			"Tawk.to",
			"Aceternity UI",
		],
		link: "https://grace.ph/",
	},
	{
		year: "2024",
		title: "Reservation System",
		company: "Forever Flawless Face and Body Clinic",
		technologies: ["Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Netlify"],
		link: "https://demorsc.netlify.app/",
	},
	{
		year: "2023",
		title: "Smart Plastic Bottle Bin",
		company: "Capstone Project at BulSU: Hagonoy Campus",
		technologies: [
			"Node.js",
			"MongoDB",
			"Tailwind CSS",
			"Next.js",
			"Vercel",
			"Shadcn",
		],
		link: "https://smart-bin-steel.vercel.app/",
	},
	{
		year: "2023",
		title: "Blood Knight",
		company: "Game Dev: Final Project",
		technologies: ["Unity", "C#", "Adobe Illustrator"],
		link: "https://drive.google.com/drive/folders/1T3m9D9qotbVgti6UioxBixAwUZbVnvQB?usp=drive_link",
	},
];

const ProjectArchive = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: any) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<>
			{/* Flashlight overlay (fixed, clipped, non-scrollable) */}
				<div
					className="fixed inset-0 pointer-events-none z-10"
					style={{
						clipPath: "inset(0 0 0 0)",
						overflow: "hidden",
					}}
				>
					<div
						className="absolute rounded-full"
						style={{
							width: 700,
							height: 700,
							top: mousePosition.y - 350,
							left: mousePosition.x - 350,
							background:
								"radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0.02) 50%, rgba(15, 23, 42, 0) 100%)",
						}}
					/>
				</div>
			<section className="max-w-6xl mx-auto p-6 lg:py-32 lg:pb-[10rem] opacity-80">
			<a href="/" className="flex gap-4 pb-4 font-bold text-teal-400">
				<IoReturnUpBack size={20} />
				Gio Yap
			</a>
			<h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white lg:pb-14">
				All Projects
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full text-white">
					<thead>
						<tr>
							{/* Conditionally show only "Year" and "Project" on mobile */}
							<th className="p-3 text-left text-sm lg:hidden">
								<div className="flex gap-8">
									<span className="font-semibold">Year</span>
									<span className="font-semibold">Project</span>
								</div>
							</th>

							{/* Desktop View */}
							<th className="hidden lg:table-cell p-3 text-left text-sm">
								Year
							</th>
							<th className="hidden lg:table-cell p-3 text-left text-sm">
								Project
							</th>
							<th className="hidden lg:table-cell p-3 text-left text-sm">
								Made at
							</th>
							<th className="hidden lg:table-cell p-3 text-left text-sm">
								Built with
							</th>
							<th className="hidden lg:table-cell p-3 text-left text-sm">
								Link
							</th>
						</tr>
					</thead>

					<tbody>
						{projects.map((project, index) => (
							<tr
								key={index}
								className="border-b border-gray-700 transition-colors duration-200 lg:hover:bg-gray-700 lg:hover:bg-opacity-30 cursor-pointer"
								onClick={() => window.open(project.link, "_blank")}
							>
								{/* Mobile and Tablet View */}
								<td className="p-3 text-sm flex gap-8 lg:hidden">
									<span className="font-semibold">{project.year}</span>
									<span className=" whitespace-nowrap">{project.title}</span>
								</td>

								{/* Desktop View */}
								<td className="p-3 text-sm text-gray-400 hidden lg:table-cell">
									{project.year}
								</td>
								<td className="p-3 font-semibold hidden lg:table-cell">
									{project.title}
								</td>
								<td className="p-3 text-sm text-gray-400 hidden lg:table-cell">
									{project.company}
								</td>
								<td className="p-3 hidden lg:table-cell">
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((skill, idx) => (
											<span
												key={idx}
												className="px-2 py-1 bg-teal-700 text-teal-400 font-bold bg-opacity-30 text-xs rounded-full"
											>
												{skill}
											</span>
										))}
									</div>
								</td>
								<td className="p-3 text-gray-400 underline text-sm hidden lg:table-cell whitespace-nowrap">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										Visit Project
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
		</>
	);
};

export default ProjectArchive;