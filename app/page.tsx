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

	return (
		<div className="flex flex-col lg:flex-row w-full h-screen py-16 lg:gap-x-6">
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
			<div className="w-full h-full flex flex-col justify-between z-20 mb-32 opacity-80">
				<Header activeSection={activeSection} />
			</div>

			{/* Right Side: Content */}
			<div
				id="scrollContainer"
				className="w-full lg:overflow-y-scroll scrollbar-hide text-white relative z-0 opacity-80"
				style={{ scrollBehavior: "smooth" }}
			>
				{/* Content Sections */}
				<About/>
				<Experience experiences={experiences} />
				<Project projects={projects}/>		
			</div>
		</div>
	);
}
