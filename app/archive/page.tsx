"use client";
import React from "react";
import { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";

// Sample project data array
const projects = [
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
		],
		link: "https://grace.ph/",
	},
	{
		year: "2024",
		title: "Reservation System",
		company: "Forever Flawless",
		technologies: ["Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Netlify"],
		link: "https://rscgroupreservationsystem.netlify.app/",
	},
	{
		year: "2022",
		title: "Smart Platic Bottle Bin",
		company: "Capstone Project",
		technologies: [
			"Node.js",
			"MongoDB",
			"Tailwind CSS",
			"Next.js",
			"Vercel",
			"Shadcn",
		],
		link: "#",
	},
];

const ProjectArchive = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup on unmount
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<section className="max-w-6xl mx-auto p-6 lg:pt-24 opacity-80">
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
			<a href="/" className=" flex gap-4 pb-4 font-bold text-teal-400">
				<IoReturnUpBack size={20} />
				Gio Yap
			</a>
			<h2 className="text-5xl font-bold mb-6 text-white lg:pb-14">
				All Projects
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full text-white">
					<thead>
						<tr>
							{["Year", "Project", "Made at", "Built with", "Link"].map(
								(header) => (
									<th key={header} className="p-3 text-left text-sm">
										{header}
									</th>
								)
							)}
						</tr>
					</thead>
					<tbody>
						{projects.map((project, index) => (
							<tr
								key={index}
								className="border-b border-gray-700 transition-colors duration-200"
							>
								<td className="p-3 text-sm text-gray-400">{project.year}</td>
								<td className="p-3 font-semibold">{project.title}</td>
								<td className="p-3 text-sm text-gray-400">{project.company}</td>
								<td className="flex flex-wrap gap-2 py-6">
									{project.technologies.map((skill, idx) => (
										<span
											key={idx}
											className="px-2 py-1 bg-teal-700 text-teal-400 font-bold bg-opacity-30 text-xs rounded-full"
										>
											{skill}
										</span>
									))}
								</td>
								<td className="p-3 text-gray-400 underline text-sm whitespace-nowrap">
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
	);
};

export default ProjectArchive;
