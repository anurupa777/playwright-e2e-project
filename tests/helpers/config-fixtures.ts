import {test as base} from '@playwright/test'
export type EnvConfig = {   //EnvConfig is suervaribale given by user

envName:string
appURL: string
dbConfig: {}
}

export const test = base.extend<EnvConfig>({
envName: ["test",{"option" :true}],
appURL: ["<provideURL>",{"option" :true}],
dbConfig: [{},{"option" :true}]  

})