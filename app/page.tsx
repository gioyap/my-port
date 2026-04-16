"use client";

import { FormEvent, PointerEvent as ReactPointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaBriefcase, FaDownload, FaExternalLinkAlt, FaFilePdf, FaGithub, FaGraduationCap, FaSpotify, FaTerminal, FaUser } from "react-icons/fa";
import { experiences, projects } from "./data/portfolio";

type CommandKey = "help" | "about" | "projects" | "work" | "education" | "resume" | "github" | "spotify";
type WindowKey = "terminal" | "resume" | "spotify";
type Stage = "boot" | "home" | "desktop";
type HistoryItem = { id: number; input: string; command?: CommandKey; error?: string };
type WindowState = { visible: boolean; open: boolean; x: number; y: number; z: number };
type DragState = { key: WindowKey; offsetX: number; offsetY: number };

const githubUrl = "https://github.com/gioyap";
const resumeUrl = "/GYapCV2026.pdf";
const localAudioTrackUrl = "/audio/portfolio-song.mp3";
const animationMs = 220;

const notes = [
	["Niche", "I build internal tools, reporting systems, LMS platforms, and workflow apps for real business teams.", "rotate-[-3deg] bg-[#ffe98f]"],
	["Strength", "Best at turning messy manual processes into usable systems for admins, supervisors, HR, and operations staff.", "rotate-[2deg] bg-[#ffd3d3]"],
	["Fit", "Best for companies, clients, that need practical web, mobile, game, or internal app systems people will actually use.", "rotate-[-1deg] bg-[#c8f1ff]"],
] as const;

const educationItems = [
	{ title: "Bulacan State University", detail: "Built a foundation in systems thinking, project delivery, and problem solving for real users." },
	{ title: "Academic Build Focus", detail: "Worked on both product-style web apps and interactive projects, including a recycling capstone and a Unity game." },
];

const desktopApps = [
	{ label: "Terminal", icon: FaTerminal, iconClass: "text-emerald-300", tileClass: "border-white/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(2,6,23,0.95))]", onActivate: "terminal" as const },
	{ label: "Resume.pdf", icon: FaFilePdf, iconClass: "text-rose-200", tileClass: "border-rose-200/40 bg-[linear-gradient(180deg,rgba(239,68,68,0.95),rgba(153,27,27,0.98))]", onActivate: "resume" as const },
	{ label: "GitHub.app", icon: FaGithub, iconClass: "text-white", tileClass: "border-slate-200/35 bg-[linear-gradient(180deg,rgba(55,65,81,0.95),rgba(15,23,42,0.98))]", onActivate: "github" as const },
	{ label: "Spotify.app", icon: FaSpotify, iconClass: "text-white", tileClass: "border-emerald-200/40 bg-[linear-gradient(180deg,rgba(34,197,94,0.96),rgba(22,101,52,0.98))]", onActivate: "spotify" as const },
] as const;

const initialWindows: Record<WindowKey, WindowState> = {
	terminal: { visible: true, open: true, x: 70, y: 48, z: 30 },
	resume: { visible: false, open: false, x: 460, y: 118, z: 20 },
	spotify: { visible: false, open: false, x: 980, y: 140, z: 10 },
};

function normalizeCommand(value: string) {
	return value.trim().toLowerCase().replace(/:+$/, "");
}

