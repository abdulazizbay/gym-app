"use client";

import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import GOOGLE from "@/public/assets/images/Google.svg";
import META from "@/public/assets/images/Meta.svg";
import MICROSOFT from "@/public/assets/images/Microsoft.svg";
import NETFLIX from "@/public/assets/images/Netflix.svg";
import PAYPAL from "@/public/assets/images/Paypal.svg";

export const CompaniesBanner = () => {
    const companiesList = [
        GOOGLE,
        META,
        MICROSOFT,
        NETFLIX,
        GOOGLE,
        PAYPAL,
        MICROSOFT,
        NETFLIX,
        META,
    ];

    return (
        <div className="max-container-xl h-[168px] flex items-center justify-center">
            <div className="w-full">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000, // 2 seconds
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {companiesList.map((logo, index) => (
                            <CarouselItem
                                key={index}
                                className="flex justify-center items-center basis-1/6"
                            >
                                <Image
                                    src={logo}
                                    alt={`Company ${index}`}
                                    width={100}
                                    height={50}
                                    className="object-contain"
                                />
                            </CarouselItem>
                        )) as React.ReactNode}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};
