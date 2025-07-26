"use client"
import navbar_logo from "@/public/assets/images/navbar_logo.svg";
import Link from 'next/link';
import Image from "next/image";
import { CustomButton } from "@/components/CustomButton";
import { useEffect, useState } from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export const Navbar = () => {
    const navOptions = [
        { label: "Home", linkTo: "/" },
        { label: "Service", linkTo: "/" },
        { label: "Contact", linkTo: "/" },
        { label: "About", linkTo: "/" },
    ];

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <div className="bg-gray9 max-container-xl">
            <div className="max-container-l flexBetween h-[72px] items-center">
                <Link href="/">
                    <Image src={navbar_logo} alt="navbar logo" />
                </Link>

                <div className="flex gap-[110px]">
                    <ul className="flex gap-12 items-center">
                        {navOptions.map((item, index) => (
                            <li key={index}>
                                <Link href={item.linkTo}>
                                    <p>{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {isLoggedIn ? (
                        <div className="flex gap-4 items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CustomButton
                                rounded="18"
                                label="Logout"
                                width="99"
                                height="47"
                                backColor="orange"
                                fontSize="base"
                                onClick={handleLogout}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/auth/login">
                                <CustomButton
                                    rounded="18"
                                    label="Log in"
                                    width="86"
                                    height="47"
                                    backColor="transparent"
                                    fontSize="base"
                                />
                            </Link>
                            <Link href="/auth/signup">
                                <CustomButton
                                    rounded="18"
                                    label="Sign Up"
                                    width="99"
                                    height="47"
                                    backColor="orange"
                                    fontSize="base"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
