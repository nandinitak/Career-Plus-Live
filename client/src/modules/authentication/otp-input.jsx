"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { verifyOTP } from "@/helpers/authAPI";

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

export default function InputOTPForm() {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	async function onSubmit(data) {
		setLoading(true);
		try {
			const email = localStorage.getItem("user@email");
			await verifyOTP(email, data.pin)
				.then(() => {
					toast.success("Email Verified Successfully");
					navigate("/dashboard");
				})
				.catch((error) => {
					const errorTXT = error.response.data.message;
					toast.error(errorTXT);
				});
		} catch (error) {
			toast.error("OTP could not be processed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
			<div className="min-h-screen flex items-center justify-center">
				<div className="grid gap-1 text-left">
					<Card className="mx-auto max-w-sm">
						<CardHeader>
							<CardTitle clasname="text-xl pl-2 gradient-text">
								Verify Your Email
							</CardTitle>
							<CardDescription className="">
								Email sent to{" "}
								{
									<a className="font-mono text-xs">
										{localStorage.getItem("user@email")}
									</a>
								}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<div className="grid gap-2">
										<div className="grid gap-2"></div>
										<FormField
											control={form.control}
											name="pin"
											render={({ field }) => (
												<FormItem>
													<FormLabel>One-Time Password</FormLabel>
													<FormControl>
														<InputOTP maxLength={6} {...field}>
															<InputOTPGroup>
																<InputOTPSlot index={0} />
																<InputOTPSlot index={1} />
																<InputOTPSlot index={2} />
																<InputOTPSlot index={3} />
																<InputOTPSlot index={4} />
																<InputOTPSlot index={5} />
															</InputOTPGroup>
														</InputOTP>
													</FormControl>
													<FormDescription clasname="text-sm">
														Please enter the one-time password sent to your
														email.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<CardFooter>
											{loading ? (
												<LoadingButton
													loading
													className="w-full"
												></LoadingButton>
											) : (
												<Button
													variant="shine"
													type="submit"
													className="w-full"
												>
													Verify
												</Button>
											)}
										</CardFooter>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
