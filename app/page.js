'use client'

import React, { useEffect } from 'react'



import '@/styles/dashboard.css'


import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import PopupForm from '@/components/PopupForm'
import { data } from 'autoprefixer'
import PopupForm2 from '@/components/editpopup'
import { useRouter } from 'next/navigation'
import Del from '@/components/Del'

 

const page = () => {



  const [delmod, setDelmod] = useState(false);
  
   const [posts, setPosts] = useState([]);
   
  const [mbmenu, setMbmenu] = useState(false);

  const [posttobe, setPosttobe] = useState('');
  const [posttobeDEleted, setPosttobeDEleted] = useState('');

  
  
  
  
  
  
  const [isMobile, setIsMobile] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [edit, setEdit] = useState(false);
  
  
  
  const [signlo, setSignlo] = useState(false);
  const { data: session, status} = useSession()
  
  
  const [from, setFrom] = useState({
    name:'',
    description:'',
    category:'',
    doe: '',
    amount: '',
  });
  
  
  
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.name) 
    );
  }


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 479);
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const  data = await response.json();
    
    
    setPosts(data);
    console.log(data);


  }


  useEffect(() => {
    
    fetchPosts();


    
  },[])



  const router = useRouter() 

  const handleFilterClick =() =>{

    const filterbydtae = posts.sort((a,b) => new Date(a.doe) - new Date(b.doe));
    console.log(filterbydtae);
    setPosts(filterbydtae);
    router.refresh();
  }

  
  const handleEdit = async (key,postcreator) =>{

    
    if(!session) return 
    if(session.user.name.replace(" ", "").toLowerCase() === postcreator){
      setEdit(true)
      setPosttobe(key)
    } else{
      window.alert('Not the owner')
    }
    


  } 

  const handleDelet = async (key) =>{
    
    if(!session) return 
    setDelmod(true)
    setPosttobeDEleted(key)


  }

  
  
  
  
    return (
      <section className='dahboard relative z-0  pb-[1px]'>
          <div className='leftnav'>
            <div className='leftnav__p1'>
             <h3 className='font-[700] text-[30px] leading-[44px] text-white mb-10' >Dasboard</h3>
  
             <ul>
             <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/transaction_icon.svg' alt='transaction' className='transaction' /> My Expense</button></li>
             <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/user_icon.svg' alt='user' className='user' /> Account</button></li>
              
              <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/setting_icon.svg' alt='setting' className='setting' /> Settings</button></li>
  
             </ul>
  
            </div>
  
            <div className='leftnav__p2'>
              <button>Help</button>
              <button>Contact Us</button>
  
            </div>
  
          </div>
  
          <div className='maindash'>
            <div className='maindash1'>
              <div className={` ml-3 sm:hidden  mb__menu relative`}>
                <img  onClick={() => setMbmenu(!mbmenu)}
                         src='/mbmenu.svg' alt='menu' className='w-5 h-5 object-contain' />
                  <div className={`mmobilemenu absolute w ${!mbmenu && 'hidden'} `}>
                    <ul className='bg-[#4285F4] py-6 px-8 pr-10 rounded-xl'>
                        
                    <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/transaction_icon.svg' alt='transaction' className='transaction' /> My Expense</button></li>
                    <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/user_icon.svg' alt='user' className='user' /> Account</button></li>
                      
                    <li><button className='flex gap-5 items-center mt-6 text-white opacity-70 focus:opacity-100 font-[100]'> <img src='/setting_icon.svg' alt='setting' className='setting' /> Settings</button></li>

                        <li>   <div className=' mt-5 text-xs flex justify-between items-center '>
                              <button>Help</button>
                              <button>Contact Us</button>
                              </div>
                        </li>



            
                  </ul>

               

                  </div>

              </div>


              <h3 className=' text-3xl sm:text-[50px] font-[700] text-[#4285F4]'>My Expense Manager </h3>
  
              <div className='maindash1__right'>
               
                 <img src='/bell.svg' alt='bell' />
  
                  
      
  
                 <img src={`${status === "authenticated" ? session.user?.image : '/user_icon.svg'}`} alt='user' className={`${status === "authenticated" ?  'bg-red-800' : 'bg-black' } ml-4  rounded-full object-contain h-6 cursor-pointer  `} onClick={() => setSignlo(!signlo)} />
  
                 <div className={` ${signlo ? '': 'hidden' } fixed top-[60px] right-[40px] bg-white flex flex-col p-6 rounded-2xl  gap-3` }>
                 {status === 'authenticated'? <button onClick={()=>signOut({callbackUrl: '/'})}>Sign Out</button> :<><Link href={'/signup'}>Register</Link>
                 <Link href={'/login'}>Sign In</Link></>}
                  

                 </div>
  
                
  
              </div>
  
            </div>
  
           
  
            
  
            
          </div>

          <section className='tables ml-[275px] py-5 px-10  '>

            <div className='filter_buttons'>

              <button onClick={handleFilterClick} >Filter by Date of Expense</button>
              <form className='searchbutton'>
              <input 
                type='text'
                placeholder="Search by Name"
                value={searchText}
                onChange={handleSearchChange}
                required
                className=''
              />

            </form>
              <button className='bg-green-500 '  onClick={() => {
                if(!session) return
                setIsPopupOpen(true)
              }}>+ New Expanse</button>


            </div>

            <div className='mt-4'>
            <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date of Expense</th>
                <th>Amount </th>
                <th>Updated At</th>
                <th>Created By</th>
                <th> Edit / Delete </th>

              </tr>


              { !searchText &&posts.length !=0 ? posts.map((post) => {

                const inputDate = new Date(post.doe.toString());
                const options = { day: 'numeric', month: 'long', year: 'numeric' };

                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

                return(
                <tr key={post._id}  >
                  <td>{post.name}</td>
                  <td>{post.category}</td>
                  <td>{formattedDate}</td>
                  <td>INR {post.amount}</td>
                  <td>just now</td>
                  <td>{session && session.user.name.replace(" ", "").toLowerCase() === post.creator?.username ? 'me': post.creator?.username }</td>
                  <td className='flex justify-evenly items-center  '>
                    <button onClick={() => handleEdit(post._id,post.creator?.username)} ><img src='applogo.svg' alt='pencil' className='pb-1' /></button>
                    <button onClick={() => handleDelet(post._id)} ><img src='blue.svg' alt='dlete' /></button>
                    <button><img  /></button>
                  </td>

                </tr>
                )


              }) : searchedResults.map((post) => {

                const inputDate = new Date(post.doe.toString());
                const options = { day: 'numeric', month: 'long', year: 'numeric' };

                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

                return(
                <tr key={post._id}  >
                  <td>{post.name}</td>
                  <td>{post.category}</td>
                  <td>{formattedDate}</td>
                  <td>INR {post.amount}</td>
                  <td>just now</td>
                  <td>{session && session.user.name.replace(" ", "").toLowerCase() === post.creator?.username ? 'me': post.creator?.username }</td>
                  <td className='flex justify-evenly items-center  '>
                    <button onClick={() => handleEdit(post._id,post.creator?.username)} ><img src='applogo.svg' alt='pencil' className='pb-1' /></button>
                    <button onClick={() => handleDelet(post._id)} ><img src='blue.svg' alt='dlete' /></button>
                    <button><img  /></button>
                  </td>

                </tr>
                )


              })
              
              }
              </tbody>
            </table>
            </div>

           


  
            

          </section>

              {delmod && <Del setDelmod={setDelmod} posttobeDEleted={posttobeDEleted}  user={session?.user.id} /> }

               {
                  isPopupOpen && <PopupForm closeModal={setIsPopupOpen} type='Create' formdat={setFrom}  user={session?.user.id} />
                
                }

                {
                  edit && <PopupForm2 closeModal={setEdit} posttobe={posttobe} type='Edit' formdat={setFrom} user={session?.user.id}   />
                
                }



     
  
        
  
  
      </section>
    )
}

export default page