import { NextResponse } from "next/server";
import eventsModel, { off } from "../../../../libs/database/models/eventsModel";
import dbConnect from "../../../../libs/database/dbconnect";
// import eventsModel from "@/models/eventsModel";

export async function POST(req) {
  await dbConnect();
  try {
    const eventData = await req.json();
    if (
      !eventData.name ||
      !eventData.day ||
      !eventData.time ||
      !eventData.address ||
      !eventData.description
    ) {
      return NextResponse.json(
        { message: "Missing required fields", status: false },
        { status: 400 }
      );
    }
    const event = new eventsModel(eventData); // Create a new event instance
    await event.save(); // Save the event to the database
    
    return NextResponse.json(
      {
        message: "Event created",
        status: true,
        id: event._id // Access the _id directly from the saved object
      },
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
    const events = await eventsModel.find();
    // console.log(events);
    return NextResponse.json({ events, status: true }, { status: 200 });
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
      await eventsModel.findByIdAndUpdate(el, eventData[el], {
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
      { message: "Event updated", status: true, event: updatedEvent },
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
    const deletedEvent = await eventsModel.findByIdAndDelete({
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

