"use client";

import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaApple, FaDownload, FaExternalLinkAlt, FaFileCode, FaFilePdf, FaFolder, FaFolderOpen, FaGithub, FaImages, FaSpotify, FaTerminal } from "react-icons/fa";
import { projects } from "./data/portfolio";
import {
	animationMs,
	commandKeys,
	desktopApps,
	githubUrl,
	initialWindows,
	localAudioTrackUrl,
	notes,
	photos,
	photosRotationMs,
	resumeUrl,
	terminalShortcutCommands,
} from "./desktop/config";
import {
	BootScreen,
	DesktopIcon,
	DesktopWindow,
	DockButton,
	HomeScreen,
	PhotosPreview,
	StickyNote,
	Wallpaper,
} from "./desktop/components";
import { useViewport } from "./desktop/hooks";
import { TerminalOutput } from "./desktop/TerminalOutput";
import type { CommandKey, DragState, HistoryItem, Stage, WindowKey } from "./desktop/types";
import { formatClock, formatMenuDate, normalizeCommand } from "./desktop/utils";

export default function PortfolioDesktop() {
	const [stage, setStage] = useState<Stage>("boot");
	const [commandInput, setCommandInput] = useState("");
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [clock, setClock] = useState(new Date());
	const [windows, setWindows] = useState(initialWindows);
	const [dragState, setDragState] = useState<DragState | null>(null);
	const [activePhotoIndex, setActivePhotoIndex] = useState(0);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
	const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

	const viewport = useViewport();

	const desktopRef = useRef<HTMLDivElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const zRef = useRef(40);
	const closeTimeouts = useRef<Partial<Record<WindowKey, number>>>({});

	useEffect(() => {
		const timer = window.setTimeout(() => setStage("home"), 1800);
		return () => window.clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (stage !== "entering") return;
		const timer = window.setTimeout(() => setStage("desktop"), 720);
		return () => window.clearTimeout(timer);
	}, [stage]);

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

	useEffect(
		() => () => {
			Object.values(closeTimeouts.current).forEach(
				(id) => id && window.clearTimeout(id),
			);
		},
		[],
	);

	useEffect(() => {
		if (!windows.spotify.visible || !windows.spotify.open || !audioRef.current) {
			return;
		}
		audioRef.current.play().catch(() => {});
	}, [windows.spotify.visible, windows.spotify.open]);

	useEffect(() => {
		if (photos.length <= 1) return;
		const timer = window.setInterval(() => {
			setActivePhotoIndex((current) => (current + 1) % photos.length);
		}, photosRotationMs);
		return () => window.clearInterval(timer);
	}, []);

	const lastCommand = history.at(-1)?.command;
	const terminalTitle = lastCommand ? `terminal | ${lastCommand}` : "terminal";

	const bringToFront = (key: WindowKey) => {
		zRef.current += 1;
		setWindows((current) => ({
			...current,
			[key]: { ...current[key], z: zRef.current },
		}));
	};

	const openWindow = (key: WindowKey) => {
		const pending = closeTimeouts.current[key];
		if (pending) {
			window.clearTimeout(pending);
			delete closeTimeouts.current[key];
		}

		zRef.current += 1;
		setWindows((current) => ({
			...current,
			[key]: { ...current[key], visible: true, open: true, z: zRef.current },
		}));
	};

	const openProjectsArchive = () => {
		setSelectedProjectSlug(null);
		openWindow("projects");
	};

	const closeWindow = (key: WindowKey) => {
		setWindows((current) => ({
			...current,
			[key]: { ...current[key], open: false },
		}));

		closeTimeouts.current[key] = window.setTimeout(() => {
			setWindows((current) => ({
				...current,
				[key]: { ...current[key], visible: false },
			}));
			delete closeTimeouts.current[key];
		}, animationMs);
	};

	const beginDrag = (key: WindowKey, event: ReactPointerEvent<HTMLDivElement>) => {
		if (viewport !== "desktop" || !desktopRef.current) return;
		const bounds = desktopRef.current.getBoundingClientRect();
		const state = windows[key];
		setDragState({
			key,
			offsetX: event.clientX - bounds.left - state.x,
			offsetY: event.clientY - bounds.top - state.y,
		});
		bringToFront(key);
	};

	const runCommand = (rawValue: string) => {
		const value = normalizeCommand(rawValue);
		if (!value) return;
		if (value === "clear") return setHistory([]);

		const known = commandKeys.find((item) => item === value);
		const nextId = Date.now();

		if (!known) {
			openWindow("terminal");
			return setHistory((current) => [
				...current,
				{
					id: nextId,
					input: rawValue,
					error:
						"Command not found. Try help, about, projects, work, education, resume, github, spotify, or clear.",
				},
			]);
		}

		if (known === "github") window.open(githubUrl, "_blank", "noopener,noreferrer");
		if (known === "resume") openWindow("resume");
		if (known === "spotify") openWindow("spotify");
		if (known === "help") openWindow("terminal");
		if (known !== "github") openWindow("terminal");

		setHistory((current) => [
			...current,
			{ id: nextId, input: rawValue, command: known as CommandKey },
		]);
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
			{stage === "home" || stage === "entering" ? (
				<HomeScreen
					clock={clock}
					onEnter={() => setStage("entering")}
					isLeaving={stage === "entering"}
				/>
			) : null}
			{stage === "desktop" || stage === "entering" ? (
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
						<div className="absolute left-3 top-10 z-10 grid grid-cols-2 gap-3 md:left-6 md:top-12 lg:grid-cols-2">
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
										if (app.onActivate === "photos") openWindow("photos");
									}}
								/>
							))}
						</div>

						<div className="absolute right-3 top-12 z-[12] grid grid-cols-[260px] gap-4 md:right-6 md:top-14 lg:grid-cols-[260px_260px]">
							<div>
								<PhotosPreview
									photoSrc={photos[activePhotoIndex].src}
									onClick={() => openWindow("photos")}
								/>
							</div>
							<div className="hidden gap-4 lg:grid">
								{notes.map((note) => (
									<StickyNote
										key={note.title}
										title={note.title}
										body={note.body}
										tone={note.tone}
									/>
								))}
							</div>
						</div>

						{windows.terminal.visible ? (
							<DesktopWindow
								title={terminalTitle}
								windowState={windows.terminal}
								widthClass="w-[min(92vw,760px)]"
								viewport={viewport}
								onFocus={() => bringToFront("terminal")}
								onClose={() => closeWindow("terminal")}
								onPointerDownHeader={(event) => beginDrag("terminal", event)}
							>
								<div className="p-4 md:p-5">
									<div className="rounded-[24px] border border-emerald-400/20 bg-[#050b16] p-4 shadow-inner shadow-black/50">
										<div className="mb-4 flex flex-wrap gap-2">
											{terminalShortcutCommands.map((command) => (
												<button
													key={command}
													type="button"
													onClick={() => runCommand(command)}
													className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20"
												>
													{command}
												</button>
											))}
										</div>

										<div className="min-h-[380px] max-h-[58vh] space-y-5 overflow-y-auto pr-2">
											{history.length === 0 ? (
												<div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
													<p className="font-semibold text-emerald-200">
														Mac terminal portfolio
													</p>
													<p>
														Type{" "}
														<span className="font-mono text-emerald-100">help</span>{" "}
														to open the command list.
													</p>
												</div>
											) : null}

											{history.map((item) => (
												<div key={item.id} className="space-y-3">
													<div className="font-mono text-sm text-emerald-300">
														<span className="text-emerald-500">gio@portfolio</span>
														:~$ {item.input}
													</div>
													{item.error ? (
														<p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
															{item.error}
														</p>
													) : item.command ? (
														<TerminalOutput
															command={item.command}
															onOpenArchive={openProjectsArchive}
														/>
													) : null}
												</div>
											))}
										</div>

										<form
											onSubmit={handleSubmit}
											className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3"
										>
											<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#020617] px-3 py-2">
												<span className="font-mono text-sm text-emerald-400">$</span>
												<input
													value={commandInput}
													onChange={(event) => setCommandInput(event.target.value)}
													placeholder="Type help, about, projects, work..."
													className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500"
												/>
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
								viewport={viewport}
								onFocus={() => bringToFront("resume")}
								onClose={() => closeWindow("resume")}
								onPointerDownHeader={(event) => beginDrag("resume", event)}
								action={
									<a
										href={resumeUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-400"
									>
										<FaDownload />
										Open PDF
									</a>
								}
							>
								<div className="bg-[#f3f4f6] p-4">
									<div className="overflow-hidden rounded-[20px] border border-slate-300 bg-white">
										<iframe
											src={resumeUrl}
											title="Resume PDF"
											className={`w-full ${viewport === "mobile" ? "h-[55dvh] min-h-[300px]" : "h-[68vh] min-h-[500px]"}`}
										/>
									</div>
								</div>
							</DesktopWindow>
							) : null}

						{windows.projects.visible ? (
							<DesktopWindow
								title="projects finder"
								windowState={windows.projects}
								widthClass="w-[min(92vw,920px)]"
								light
								viewport={viewport}
								onFocus={() => bringToFront("projects")}
								onClose={() => closeWindow("projects")}
								onPointerDownHeader={(event) => beginDrag("projects", event)}
							>
								<div className={`bg-[#eef2f7] ${viewport !== "mobile" ? "grid max-h-[72vh] grid-cols-[220px_1fr] overflow-hidden" : ""}`}>
									<div className={`border-r border-slate-300 bg-[#e4ebf3] p-4 ${viewport === "mobile" ? "hidden" : ""}`}>
										<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
											Favorites
										</p>
										<div className="mt-4">
											<button
												type="button"
												onClick={() => setSelectedProjectSlug(null)}
												className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
													selectedProjectSlug === null
														? "border-sky-300 bg-sky-100 text-slate-900"
														: "border-transparent bg-white/70 text-slate-700 hover:border-slate-300"
												}`}
											>
												<FaFolder className="text-lg text-[#4f95ff]" />
												<span className="font-semibold">Projects</span>
											</button>
										</div>
									</div>
									<div className={viewport !== "mobile" ? "max-h-[72vh] overflow-y-auto p-5" : "p-4"}>
										{selectedProjectSlug === null ? (
											<div>
												<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
													Projects
												</p>
												<h2 className="mt-3 text-3xl font-semibold text-slate-900">
													Project folders
												</h2>
												<div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
													{projects.map((project) => (
														<button
															key={project.slug}
															type="button"
															onClick={() => setSelectedProjectSlug(project.slug)}
															className="group text-center"
														>
															<div className="mx-auto grid h-24 w-24 place-items-center rounded-[24px] border border-sky-200/60 bg-[linear-gradient(180deg,#7dc7ff,#3b82f6)] text-5xl text-white shadow-[0_18px_36px_rgba(59,130,246,0.24)] transition group-hover:-translate-y-1 group-hover:scale-105">
																<FaFolder />
															</div>
															<p className="mt-3 text-sm font-medium leading-5 text-slate-800">
																{project.title}
															</p>
														</button>
													))}
												</div>
											</div>
										) : (
											projects
												.filter((project) => project.slug === selectedProjectSlug)
												.map((project) => (
													<div key={project.slug}>
														<div className="flex items-center gap-3">
															<button
																type="button"
																onClick={() => setSelectedProjectSlug(null)}
																className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
															>
																Back
															</button>
															<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
																Projects / {project.title}
															</p>
														</div>
														<h2 className="mt-4 text-3xl font-semibold text-slate-900">
															{project.title}
														</h2>
														<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
															{project.summary}
														</p>
														<div className="mt-6 rounded-[24px] border border-slate-300 bg-white p-5">
															<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
																Files
															</p>
															<div className="mt-4 grid gap-3">
																<a
																	href={project.link}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50"
																>
																	<div className="flex items-center gap-4">
																		<div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-xl text-orange-500">
																			<FaFileCode />
																		</div>
																		<div>
																			<p className="font-semibold text-slate-900">
																				{project.slug}.html
																			</p>
																			<p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
																				open live project
																			</p>
																		</div>
																	</div>
																	<FaExternalLinkAlt className="text-slate-500" />
																</a>
															</div>
														</div>
														<div className="mt-6 grid gap-4 md:grid-cols-2">
															<div className="rounded-[24px] border border-slate-300 bg-white p-5">
																<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
																	Details
																</p>
																<div className="mt-4 space-y-2 text-sm text-slate-700">
																	<p>
																		<span className="font-semibold text-slate-900">
																			Company:
																		</span>{" "}
																		{project.company}
																	</p>
																	<p>
																		<span className="font-semibold text-slate-900">
																			Role:
																		</span>{" "}
																		{project.role}
																	</p>
																	<p>
																		<span className="font-semibold text-slate-900">
																			Type:
																		</span>{" "}
																		{project.type}
																	</p>
																	<p>
																		<span className="font-semibold text-slate-900">
																			Impact:
																		</span>{" "}
																		{project.impact}
																	</p>
																	<p>
																		<span className="font-semibold text-slate-900">
																			Year:
																		</span>{" "}
																		{project.year}
																	</p>
																</div>
															</div>
															<div className="rounded-[24px] border border-slate-300 bg-white p-5">
																<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
																	Stack
																</p>
																<div className="mt-4 flex flex-wrap gap-2">
																	{project.stack.map((tech) => (
																		<span
																			key={tech}
																			className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
																		>
																			{tech}
																		</span>
																	))}
																</div>
															</div>
														</div>
													</div>
												))
										)}
									</div>
								</div>
							</DesktopWindow>
						) : null}

						{windows.photos.visible ? (
							<DesktopWindow
								title="photo library"
								windowState={windows.photos}
								widthClass="w-[min(92vw,760px)]"
								light
								viewport={viewport}
								onFocus={() => bringToFront("photos")}
								onClose={() => closeWindow("photos")}
								onPointerDownHeader={(event) => beginDrag("photos", event)}
							>
								<div className="max-h-[70vh] overflow-y-auto bg-[#eff3f8] p-4">
									<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
										{photos.map((photo, index) => (
											<button
												key={photo.src}
												type="button"
												onClick={() => setSelectedPhotoIndex(index)}
												className="overflow-hidden rounded-[20px] border border-slate-300 bg-white text-left shadow-sm transition hover:scale-[1.02]"
											>
												<div className="relative h-40 w-full">
													<Image
														src={photo.src}
														alt=""
														fill
														className="object-cover"
													/>
												</div>
											</button>
										))}
									</div>
								</div>
							</DesktopWindow>
						) : null}

						{windows.spotify.visible ? (
							<DesktopWindow
								title="spotify"
								windowState={windows.spotify}
								widthClass="w-[min(92vw,420px)]"
								viewport={viewport}
								onFocus={() => bringToFront("spotify")}
								onClose={() => closeWindow("spotify")}
								onPointerDownHeader={(event) => beginDrag("spotify", event)}
							>
								<div className="bg-[linear-gradient(180deg,#0f172a,#020617)] p-4">
									<div className="rounded-[24px] border border-emerald-400/20 bg-black/40 p-4">
										<div className="mb-4 flex items-center gap-3">
											<div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1ed760] text-2xl text-black">
												<FaSpotify />
											</div>
											<div>
												<p className="text-sm font-semibold text-white">
													Desktop music
												</p>
												<p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
													Local player
												</p>
											</div>
										</div>
										<div className="rounded-2xl border border-emerald-400/15 bg-[#121826] p-4">
											<div className="rounded-2xl bg-[linear-gradient(135deg,#1db954,#0f172a)] p-5">
												<p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
													Now Playing
												</p>
												<h3 className="mt-2 text-xl font-semibold text-white">
													Portfolio soundtrack
												</h3>
												<p className="mt-2 text-sm leading-6 text-white/80">
													Ambient background audio for the desktop experience.
												</p>
											</div>
											<audio
												ref={audioRef}
												src={localAudioTrackUrl}
												controls
												autoPlay
												loop
												preload="auto"
												className="mt-4 w-full"
											/>
										</div>
									</div>
								</div>
							</DesktopWindow>
						) : null}
					</section>

					<nav className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
						<div className="flex max-w-[calc(100vw-2rem)] items-end gap-2 overflow-x-auto rounded-[30px] border border-white/20 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-3xl md:gap-3">
							<DockButton
								icon={FaTerminal}
								label="Terminal"
								iconClass="text-emerald-300"
								tileClass="border-white/20 bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(2,6,23,0.95))]"
								onClick={() => openWindow("terminal")}
							/>
							<DockButton
								icon={FaFolderOpen}
								label="Projects"
								iconClass="text-white"
								tileClass="border-sky-200/40 bg-[linear-gradient(180deg,rgba(96,165,250,0.96),rgba(37,99,235,0.98))]"
								onClick={openProjectsArchive}
							/>
							<DockButton
								icon={FaFilePdf}
								label="Resume"
								iconClass="text-rose-200"
								tileClass="border-rose-200/40 bg-[linear-gradient(180deg,rgba(239,68,68,0.95),rgba(153,27,27,0.98))]"
								onClick={() => openWindow("resume")}
							/>
							<DockButton
								icon={FaGithub}
								label="GitHub"
								iconClass="text-white"
								tileClass="border-slate-200/35 bg-[linear-gradient(180deg,rgba(55,65,81,0.95),rgba(15,23,42,0.98))]"
								onClick={() => runCommand("github")}
							/>
							<DockButton
								icon={FaImages}
								label="Photos"
								iconClass="text-white"
								tileClass="border-cyan-200/40 bg-[linear-gradient(180deg,rgba(56,189,248,0.96),rgba(37,99,235,0.98))]"
								onClick={() => openWindow("photos")}
							/>
							<DockButton
								icon={FaSpotify}
								label="Spotify"
								iconClass="text-white"
								tileClass="border-emerald-200/40 bg-[linear-gradient(180deg,rgba(34,197,94,0.96),rgba(22,101,52,0.98))]"
								onClick={() => openWindow("spotify")}
							/>
						</div>
					</nav>

					{selectedPhotoIndex !== null ? (
						<button
							type="button"
							onClick={() => setSelectedPhotoIndex(null)}
							className="fixed inset-0 z-[160] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
						>
							<div
								className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/20 bg-black shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
								onClick={(event) => event.stopPropagation()}
							>
								<Image
									src={photos[selectedPhotoIndex].src}
									alt=""
									fill
									className="object-contain"
								/>
							</div>
						</button>
					) : null}
				</>
			) : null}
		</main>
	);
}

function initialProjectSlug() {
	return projects[0]?.slug ?? "";
}
