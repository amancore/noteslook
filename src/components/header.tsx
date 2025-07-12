import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "@/lib/useAuth";

export default function Header() {
	const { user, loading } = useAuth();
	const [authLoading, setAuthLoading] = useState(false);

	const handleLogin = async () => {
		if (authLoading) return; // Prevent multiple clicks
		setAuthLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
		} finally {
			setAuthLoading(false);
		}
	};

	const handleLogout = async () => {
		await signOut(auth);
	};

	return (
		<header className="relative z-50 w-full overflow-hidden bg-black border-b border-white/10">
			<div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/0 to-white/5 pointer-events-none" />
			<div className="relative z-10 container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-4 sm:px-8">
				<h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
					<span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
						NotesLook
					</span>
				</h1>
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap justify-center">
					{!loading && user ? (
						<div className="flex items-center gap-3">
							<span className="text-gray-200 text-sm hidden sm:inline-block font-medium">
								Welcome,{" "}
								<span className="font-bold text-blue-400">{user.displayName}</span>
							</span>
							{user.photoURL && (
								<div className="border-none w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 via-blue-500 to-red-400 p-0.5 shadow flex items-center justify-center">
									<div className="w-8 h-8 rounded-full bg-black overflow-hidden flex items-center justify-center">
										<img
											src={user.photoURL}
											alt="Profile"
											className="w-full h-full object-cover rounded-full"
										/>
									</div>
								</div>
							)}
							<Button
								type="button"
								variant="outline"
								onClick={handleLogout}
								size="lg"
								className="cursor-pointer border-white/20 text-white bg-black/40 hover:bg-white/90 hover:text-black transition-all shadow">
								<LogOut className="h-5 w-5 mr-2" />
								Logout
							</Button>
						</div>
					) : (
						<Button
							type="button"
							variant="outline"
							onClick={handleLogin}
							size="lg"
							className="cursor-pointer border-white/20 text-white bg-black/40 hover:bg-white/90 hover:text-black transition-all shadow"
							disabled={authLoading}>
							<LogIn className="h-5 w-5 mr-2" />
							{authLoading ? "Signing in..." : "Login"}
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
