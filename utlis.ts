import simpleGit, { SimpleGit } from 'simple-git';
import * as path from 'path';

export const Clone_Repo = async (repoLink: string,id:string): Promise<number> => {
    const git: SimpleGit = simpleGit();

    try {
        await git.clone(repoLink, path.join(__dirname, `G-Repo/${id}`));
        console.log('Successfully cloned');
        return 1;
    } catch (error) {
        console.error('Failed to clone repository:', error);
        return 0;
    }
}
