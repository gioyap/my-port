"use client";
import { useEffect, useState } from "react";
import { experiences } from "./data/experience";
import { projects } from "./data/project";
import Header from "./components/leftside/page";
import About from "./components/about/page";
import Experience from "./components/experience/page";
import Project from "./components/project/page";

export default function Portfolio() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [activeSection, setActiveSection] = useState("about");
	
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup on unmount
		return () => window.removeEventListener("mousemove", handleMouseMove);
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

	return (
		<div className="flex flex-col lg:flex-row w-full h-screen py-16 lg:gap-x-6">
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

			{/* Left Side: Header Component */}
			<div className="w-full h-full flex flex-col justify-between z-20 mb-32 opacity-80">
				<Header activeSection={activeSection} />
			</div>

			{/* Right Side: Content */}
			<div
				id="scrollContainer"
				className="w-full lg:overflow-y-scroll overflow-hidden scrollbar-hide text-white relative z-0 opacity-80"
				style={{ scrollBehavior: "smooth" }}
			>
				<About />
				<Experience experiences={experiences} />
				<Project projects={projects} />
			</div>
		</div>
	);
}