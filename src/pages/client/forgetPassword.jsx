import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
	const [emailSent, setEmailSent] = useState(false);
	const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function sendOTP(){
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp", { email:email });
            toast.success("OTP sent successfully");
            setEmailSent(true);
        }catch{
            toast.error("Failed to send OTP");
        }
    }
    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully");
        }catch{
            toast.error("Failed to reset password");
        }
    }
	return (
	<div
		className="w-full min-h-screen flex items-center justify-center px-4"
		style={{
			backgroundImage: "url('/background.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
		}}
	>

		<div className="w-full max-w-sm bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 px-8 py-10">

			{/* TITLE */}
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold text-[#2C183E]">
					Reset Password
				</h1>
				<p className="text-xs text-gray-500 mt-1">
					Recover your account
				</p>
			</div>

			{/* STEP 1 */}
			{!emailSent && (
				<div className="flex flex-col gap-4">

					<input
						type="email"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border rounded-xl px-4 py-2 bg-white/60"
					/>

					<button
						onClick={sendOTP}
						className="w-full bg-[#7B3F8C] text-white py-2 rounded-xl hover:bg-[#5a2a68]"
					>
						Send OTP
					</button>

				</div>
			)}

			{/* STEP 2 */}
			{emailSent && (
				<div className="flex flex-col gap-4">

					<input
						placeholder="OTP"
						onChange={(e) => setOtp(e.target.value)}
						className="w-full border rounded-xl px-4 py-2 bg-white/60"
					/>

					<input
						type="password"
						placeholder="New Password"
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full border rounded-xl px-4 py-2 bg-white/60"
					/>

					<input
						type="password"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full border rounded-xl px-4 py-2 bg-white/60"
					/>

					<button
						onClick={resetPassword}
						className="w-full bg-[#2C183E] text-white py-2 rounded-xl hover:bg-[#7B3F8C]"
					>
						Reset Password
					</button>

				</div>
			)}

		</div>
	</div>
);
}