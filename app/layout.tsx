import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Gio Yap | Full-Stack Developer for Business Systems",
	description:
		"Portfolio of Gio Yap, a full-stack developer building internal tools, dashboards, reporting systems, LMS platforms, and business workflow applications.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-[#0b0f14] antialiased`}
			>
				{/* Main Content */}
				{children}
			</body>
		</html>
	);
}