function formatClock(date: Date) {
	return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatMenuDate(date: Date) {
	return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
}

export default function PortfolioDesktop() {
	const [stage, setStage] = useState<Stage>("boot");
	const [commandInput, setCommandInput] = useState("");
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [clock, setClock] = useState(new Date());
	const [windows, setWindows] = useState(initialWindows);
	const [dragState, setDragState] = useState<DragState | null>(null);
	const desktopRef = useRef<HTMLDivElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const zRef = useRef(40);
	const closeTimeouts = useRef<Partial<Record<WindowKey, number>>>({});

	useEffect(() => {
		const timer = window.setTimeout(() => setStage("home"), 1800);
		return () => window.clearTimeout(timer);
	}, []);

	useEffect(() => {
		const timer = window.setInterval(() => setClock(new Date()), 60000);
		return () => window.clearInterval(timer);
	}, []);

	useEffect(() => {
		if (!dragState) return;
		const handleMove = (event: PointerEvent) => {
			const desktop = desktopRef.current;
			if (!desktop) return;
			const bounds = desktop.getBoundingClientRect();
			setWindows((current) => ({
				...current,
				[dragState.key]: {
					...current[dragState.key],
					x: event.clientX - bounds.left - dragState.offsetX,
					y: event.clientY - bounds.top - dragState.offsetY,
				},
			}));
		};
		const stop = () => setDragState(null);
		window.addEventListener("pointermove", handleMove);
		window.addEventListener("pointerup", stop);
		return () => {
			window.removeEventListener("pointermove", handleMove);
			window.removeEventListener("pointerup", stop);
		};
	}, [dragState]);

	useEffect(() => () => {
		Object.values(closeTimeouts.current).forEach((id) => id && window.clearTimeout(id));
	}, []);

	useEffect(() => {
		if (!windows.spotify.visible || !windows.spotify.open || !audioRef.current) return;
		audioRef.current.play().catch(() => {});
	}, [windows.spotify.visible, windows.spotify.open]);

	const lastCommand = history.at(-1)?.command;
	const terminalTitle = lastCommand ? `terminal | ${lastCommand}` : "terminal";

	const bringToFront = (key: WindowKey) => {
		zRef.current += 1;
		setWindows((current) => ({ ...current, [key]: { ...current[key], z: zRef.current } }));
	};

	const openWindow = (key: WindowKey) => {
		const pending = closeTimeouts.current[key];
		if (pending) {
			window.clearTimeout(pending);
			delete closeTimeouts.current[key];
		}
		zRef.current += 1;
		setWindows((current) => ({ ...current, [key]: { ...current[key], visible: true, open: true, z: zRef.current } }));
	};

	const closeWindow = (key: WindowKey) => {
		setWindows((current) => ({ ...current, [key]: { ...current[key], open: false } }));
		closeTimeouts.current[key] = window.setTimeout(() => {
			setWindows((current) => ({ ...current, [key]: { ...current[key], visible: false } }));
			delete closeTimeouts.current[key];
		}, animationMs);
	};

	const beginDrag = (key: WindowKey, event: ReactPointerEvent<HTMLDivElement>) => {
		if (window.innerWidth < 768 || !desktopRef.current) return;
		const bounds = desktopRef.current.getBoundingClientRect();
		const state = windows[key];
		setDragState({ key, offsetX: event.clientX - bounds.left - state.x, offsetY: event.clientY - bounds.top - state.y });
		bringToFront(key);
	};

	const runCommand = (rawValue: string) => {
		const value = normalizeCommand(rawValue);
		if (!value) return;
		if (value === "clear") return setHistory([]);
		const known = (["help", "about", "projects", "work", "education", "resume", "github", "spotify"] as CommandKey[]).find((item) => item === value);
		const nextId = Date.now();
		if (!known) {
			openWindow("terminal");
			return setHistory((current) => [...current, { id: nextId, input: rawValue, error: "Command not found. Try help, about, projects, work, education, resume, github, spotify, or clear." }]);
		}
		if (known === "github") window.open(githubUrl, "_blank", "noopener,noreferrer");
		if (known === "resume") openWindow("resume");
		if (known === "spotify") openWindow("spotify");
		if (known !== "github") openWindow("terminal");
		setHistory((current) => [...current, { id: nextId, input: rawValue, command: known }]);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		runCommand(commandInput);
		setCommandInput("");
	};

	return (
		<main className="relative h-screen overflow-hidden text-white">
			<Wallpaper />
			{stage === "boot" ? <BootScreen /> : null}
			{stage === "home" ? <HomeScreen clock={clock} onEnter={() => setStage("desktop")} /> : null}
			{stage === "desktop" ? (
				<>
					<header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-white/20 backdrop-blur-2xl">
						<div className="flex items-center justify-between px-4 py-2 text-sm text-white/90">
							<div className="flex items-center gap-4">
								<FaApple className="text-base" />
								<span className="font-semibold">Portfolio</span>
								<span className="hidden sm:inline">Finder</span>
								<span className="hidden md:inline">File</span>
								<span className="hidden md:inline">Edit</span>
								<span className="hidden md:inline">View</span>
								<span className="hidden md:inline">Window</span>
							</div>
							<div className="flex items-center gap-3 text-xs font-semibold sm:text-sm">
								<span>Systems Builder</span>
								<span>{formatMenuDate(clock)}</span>
								<span>{formatClock(clock)}</span>
							</div>
						</div>
					</header>

					<section ref={desktopRef} className="relative h-[calc(100vh-2.5rem)] pt-16 md:pt-20">
							<div className="absolute left-3 top-14 z-10 flex flex-col gap-3 md:left-6 md:top-16">
								{desktopApps.map((app) => (
									<DesktopIcon
										key={app.label}
										label={app.label}
										icon={app.icon}
										iconClass={app.iconClass}
										tileClass={app.tileClass}
										onClick={() => {
											if (app.onActivate === "terminal") openWindow("terminal");
											if (app.onActivate === "resume") openWindow("resume");
											if (app.onActivate === "github") runCommand("github");
											if (app.onActivate === "spotify") openWindow("spotify");
										}}
									/>
								))}
							</div>

							<div className="pointer-events-none absolute right-3 top-16 z-[12] grid w-[260px] gap-4 md:right-6 md:top-18">
								{notes.map(([title, body, tone]) => (
									<StickyNote key={title} title={title} body={body} tone={tone} />
								))}
							</div>

							{windows.terminal.visible ? (
								<DesktopWindow
									title={terminalTitle}
									windowState={windows.terminal}
									widthClass="w-[min(92vw,760px)]"
									onFocus={() => bringToFront("terminal")}
									onClose={() => closeWindow("terminal")}
									onPointerDownHeader={(event) => beginDrag("terminal", event)}
								>
									<div className="p-4 md:p-5">
										<div className="rounded-[24px] border border-emerald-400/20 bg-[#050b16] p-4 shadow-inner shadow-black/50">
											<div className="mb-4 flex flex-wrap gap-2">
												{["about", "projects", "work", "education"].map((command) => (
													<button key={command} type="button" onClick={() => runCommand(command)} className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20">
														{command}
													</button>
												))}
											</div>
											<div className="min-h-[380px] max-h-[58vh] space-y-5 overflow-y-auto pr-2">
												{history.length === 0 ? (
													<div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
														<p className="font-semibold text-emerald-200">Mac terminal portfolio</p>
														<p>Type <span className="font-mono text-emerald-100">help</span> to open the command list.</p>
													</div>
												) : null}
												{history.map((item) => (
													<div key={item.id} className="space-y-3">
														<div className="font-mono text-sm text-emerald-300"><span className="text-emerald-500">gio@portfolio</span>:~$ {item.input}</div>
														{item.error ? <p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">{item.error}</p> : item.command ? <TerminalOutput command={item.command} /> : null}
													</div>
												))}
											</div>
											<form onSubmit={handleSubmit} className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3">
												<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#020617] px-3 py-2">
													<span className="font-mono text-sm text-emerald-400">$</span>
													<input value={commandInput} onChange={(event) => setCommandInput(event.target.value)} placeholder="Type help, about, projects, work..." className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500" />
												</div>
											</form>
										</div>
									</div>
								</DesktopWindow>
							) : null}

							{windows.resume.visible ? (
								<DesktopWindow
									title="resume viewer"
									windowState={windows.resume}
									widthClass="w-[min(92vw,680px)]"
									light
									onFocus={() => bringToFront("resume")}
									onClose={() => closeWindow("resume")}
									onPointerDownHeader={(event) => beginDrag("resume", event)}
									action={<a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-400"><FaDownload />Open PDF</a>}
								>
									<div className="bg-[#f3f4f6] p-4">
										<div className="overflow-hidden rounded-[20px] border border-slate-300 bg-white">
											<iframe src={resumeUrl} title="Resume PDF" className="h-[68vh] min-h-[500px] w-full" />
										</div>
									</div>
								</DesktopWindow>
							) : null}

							{windows.spotify.visible ? (
								<DesktopWindow
									title="spotify"
									windowState={windows.spotify}
									widthClass="w-[min(92vw,420px)]"
									onFocus={() => bringToFront("spotify")}
									onClose={() => closeWindow("spotify")}
									onPointerDownHeader={(event) => beginDrag("spotify", event)}
								>
									<div className="bg-[linear-gradient(180deg,#0f172a,#020617)] p-4">
										<div className="rounded-[24px] border border-emerald-400/20 bg-black/40 p-4">
											<div className="mb-4 flex items-center gap-3">
												<div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1ed760] text-2xl text-black"><FaSpotify /></div>
												<div>
													<p className="text-sm font-semibold text-white">Desktop music</p>
													<p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Local player</p>
												</div>
											</div>
											<div className="rounded-2xl border border-emerald-400/15 bg-[#121826] p-4">
												<div className="rounded-2xl bg-[linear-gradient(135deg,#1db954,#0f172a)] p-5">
													<p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Now Playing</p>
													<h3 className="mt-2 text-xl font-semibold text-white">Portfolio soundtrack</h3>
													<p className="mt-2 text-sm leading-6 text-white/80">Ambient background audio for the desktop experience.</p>
												</div>
												<audio ref={audioRef} src={localAudioTrackUrl} controls autoPlay loop preload="auto" className="mt-4 w-full" />
											</div>
										</div>
									</div>
								</DesktopWindow>
							) : null}
					</section>

					<nav className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
						<div className="flex items-end gap-3 rounded-[30px] border border-white/20 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-3xl">
							<DockButton icon={FaTerminal} label="Terminal" iconClass="text-emerald-300" tileClass="border-white/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(2,6,23,0.95))]" onClick={() => openWindow("terminal")} />
							<DockButton icon={FaFilePdf} label="Resume" iconClass="text-rose-200" tileClass="border-rose-200/40 bg-[linear-gradient(180deg,rgba(239,68,68,0.95),rgba(153,27,27,0.98))]" onClick={() => openWindow("resume")} />
							<DockButton icon={FaGithub} label="GitHub" iconClass="text-white" tileClass="border-slate-200/35 bg-[linear-gradient(180deg,rgba(55,65,81,0.95),rgba(15,23,42,0.98))]" onClick={() => runCommand("github")} />
							<DockButton icon={FaSpotify} label="Spotify" iconClass="text-white" tileClass="border-emerald-200/40 bg-[linear-gradient(180deg,rgba(34,197,94,0.96),rgba(22,101,52,0.98))]" onClick={() => openWindow("spotify")} />
						</div>
					</nav>
				</>
			) : null}
		</main>
	);
}

function Wallpaper() {
	return (
		<>
			<div className="fixed inset-0 -z-30"><Image src="/images/macdesktop.jpg" alt="" fill priority className="object-cover object-center" /></div>
			<div className="fixed inset-0 -z-29 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(6,10,18,0.08))]" />
			<div className="fixed inset-0 -z-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(10,18,35,0.16),transparent_42%)]" />
		</>
	);
}

function BootScreen() {
	return (
		<section className="fixed inset-0 z-[200] bg-black text-white">
			<div className="flex min-h-screen flex-col items-center justify-center">
				<div className="animate-pulse text-7xl text-white"><FaApple /></div>
				<div className="mt-10 h-1.5 w-52 overflow-hidden rounded-full bg-white/15"><div className="h-full w-1/2 animate-[bootload_1.6s_ease-in-out_forwards] rounded-full bg-white" /></div>
			</div>
		</section>
	);
}

function HomeScreen({ clock, onEnter }: { clock: Date; onEnter: () => void }) {
	return (
		<section className="fixed inset-0 z-[180]">
			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="w-full max-w-md rounded-[34px] border border-white/20 bg-black/25 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
					<div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-white/12 text-4xl font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]">GY</div>
					<h1 className="mt-6 text-3xl font-semibold text-white">Gio Yap</h1>
					<p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/75">Systems Builder</p>
					<p className="mt-5 text-sm leading-7 text-white/85">Internal tools, reporting apps, LMS builds, and workflow software for real teams.</p>
					<p className="mt-6 text-5xl font-semibold text-white">{formatClock(clock)}</p>
					<p className="mt-2 text-sm text-white/75">{formatMenuDate(clock)}</p>
					<button type="button" onClick={onEnter} className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]">Enter Desktop</button>
				</div>
			</div>
		</section>
	);
}

