import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/database/dbconnect";
import eventsModel from "../../../../libs/database/models/eventsModel";
import activityModel from "../../../../libs/database/models/activityModel";

export async function POST(req) {
  await dbConnect();

  try {
    var url = new URL(req.url);
    // console.log(url);
    var type = url.searchParams.get("type");
    if (!type) {
      return NextResponse.json(
        { message: "Error Occured!", status: false },
        { status: 400 }
      );
    }
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json(
        {
          message: `${
            type == "AllActivities" ? "Activity" : "Event"
          } have not added properly.`,
          status: false,
        },
        { status: 400 }
      );
    }
    if (!data.id || !data.title || !data.description) {
      return NextResponse.json(
        { message: "Missing required fields", status: false },
        { status: 400 }
      );
    }
    var newItem;
    if (type == "AllActivities") {
      newItem = await activityModel.findByIdAndUpdate(data.id, {
        registrationForm: data,
      });
    } else {
      newItem = await eventsModel.findByIdAndUpdate(data.id, {
        registrationForm: data,
      });
    }

    // await newItem.save();

    return NextResponse.json(
      { message: "Data created successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error occured", status: false },
      { status: 400 }
    );
  }
}

// import registrationFormModel from "../../../../libs/database/models/registrationFormModel";
// import dbConnect from "../../../../libs/database/dbconnect";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//     await dbConnect()
//     try{
//         const {searchParams} = new URL(req.url)
//         const id = searchParams.get('id')
//         const registrationForm = await registrationFormModel.findById(id)
//         return NextResponse.json({registrationForm,status:true}, {status:200})
//     }catch(error){
//         return NextResponse.json({message:error.message,status:false}, {status:400})
//     }
// }
