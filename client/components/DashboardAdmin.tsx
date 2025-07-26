"use client"
import { useHttp } from "@/hooks/UseHttp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CustomButton } from "@/components/CustomButton";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const FormSchema = z.object({
    username: z.string().min(2, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Min 6 characters" }),
    adminType: z.boolean({message: "Please select admin type"}),
});


export const DashboardAdmin = () => {
    const { request } = useHttp();
    const [allAdmins, setAllAdmins] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            adminType: false
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request("/api/admin/getAllAdmins");
                setAllAdmins(response);
            } catch (e) {
                toast.error(e.message || "Failed to fetch trainers");
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (values) => {
        try {

            const res = await axios.post("http://localhost:8080/api/trainer/add", form);
            toast.success(`Admin "${res.data.username}" added`);
            form.reset();
            setShowForm(false);

            const response = await request("/api/trainer/getAllAdmins");
            setAllAdmins(response);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add Admin");
        }
    };
    return (
        <div className=" px-4 py-10 bg-gradient-to-tr from-blue-50 to-purple-100 max-container-l min-h-screen">
            <div className=" mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">{showForm?"Add Admin": "All Admins"}</h1>
                    <CustomButton
                        label={showForm ? "Show Trainers" : "Add Trainer"}
                        onClick={() => setShowForm(!showForm)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                    />

                </div>

                {showForm ? (

                    <div className="bg-white rounded-xl shadow-xl p-8">

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flexCol  gap-6"
                            >
                                {["username", "email", "password", "adminType"].map((field) => (
                                    <FormField
                                        key={field}
                                        control={form.control}
                                        name={field}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={field.name}
                                                        className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}

                                <div className="sm:col-span-2 text-center">
                                    <CustomButton
                                        label="Submit"
                                        type="submit"
                                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allAdmins?.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-md border border-indigo-200 hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold text-indigo-700">{item.username}</h2>
                                <p className="text-gray-600 text-sm mb-1">{item.email}</p>
                                <p className="text-xs text-gray-500 mt-2">👤 Admin Type: {item.adminType}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
