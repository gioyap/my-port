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
	title: "Gio Yap",
	description: "My Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 relative  px-6 md:px-12 lg:max-w-screen-lg xl:max-w-screen-xl 3xl:max-w-screen-2xl mx-auto`}
			>
				{/* Hire Me Button */}
				<a
					href="mailto:gioedrian.yap.l@gmail.com"
					className="fixed opacity-80 top-4 right-4 z-50 bg-teal-400 text-black py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 hover:text-white transition-colors"
				>
					Hire Me
				</a>

				{/* Main Content */}
				{children}
			</body>
		</html>
	);
}
