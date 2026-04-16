export type ProjectItem = {
	slug: string;
	year: string;
	title: string;
	company: string;
	type: string;
	summary: string;
	impact: string;
	role: string;
	stack: string[];
	image: string;
	link: string;
	accent: string;
	caseStudy?: {
		headline: string;
		intro: string;
		context: string;
		problem: string[];
		approach: string[];
		results: string[];
		features: string[];
	};
};

export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	summary: string;
	highlights: string[];
	stack: string[];
};

export const projects: ProjectItem[] = [
	{
		slug: "plant-performance-management-system",
		year: "2025",
		title: "Plant Performance Management System",
		company: "Fisher Farms Inc.",
		type: "Operations dashboard",
		summary:
			"Production monitoring platform for tracking plant performance and helping operations teams make faster decisions from live data.",
		impact: "Real-time visibility for plant performance workflows",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Docker", "Synology NAS"],
		image: "/images/ppms.png",
		link: "https://demoplantperformance.netlify.app",
		accent: "border-cyan-300/40 text-cyan-200 bg-cyan-300/10",
		caseStudy: {
			headline: "An operations dashboard for production teams that need answers fast.",
			intro:
				"I built this system to give plant and operations teams a clearer view of production performance without relying on scattered manual reporting.",
			context:
				"The product was designed for a real operating environment where supervisors and decision-makers need live information, not delayed summaries.",
			problem: [
				"Production data can be difficult to monitor when teams rely on fragmented spreadsheets or delayed reports.",
				"Decision-makers need a single place to review key performance indicators and current plant activity.",
				"Operational tools must be simple enough for busy internal users, not just technical teams.",
			],
			approach: [
				"Designed the interface around fast scanning, clear status visibility, and dashboard-style layouts.",
				"Built the app with Next.js and TypeScript, then connected the data layer with Supabase.",
				"Prepared the deployment setup for a real business environment using Docker and Synology NAS infrastructure.",
			],
			results: [
				"Created a clearer path from raw plant data to day-to-day operational visibility.",
				"Showed that I can build software that supports ongoing internal business workflows, not just portfolio demos.",
				"Strengthened my experience in full-stack delivery for operational systems.",
			],
			features: [
				"KPI-focused dashboard views",
				"Production monitoring workflows",
				"Business-friendly UI for internal teams",
				"Deployment setup for practical in-house use",
			],
		},
	},
	{
		slug: "rsc-intern-hub",
		year: "2025",
		title: "RSC Intern Hub",
		company: "Forever Flawless Face and Body Clinic",
		type: "Reporting system",
		summary:
			"Task logging and export tool for interns and supervisors, built to replace manual tracking and make daily reporting easier.",
		impact: "Led two interns from planning to delivery",
		role: "Project manager and senior developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Netlify"],
		image: "/images/intern.png",
		link: "https://rscinternhub.netlify.app/",
		accent: "border-amber-300/40 text-amber-200 bg-amber-300/10",
		caseStudy: {
			headline: "A reporting tool that made intern tracking easier for both interns and supervisors.",
			intro:
				"This project was more than a build task for me. I also led two OJT interns while making sure the product stayed useful, simple, and shippable.",
			context:
				"The goal was to replace a messy reporting flow with a lightweight internal system where interns could log tasks daily and export their work for documentation.",
			problem: [
				"Daily intern reporting was harder to manage when updates lived in disconnected manual files.",
				"Supervisors needed a simpler way to review entries and prepare reports.",
				"The system had to be easy enough for new interns to use immediately.",
			],
			approach: [
				"Planned the workflow around the actual reporting habits of interns and supervisors.",
				"Led development while guiding two interns through the build process and delivery expectations.",
				"Used Next.js, TypeScript, Supabase, and Netlify to keep the stack modern and efficient.",
			],
			results: [
				"Delivered a working internal tool that reduced friction in day-to-day reporting.",
				"Demonstrated leadership alongside implementation by managing junior contributors.",
				"Added a strong example of ownership, collaboration, and delivery to my portfolio.",
			],
			features: [
				"Daily task logging",
				"Export-ready reporting flow",
				"Supervisor-friendly review process",
				"Simple onboarding experience for interns",
			],
		},
	},
	{
		slug: "rsc-university",
		year: "2025",
		title: "RSC University",
		company: "Forever Flawless Face and Body Clinic",
		type: "Learning platform",
		summary:
			"Custom LMS for HR training with learning modules, quizzes, learning materials, and video-based course content.",
		impact: "Delivered a training platform for internal employees",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Netlify"],
		image: "/images/lms.png",
		link: "https://rscgroupuniversity.netlify.app/",
		accent: "border-rose-300/40 text-rose-200 bg-rose-300/10",
	},
	{
		slug: "online-patient-record-management-system",
		year: "2025",
		title: "Online Patient Record Management System",
		company: "Richwell Colleges client project",
		type: "Records management",
		summary:
			"Radiology patient record platform that improves secure data handling and collaboration between technologists and doctors.",
		impact: "Integrated modern frontend with Java backend services",
		role: "Full-stack developer",
		stack: ["Next.js", "Java", "Spring Boot", "MySQL", "Google Cloud"],
		image: "/images/oprms.png",
		link: "https://demo-opr.vercel.app/",
		accent: "border-indigo-300/40 text-indigo-200 bg-indigo-300/10",
	},
	{
		slug: "church-ministry-platform",
		year: "2024",
		title: "Church Ministry Platform",
		company: "Grace Presbyterian",
		type: "Organization website",
		summary:
			"Official church website designed to connect members with events, leadership information, branch details, and donation support.",
		impact: "Delivered a public-facing platform for community engagement",
		role: "Full-stack developer",
		stack: [
			"Next.js",
			"TypeScript",
			"Supabase",
			"Netlify",
			"Donorbox",
			"Tawk.to",
		],
		image: "/images/grace.png",
		link: "https://grace.ph/",
		accent: "border-emerald-300/40 text-emerald-200 bg-emerald-300/10",
	},
	{
		slug: "reservation-system",
		year: "2024",
		title: "Reservation System",
		company: "Forever Flawless Face and Body Clinic",
		type: "Internal booking tool",
		summary:
			"Room reservation platform for employees and admins, built to make meeting-room scheduling easier and more transparent.",
		impact: "Improved internal scheduling and approval workflows",
		role: "Full-stack developer",
		stack: ["Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Netlify"],
		image: "/images/rsc.png",
		link: "https://demorsc.netlify.app/",
		accent: "border-sky-300/40 text-sky-200 bg-sky-300/10",
	},
	{
		slug: "smart-plastic-bottle-bin",
		year: "2023",
		title: "Smart Plastic Bottle Bin",
		company: "BulSU Capstone Project",
		type: "Capstone system",
		summary:
			"Recycling-focused system that rewarded bottle deposits and connected sustainability incentives with school participation.",
		impact: "Combined hardware thinking and web software in a student project",
		role: "Full-stack developer",
		stack: ["Node.js", "MongoDB", "Tailwind CSS", "Next.js", "Vercel"],
		image: "/images/bin.png",
		link: "https://smart-bin-steel.vercel.app/",
		accent: "border-lime-300/40 text-lime-200 bg-lime-300/10",
	},
	{
		slug: "blood-knight",
		year: "2023",
		title: "Blood Knight",
		company: "Game Development Final Project",
		type: "Game project",
		summary:
			"Game development project built as part of academic work using Unity and C#.",
		impact: "Shows range beyond web development",
		role: "Game developer",
		stack: ["Unity", "C#", "Adobe Illustrator"],
		image: "/images/ppms.png",
		link: "https://drive.google.com/drive/folders/1T3m9D9qotbVgti6UioxBixAwUZbVnvQB?usp=drive_link",
		accent: "border-violet-300/40 text-violet-200 bg-violet-300/10",
	},
];

