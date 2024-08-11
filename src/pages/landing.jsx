 import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate()
  const handleShorten = (e) => {
    e.preventDefault()
    if(longUrl)navigate(`/auth?createNew=${longUrl}`)
  } 
  return (
    <div className='container'>
      <div className="flex flex-col items-center sm:min-h-screen my-10">
        <h2 className='my-10 sm:my-16 text-xl sm:text-6xl lg: text-7xl text-white text-center font-extrabold'>
          The only URL Shortener <br/> you&rsquo;ll ever need! 😎
        </h2>
        <form 
        onSubmit={handleShorten}
        className='sm: h-14 flex flex-col sm:flex-row w-full md:w-1/2 gap 2'>
          <Input type='url' required
          placeholder="Enter that long URL"
          className="h-full flex-1 py-4 px-4"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button className="h-full" type="submit" variant="secondary">Shorten!</Button>
        </form>
      </div>
      <h2 className='mt-16 mb-6 text-2xl text-center'>Why Scissor?</h2>
      <Accordion type="single" collapsible className='w-full my-10 md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Scissor?</AccordionTrigger>
          <AccordionContent>
          Scissor is your go-to link management tool. We simplify the way you share links by transforming long, complex URLs into short, memorable ones. Enjoy increased click-through rates, enhanced branding, and valuable analytics to optimize your online presence
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does Scissor works?</AccordionTrigger>
          <AccordionContent>
          Paste any long URL, and we'll generate a short, clean link for easy sharing across all your platforms
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Why Scissor?</AccordionTrigger>
          <AccordionContent>
          Quickly share research articles, online resources, or meeting links without cluttering emails or chats. Scissor simplifies information sharing and saves valuable time. Plus, custom domains can be added for a touch of professionalism.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage