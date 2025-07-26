type ButtonSize = keyof typeof btnWidth;
type ButtonHeight = keyof typeof btnHeight;
type ButtonColor = keyof typeof btnBgColor;
type FontSize = keyof typeof btnFontSize;
type Rounded = keyof typeof btnRounded;
type TextColor = keyof typeof btnColorText;

type CustomButtonProps = {
    width?: ButtonSize;
    height?: ButtonHeight;
    label: string;
    backColor?: ButtonColor;
    fontSize?: FontSize;
    rounded?: Rounded;
    colorText?: TextColor;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
};

const btnWidth = {
    "210":"w-[210px]",
    "297":"w-[297px]",
    "80":"w-[80px]",
    "86":"w-[86px]",
    "99":"w-[99px]",
    "127":"w-[127px]",
    "116":"w-[116px]",
    "225":"w-[225px]",
    "350":"w-[350px]",
    "324":"w-[324px]",
    "full":"w-full",
    "fit":"w-fit",
}
const btnHeight = {
    "44":"h-[44px]",
    "60":"h-[60px]",
    "70":"h-[70px]",
    "40":"h-[40px]",
    "47":"h-[47px]",
    "35":"h-[35px]",
    "50":"h-[50px]",
}
const btnBgColor = {
    "blue":"bg-blue1",
    "orange":"bg-orange-500",
    "white":"bg-white",
    "black":"bg-black",
    "gray":"bg-gray-600",
    "gray2f": "bg-[#2F2E2E]",
    "light_blue": "bg-blue3",
    "gray5": "bg-gray5",
}
const btnFontSize = {
    "base":"text-base",
    "base15":"text-[15px]",
    "base16":"text-base",
    "base17":"text-[17px]",
    "xl_25":"text-[25px]",
    "xl_20":"text-xl"
}
const btnRounded = {
    "60":"rounded-[60px]",
    "30":"rounded-[30px]",
    "10":"rounded-[10px]",
    "18":"rounded-[18px]",
    "20":"rounded-[20px]",
    "25":"rounded-[25px]",
}
const btnColorText = {
    "white":"text-white",
    "black":"text-black",
}
export const CustomButton = ({
                                 width,
                                 height,
                                 label,
                                 backColor,
                                 fontSize,
                                 rounded,
                                 colorText = "white",
                                 onClick,
                                 type = "button",
                                 className = "",
                             }: CustomButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`hover:cursor-pointer
                ${width ? btnWidth[width] : ""}
                ${height ? btnHeight[height] : ""}
                ${backColor ? btnBgColor[backColor] : ""}
                ${fontSize ? btnFontSize[fontSize] : ""}
                ${rounded ? btnRounded[rounded] : ""}
                ${btnColorText[colorText]}
                ${className}
            `}
        >
            {label}
        </button>
    );
};