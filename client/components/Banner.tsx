import Image from "next/image";
import banner_close_woman from "@/public/assets/images/banner_women_close.jpg"
import {Input} from "@/components/ui/input";
import {CustomButton} from "@/components/CustomButton";


export const Banner = ()=>{
    return(
        <div
            className="relative max-container-xl h-[700px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${banner_close_woman.src})`,
            }}
        >
            <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

            <div className="relative z-10 max-container-l  pt-[160px] ">
                <div className="w-[600px]">
                    <h1 className="font-bold ">
                        Shape Your Body <br/>With Us Here
                    </h1>
                    <h4 className="text-[27px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                    </h4>
                    <div className="mt-[60px] flexBetween">
                        <Input type="email" placeholder="Enter Your Email Here" className="w-[350px]"/>
                        <CustomButton bold={false} width={225} height={50} fontSize="xl_22" label="Get Started" rounded={25} backColor="orange"/>
                    </div>
                </div>

            </div>

        </div>


    )
}
