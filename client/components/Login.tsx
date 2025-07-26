"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useHttp } from "@/hooks/UseHttp";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/CustomButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Min 6 characters" }),
});

export default function LoginForm() {
    const { request } = useHttp();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async () => {
        try {
            const { email, password } = form.getValues();
            const data = await request("/api/user/login", "POST", { email, password });

            if (data.token) {
                localStorage.setItem("token", data.token);
                await router.push("/");
            } else {
                toast("Login failed: no token received.");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
                    Welcome Back
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {["email", "password"].map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={field.name === "password" ? "password" : "text"}
                                                placeholder={
                                                    field.name === "password"
                                                        ? "Password"
                                                        : field.name.charAt(0).toUpperCase() + field.name.slice(1)
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-5 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-600 mt-1" />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <CustomButton
                            label="Log In"
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 py-4 text-white text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                        />
                    </form>
                </Form>
                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
