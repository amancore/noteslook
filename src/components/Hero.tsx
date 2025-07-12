"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const handleLogin = async () => {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
};

export default function Hero() {
	const router = useRouter();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 300], [0, -50]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
	};

	// Arrow shapes and positions
	const arrows = [
		{
			className:
				"absolute left-[-40px] top-1/2 md:left-[-60px] md:top-1/3 w-20 h-8",
			rotate: -20,
			delay: 0,
		},
		{
			className:
				"absolute right-[-40px] top-1/4 md:right-[-60px] md:top-1/5 w-24 h-8",
			rotate: 12,
			delay: 1,
		},
		{
			className:
				"absolute left-1/4 bottom-[-30px] md:left-1/3 md:bottom-[-40px] w-16 h-6",
			rotate: 30,
			delay: 2,
		},
		{
			className:
				"absolute right-1/4 bottom-[-30px] md:right-1/3 md:bottom-[-40px] w-20 h-8",
			rotate: -15,
			delay: 1.5,
		},
		{
			className: "absolute left-1/2 top-[-30px] md:top-[-40px] w-20 h-8",
			rotate: 0,
			delay: 0.8,
		},
	];

	const shapes = [
		// Subtle geometric shapes
		{
			className:
				"absolute left-8 top-1/3 w-8 h-8 rounded-full border-2 border-dashed border-white/30 opacity-40",
			animate: { scale: [1, 1.2, 1] },
			delay: 0,
		},
		{
			className:
				"absolute right-12 bottom-1/4 w-6 h-6 rotate-12 border-2 border-white/20 opacity-30",
			animate: { rotate: [0, 15, 0] },
			delay: 0.5,
		},
		{
			className: "absolute left-1/3 top-16 w-4 h-4 bg-white/10 rounded-full",
			animate: { scale: [1, 1.3, 1] },
			delay: 1,
		},
	];

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
			{/* Glassy background overlays */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black/0 to-white/10 opacity-90" />
				{shapes.map((shape, idx) => (
					<motion.div
						key={idx}
						className={shape.className}
						animate={shape.animate}
						transition={{
							duration: 5,
							repeat: Infinity,
							repeatType: "reverse",
							delay: shape.delay,
						}}
					/>
				))}
				{/* Mouse-following glowing dot */}
				<motion.div
					className="hidden sm:block absolute w-4 h-4 bg-white rounded-full blur-md opacity-70 pointer-events-none"
					animate={{
						x: mousePosition.x - 8,
						y: mousePosition.y - 8,
					}}
					transition={{
						type: "spring",
						stiffness: 500,
						damping: 28,
					}}
				/>
			</div>

			{/* Flying arrows */}
			{arrows.map((arrow, idx) => (
				<motion.svg
					key={idx}
					className={arrow.className + " z-20"}
					viewBox="0 0 100 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					initial={{ opacity: 0, y: 0, scale: 1, rotate: arrow.rotate }}
					animate={{
						opacity: [0.5, 1, 0.5],
						y: [0, -20, 0],
						scale: [1, 1.12, 1],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						delay: arrow.delay,
						ease: "easeInOut",
					}}
					whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px #fff)" }}
					style={{ pointerEvents: "auto", cursor: "pointer" }}>
					{/* Dotted arrow line */}
					<path
						d="M10 12 Q50 0 90 12"
						stroke="#fff"
						strokeDasharray="4 8"
						strokeWidth="2"
						fill="none"
						opacity="0.7"
					/>
					{/* Arrowhead (triangle) */}
					<polygon points="90,12 84,9 84,15" fill="#fff" opacity="0.7" />
				</motion.svg>
			))}

			{/* Main Content */}
			<motion.div
				className="z-10 w-full max-w-3xl mx-auto text-center"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				<motion.div
					variants={itemVariants}
					className="inline-flex items-center px-4 py-2 mb-6 sm:mb-8 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow text-xs sm:text-sm">
					<span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
					<span className="font-medium text-gray-200">
						Professional note-taking, redefined.
					</span>
				</motion.div>

				<motion.h1
					variants={itemVariants}
					className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-5 leading-tight tracking-tight">
					<span className="block mb-1 sm:mb-2">
						Your Knowledge, <span className="text-white/80">Organized.</span>
					</span>
					<motion.span
						className="block text-lg sm:text-2xl font-light text-gray-300"
						animate={{ opacity: [0.7, 1, 0.7] }}
						transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
						NotesLook for teams & creators.
					</motion.span>
				</motion.h1>

				<motion.p
					variants={itemVariants}
					className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
					All your ideas, notes, and code snippets—secure, synced, and
					beautifully accessible in a modern, distraction-free workspace.
				</motion.p>

				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
					<motion.button
						className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:bg-white/20 hover:text-black"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={async () => {
							await handleLogin();
							router.push("/");
						}}>
						<span className="relative z-10">Get Started</span>
					</motion.button>
					<motion.button
						className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-black/30 border border-white/20 backdrop-blur-lg rounded-2xl font-semibold text-base sm:text-lg text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						<span className="flex items-center justify-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1"
								/>
							</svg>
							Watch Demo
						</span>
					</motion.button>
				</motion.div>
			</motion.div>

			{/* Hero Image Section */}
			<motion.div
				className="z-10 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-0 sm:px-4"
				style={{ y }}
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.8 }}>
				<div className="relative group">
					<div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
						<div className="relative h-48 xs:h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
							<Image
								src="/dis.jpg"
								alt="NotesLook Dashboard Preview"
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
								className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-1000"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
						</div>
						{/* Floating UI Elements */}
						<motion.div
							className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-lg rounded-xl px-2 py-1 sm:px-4 sm:py-2 border border-white/20"
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
							<div className="flex items-center space-x-1 sm:space-x-2">
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
								<span className="text-[10px] sm:text-xs text-white/80">
									Auto-saved
								</span>
							</div>
						</motion.div>
						<motion.div
							className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/10 backdrop-blur-lg rounded-xl px-2 py-1 sm:px-4 sm:py-2 border border-white/20"
							animate={{ y: [0, 10, 0] }}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1,
							}}>
							<div className="flex items-center space-x-1 sm:space-x-2">
								<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
								<span className="text-[10px] sm:text-xs text-white/80">
									Synced
								</span>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
				<div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
					<div className="w-1 h-2 sm:w-1 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
				</div>
			</motion.div>
		</section>
	);
}
