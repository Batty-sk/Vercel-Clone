
import express, { Request, Response } from 'express';
import { Clone_Repo } from './utlis';

const app = express();
const port = 3000;

app.use(express.json())

app.get('/github', async(req: Request, res: Response) => {
    const { url } = req.query as { url: string };

/*     const githubRepoRegex = /^https?:\/\/github\.com\/[^\/]+\/[^\/]+(\.git)?$/;
 */    console.log(url)
/*     if (!url || !githubRepoRegex.test(url)) {
        return res.status(400).send('Invalid GitHub repository URL');
    } */
    console.log('cloning...')
    const cleanedUrl = url.replace(/"/g, '')
    let result = await Clone_Repo(cleanedUrl)
    if (result == 0){
        res.status(500)
    }
    else{
        res.status(200).send('Valid GitHub repository URL');


    }
    
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
