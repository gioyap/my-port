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
		slug: "bluesky-container-tracking-system",
		year: "2026",
		title: "BlueSky Container Tracking System",
		company: "BlueSky",
		type: "Internal logistics platform",
		summary:
			"Enterprise internal logistics platform for automating daily container tracking, shipping API synchronization, shipment dashboards, KPI analytics, and interactive map-based visibility.",
		impact: "Automated container tracking and improved logistics visibility",
		role: "Full-stack developer",
		stack: [
			"Next.js",
			"TypeScript",
			"Shipping APIs",
			"Automation",
			"Dashboards",
			"Maps",
		],
		image: "/images/prodinline.png",
		link: "https://cargotrackdemo.netlify.app/",
		accent: "border-blue-300/40 text-blue-200 bg-blue-300/10",
	},
	{
		slug: "uclear-customs-crm-client-portal",
		year: "2026",
		title: "UClear Customs CRM & Client Portal",
		company: "UClear Customs Inc.",
		type: "CRM and client portal",
		summary:
			"Operations platform for a Canadian customs brokerage firm, improving CRM workflows, client shipment visibility, document access, IIDA status tracking, ticket handling, and sales reporting.",
		impact: "Improved customs brokerage workflows and client clearance visibility",
		role: "Developer contributor",
		stack: [
			"CRM",
			"Client Portal",
			"CanData API",
			"CBSA IIDA",
			"Email Tickets",
			"Dashboards",
		],
		image: "/images/prodinline.png",
		link: "https://demo.uclear.g4tech.site/",
		accent: "border-fuchsia-300/40 text-fuchsia-200 bg-fuchsia-300/10",
	},
	{
		slug: "woodpaneldesigner",
		year: "2026",
		title: "Wood Panel Wall Designer",
		company: "Client project",
		type: "Custom wall layout and print production system",
		summary:
			"Web application for wood panel printing businesses where customers can upload photos, arrange panels on a virtual wall, review proofs, and download accurate hanging templates.",
		impact:
			"Streamlines the full workflow from customer photo upload and wall layout design to operator proofing, drilling template generation, and print-ready export",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Netlify", "Tailwind CSS", "PDF Generation", "Canvas Editor"],
		image: "/images/woodpaneldesigner.png",
		link: "https://woodpaneldesigner.netlify.app/",
		accent: "border-amber-300/40 text-amber-200 bg-amber-300/10",
	},
	{
		slug: "preventivemaintenance",
		year: "2026",
		title: "Preventive Maintenance System",
		company: "Fisher Farms Inc.",
		type: "Maintenance management dashboard",
		summary:
			"Dashboard system for managing preventive maintenance activities, equipment monitoring, maintenance schedules, task tracking, and plant maintenance overview.",
		impact: "Helps organize maintenance workflows, monitor equipment status, and reduce manual tracking for preventive maintenance operations",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Netlify", "Tailwind CSS", "Docker", "Synology NAS"],
		image: "/images/preventivemaintenance.png",
		link: "https://demopms.netlify.app/",
		accent: "border-emerald-300/40 text-emerald-200 bg-emerald-300/10",
		},
	{
		slug: "webecommerce",
		year: "2026",
		title: "E-commerce Website",
		company: "Own project",
		type: "E-commerce platform",
		summary:
			"Online store built with a modern tech stack, featuring product listings, shopping cart functionality, and a streamlined checkout process.",
		impact: "Full e-commerce experience built with modern web technologies",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Netlify", "Tailwind CSS", "n8n", "AI Integration"],
		image: "/images/prodinline.png",
		link: "https://shop-webecommerce.netlify.app",
		accent: "border-teal-300/40 text-teal-200 bg-teal-300/10",
	},
			{
		slug: "admin-ecommerce",
		year: "2026",
		title: "E-commerce Super Admin & Admin Panel",
		company: "Own project",
		type: "SaaS E-commerce platform",
		summary:
			"Admin dashboard for managing the e-commerce platform, including product management, order tracking, and user administration features.",
		impact: "Admin dashboard for managing e-commerce operations built with modern web technologies",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Netlify", "Tailwind CSS", "n8n", "AI Integration"],
		image: "/images/prodinline.png",
		link: "https://ims-dashboard.netlify.app",
		accent: "border-teal-300/40 text-teal-200 bg-teal-300/10",
	},
	{
		slug: "prodinline",
		year: "2026",
		title: "Production RM Inline Dashboard",
		company: "Fisher Farms Inc.",
		type: "Operations dashboard",
		summary:
			"Operations dashboard for monitoring products from receiving to boxing, giving teams a clearer view of each production stage.",
		impact: "Improved visibility across the product flow from intake to final boxing",
		role: "Full-stack developer",
		stack: ["Next.js", "TypeScript", "Supabase", "Docker", "Synology NAS"],
		image: "/images/prodinline.png",
		link: "https://demoprodinline.netlify.app",
		accent: "border-teal-300/40 text-teal-200 bg-teal-300/10",
	},
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
		period: "April 2025 - May 2026",
		summary:
			"Maintain and improve internal systems for inventory, operations, logistics, reporting, and department-specific workflows.",
		highlights: [
			"Improves existing business systems instead of only building static pages",
			"Works directly with operational needs and internal users",
			"Builds and improves internal tools, dashboards, and tracking systems",
		],
		stack: ["PHP", "JavaScript", "MySQL", "Supabase", "Next.js", "TypeScript"],
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
