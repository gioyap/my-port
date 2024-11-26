"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Portfolio() {
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
			<div className="w-full lg:w-1/2 h-full flex flex-col justify-between z-20 mb-32">
				<div className="flex flex-col items-start text-white h-full mb-12">
					<h1 className=" text-4xl font-semibold mb-4">Gio Edrian L. Yap</h1>
					<h2 className=" text-2xl font-medium mb-4">Full Stack Developer</h2>
					<p className="text-base lg:text-lg mb-4">
						Brief intro about yourself. Something concise but meaningful that
						highlights your skills or personality.
					</p>

					{/* Vertical Links */}
					<ul className="space-y-4 mt-8 hidden lg:block">
						<li>
							<a href="#about" className="hover:text-blue-400">
								About
							</a>
						</li>
						<li>
							<a href="#experience" className="hover:text-blue-400">
								Experience
							</a>
						</li>
						<li>
							<a href="#project" className="hover:text-blue-400">
								Project
							</a>
						</li>
					</ul>
				</div>
				{/* Social Media Links */}
				<div className="flex space-x-6">
					<a
						href="https://github.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-blue-400"
					>
						<FaGithub size={24} />
					</a>

					<a
						href="https://www.linkedin.com/in/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-blue-400"
					>
						<FaLinkedin size={24} />
					</a>

					<a
						href="https://www.facebook.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-blue-400"
					>
						<FaFacebook size={24} />
					</a>
				</div>
			</div>

			{/* Right Side: Content */}
			<div className="w-full lg:w-2/3 lg:overflow-y-scroll scrollbar-hide text-white relative z-0 h-screen">
				{/* Content Sections */}
				<section id="about" className="mb-12 lg:mb-24">
					<h2 className="text-2xl lg:text-3xl font-semibold mb-4">About Me</h2>
					<p className="mb-4">
						Paragraph 1 about you. Describe your journey, passion, and
						motivations in software development. Lorem ipsum dolor sit, amet
						consectetur adipisicing elit. Culpa animi eaque nulla possimus enim?
						Facere, nihil perferendis delectus aspernatur ea magnam iste autem!
						Obcaecati assumenda harum itaque architecto quasi facere!
					</p>
					<p className="mb-4">
						Paragraph 2 about you. Mention your key skills, technologies you
						specialize in, and your approach to solving problems. Lorem ipsum
						dolor, sit amet consectetur adipisicing elit. Voluptatem debitis hic
						mollitia at praesentium molestias autem quidem ad non. Sit, dicta?
						Sequi omnis distinctio assumenda expedita qui non, tenetur
						similique.
					</p>
					<p className="mb-4">
						Paragraph 3 about you. Share any personal qualities, achievements,
						or values that define you. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Asperiores minus porro adipisci est nam maxime
						dolore beatae, iste sunt earum, quis dicta fugiat rem culpa esse
						soluta, odio recusandae natus.
					</p>
					<p>
						Paragraph 4 about you. Add anything that sets you apart as a
						developer or team player. Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Enim, voluptatibus, eaque blanditiis alias neque
						saepe eveniet modi accusamus molestias eligendi quibusdam
						accusantium sunt vero esse itaque porro unde voluptas! Tenetur!
					</p>
				</section>

				<section id="experience" className=" mb-12 lg:mb-24">
					<h2 className="text-2xl lg:text-3xl font-semibold mb-4">
						Experiences
					</h2>
					<p className="mb-4">
						List your professional experiences, roles, and key achievements.
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ea,
						itaque similique beatae facilis sapiente impedit temporibus sit
						dignissimos debitis! Ratione odit earum perferendis pariatur harum
						delectus provident sit aperiam.
					</p>
					<p>
						Include highlights of your projects, focusing on impactful work and
						technologies used. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Asperiores nobis, tempore accusamus molestias
						maxime illum perferendis accusantium cupiditate nostrum nesciunt
						iusto. Quisquam sunt odit reiciendis vero amet neque minima aut.
					</p>
				</section>

				<section id="project" className=" mb-12 lg:mb-24">
					<h2 className="text-2xl lg:text-3xl font-semibold mb-4">Projects</h2>
					<p className="mb-4">
						List your professional experiences, roles, and key achievements.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
						eum explicabo. Accusantium nisi voluptates aut exercitationem
						deserunt error beatae ipsam asperiores suscipit, aspernatur
						accusamus sapiente laboriosam natus voluptatibus ducimus ratione?
					</p>
					<p>
						Include highlights of your projects, focusing on impactful work and
						technologies used. Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Autem accusantium, doloribus atque itaque ad
						voluptatum. Veniam tempore modi molestiae obcaecati aliquid nesciunt
						eligendi accusamus suscipit autem eveniet pariatur, placeat tempora.
					</p>
				</section>
			</div>
		</div>
	);
}
