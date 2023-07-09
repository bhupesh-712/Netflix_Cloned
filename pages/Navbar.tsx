import React, { useCallback, useState, useEffect } from 'react'
import NavItem from './NavItem'
import MobileMenu from './MobileMenu';
import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs';  
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
   
  useEffect(()=>{
    const handleScroll =()=>{
      if(window.scrollY >= TOP_OFFSET){
        setShowBackground(true)
      }
      else{
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  const toggleMobileMenu = useCallback(()=>{
        setShowMobileMenu((current) => !current)
  },[])
  const toggleAccountMenu = useCallback(()=>{
    setAccountMenu((current) => !current)
},[])
  return (
    <div className='w-full fixed z-40'>
      <div className={`px-4 md:px-16 py-6 flex flex-row item-center transition duration-500 ${showBackground? 'bg-zinc-900 bg-opacity-90':" "}`}>
        <img className='h-10 lg:h-14' src='/images/download.jpeg' alt="logo"/>
        <div className='flex-row ml-8 gap-7 hidden lg:flex lg:mt-4'>
           <NavItem label='Home' />
           <NavItem label='Series' />
           <NavItem label='Films' />
           <NavItem label='New & Popular' />
           <NavItem label='My List' />
           <NavItem label='Browse by languages' />
        </div>
        <div onClick={toggleMobileMenu} className='lg:hidden flex flex-row item-center gap-2 ml-8 cursor-pointer relative mt-2'>
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown className={`text-white transition mt-1 ${showMobileMenu? 'rotate-180':'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 item-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer mt-4'>
                 <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer mt-4'>
                 <BsBell />
          </div>
          <div onClick={toggleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
             <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                  <img src='/images/default-blue.png' alt='img' />
             </div>
             <BsChevronDown className={`text-white transition mt-1 ${showAccountMenu? 'rotate-180':'rotate-0'}`} />
             <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
