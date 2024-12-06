import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/database/dbconnect";
import activityModel from "../../../../libs/database/models/activityModel";
export async function POST(req) {
  await dbConnect();
  try {
    const activityData = await req.json();
    if (
      !activityData.name ||
      !activityData.day ||
      !activityData.time ||
      !activityData.address ||
      !activityData.description
    ) {
      return NextResponse.json(
        { message: "Missing required fields", status: false },
        { status: 400 }
      );
    }
    const Activity = new activityModel(activityData);
    await Activity.save();
    return NextResponse.json(
      { message: "Activity created", status: true, id: Activity._id },
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
    var url = new URL(req?.url);
    var activities;
    if (url.searchParams.get("id")) {
      activities = await activityModel.findById(url.searchParams.get("id"));
    } else {
      activities = await activityModel.find();
    }
    return NextResponse.json({ activities, status: true }, { status: 200 });
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
    for (const el of eventData.events) {
      const id = el.id;
      delete el["id"];
      //   console.log(id, el);
      await activityModel.findByIdAndUpdate(id, el, {
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
      { message: "Activities updated", status: true, activities: updatedEvent },
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
    const deletedActivity = await activityModel.findByIdAndDelete({
      _id: url.searchParams.get("id"),
    });
    if (!deletedActivity) {
      return NextResponse.json(
        { message: "Activity not found", status: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Activity deleted", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 400 }
    );
  }
}