function StickyNote({ title, body, tone }: { title: string; body: string; tone: string }) {
	return (
		<article className={`rounded-[22px] p-4 text-slate-900 shadow-[0_24px_40px_rgba(0,0,0,0.22)] ${tone}`}>
			<p className="text-xs font-semibold uppercase tracking-[0.18em]">{title}</p>
			<p className="mt-3 text-sm font-medium leading-6">{body}</p>
		</article>
	);
}

function DesktopWindow({ title, children, windowState, widthClass, onFocus, onClose, onPointerDownHeader, action, light = false }: { title: string; children: ReactNode; windowState: WindowState; widthClass: string; onFocus: () => void; onClose: () => void; onPointerDownHeader: (event: ReactPointerEvent<HTMLDivElement>) => void; action?: ReactNode; light?: boolean }) {
	return (
		<section
			onMouseDown={onFocus}
			className={`absolute top-0 overflow-hidden rounded-[28px] border shadow-[0_40px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition-[opacity,transform] duration-200 ease-out ${widthClass} ${light ? "border-white/30 bg-white/75 text-slate-950" : "border-white/25 bg-[#0b1020]/80 text-white"}`}
			style={{ left: 0, zIndex: windowState.z, transform: `translate3d(${windowState.x}px, ${windowState.y}px, 0) scale(${windowState.open ? 1 : 0.94})`, opacity: windowState.open ? 1 : 0 }}
		>
			<WindowBar title={title} action={action} onClose={onClose} onPointerDownHeader={onPointerDownHeader} light={light} />
			{children}
		</section>
	);
}