export const experiences: ExperienceItem[] = [
	{
		role: "Jr. Programmer",
		company: "Fisher Farms Inc.",
		period: "April 2025 - Present",
		summary:
			"Maintain and improve internal systems for inventory, operations, and department-specific workflows.",
		highlights: [
			"Improves existing business systems instead of only building static pages",
			"Works directly with operational needs and internal users",
			"Ships small tools that support head office teams",
		],
		stack: ["PHP", "JavaScript", "MySQL", "Supabase", "Next.js"],
	},
	{
		role: "MIS-IT Analyst and Programmer",
		company: "Forever Flawless",
		period: "May 2024 - March 2025",
		summary:
			"Supported web systems, e-commerce updates, internal tools, and UI improvements across company workflows.",
		highlights: [
			"Managed production-facing content and promotions",
			"Built and maintained tools used by non-technical teams",
			"Balanced IT support, web maintenance, and development tasks",
		],
		stack: ["WordPress", "Shopify", "PHP", "JavaScript", "CSS"],
	},
	{
		role: "Junior Software Developer Intern",
		company: "Itemcount",
		period: "January 2024 - May 2024",
		summary:
			"Worked with a modern software stack while contributing to QA, fixes, and product improvements.",
		highlights: [
			"Practiced team-based development workflows",
			"Contributed to debugging and quality checks",
			"Exposure to product engineering tools and services",
		],
		stack: ["Next.js", "Docker", "GraphQL", "React Native", "Kafka"],
	},
];
