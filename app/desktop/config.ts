import {
	FaBriefcase,
	FaFilePdf,
	FaGithub,
	FaGraduationCap,
	FaSpotify,
	FaTerminal,
	FaUser,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type { CommandKey, WindowKey, WindowState } from "./types";

export const githubUrl = "https://github.com/gioyap";
export const resumeUrl = "/GYapCV2026.pdf";
export const localAudioTrackUrl = "/audio/portfolio-song.mp3";
export const animationMs = 220;

export const notes = [
	{
		title: "Niche",
		body: "I build internal tools, reporting systems, LMS platforms, and workflow apps for real business teams.",
		tone: "rotate-[-3deg] bg-[#ffe98f]",
	},
	{
		title: "Strength",
		body: "Best at turning messy manual processes into usable systems for admins, supervisors, HR, and operations staff.",
		tone: "rotate-[2deg] bg-[#ffd3d3]",
	},
	{
		title: "Fit",
		body: "Best for companies, clients, and small or large businesses that need practical web, mobile, game, or internal app systems people will actually use.",
		tone: "rotate-[-1deg] bg-[#c8f1ff]",
	},
] as const;

export const educationItems = [
	{
		title: "Bulacan State University",
		detail:
			"Built a foundation in systems thinking, project delivery, and problem solving for real users.",
	},
	{
		title: "Academic Build Focus",
		detail:
			"Worked on both product-style web apps and interactive projects, including a recycling capstone and a Unity game.",
	},
] as const;

export const commandKeys: CommandKey[] = [
	"help",
	"about",
	"projects",
	"work",
	"education",
	"resume",
	"github",
	"spotify",
];

export const terminalShortcutCommands: CommandKey[] = [
	"about",
	"projects",
	"work",
	"education",
];

export const commandButtons: Array<{
	key: CommandKey;
	label: string;
	icon: IconType;
}> = [
	{ key: "help", label: "Help", icon: FaTerminal },
	{ key: "about", label: "About", icon: FaUser },
	{ key: "projects", label: "Projects", icon: FaTerminal },
	{ key: "work", label: "Work", icon: FaBriefcase },
	{ key: "education", label: "Education", icon: FaGraduationCap },
	{ key: "resume", label: "Resume", icon: FaFilePdf },
	{ key: "github", label: "GitHub", icon: FaGithub },
	{ key: "spotify", label: "Spotify", icon: FaSpotify },
];

export const desktopApps: Array<{
	label: string;
	icon: IconType;
	iconClass: string;
	tileClass: string;
	onActivate: WindowKey | "github";
}> = [
	{
		label: "Terminal",
		icon: FaTerminal,
		iconClass: "text-emerald-300",
		tileClass:
			"border-white/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(2,6,23,0.95))]",
		onActivate: "terminal",
	},
	{
		label: "Resume.pdf",
		icon: FaFilePdf,
		iconClass: "text-rose-200",
		tileClass:
			"border-rose-200/40 bg-[linear-gradient(180deg,rgba(239,68,68,0.95),rgba(153,27,27,0.98))]",
		onActivate: "resume",
	},
	{
		label: "GitHub.app",
		icon: FaGithub,
		iconClass: "text-white",
		tileClass:
			"border-slate-200/35 bg-[linear-gradient(180deg,rgba(55,65,81,0.95),rgba(15,23,42,0.98))]",
		onActivate: "github",
	},
	{
		label: "Spotify.app",
		icon: FaSpotify,
		iconClass: "text-white",
		tileClass:
			"border-emerald-200/40 bg-[linear-gradient(180deg,rgba(34,197,94,0.96),rgba(22,101,52,0.98))]",
		onActivate: "spotify",
	},
];

export const initialWindows: Record<WindowKey, WindowState> = {
	terminal: { visible: true, open: true, x: 70, y: 48, z: 30 },
	resume: { visible: false, open: false, x: 460, y: 118, z: 20 },
	spotify: { visible: false, open: false, x: 980, y: 140, z: 10 },
};
