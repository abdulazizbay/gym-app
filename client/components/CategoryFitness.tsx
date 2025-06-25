"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CAMERAICON from "@/public/assets/images/Full.svg"
import BARBELLICON from "@/public/assets/images/Fit2.svg"
import CARDIOICON from "@/public/assets/images/Fit3.svg"
import TIMEICON from "@/public/assets/images/Fit8.svg"
import NOTIFICON from "@/public/assets/images/Notif.svg"
import STATISTICICON from "@/public/assets/images/Group.svg"
import Image from "next/image";
import {CustomButton} from "@/components/CustomButton";
import { useRouter } from "next/navigation";

import {TrainerChoose} from "@/components/TrainerChoose";

export const CategoryFitness = ()=>{
    const router = useRouter();
    return(
        <div className="max-container-xl ">
            <div className=" rounded-[80px] bg-gray9 mx-3 flexCol items-center pt-10  pb-[90px]">
                <h2 className="">Fitness Category Training</h2>
                <ul className="grid grid-cols-4  gap-y-[85px] gap-x-10 mt-[70px] xl:grid-cols-3 ">
                    {
                        FITNESSCATEGORYCARDS.map((item,index)=>(
                            <li  key={index}>
                                <Card  className="w-300 h-[380px] bg-black relative"

                                >
                                    <CardHeader>
                                        <Image src={item.icon} alt={item.title}/>
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardDescription>{item.desc}</CardDescription>
                                    </CardContent>
                                    <CardFooter className="absolute bottom-10">
                                        <CustomButton
                                            onClick={() => router.push(item.navigateTo)}

                                            label="Get Started"
                                            width={127}
                                            height={47}
                                            rounded={18}
                                            fontSize="base"
                                            bold={false}
                                            backColor="orange"
                                        />
                                    </CardFooter>
                                </Card>
                            </li>

                        ))
                    }
                </ul>

            </div>




        </div>
    )
}

export const FITNESSCATEGORYCARDS = [
    {
        icon: CAMERAICON,
        title: "Analyze Body (AI) via Photo",
        navigateTo:"/",
        desc: "Take a quick photo and let our advanced AI analyze your body type to provide precise fitness insights tailored just for you."
    },
    {
        icon: CARDIOICON,
        title: "Trainer & Coaching Features",
        navigateTo:"/chat/choose-trainer",
        desc: "Connect with certified trainers, receive personalized coaching, and get ongoing support to help you reach your fitness goals."
    },
    {
        icon: TIMEICON,
        title: "Calendar Integration",
        navigateTo:"/",
        desc: "Easily schedule your workouts, set timely reminders, and sync everything seamlessly with your personal device calendar."
    },
    {
        icon: BARBELLICON,
        title: "Analyze Body Without Photo",
        navigateTo:"/",
        desc: "Input your body measurements manually and get a detailed fitness analysis along with customized recommendations."
    },
    {
        icon: STATISTICICON,
        title: "Custom Workout Plan",
        navigateTo:"/",
        desc: "Get workout routines created specifically for your body type, fitness level, and goals to maximize your results."
    },
    {
        icon: STATISTICICON,
        title: "Progress Visualization Dashboard",
        navigateTo:"/",
        desc: "Monitor your fitness journey through intuitive graphs, charts, and milestones that highlight your transformation."
    },
    {
        icon: NOTIFICON,
        title: "Motivational Quotes",
        navigateTo:"/",
        desc: "Discover daily motivational quotes and contribute your favorites to stay inspired and focused on your fitness journey."
    },
    {
        icon: CAMERAICON,
        title: "Analyze Body (AI) via Photo",
        navigateTo:"/",
        desc: "Take a quick photo and let our advanced AI analyze your body type to provide precise fitness insights tailored just for you."
    }
];
