import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { experiences, projects } from "../data/portfolio";
import {
	educationItems,
	githubUrl,
} from "./config";
import { Card } from "./components";
import type { CommandKey } from "./types";

export function TerminalOutput({ command }: { command: CommandKey }) {
	if (command === "help") {
		return (
			<Card>
				<p className="font-semibold text-white">Available commands</p>
				<div className="mt-3 grid gap-2 sm:grid-cols-2">
					{[
						"about",
						"projects",
						"work",
						"education",
						"resume",
						"github",
						"spotify",
						"clear",
					].map((item) => (
						<div
							key={item}
							className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 font-mono text-xs text-emerald-200"
						>
							{item}
						</div>
					))}
				</div>
			</Card>
		);
	}

	if (command === "about") {
		return (
			<Card tone="border-sky-300/15 bg-sky-300/10">
				<h2 className="text-lg font-semibold text-white">
					Gio Yap | Internal systems and workflow app developer
				</h2>
				<p className="mt-2">
					I specialize in business-facing software for teams that need clear
					operations, reporting, training, and records workflows.
				</p>
				<p>
					My niche is not generic marketing sites. I build dashboards, admin
					tools, LMS platforms, inventory-adjacent systems, and process-driven
					apps used by real staff inside real companies.
				</p>
				<p>
					Best fit: organizations that need a developer who can translate a
					messy manual process into a usable internal product.
				</p>
			</Card>
		);
	}

	if (command === "projects") {
		return (
			<div className="grid gap-3">
				{projects.slice(0, 5).map((project) => (
					<article
						key={project.slug}
						className="rounded-2xl border border-white/10 bg-white/5 p-4"
					>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									{project.year} | {project.type}
								</p>
								<h2 className="mt-2 text-lg font-semibold text-white">
									{project.title}
								</h2>
								<p className="mt-1 text-sm text-sky-100">
									{project.company} | {project.role}
								</p>
							</div>
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-sky-300/40 hover:text-sky-100"
							>
								Open
								<FaExternalLinkAlt />
							</a>
						</div>
						<p className="mt-3 text-sm leading-7 text-slate-300">
							{project.summary}
						</p>
						<p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
							{project.impact}
						</p>
					</article>
				))}
				<Link
					href="/archive"
					className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20"
				>
					Open full archive
					<FaExternalLinkAlt />
				</Link>
			</div>
		);
	}

	if (command === "work") {
		return (
			<div className="grid gap-3">
				{experiences.map((experience) => (
					<article
						key={`${experience.company}-${experience.role}`}
						className="rounded-2xl border border-white/10 bg-white/5 p-4"
					>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div>
								<h2 className="text-lg font-semibold text-white">
									{experience.role}
								</h2>
								<p className="mt-1 text-sm text-sky-100">
									{experience.company}
								</p>
							</div>
							<p className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
								{experience.period}
							</p>
						</div>
						<p className="mt-3 text-sm leading-7 text-slate-300">
							{experience.summary}
						</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{experience.highlights.map((highlight) => (
								<span
									key={highlight}
									className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200"
								>
									{highlight}
								</span>
							))}
						</div>
					</article>
				))}
			</div>
		);
	}

	if (command === "education") {
		return (
			<div className="grid gap-3">
				{educationItems.map((item) => (
					<article
						key={item.title}
						className="rounded-2xl border border-white/10 bg-white/5 p-4"
					>
						<h2 className="text-lg font-semibold text-white">{item.title}</h2>
						<p className="mt-2 text-sm leading-7 text-slate-300">
							{item.detail}
						</p>
					</article>
				))}
			</div>
		);
	}

	if (command === "resume") {
		return (
			<Card>
				<p className="font-semibold text-white">Resume viewer opened.</p>
				<p>
					The PDF window is now available as a separate draggable desktop panel.
				</p>
			</Card>
		);
	}

	if (command === "spotify") {
		return (
			<Card>
				<p className="font-semibold text-white">Spotify window opened.</p>
				<p>Your uploaded MP3 is ready in the desktop music player.</p>
			</Card>
		);
	}

	return (
		<Card>
			<p className="font-semibold text-white">Opening GitHub.app</p>
			<p>
				If the new tab is blocked, use this link:
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 font-semibold text-sky-200 underline underline-offset-4"
				>
					{githubUrl}
				</a>
			</p>
		</Card>
	);
}
