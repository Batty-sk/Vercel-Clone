let  nodegit = require('nodegit');
import * as path from 'path';

export const Clone_Repo=(repoLink:string)=>{

    try{
        nodegit.Clone(repoLink,__dirname+'/G-Repo/').then((val)=>{
        console.log('successfully cloned')

    }).catch((err)=>{
        throw new Error(err)
    })
}
catch(error){
        return 0
}
return 1  

}