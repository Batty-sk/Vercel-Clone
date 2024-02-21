import { Storage } from '@google-cloud/storage';
import * as path from 'path';
require('dotenv').config();

import * as fs from 'fs';

const storage = new Storage();

const bucketName = 'bucket-vercel';


import { promisify } from 'util';
import { readdir, lstat } from 'fs';
import { basename, join } from 'path';

const readdirAsync = promisify(readdir);
const lstatAsync = promisify(lstat);

export async function uploadDirectory(id: string): Promise<void> {
    const directoryPath = `${__dirname}/G-Repo/${id}/build`;

    async function uploadRecursive(filePath: string) {
        const stats = await lstatAsync(filePath);

        if (stats.isDirectory()) {
            const files = await readdirAsync(filePath);
            for (const file of files) {
                await uploadRecursive(join(filePath, file));
            }
        } else {
            const destination = filePath.substring(directoryPath.length + 1);
            await storage.bucket(bucketName).upload(filePath, {
                destination,
            });
            console.log(`Uploaded ${destination} to ${bucketName}.`);
        }
    }

    await uploadRecursive(directoryPath);
    console.log('Upload complete.');
}


