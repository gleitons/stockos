import Image from "next/image"
export default function GifLoad() {
    return <div className="w-full m-auto"><Image className="m-auto w-2/3" src={'/load-img.gif'} height={100} width={100} alt="Load" /></div> 
};
