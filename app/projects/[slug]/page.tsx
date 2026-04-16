import Link from "next/link";
import { notFound } from "next/navigation";
import {
	FaArrowLeft,
	FaArrowRight,
	FaExternalLinkAlt,
	FaRegCheckCircle,
} from "react-icons/fa";
import { projects } from "../../data/portfolio";

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export function generateStaticParams() {
	return projects
		.filter((project) => project.caseStudy)
		.map((project) => ({ slug: project.slug }));
}

export default async function ProjectCaseStudyPage({ params }: Props) {
	const { slug } = await params;
	const project = projects.find((item) => item.slug === slug && item.caseStudy);

	if (!project || !project.caseStudy) {
		notFound();
	}

	const relatedProjects = projects.filter(
		(item) => item.slug !== project.slug && item.caseStudy
	);

	return (
		<main className="min-h-screen bg-[#0b0f14] px-5 py-24 text-slate-100 md:px-8">
			<div className="mx-auto max-w-6xl">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-emerald-200 transition hover:text-white"
				>
					<FaArrowLeft aria-hidden="true" />
					Back to portfolio
				</Link>

				<section className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
					<div>
						<p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">
							Case Study
						</p>
						<h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
							{project.title}
						</h1>
						<p className="mt-3 text-lg font-bold text-slate-300">
							{project.caseStudy.headline}
						</p>
						<p className="mt-6 leading-8 text-slate-300">
							{project.caseStudy.intro}
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-200"
							>
								View live project
								<FaExternalLinkAlt aria-hidden="true" className="text-xs" />
							</a>
							<Link
								href="/archive"
								className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:border-emerald-300 hover:text-emerald-200"
							>
								Project archive
								<FaArrowRight aria-hidden="true" />
							</Link>
						</div>

						<div className="mt-10 grid gap-3 sm:grid-cols-2">
							<div className="rounded-lg border border-white/10 bg-[#101720] p-5">
								<p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
									Company
								</p>
								<p className="mt-3 text-lg font-black text-white">
									{project.company}
								</p>
							</div>
							<div className="rounded-lg border border-white/10 bg-[#101720] p-5">
								<p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
									Role
								</p>
								<p className="mt-3 text-lg font-black text-white">
									{project.role}
								</p>
							</div>
						</div>
					</div>

					<div className="overflow-hidden rounded-lg border border-white/10 bg-[#101720]">
						<img
							src={project.image}
							alt={`${project.title} screenshot`}
							className="aspect-[16/10] w-full object-cover"
						/>
						<div className="border-t border-white/10 p-5">
							<p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
								Stack
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{project.stack.map((tech) => (
									<span
										key={tech}
										className="rounded-md bg-white/[0.06] px-3 py-2 text-sm font-semibold text-slate-300"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mt-16 grid gap-5 lg:grid-cols-3">
					<article className="rounded-lg border border-white/10 bg-[#101720] p-6">
						<p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
							Context
						</p>
						<p className="mt-4 leading-7 text-slate-300">
							{project.caseStudy.context}
						</p>
					</article>
					<article className="rounded-lg border border-white/10 bg-[#101720] p-6 lg:col-span-2">
						<p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
							Key features
						</p>
						<div className="mt-4 grid gap-3 sm:grid-cols-2">
							{project.caseStudy.features.map((feature) => (
								<div
									key={feature}
									className="rounded-md border border-white/10 bg-white/[0.03] p-4"
								>
									<p className="font-semibold text-slate-200">{feature}</p>
								</div>
							))}
						</div>
					</article>
				</section>

				<section className="mt-16 grid gap-5 lg:grid-cols-3">
					{[
						{ title: "Problem", items: project.caseStudy.problem },
						{ title: "Approach", items: project.caseStudy.approach },
						{ title: "Results", items: project.caseStudy.results },
					].map((group) => (
						<article
							key={group.title}
							className="rounded-lg border border-white/10 bg-[#101720] p-6"
						>
							<p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">
								{group.title}
							</p>
							<ul className="mt-4 space-y-3">
								{group.items.map((item) => (
									<li key={item} className="flex gap-3">
										<FaRegCheckCircle
											aria-hidden="true"
											className="mt-1 shrink-0 text-emerald-300"
										/>
										<span className="leading-7 text-slate-300">{item}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</section>

				{relatedProjects.length > 0 ? (
					<section className="mt-16">
						<div className="mb-6 flex items-end justify-between gap-4">
							<div>
								<p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
									More case studies
								</p>
								<h2 className="mt-3 text-3xl font-black text-white">
									More work in this portfolio
								</h2>
							</div>
						</div>
						<div className="grid gap-5 md:grid-cols-2">
							{relatedProjects.map((item) => (
								<Link
									key={item.slug}
									href={`/projects/${item.slug}`}
									className="rounded-lg border border-white/10 bg-[#101720] p-5 transition hover:-translate-y-1 hover:border-white/25"
								>
									<p className="text-sm font-bold text-slate-400">{item.company}</p>
									<h3 className="mt-2 text-2xl font-black text-white">
										{item.title}
									</h3>
									<p className="mt-3 leading-7 text-slate-300">{item.summary}</p>
									<span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
										Read case study
										<FaArrowRight aria-hidden="true" />
									</span>
								</Link>
							))}
						</div>
					</section>
				) : null}
			</div>
		</main>
	);
}
