import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/database/dbconnect";
import clubModel from "../../../../libs/database/models/clubModel";
// import eventsModel from "@/models/eventsModel";


export async function POST(req) {
    await dbConnect()
    try{
    const clubData = await req.json(); 
    if (!clubData.devclub) { 
        return NextResponse.json({ message: "Missing required fields",status:false }, { status: 400 });
      }
      const club = new clubModel(clubData); 
      await club.save();
      return NextResponse.json({ message: "Club created",status:true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message,status:false }, { status: 400 });
    }
  };

export async function GET(req) {
    await dbConnect();
    try {
        const clubs = await clubModel.find(); 
        console.log(clubs);
        return NextResponse.json({ clubs, status: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, status: false }, { status: 400 });
    }
}

export async function PUT(req) {
    await dbConnect();
    try {
        const clubData = await req.json();
        const { _id } = clubData;
        const updatedClub = await clubModel.findByIdAndUpdate(_id, clubData, { new: true });
        if (!updatedClub) {
            return NextResponse.json({ message: "clubData not found", status: false }, { status: 404 });
        }
        return NextResponse.json({ message: "clubData updated", status: true, clubData: updatedClub }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, status: false }, { status: 400 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    try {
        const { _id } = await req.json(); 
        const deletedClub = await clubModel.findByIdAndDelete(_id);
        if (!deletedClub) {
            return NextResponse.json({ message: "Club not found", status: false }, { status: 404 });
        }
        return NextResponse.json({ message: "Club deleted", status: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, status: false }, { status: 400 });
    }
}

