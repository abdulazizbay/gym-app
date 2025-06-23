

const btnWidth = {
    99:"w-[99px]",
    86:"w-[86px]",
    225:"w-[225px]",
    127:"w-[127px]",
}
const btnHeight = {
    47:"h-[47px]",
    50:"h-[50px]",
}
const btnBgColor = {
    transparent:"bg-transparent",
    orange:"bg-orange-500",
    white:"bg-white",
    black:"bg-black",
}
const btnFontSize = {
    base:"text-base",
    xl_22:"text-[22px]"
}
const btnRounded = {
    18:"rounded-[18px]",
    25:"rounded-[25px]",
}
const btnColorText = {
    white:"text-white",
    black:"text-black",
}
export const CustomButton = ({
                                 width = "99",
                                 height = "47",
                                 label,
                                 backColor = "orange",
                                 fontSize = "base",
                                 bold = false,
                                 rounded = "18",
                                 colorText = "white",
                                 onClick,
                             }) => {
    const borderColor = backColor === "transparent" ? "border-2 border-white" : "";
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                ${btnColorText[colorText]} 
                ${borderColor} 
                ${btnRounded[rounded]} 
                ${btnWidth[width]} 
                ${btnHeight[height]} 
                ${btnBgColor[backColor]}  
                ${btnFontSize[fontSize]} 
                ${bold ? "font-semibold" : ""}
            `}
        >
            {label}
        </button>
    );
};
