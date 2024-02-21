import { Storage } from '@google-cloud/storage';
import * as path from 'path';
require('dotenv').config();

import * as fs from 'fs';

const storage = new Storage();
const bucketName = 'bucket-vercel';

import { promisify } from 'util';
import { readdir, lstat } from 'fs';
import { join } from 'path';

const readdirAsync = promisify(readdir);
const lstatAsync = promisify(lstat);

export async function uploadDirectory(id: string): Promise<void> {
    const baseDirectory = path.resolve(__dirname, `G-Repo/${id}/build`);
    await uploadRecursive(baseDirectory, baseDirectory,id);
    console.log('Upload complete.');
}

async function uploadRecursive(baseDirectory: string, directoryPath: string,id:string) {
    const files = await readdirAsync(directoryPath);
    for (const file of files) {
        const filePath = join(directoryPath, file);
        const stats = await lstatAsync(filePath);
        if (stats.isDirectory()) {
            await uploadRecursive(baseDirectory, filePath,id);
        } else {
            const relativePath = path.relative(baseDirectory, filePath);
            const destination = `G-Repo/${id}/${relativePath}`.replace(/\\/g, '/'); // Replace backslashes with forward slashes
            await storage.bucket(bucketName).upload(filePath, { destination });
            console.log(`Uploaded ${filePath} to ${bucketName}/${destination}`);
        }
    }
}
