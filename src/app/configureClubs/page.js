"use client"
import {useState, useEffect} from 'react'

const ConfigureClubs = () => {

    const [clubs, setClubs] = useState([]);
    const [filter, setFilter] = useState(0)
    const [filteredClub, setFilteredClub] = useState("Frontend");

    useEffect(() => {
        const fetchClubsData = async () => {
          const response = await fetch(
            "https://backend-newton-product-non-admin-1.onrender.com/api/clubs"
          );
          const data = await response.json();
          setClubs(data.data);
        //   console.log(data.data)
        };
        fetchClubsData();
      }, []);


    return (
        <div>

            <nav className="w-[90vw] mx-auto mt-4 h-16 rounded-xl flex flex-row  bg-gradient-to-r from-purple-600/60 to-blue-500/60 items-center justify-evenly">
                
                {clubs?(
                    
                    clubs.map((club,idx)=>{
                        return(
                        <h1 key={idx} className="text-lg hover:bg-white cursor-pointer hover:text-sky-400 rounded-xl py-2 px-4 text-white font-bold">{club.devclub[0].Technology}</h1>
                        )
                    })
 
                ):(<></>)}

            </nav>

            

        <div className='w-full justify-evenly '>
            {clubs?(
                clubs.map((club,idx)=>{
                    console.log(club.devclub[0])
                    return (
                        <div key={idx}>
                            <div>
                                <img className='rounded-full w-48' src={club.devclub[0].President.Image}/>
                                <img/>
                            </div>
                        </div>
                    )
                })
            
            ):(<></>)}
        </div>




        </div>
    )

}


export default ConfigureClubs