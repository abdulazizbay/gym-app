"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SignUpForm() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/users/register", form);
            alert(res.data);
        } catch (err) {
            alert(err.response?.data || "Error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md  text-black"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

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
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
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
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full mb-6 px-4 py-2 border rounded"
                    required
                >
                    <option value="USER">User</option>
                    <option value="TRAINER">Trainer</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Do you have an account?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
}
