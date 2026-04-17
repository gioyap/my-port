import Image from "next/image";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { FaApple } from "react-icons/fa";
import type { IconType } from "react-icons";
import { formatClock, formatMenuDate } from "./utils";
import type { WindowState } from "./types";

export function Wallpaper() {
	return (
		<>
			<div className="fixed inset-0 -z-30">
				<Image
					src="/images/desktopwp.jpg"
					alt=""
					fill
					priority
					className="object-cover object-center"
				/>
			</div>
			<div className="fixed inset-0 -z-29 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(6,10,18,0.08))]" />
			<div className="fixed inset-0 -z-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(10,18,35,0.16),transparent_42%)]" />
		</>
	);
}

export function BootScreen() {
	return (
		<section className="fixed inset-0 z-[200] bg-black text-white">
			<div className="flex min-h-screen flex-col items-center justify-center">
				<div className="animate-pulse text-7xl text-white">
					<FaApple />
				</div>
				<div className="mt-10 h-1.5 w-52 overflow-hidden rounded-full bg-white/15">
					<div className="h-full w-1/2 animate-[bootload_1.6s_ease-in-out_forwards] rounded-full bg-white" />
				</div>
			</div>
		</section>
	);
}

export function HomeScreen({
	clock,
	onEnter,
	isLeaving = false,
}: {
	clock: Date;
	onEnter: () => void;
	isLeaving?: boolean;
}) {
	return (
		<section
			className={`fixed inset-0 z-[180] ${isLeaving ? "pointer-events-none animate-[homescreenLift_720ms_cubic-bezier(0.22,1,0.36,1)_forwards]" : ""}`}
		>
			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="w-full max-w-md rounded-[34px] border border-white/20 bg-black/25 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
					<div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-white/12 text-4xl font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
						GY
					</div>
					<h1 className="mt-6 text-3xl font-semibold text-white">Gio Yap</h1>
					<p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/75">
						Systems Builder
					</p>
					<p className="mt-5 text-sm leading-7 text-white/85">
						Internal tools, reporting apps, LMS builds, and workflow software
						for real teams.
					</p>
					<p className="mt-6 text-5xl font-semibold text-white">
						{formatClock(clock)}
					</p>
					<p className="mt-2 text-sm text-white/75">{formatMenuDate(clock)}</p>
					<button
						type="button"
						onClick={onEnter}
						className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
					>
						Enter Desktop
					</button>
				</div>
			</div>
		</section>
	);
}

export function StickyNote({
	title,
	body,
	tone,
}: {
	title: string;
	body: string;
	tone: string;
}) {
	return (
		<article
			className={`rounded-[22px] p-4 text-slate-900 shadow-[0_24px_40px_rgba(0,0,0,0.22)] ${tone}`}
		>
			<p className="text-xs font-semibold uppercase tracking-[0.18em]">{title}</p>
			<p className="mt-3 text-sm font-medium leading-6">{body}</p>
		</article>
	);
}

export function PhotosPreview({
	photoSrc,
	onClick,
}: {
	photoSrc: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="pointer-events-auto w-[260px] overflow-hidden rounded-[26px] border border-white/20 bg-white/15 text-left shadow-[0_24px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:scale-[1.02] hidden md:block"
		>
			<div className="relative h-[240px] w-full">
				<Image src={photoSrc} alt="" fill className="object-cover" />
				<div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.58))]" />
			</div>
		</button>
	);
}

export function DesktopWindow({
	title,
	children,
	windowState,
	widthClass,
	onFocus,
	onClose,
	onPointerDownHeader,
	action,
	light = false,
}: {
	title: string;
	children: ReactNode;
	windowState: WindowState;
	widthClass: string;
	onFocus: () => void;
	onClose: () => void;
	onPointerDownHeader: (event: ReactPointerEvent<HTMLDivElement>) => void;
	action?: ReactNode;
	light?: boolean;
}) {
	return (
		<section
			onMouseDown={onFocus}
			className={`absolute top-0 rounded-[28px] border shadow-[0_40px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition-[opacity,transform] duration-200 ease-out ${widthClass} ${
				light
					? "border-white/30 bg-white/75 text-slate-950"
					: "border-white/25 bg-[#0b1020]/80 text-white"
			}`}
			style={{
				left: 0,
				zIndex: windowState.z,
				transform: `translate3d(${windowState.x}px, ${windowState.y}px, 0) scale(${windowState.open ? 1 : 0.94})`,
				opacity: windowState.open ? 1 : 0,
			}}
		>
			<WindowBar
				title={title}
				action={action}
				onClose={onClose}
				onPointerDownHeader={onPointerDownHeader}
				light={light}
			/>
			{children}
		</section>
	);
}

export function WindowBar({
	title,
	action,
	onClose,
	onPointerDownHeader,
	light = false,
}: {
	title: string;
	action?: ReactNode;
	onClose: () => void;
	onPointerDownHeader: (event: ReactPointerEvent<HTMLDivElement>) => void;
	light?: boolean;
}) {
	return (
		<div
			onPointerDown={onPointerDownHeader}
			className={`flex cursor-grab items-center justify-between border-b px-4 py-3 active:cursor-grabbing ${
				light
					? "border-slate-300 bg-[#e5e7eb]"
					: "border-white/10 bg-white/5"
			}`}
		>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={(event) => {
						event.stopPropagation();
						onClose();
					}}
					aria-label="Close window"
					className="h-3 w-3 rounded-full bg-[#ff5f57]"
				/>
				<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
				<span className="h-3 w-3 rounded-full bg-[#28c840]" />
			</div>
			<p
				className={`text-xs font-semibold uppercase tracking-[0.24em] ${
					light ? "text-slate-600" : "text-slate-400"
				}`}
			>
				{title}
			</p>
			<div
				className="min-w-20 text-right"
				onPointerDown={(event) => event.stopPropagation()}
			>
				{action}
			</div>
		</div>
	);
}

export function DesktopIcon({
	label,
	icon: Icon,
	iconClass,
	tileClass,
	onClick,
}: {
	label: string;
	icon: IconType;
	iconClass: string;
	tileClass: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group flex w-24 flex-col items-center gap-3 rounded-3xl p-3 text-center transition hover:bg-white/10"
		>
			<div
				className={`grid h-16 w-16 place-items-center rounded-[22px] border text-2xl shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition group-hover:-translate-y-1 group-hover:scale-105 ${tileClass}`}
			>
				<Icon className={iconClass} />
			</div>
			<span className="text-xs font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
				{label}
			</span>
		</button>
	);
}

export function DockButton({
	icon: Icon,
	label,
	iconClass,
	tileClass,
	className = "",
	onClick,
}: {
	icon: IconType;
	label: string;
	iconClass: string;
	tileClass: string;
	className?: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			className={`grid h-14 w-14 place-items-center rounded-[18px] border text-xl shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-2 hover:scale-110 ${tileClass} ${className}`}
		>
			<Icon className={iconClass} />
		</button>
	);
}

export function Card({
	children,
	tone = "border-white/10 bg-white/5",
}: {
	children: ReactNode;
	tone?: string;
}) {
	return (
		<div className={`rounded-2xl border p-4 text-sm leading-7 text-slate-200 ${tone}`}>
			{children}
		</div>
	);
}
