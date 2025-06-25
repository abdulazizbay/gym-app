"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:8080/api/users/login", {
                email: form.email,
                password: form.password,
                username: form.username
            }, {
                withCredentials: true,
            });

            const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

            localStorage.setItem("username", data.username);
            setUser(data);
            router.push("/")
            alert(`Welcome, ${data.username} (${data.role})`);
        } catch (err) {
            setError(err.response?.data || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-6 px-4 py-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign In
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </form>
        </div>
    );
}
