import { useEffect, useState } from "react";
import type { Viewport } from "./types";

export function useViewport(): Viewport {
	const [viewport, setViewport] = useState<Viewport>("desktop");

	useEffect(() => {
		const check = () => {
			const w = window.innerWidth;
			setViewport(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
		};
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return viewport;
}
