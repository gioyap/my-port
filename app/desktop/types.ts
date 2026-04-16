export type CommandKey =
	| "help"
	| "about"
	| "projects"
	| "work"
	| "education"
	| "resume"
	| "github"
	| "spotify";

export type WindowKey = "terminal" | "resume" | "spotify";
export type Stage = "boot" | "home" | "desktop";

export type HistoryItem = {
	id: number;
	input: string;
	command?: CommandKey;
	error?: string;
};

export type WindowState = {
	visible: boolean;
	open: boolean;
	x: number;
	y: number;
	z: number;
};

export type DragState = {
	key: WindowKey;
	offsetX: number;
	offsetY: number;
};
