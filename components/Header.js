import React from 'react';
import Image from 'next/image';
// import the icons
import { MagnifyingGlassIcon, Bars3Icon, PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon, HeartIcon } from  "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/20/solid";
import {useSession, signIn, signOut } from "next-auth/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtoms";

function Header( ) {
    const {data: session} = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    return (
        <div className={'shadow-sm border-b bg-white sticky top-0 z-50'}>
            <div className={'flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto'}>
                {/*Left */}
                <div  onClick={()=>router.push('/')} className={'relative hidden lg:inline-grid  w-24 cursor-pointer'}>
                    <img src="https://links.papareact.com/ocw " alt="Instagram"  layout={'fill'} objectFit={'contain'}/>
                </div>
                <div  onClick={()=>router.push('/')} className={'relative w-10 lg:hidden flex-shrink-0 cursor-pointer'}>
                    <img src="https://links.papareact.com/jjm" alt="Instagram"  layout={'fill'} objectFit={'contain'}/>
                </div>
                {/*Middle - search input field*/}
                <div className={'max-w-xs'}>
                    <div className={'relative mt-1 p-3 rounded-md  '}>
                        <div className={'absolute inset-y-0 pl-3 flex items-center pointer-events-none'}>
                            <MagnifyingGlassIcon className={'h-5 w-5 text-gray-500'}/>
                        </div>
                        <input className={'bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black rounded-md'} type="text" placeholder={'Search'}/>
                    </div>
                </div>
                {/*Right*/}
                <div className={'flex items-center justify-end space-x-4'}>
                    <HomeIcon onClick={()=>router.push('/')} className={'navBtn '}/>
                    <Bars3Icon className={'h-6 md:hidden cursor-pointer'}/>
                    {session ? (
                        <>
                            <div className={'relative navBtn '}>
                                <PaperAirplaneIcon className={'navBtn'}/>
                                <div className={'absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'}>3</div>

                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className={'navBtn'}/>
                            <UserGroupIcon className={'navBtn'}/>
                            <HeartIcon className={'navBtn'}/>
                            <img
                                onClick={signOut}
                                src={session.user.image} alt="profile pic" className={'h-10 w-10 rounded-full cursor-pointer'}/>
                        </>

                        ) : (
                            <button onClick={ signIn }>Sign In</button>

                    )
                    }



                </div>

            </div>

        </div>
    );
}

export default Header;