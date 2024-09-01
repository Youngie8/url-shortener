import { Button } from '@/components/ui/button';
import { UrlState } from '@/context'
import { getClicksForUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { Copy, Download, LinkIcon, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BarLoader, BeatLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeviceStats from '@/components/device-stats';
import Location from '@/components/location-stats';


const Link = () => {
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

  const {id} = useParams();
  const {user} = UrlState();
  const navigate = useNavigate();

  const { loading, data: url, fn, error,} = useFetch(getUrl, {id, user_id: user?.id});
  const {loading: loadingStats, data: stats, fn: fnStats,} = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if(error) {
    navigate('/dashboard')
  }

  let link = url?.custom_url ? url?.custom_url : url?.short_url;
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={'100%'} color='#36d7b7' className='mb-4'/>
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className=" flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className='text-5xl font-extrabold hover:underline cursor-pointer'>{ url?.title }</span>
          <a href={`https://oluwole-scissor.netlify.app/${ link }`} target='_blank'
          className='text-2xl sm:text-3xl text-blue-600 font-bold hoer:underline '>
           https://oluwole-scissor.netlify.app/{ link } 
          </a>
          <a href={url?.original_url} target='_blank'
          className='flex items-center gap-1 hover:underline p-0 cursor-pointer'>
            <LinkIcon className='p-1' />
           { url?.original_url }
          </a>
          <span className='flex items-end font-extralight text-sm'>Created at { new Date(url?.created_at).toLocaleString()}</span>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigator.clipboard.writeText(`https://scissor-oluwole.netlify.app/${url?.short_url}`)}>
                <Copy/>
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
                <Download/>
            </Button>
            <Button className='text-red-600' variant='ghost' onClick={() => fnDelete()}>
                {loadingDelete? <BeatLoader size={4} color="red"/> : <Trash2/>}
            </Button>
        </div>
        <img src={url?.qr} alt="qr-code"
        className='w-1/2 self-center sm:self-start ring ring-blue-800 p-1 object-contain' />
        </div>
        <Card className="w-full self-center sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Link Statistics</CardTitle>
          </CardHeader>
          {stats && stats?.length ?(
          <CardContent className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats?.length}</p>
              </CardContent>
            </Card>
            <CardTitle>Location Data</CardTitle>
            <Location stats={stats}/>
            <CardTitle>Device Info</CardTitle>
            <DeviceStats stats={stats}/>
          </CardContent>): (
            <CardContent>
            {loadingStats === false ? "No Statistics"
            : "Loading Stats..."}
          </CardContent>
          )}
        </Card>

      </div>
    </>
  )
}

export default Link