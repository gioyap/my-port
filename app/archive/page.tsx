"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { projects } from "../data/portfolio";

const ProjectArchive = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<>
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
			<section className="mx-auto max-w-6xl p-6 opacity-90 lg:py-32 lg:pb-[10rem]">
				<Link href="/" className="flex gap-4 pb-4 font-bold text-teal-400">
					<IoReturnUpBack size={20} />
					Gio Yap
				</Link>
				<h1 className="mb-6 text-3xl font-bold text-white lg:pb-14 lg:text-5xl">
					All Projects
				</h1>
				<div className="overflow-x-auto">
					<table className="min-w-full text-white">
						<thead>
							<tr>
								<th className="p-3 text-left text-sm lg:hidden">
									<div className="flex gap-8">
										<span className="font-semibold">Year</span>
										<span className="font-semibold">Project</span>
									</div>
								</th>
								<th className="hidden p-3 text-left text-sm lg:table-cell">
									Year
								</th>
								<th className="hidden p-3 text-left text-sm lg:table-cell">
									Project
								</th>
								<th className="hidden p-3 text-left text-sm lg:table-cell">
									Made for
								</th>
								<th className="hidden p-3 text-left text-sm lg:table-cell">
									Built with
								</th>
								<th className="hidden p-3 text-left text-sm lg:table-cell">
									Links
								</th>
							</tr>
						</thead>
						<tbody>
							{projects.map((project) => (
								<tr
									key={project.slug}
									className="border-b border-gray-700 transition-colors duration-200 lg:hover:bg-gray-700 lg:hover:bg-opacity-30"
								>
									<td className="flex gap-8 p-3 text-sm lg:hidden">
										<span className="font-semibold">{project.year}</span>
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="whitespace-nowrap"
										>
											{project.title}
										</a>
									</td>
									<td className="hidden p-3 text-sm text-gray-400 lg:table-cell">
										{project.year}
									</td>
									<td className="hidden p-3 font-semibold lg:table-cell">
										{project.title}
									</td>
									<td className="hidden p-3 text-sm text-gray-400 lg:table-cell">
										{project.company}
									</td>
									<td className="hidden p-3 lg:table-cell">
										<div className="flex flex-wrap gap-2">
											{project.stack.map((skill) => (
												<span
													key={skill}
													className="rounded-full bg-teal-700 bg-opacity-30 px-2 py-1 text-xs font-bold text-teal-400"
												>
													{skill}
												</span>
											))}
										</div>
									</td>
									<td className="hidden whitespace-nowrap p-3 text-sm text-gray-400 lg:table-cell">
										<div className="flex flex-col gap-2">
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="underline"
											>
												Visit Project
											</a>
											{project.caseStudy ? (
												<Link
													href={`/projects/${project.slug}`}
													className="underline text-teal-400"
												>
													Read Case Study
												</Link>
											) : null}
										</div>
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
