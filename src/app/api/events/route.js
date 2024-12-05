import { NextResponse } from "next/server";
import eventsModel from "../../../../libs/database/models/eventsModel";
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
    const { _id } = eventData;
    const updatedEvent = await eventsModel.findByIdAndUpdate(_id, eventData, {
      new: true,
    });
    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Event not found", status: false },
        { status: 404 }
      );
    }
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
    const { _id } = await req.json();
    const deletedEvent = await eventsModel.findByIdAndDelete(_id);
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
