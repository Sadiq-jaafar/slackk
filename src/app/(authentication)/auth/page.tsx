import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import React from 'react'
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import { RxGithubLogo } from 'react-icons/rx';

const Authpage = () => {
  return (
    <div className='min-h-screen p-5 grid text-center place-content-center bg-white'>
        <div className='max-w-[450px]'>
            <div className='flex justify-center items-center gap-3 mb-4'>
                <BsSlack size={30} />
                <Typography text='Slackk' variant='h1'/>

            </div>
            <Typography text='Sign into your Slackk' variant='h2' className='mb-3'/>
            <Typography text='Enter your Email and Password' variant='p' className='opacity-19 mb-7'/>
            <div className='flex flex-col space-y-4'>
                <Button variant='outline'className='py-6 border-2 flex space-x-3'>
                    <FcGoogle/>
                    <Typography text='Continue With Google' variant='p' className=' text-xl'/>
                </Button>
                <Button variant='outline' className='py-6 border-2 flex space-x-3'>
                    <RxGithubLogo/>
                    <Typography text='Sign In With GitHub' variant='p' className=' text-xl'/>
                </Button>
            </div>
            <div>
                <div className='flex items-center my-6'>
                    <div className='mr-[10px] flex-1 border-t bg-neutral-300'/>

                    <Typography text='OR' variant='p'></Typography>
                    <div className='mr-[10px] flex-1 border-t bg-neutral-300'/>


                </div>
            </div>
        </div>
    </div>
  )
}

export default Authpage