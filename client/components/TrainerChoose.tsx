"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useHttp } from "@/hooks/UseHttp";
import { CustomButton } from "@/components/CustomButton";
import {
    DollarSign,
    Info,
    Mail,
    Users,
    UserCircle
} from "lucide-react";

export const TrainerChoose = () => {
    const { request } = useHttp();
    const router = useRouter();
    const [allTrainers, setAllTrainer] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChooseTrainer = (trainerUsername: string) => {
        localStorage.setItem("trainerUsername", trainerUsername);
        router.push("/chat");
    };

    useEffect(() => {
        const fetchGetAllTrainers = async () => {
            try {
                const res = await request("/api/trainer/getAllTrainers", "GET");
                setAllTrainer(res);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch trainers:", err);
            }
        };
        fetchGetAllTrainers();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16 px-6">
            <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-16">
                Choose <span className="text-indigo-600">Your Trainer</span>
            </h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {allTrainers.map((item) => (
                    <li key={item.id} className="flex justify-center">
                        <div className="w-full max-w-sm rounded-3xl p-6 shadow-xl border border-gray-200 bg-white/80 backdrop-blur-lg hover:shadow-indigo-200 transition">

                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl shadow-md">
                                    <UserCircle />
                                </div>
                            </div>

                            <div className="text-center text-gray-800 space-y-4">
                                <h2 className="text-2xl font-bold">{item.username}</h2>

                                <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <Info className="w-4 h-4" />
                                    {item.bio}
                                </p>

                                <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <Mail className="w-4 h-4 text-red-500" />
                                    {item.email}
                                </p>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <div className="flex items-center justify-center gap-2 font-medium text-indigo-700">
                                        <Users className="w-4 h-4" />
                                        Clients
                                    </div>
                                    <ul className="text-xs text-gray-600 max-h-24 overflow-auto">
                                        {item.clients && item.clients.length > 0 ? (
                                            item.clients.map((client, idx) => (
                                                <li key={idx} className="list-disc list-inside">
                                                    {client.username || "Unnamed"}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="italic text-gray-400">No clients</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="text-sm space-y-1 text-gray-700">
                                    <p className="flex items-center justify-center gap-2">
                                        <DollarSign className="w-4 h-4 text-green-500" />
                                        Hourly Rate: <span className="font-semibold">${item.hourlyRate}</span>
                                    </p>
                                    <p className="flex items-center justify-center gap-2">
                                        <DollarSign className="w-4 h-4 text-blue-500" />
                                        Hourly Wage: <span className="font-semibold">${item.hourlyWage}</span>
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <CustomButton
                                        label="Chat Trainer"
                                        width="127"
                                        height="47"
                                        rounded="full"
                                        fontSize="base"
                                        bold={true}
                                        backColor="blue"
                                        onClick={() => handleChooseTrainer(item.username)}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
