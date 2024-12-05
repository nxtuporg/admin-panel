import { NextResponse } from "next/server";
import eventsModel, { off } from "../../../../libs/database/models/eventsModel";
import dbConnect from "../../../../libs/database/dbconnect";
import userModel from "../../../../libs/database/models/userModel";
// import eventsModel from "@/models/eventsModel";

// export async function POST(req) {
//   await dbConnect();
//   try {
//     const eventData = await req.json();
//     // if (
//     //   !eventData.name ||
//     //   !eventData.day ||
//     //   !eventData.time ||
//     //   !eventData.address ||
//     //   !eventData.description
//     // ) {
//     //   return NextResponse.json(
//     //     { message: "Missing required fields", status: false },
//     //     { status: 400 }
//     //   );
//     // }
//     const event = new userModel(eventData);
//     await event.save();
//     return NextResponse.json(
//       { message: "Event created", status: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message, status: false },
//       { status: 400 }
//     );
//   }
// }

export async function GET(req) {
  await dbConnect();
  try {
    const admins = await userModel.find();
    // console.log(events);
    return NextResponse.json({ admins, status: true }, { status: 200 });
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
    const eventData = await req.json();
    var updatedEvent;
    for (const el of Object.keys(eventData)) {
      await userModel.findByIdAndUpdate(el, eventData[el], {
        new: true,
      });
    }

    // const { _id } = eventData;

    // if (!updatedEvent) {
    //   return NextResponse.json(
    //     { message: "Event not found", status: false },
    //     { status: 404 }
    //   );
    // }
    return NextResponse.json(
      { message: "Admin Details updated", status: true, event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  await dbConnect();
  try {
    // const { _id } = await req.json();
    var url = new URL(req.url);
    const deletedEvent = await userModel.findByIdAndDelete({
      _id: url.searchParams.get("id"),
    });
    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Event not found", status: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Event deleted", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}
