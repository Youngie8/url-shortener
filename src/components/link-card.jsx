import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Copy, Delete, Download, Trash, Trash2 } from "lucide-react"
import useFetch from "@/hooks/use-fetch"
import { deleteUrl } from "@/db/apiUrls"
import { BeatLoader } from "react-spinners"

const LinkCard = ({url, fetchUrls}) => {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);

        anchor.click();
        document.body.replaceChild(anchor);
    }

    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url.id)

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-2 rounded-lg">
        <img src={url.qr} alt="QR code" className="h-32 object-contain ring ring-#36d7b7 self-start"/>
        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
            <span className="text-2xl font-extrabold hover:underline cursor-pointer"> {url?.title}</span>
            <span className=" text-xl text-blue-400 font-bold hover:underline cursor-pointer">https://scissor-oluwole.netlify.app/{url?.custom_url? url?.custom_url : url.short_url}</span>
            <span className="flex items-center gap-1 hover:underline cursor-pointer">{url?.original_url}</span>
            <span className="flex items-end font-extralight text-sm flex-1 text-gray-400">{new Date(url?.created_at).toLocaleString()}</span>
        </Link>

        <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigator.clipboard.writeText(`https://scissor-oluwole.netlify.app/${url?.short_url}`)}>
                <Copy/>
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
                <Download/>
            </Button>
            <Button className='text-red-600' variant='ghost' onClick={() => fnDelete().then(() => fetchUrls())}>
                {loadingDelete? <BeatLoader size={4} color="red"/> : <Trash2/>}
            </Button>
        </div>
    </div>
  )
}

export default LinkCard