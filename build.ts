import { exec } from 'child_process';

// Function to run npm install
function runNpmInstall(path:string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec('npm install', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing npm install: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`npm install stderr: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(`npm install stdout: ${stdout}`);
            resolve();
        });
    });
}

function runNpmBuild(path:string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec('npm run build',{cwd:path}, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing npm run build: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`npm run build stderr: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(`npm run build stdout: ${stdout}`);
            resolve();
        });
    });
}

// Usage: Run npm install and then npm run build
async function runNpmInstallAndBuild(path:string): Promise<void> {
    try {
        console.log('Running npm install...');
        await runNpmInstall(path);
        console.log('npm install completed.');

        console.log('Running npm run build...');
        await runNpmBuild(path);
        console.log('npm run build completed.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

runNpmInstallAndBuild(path);