function WindowBar({ title, action, onClose, onPointerDownHeader, light = false }: { title: string; action?: ReactNode; onClose: () => void; onPointerDownHeader: (event: ReactPointerEvent<HTMLDivElement>) => void; light?: boolean }) {
	return (
		<div onPointerDown={onPointerDownHeader} className={`flex cursor-grab items-center justify-between border-b px-4 py-3 active:cursor-grabbing ${light ? "border-slate-300 bg-[#e5e7eb]" : "border-white/10 bg-white/5"}`}>
			<div className="flex items-center gap-2">
				<button type="button" onClick={(event) => { event.stopPropagation(); onClose(); }} aria-label="Close window" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
				<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
				<span className="h-3 w-3 rounded-full bg-[#28c840]" />
			</div>
			<p className={`text-xs font-semibold uppercase tracking-[0.24em] ${light ? "text-slate-600" : "text-slate-400"}`}>{title}</p>
			<div className="min-w-20 text-right" onPointerDown={(event) => event.stopPropagation()}>{action}</div>
		</div>
	);
}

function DesktopIcon({ label, icon: Icon, iconClass, tileClass, onClick }: { label: string; icon: typeof FaTerminal; iconClass: string; tileClass: string; onClick: () => void }) {
	return (
		<button type="button" onClick={onClick} className="group flex w-24 flex-col items-center gap-3 rounded-3xl p-3 text-center transition hover:bg-white/10">
			<div className={`grid h-16 w-16 place-items-center rounded-[22px] border text-2xl shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition group-hover:-translate-y-1 group-hover:scale-105 ${tileClass}`}><Icon className={iconClass} /></div>
			<span className="text-xs font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{label}</span>
		</button>
	);
}

