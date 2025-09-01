import React from 'react'
import png3 from "../assets/png3.png"
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();

  return (
  <div>
      <div className="home">
     <div className="homeContainer grid gap-2 sm:grid-cols-2">
      <div className="left">
          <div className="text">
            <div className=''>
              <h1 className='text-6xl'>
                  One <span className=' font-bold'>Platform</span>, Total Control
              </h1>
            </div>
            <div>
                <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore accusamus, ducimus tempore tempora facilis temporibus dolore veniam laboriosam, dignissimos error ut accusantium quo nulla voluptatem ab praesentium consequuntur quibusdam rem repudiandae tenetur molestiae magnam. Odio itaque, voluptate earum natus quos voluptas assumenda saepe harum ullam nemo 
            </p>
          </div>
            <div className='start-btn'>
              <a href="#entry">
                <button className='flex gap-4'>
                <div className='text-2xl'>get started</div>
                <div className=' flex items-center'><CgArrowRight className='text-3xl'/></div>
                </button></a>
            </div>
          </div>
      </div>
      <div className="right ">
            <img src={png3} alt="" className='w-[100%] h-[90%]'/>
      </div>
     </div>
  </div>
       <div id='entry'>
        <div className="entryContainer grid gap-1.5 sm:grid-cols-3">
            <div className='bg-amber-300 h-[15vh]  flex items-center justify-center' onClick={()=>navigate("signup")}><h1>Admin</h1></div>
            <div className='bg-amber-600 h-[15vh]  flex items-center justify-center'><h1>Staff</h1></div>
            <div className='bg-gray-500 h-[15vh]   flex items-center justify-center'><h1>Teacher</h1></div>
           
        </div>
      </div>
  </div>
 
  
  )
}

export default Home