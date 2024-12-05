"use client"
import {useState, useEffect} from 'react'

const ConfigureClubs = () => {

    const [clubs, setClubs] = useState([]);
    const [filteredClub, setFilteredClub] = useState("Frontend");

    useEffect(() => {
        const fetchClubsData = async () => {
          const response = await fetch(
            "https://backend-newton-product-non-admin-1.onrender.com/api/clubs"
          );
          const data = await response.json();
          setClubs(data.data);
        };
        fetchClubsData();
      }, []);


    return (
        <div>
            <nav className="w-[90vw] mx-auto mt-4 h-16 rounded-xl flex flex-row  bg-gradient-to-r from-purple-600/60 to-blue-500/60 items-center justify-evenly">
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">Frontend</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">Backend</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">Devops</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">UI/UX</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">CyberSecurity</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">iOS/Android</h1>
                <h1 className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">Blockchain</h1>
            </nav>

            

        <div className='w-full justify-evenly '>
            {clubs?(<>
                {/* <img src={clubs.devclub.President.Name} /> */}
            
            </>):(<></>)}
        </div>




        </div>
    )

}


export default ConfigureClubs