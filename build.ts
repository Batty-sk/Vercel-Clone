import { exec } from 'child_process';
import { platform } from 'os';

function runNpmInstall(path:string): Promise<string> {
    return new Promise((resolve, reject) => {
        const stderrRedirect = platform() === 'win32' ? '2> NUL' : '2> /dev/null';
        const command = `npm install ${stderrRedirect}`;

        exec(command,{cwd:path}, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error executing npm install: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.log(`npm install stderr: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(`npm install stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}

function runNpmBuild(path:string): Promise<string> {
    return new Promise((resolve, reject) => {
        const stderrRedirect = platform() === 'win32' ? '2> NUL' : '2> /dev/null';
        const command = `npm run build ${stderrRedirect}`;

        exec(command,{cwd:path}, (error, stdout, stderr) => {
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
            resolve(stdout);
        });
    });
}

export async function runNpmInstallAndBuild(path:string): Promise<void> {
    try {
        console.log('Running npm install...');
        await runNpmInstall(path);
        console.log('npm install completed.');

        console.log('Running npm run build...');
        await runNpmBuild(path);
        console.log('npm run build completed.');
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

