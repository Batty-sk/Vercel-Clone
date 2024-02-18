
import express, { Request, Response } from 'express';
import { Clone_Repo } from './utlis';
import { uploadDirectory } from './uploadBucket';
import { runNpmInstallAndBuild } from './build';
const { v4: uuidv4 } = require('uuid');


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
    
    const uniqueId = uuidv4().slice(0,5);

    let result = await Clone_Repo(cleanedUrl,uniqueId)
    if (result == 0){
        res.status(500)
    }
    else{
        
        try{
            const logs= runNpmInstallAndBuild(`G-Repo/${uniqueId}`)
            // const result=await uploadDirectory(uniqueId)
            return res.send({'logs':logs}).status(200)
        }
        catch(err){
            return res.send({'error':err}).status(400)
        }


    }
    
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
