import { NextResponse } from "next/server";
import eventsModel from "../../../../libs/database/models/eventsModel";
import dbConnect from "../../../../libs/database/dbconnect";
// import eventsModel from "@/models/eventsModel";


export async function POST(req) {
    await dbConnect()
    try{
    const eventData = await req.json(); 
    if (!eventData.name || !eventData.date) { 
        return NextResponse.json({ message: "Missing required fields",status:false }, { status: 400 });
      }
      const event = new eventsModel(eventData); 
      await event.save();
      return NextResponse.json({ message: "Event created",status:true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message,status:false }, { status: 400 });
    }
  };


