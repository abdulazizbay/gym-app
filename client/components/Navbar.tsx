import navbar_logo from "@/public/assets/images/navbar_logo.svg"
import Link from 'next/link'
import Image from "next/image";
import {CustomButton} from "@/components/CustomButton";

export const Navbar = ()=>{
    const navOptions = [
        {label:"Home", linkTo:"/"},
        {label:"Service", linkTo:"/"},
        {label:"Contact", linkTo:"/"},
        {label:"About", linkTo:"/"},
    ]
    return(
        <div className="bg-gray9 max-container-xl ">
            <div className="max-container-l flexBetween h-[72px] items-center ">
                <Link href="/">
                    <Image src={navbar_logo} alt="navbar logo"  />
                </Link>
                <div className="flex gap-[110px] ">
                    <ul className="flex gap-50 items-center">
                        {navOptions.map((item,index)=>(
                            <li key={index}>
                                <Link href={item.linkTo}>
                                    <p>{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-3">
                        <Link href="/auth/login">
                            <CustomButton rounded={18}  label="Log in" width={86} height={47} backColor="transparent" fontSize="base" bold={true}/>
                        </Link>
                        <Link href="/auth/signup">
                            <CustomButton rounded={18} label="Sign Up" width={99} height={47} backColor="orange" fontSize="base" bold={true}/>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}