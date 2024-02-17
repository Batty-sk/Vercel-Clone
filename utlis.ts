import simpleGit, { SimpleGit } from 'simple-git';
import * as path from 'path';

export const Clone_Repo = async (repoLink: string): Promise<number> => {
    const git: SimpleGit = simpleGit();

    try {
        await git.clone(repoLink, path.join(__dirname, 'G-Repo'));
        console.log('Successfully cloned');
        return 1;
    } catch (error) {
        console.error('Failed to clone repository:', error);
        return 0;
    }
}
