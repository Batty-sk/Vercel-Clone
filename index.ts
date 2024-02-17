
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json())

app.post('/github', (req: Request, res: Response) => {
    const { url } = req.body;

    const githubRepoRegex = /^https?:\/\/github\.com\/[^\/]+\/[^\/]+$/;

    if (!url || !githubRepoRegex.test(url)) {
        return res.status(400).send('Invalid GitHub repository URL');
    }

    console.log(`Valid GitHub repository URL: ${url}`);
    res.status(200).send('Valid GitHub repository URL');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
