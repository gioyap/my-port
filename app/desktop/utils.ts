export function normalizeCommand(value: string) {
	return value.trim().toLowerCase().replace(/:+$/, "");
}

export function formatClock(date: Date) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
	}).format(date);
}

export function formatMenuDate(date: Date) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
	}).format(date);
}
