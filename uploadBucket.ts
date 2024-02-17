import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs';

// Create a storage client
const storage = new Storage();

// Define the name of your GCS bucket
const bucketName = 'your-bucket-name';

// Define the directory containing the files to upload
const directoryPath = '/path/to/your/local/directory';

// Upload directory with files
export async function uploadDirectory(id:string): Promise<void> {
    const directoryFiles = fs.readdirSync(directoryPath);
    for (const file of directoryFiles) {
        const filePath = path.join(directoryPath, file);
        // Upload each file to the bucket
        await storage.bucket(bucketName).upload(filePath, {
            destination: file,
        });
        console.log(`Uploaded ${file} to ${bucketName}.`);
    }
    console.log('Upload complete.');
}

