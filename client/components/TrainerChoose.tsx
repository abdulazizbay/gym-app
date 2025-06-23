"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { CustomButton } from "@/components/CustomButton";

export const TrainerChoose = () => {
    const [allTrainers, setAllTrainer] = useState([
        {
            id: 1,
            username: "John Wick",
            bio: "Certified fitness coach with 5 years of experience.",
            hourlyRate: 25,
            hourlyWage: 20
        },
        {
            id: 2,
            username: "Sarah Connor",
            bio: "Expert in HIIT and strength training. 8 years in the industry.",
            hourlyRate: 30,
            hourlyWage: 22
        },
        {
            id: 3,
            username: "Sarah Connor",
            bio: "Expert in HIIT and strength training. 8 years in the industry.",
            hourlyRate: 30,
            hourlyWage: 22
        }
    ]);

    const [loading, setLoading] = useState(false);

    // Uncomment if backend is working:
    // useEffect(() => {
    //   axios
    //     .get("http://localhost:8080/api/trainer/getAllTrainers")
    //     .then((response) => {
    //       setAllTrainer(response.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setLoading(false);
    //     });
    // }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4 max-container-l  ">
            <h1 className="text-4xl font-bold text-center mb-10 text-black">Choose Your Trainer</h1>
            <ul className="flex flex-wrap gap-8 mx-auto justify-center">
                {allTrainers.map((item, index) => (
                    <li key={index}>
                        <Card className="w-[400px] bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden h-full flex flex-col justify-between">
                            <CardHeader className="p-6">
                                <CardTitle className="text-xl font-semibold text-black">{item.username}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-4 space-y-2 text-sm text-gray-700">
                                <CardDescription>
                                    <span className="font-medium text-gray-900">Bio:</span> {item.bio}
                                </CardDescription>
                                <CardDescription>
                                    <span className="font-medium text-gray-900">Hourly Rate:</span> ${item.hourlyRate}
                                </CardDescription>
                                <CardDescription>
                                    <span className="font-medium text-gray-900">Hourly Wage:</span> ${item.hourlyWage}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="p-6">
                                <CustomButton
                                    label="Get Started"
                                    width={127}
                                    height={47}
                                    rounded={18}
                                    fontSize="base"
                                    bold={true}
                                    backColor="orange"
                                />
                            </CardFooter>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};
