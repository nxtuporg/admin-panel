// import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import formidable from 'formidable'
import { NextResponse } from 'next/server';



export async function POST(req) {
    if (req.method == "POST") {
        const form = new formidable.IncomingForm();
        form.uploadDir = '../../../../public';
        form.keepExtensions = true

        await fs.mkdir(form.uploadedDir, { recursive: true })

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return NextResponse.json({ error: "Error processing the file" }, { status: 200 })
            }

            const uploadFile = files.file;
            return NextResponse.json({
                message: "File was uploaded nicely",
                file: uploadFile
            }, { status: 200 })
        }
        )


    }
}