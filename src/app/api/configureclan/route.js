import clanModel from "../../../../libs/database/models/clanModel";
import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/database/dbconnect";

export async function POST(req) {
  await dbConnect();
  try {
    const clanData = await req.json();
    if (
      
      // !clanData.name ||
      !clanData.leader
      // !clanData.viceLeader ||
      // !clanData.points 
    ) {
      return NextResponse.json(
        { message: "Missing required fields", status: false },
        { status: 400 }
      );
    }
    const clan = new clanModel(clanData);
    await clan.save();
    return NextResponse.json(
      { message: "Clan created", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const clanId = searchParams.get("id");

    if (clanId) {
      const clan = await clanModel.findById(clanId);
      if (!clan) {
        return NextResponse.json(
          { message: "Clan not found", status: false },
          { status: 404 }
        );
      }
      return NextResponse.json({ clan, status: true }, { status: 200 });
    }

    const clans = await clanModel.find();
    console.log(clans);
    return NextResponse.json({ clans, status: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const clanData = await req.json();
    const { _id } = clanData;
    const updatedClan = await clanModel.findByIdAndUpdate(_id, clanData, {
      new: true,
    });
    if (!updatedClan) {
      return NextResponse.json(
        { message: "clanData not found", status: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "clanData updated", status: true, clanData: updatedClan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}

// export async function DELETE(req) {
//     await dbConnect();
//     try {
//         const { _id } = await req.json();
//         const deletedClan = await clanModel.findByIdAndDelete(_id);
//         if (!deletedClan) {
//             return NextResponse.json({ message: "Clan not found", status: false }, { status: 404 });
//         }
//         return NextResponse.json({ message: "Clan deleted", status: true }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: error.message, status: false }, { status: 400 });
//     }
// }
