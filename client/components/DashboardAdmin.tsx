"use client"
import {useHttp} from "@/hooks/UseHttp";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {CustomButton} from "@/components/CustomButton";


export const DashboardAdmin = ()=>{
    const {request, wait, error} = useHttp();
    const [allAdmins, setAllAdmins] = useState(null)
    const [buttonLabel, setButtonLabel] = useState("addAdmin")
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        adminType: ""
    });
    //fetch get all admins
    useEffect(() => {
        const fetchData = async()=>{
            try {
                const response = await request("/api/admin/getAllAdmins" )
                console.log(response)
                setAllAdmins( response)
            }catch (e){
                throw e.message
            }
        }
        fetchData()
    }, []);


    //form change handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === "adminType" ? value === "true" : value
        });
    };
    //fetch add new admin
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                super_admin: form.adminType
            };

            const res = await axios.post("http://localhost:8080/api/admin/add", payload);
            toast.success(res.data);

            // reset form
            setForm({ username: "", email: "", password: "", adminType: "" });

            setButtonLabel("getAdmins");

            const response = await request("/api/admin/getAllAdmins");
            setAllAdmins(response);

        } catch (err) {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    };

    // onclick button label handler
    const handleButtonLabel = () => {
        setButtonLabel(prev => (prev === "getAdmins" ? "addAdmin" : "getAdmins"));
    };


    return(
        <div>
            <CustomButton label={buttonLabel} onClick={handleButtonLabel}/>
            {
                buttonLabel ==="addAdmin"?(
                    <ul>
                        {allAdmins?.map((item,index)=>(
                            <li key={index} className="border p-4 mb-2 rounded shadow bg-black">
                                <p><strong>Username:</strong> {item.username}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Super Admin:</strong> {item.super_admin ? "Yes" : "No"}</p>
                            </li>
                        ))}
                    </ul>
                ):(
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md  text-black"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>

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
                                name="adminType"
                                value={form.adminType}
                                onChange={handleChange}
                                className="w-full mb-6 px-4 py-2 border rounded"
                                required
                            >
                                <option value="false">Admin</option>
                                <option value="true">Super Admin</option>
                            </select>


                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                )
            }


        </div>
    )
}