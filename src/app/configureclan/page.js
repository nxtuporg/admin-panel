"use client"
import React, { useEffect } from 'react'
import Navbar from "../../../components/Navbar";
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';


const ConfigureClan = () => {

    const router = useRouter();

    const [clanName, setClanName] = useState('Rajputana Clan');
    const [points, setPoints] = useState(120);
    const [leader, setLeader] = useState('Raju');
    const [coLeader, setCoLeader] = useState('majnu');
    const [topPerformers, setTopPerformers] = useState(['Raju','majnu','kalu','nalu','salu']);

    
    // useEffect(() => {
    //     const fetchClans = async () => {
    //         const response = await axios.get('/api/configureclan'); 
    //         const data = response.data;
           
    //         setClanName(data.clanName);
    //         setPoints(data.points);
    //         setLeader(data.leader);
    //         setCoLeader(data.viceLeader);
    //         setTopPerformers(data.topPerformers);
    //     };
    //     fetchClans();
    // }, []);

    // const handleUpdateClan = async (e) => {
    //     e.preventDefault(); 
    //     const clanData = {
    //         name: clanName,
    //         leader: leader,
    //         viceLeader: coLeader,
    //         points: points,
    //         topPerformer1: topPerformers[0],
    //         topPerformer2: topPerformers[1],
    //         topPerformer3: topPerformers[2],
    //     };

    //     const response = await axios.put('/api/configureclan', clanData); 
    //     console.log(response.data.message); 
    // };

    const handleUpdateClan = async (e) => {
        e.preventDefault(); 
        // console.log(`New Points: ${points}`);
        const clanData = {
            _id: _id,
            name: clanName,
            leader: leader,
            viceLeader: coLeader,
            points: points,
            topPerformers: topPerformers,
        };

        try {
            const response = await axios.put('/api/configureclan', clanData); 
            console.log(response.data.message);
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
      <h2 className="text-lg font-bold mb-4 text-white">
        Change Clan Points
      </h2>
      <form className="mb-8 p-4 bg-gray-700 rounded-lg shadow-md max-w-lg" onSubmit={handleUpdateClan}>
       
        <div className="mb-4">
          <label
            htmlFor="newPoints"
            className="block text-sm font-medium text-gray-300"
          >
            New Points
          </label>
          <input
            id="newPoints"
            name="newPoints"
            type="number"
            required
            className="w-3/4 px-4 py-2 mt-1 text-gray-900 bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter New Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}  
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleUpdateClan}
        >
          Update Clan
        </button>
      </form>
      <div className="flex justify-between mb-8">
        <div className="w-1/2 pr-2">
          <h2 className="text-lg font-bold mb-4 text-white">
            Change Clan Leadership
          </h2>
          <form className="p-4 bg-gray-700 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="leader"
                className="block text-sm font-medium text-gray-300"
              >
                Leader
              </label>
              <input
                id="leader"
                name="leader"
                type="text"
                required
                className="w-3/4 px-4 py-2 mt-1 text-gray-900 bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Leader Name"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="coLeader"
                className="block text-sm font-medium text-gray-300"
              >
                Co-Leader
              </label>
              <input
                id="coLeader"
                name="coLeader"
                type="text"
                required
                className="w-3/4 px-4 py-2 mt-1 text-gray-900 bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Co-Leader Name"
                value={coLeader}
                onChange={(e) => setCoLeader(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleUpdateLeadership}
            >
              Update Leadership
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-2">
          <h2 className="text-lg font-bold mb-4 text-white">
            Top Performers
          </h2>
          <form className="p-4 bg-gray-700 rounded-lg shadow-md" onSubmit={handleUpdateTopPerformers}>
            {topPerformers.map((performer, index) => (
              <div className="mb-4" key={index}>
                <label
                  htmlFor={`topPerformer${index}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Top Performer {index + 1}
                </label>
                <input
                  id={`topPerformer${index}`}
                  name={`topPerformer${index}`}
                  type="text"
                  required
                  className="w-3/4 px-4 py-2 mt-1 text-gray-900 bg-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter Top Performer ${index + 1} Name`}
                  value={performer}
                  onChange={(e) => {
                    const newTopPerformers = [...topPerformers];
                    newTopPerformers[index] = e.target.value;
                    setTopPerformers(newTopPerformers);
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleUpdateTopPerformers}
            >
              Update Top Performers
            </button>
          </form>
        </div>
        
      </div>
      <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex ' onClick={() => router.push('/')}>GO BACK</button>
    </div>
    </>
  )
}

export default ConfigureClan