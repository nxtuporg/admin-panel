import multer from 'multer';
import { NextResponse } from 'next/server';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Absolute path to public/uploads folder
    cb(null, path.join(process.cwd(), 'public', 'uploads')); 
  },
  filename: (req, file, cb) => {
    // Save the file with a unique name (timestamp + original name)
    cb(null, `pehli-image`);
  },
});

const upload = multer({ storage });

// Disable default bodyParser for file uploads in Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware wrapper to handle Multer in Next.js API route
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      // Run Multer middleware
      await runMiddleware(req, NextResponse, upload.single('file')); // Use 'file' as the field name

      // Respond with the file path
      return NextResponse.json({
        message: 'File uploaded successfully!',
        filePath: `/uploads/${NextResponse.file.filename}`, // Path relative to the public directory
      });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} not allowed` });
  }
}
