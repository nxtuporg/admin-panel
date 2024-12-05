"use client"
import React, { useEffect, useState } from 'react'
import Navbar from "../../../components/Navbar";
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';


const ConfigureClan = () => {

    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("");

    const [_id, set_Id] = useState("");
    const [clanName, setClanName] = useState("");
    const [points, setPoints] = useState("");
    const [leader, setLeader] = useState("");
    const [viceLeader, setCoLeader] = useState("");
    const [topPerformers, setTopPerformers] = useState(["", "", "","",""]);

    useEffect(() => {
        const fetchClanData = async () => {
            try {
                const response = await axios.get('/api/configureclan'); 
                const data = response.data;
                
                set_Id(data._id);
                setClanName(data.clanName || "");
                setPoints(data.points || "");
                setLeader(data.leader || "");
                setCoLeader(data.viceLeader || "");
                setTopPerformers(data.topPerformers || ["", "", "","",""]);
            } catch (error) {
                console.error('Error fetching clan:', error);
            }
        };
        fetchClanData();
    }, []);

    const handleUpdateClan = async (e) => {
        e.preventDefault(); 
        const clanData = {
            _id,
            name: clanName,
            leader,
            viceLeader,
            points,
            topPerformers,
        };

        try {
            const response = await axios.put(`/api/configureclan/${_id}`, clanData); 
            setSuccessMessage("Clan updated successfully!");
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Error updating clan:', error);
        }
    };

    const handleUpdateLeadership = async (e) => {
        e.preventDefault(); 
        setLeader(leader);
        setCoLeader(coLeader);
        console.log(`Leader: ${leader}, Co-Leader: ${coLeader}`);
    };

   const handleUpdateTopPerformers = async (e) => {
    e.preventDefault();
    
   };

  return (
    <> 
    <Navbar/>

   

    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
    <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center mb-8' onClick={() => router.push('/')}>GO BACK</button>
      <h2 className="text-lg font-bold mb-4 text-white">
        Configure Clan
      </h2>
      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
      <form className="mb-8 p-4 bg-gray-700 rounded-lg shadow-md max-w-lg" onSubmit={handleUpdateClan}>
       
        <div className="mb-4">
          <label htmlFor="clanName" className="block text-sm font-medium text-gray-300">Clan Name</label>
          <input id="clanName" name="clanName" type="text" required className="w-3/4 px-4 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={clanName} value={clanName || ""} onChange={(e) => setClanName(e.target.value)} />
        </div>
       
        <div className="mb-4">
            <label htmlFor="newPoints" className="block text-sm font-medium text-gray-300">New Points</label>
          <input id="newPoints" name="newPoints" type="number" required className="w-3/4 px-4 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={points} value={points} onChange={(e) => setPoints(e.target.value)} />
        </div>
       
        <div className="mb-4">
          <label htmlFor="leader" className="block text-sm font-medium text-gray-300">Leader</label>
          <input id="leader" name="leader" type="text" required className="w-3/4 px-4 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={leader} value={leader} onChange={(e) => setLeader(e.target.value)} />
        </div>
       
        <div className="mb-4">
          <label htmlFor="coLeader" className="block text-sm font-medium text-gray-300">Co-Leader</label>
          <input id="coLeader" name="coLeader" type="text" required className="w-3/4 px-4 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={viceLeader} value={viceLeader} onChange={(e) => setCoLeader(e.target.value)} />
        </div>
       
        {topPerformers && topPerformers.map((performer, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={`topPerformer${index}`} className="block text-sm font-medium text-gray-300">Top Performer {index + 1}</label>
            <input id={`topPerformer${index}`} name={`topPerformer${index}`} type="text" required className="w-3/4 px-4 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={`Enter Top Performer ${index + 1} Name`} value={performer || ""} onChange={(e) => {
              const newTopPerformers = [...topPerformers];
              newTopPerformers[index] = e.target.value;
              setTopPerformers(newTopPerformers);
            }} />
          </div>
        ))}
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Update Clan</button>
      </form>
      
    </div>
    </>
  )
}

export default ConfigureClan