"use client"
import {useHttp} from "@/hooks/UseHttp";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {CustomButton} from "@/components/CustomButton";
import {number} from "zod";

export default function DashboardTrainer() {
    const {request, wait, error} = useHttp();
    const [allTrainers, setAllTrainers] = useState(null)
    const [buttonLabel, setButtonLabel] = useState("addTrainer")

    // initial form state
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        bio:"",
        hourlyRate: "",
        hourlyWage: "",
        clients:[],
        admin: ""
    });
    //fetch get all trainers
    useEffect(() => {
        const fetchData = async()=>{
            try {
                const response = await request("/api/trainer/getAllTrainers" )
                console.log(response)
                setAllTrainers( response)
            }catch (e){
                throw e.message
            }
        }
        fetchData()
    }, []);
    //form change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //fetch add new admin
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                bio: form.bio,
                hourlyRate: Number(form.hourlyRate),
                hourlyWage: Number(form.hourlyWage),
                admin: form.admin,
            };


            const res = await axios.post("http://localhost:8080/api/trainer/add", payload);
            toast.success(res.data);

            // reset form
            setForm({ username: "", email: "", password: "" ,bio: "", clients: [], admin: "", hourlyRate: "", hourlyWage: ""});

            setButtonLabel("getTrainers");

            const response = await request("/api/trainer/getAllTrainers");
            setAllTrainers(response);

        } catch (err) {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    };



    // onclick button label handler
    const handleButtonLabel = () => {
        setButtonLabel(prev => (prev === "getTrainers" ? "addTrainer" : "getTrainers"));
    };
    return (
        <div>
            <CustomButton label={buttonLabel} onClick={handleButtonLabel}/>
            {
                buttonLabel ==="addTrainer"?(
                    <ul>
                        {allTrainers?.map((item,index)=>(
                            <li key={index} className="border p-4 mb-2 rounded shadow bg-black">
                                <p><strong>Username:</strong> {item.username}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Bio:</strong> {item.bio}</p>
                                <p><strong>HourlyRate:</strong> {item.hourlyRate}</p>
                                <p><strong>HourlyWage:</strong> {item.hourlyWage}</p>
                                <p><strong>Clients:</strong> {item.clients}</p>
                                <p><strong>Added By:</strong> {item.admin}</p>

                            </li>
                        ))}
                    </ul>
                ):(
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md  text-black"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center">Add New Trainer</h2>

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                            />

                            <textarea
                                name="bio"
                                placeholder="Bio..."
                                value={form.bio}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="hourlyRate"
                                placeholder="hourlyRate"
                                value={form.hourlyRate}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="hourlyWage"
                                placeholder="hourlyWage"
                                value={form.hourlyWage}
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

    );
}