function DockButton({ icon: Icon, label, iconClass, tileClass, onClick }: { icon: typeof FaTerminal; label: string; iconClass: string; tileClass: string; onClick: () => void }) {
	return (
		<button type="button" onClick={onClick} aria-label={label} className={`grid h-14 w-14 place-items-center rounded-[18px] border text-xl shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-2 hover:scale-110 ${tileClass}`}>
			<Icon className={iconClass} />
		</button>
	);
}

function TerminalOutput({ command }: { command: CommandKey }) {
	if (command === "help") return <Card><p className="font-semibold text-white">Available commands</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{["about", "projects", "work", "education", "resume", "github", "spotify", "clear"].map((item) => <div key={item} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 font-mono text-xs text-emerald-200">{item}</div>)}</div></Card>;
	if (command === "about") return <Card tone="border-sky-300/15 bg-sky-300/10"><h2 className="text-lg font-semibold text-white">Gio Yap | Internal systems and workflow app developer</h2><p className="mt-2">I specialize in business-facing software for teams that need clear operations, reporting, training, and records workflows.</p><p>My niche is not generic marketing sites. I build dashboards, admin tools, LMS platforms, inventory-adjacent systems, and process-driven apps used by real staff inside real companies.</p><p>Best fit: organizations that need a developer who can translate a messy manual process into a usable internal product.</p></Card>;
	if (command === "projects") return <div className="grid gap-3">{projects.slice(0, 5).map((project) => <article key={project.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{project.year} | {project.type}</p><h2 className="mt-2 text-lg font-semibold text-white">{project.title}</h2><p className="mt-1 text-sm text-sky-100">{project.company} | {project.role}</p></div><a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-sky-300/40 hover:text-sky-100">Open<FaExternalLinkAlt /></a></div><p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p><p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">{project.impact}</p></article>)}<Link href="/archive" className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20">Open full archive<FaExternalLinkAlt /></Link></div>;
	if (command === "work") return <div className="grid gap-3">{experiences.map((experience) => <article key={`${experience.company}-${experience.role}`} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">{experience.role}</h2><p className="mt-1 text-sm text-sky-100">{experience.company}</p></div><p className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">{experience.period}</p></div><p className="mt-3 text-sm leading-7 text-slate-300">{experience.summary}</p><div className="mt-3 flex flex-wrap gap-2">{experience.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200">{highlight}</span>)}</div></article>)}</div>;
	if (command === "education") return <div className="grid gap-3">{educationItems.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4"><h2 className="text-lg font-semibold text-white">{item.title}</h2><p className="mt-2 text-sm leading-7 text-slate-300">{item.detail}</p></article>)}</div>;
	if (command === "resume") return <Card><p className="font-semibold text-white">Resume viewer opened.</p><p>The PDF window is now available as a separate draggable desktop panel.</p></Card>;
	if (command === "spotify") return <Card><p className="font-semibold text-white">Spotify window opened.</p><p>Your uploaded MP3 is ready in the desktop music player.</p></Card>;
	return <Card><p className="font-semibold text-white">Opening GitHub.app</p><p>If the new tab is blocked, use this link:<a href={githubUrl} target="_blank" rel="noopener noreferrer" className="ml-2 font-semibold text-sky-200 underline underline-offset-4">{githubUrl}</a></p></Card>;
}

function Card({ children, tone = "border-white/10 bg-white/5" }: { children: ReactNode; tone?: string }) {
	return <div className={`rounded-2xl border p-4 text-sm leading-7 text-slate-200 ${tone}`}>{children}</div>;
}
