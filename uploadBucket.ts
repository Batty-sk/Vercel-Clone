import { Storage } from '@google-cloud/storage';
import * as path from 'path';
require('dotenv').config();

import * as fs from 'fs';

const storage = new Storage();

const bucketName = 'bucket-vercel-clone';


export async function uploadDirectory(id:string): Promise<void> {
    const directoryPath = `/ClonedRepo${id}`;

    const directoryFiles = fs.readdirSync(directoryPath);
    for (const file of directoryFiles) {
        const filePath = path.join(directoryPath, file);
        await storage.bucket(bucketName).upload(filePath, {
            destination: file,
        });
        console.log(`Uploaded ${file} to ${bucketName}.`);
    }
    console.log('Upload complete.');
}

