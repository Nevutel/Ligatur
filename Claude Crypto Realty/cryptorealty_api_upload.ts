import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' }, 
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `File type ${file.type} not allowed` }, 
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} exceeds size limit of 10MB` }, 
          { status: 400 }
        );
      }
    }

    const uploadedFiles = [];

    for (const file of files) {
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
      
      const blob = await put(filename, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      uploadedFiles.push({
        url: blob.url,
        filename: blob.pathname,
        size: file.size,
        contentType: file.type,
      });
    }

    return NextResponse.json({
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully`
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload files' }, 
      { status: 500 }
    );
  }
}

// Alternative implementation using basic file system (for non-Vercel deployments)
export async function POST_FILESYSTEM(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' }, 
        { status: 400 }
      );
    }

    // For basic deployment without Vercel Blob, you can store files locally
    // or implement your own cloud storage solution (AWS S3, Cloudinary, etc.)
    
    const uploadedFiles = [];

    for (const file of files) {
      // Convert file to base64 or save to local filesystem
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate filename
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
      
      // In a real implementation, you would save this to your storage solution
      // For now, we'll return a placeholder URL
      const publicUrl = `/uploads/${filename}`;
      
      uploadedFiles.push({
        url: publicUrl,
        filename: filename,
        size: file.size,
        contentType: file.type,
      });
    }

    return NextResponse.json({
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully`
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload files' }, 
      { status: 500 }
    );
  }
}