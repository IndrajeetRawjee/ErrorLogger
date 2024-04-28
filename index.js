const fs = require("fs");
let errorCounter = 0;
let warnCounter = 0;
//let infoCounter = 0;

let inputFilePath = "input.txt"
const processFile= async (inputFilePath)=>{
    if(!fs.existsSync(inputFilePath)){
        throw new Error("File not found");


    }
    if(inputFilePath.substring(-3)==="txt"){
        throw new Error("This is not text file.");
        

    }
    try{
        const rawData = await fs.readFileSync(inputFilePath,'utf-8');
        const data = rawData.split('\n')
        for (let i=0;i<data.length;i++){
            logger(data[i]);
        }
        
    }
    catch (err){
        throw new err;
    }
    
}

const logger=(i)=>{
    const lowerCaseI = i.toLowerCase();
    const logType ={
        error:{},
        warn:{},
        info:{}

    }

    switch (true){
        case lowerCaseI.includes("error"):
            logType.error.TimeStamp = lowerCaseI.slice(0,10);
            logType.error.Message = lowerCaseI.slice(nthIndex(i,'-',4) + 1 );
            logType.error.errorCounter = errorCounter++;
            writeFile("output.txt",JSON.stringify(logType.error) + "\n");
        // case lowerCaseI.includes("warn"):
        //     logType.warn.TimeStamp = lowerCaseI.slice(0,10);
        //     logType.warn.Message = lowerCaseI.slice(nthIndex(i,'-',4) + 1 );
        //     logType.warn.warnCounter = warnCounter++;
        //     writeFile("output.txt",JSON.stringify(logType.warn) + "\n");
    }
}


const writeFile = async (outputFilePath,data) => {
    await fs.appendFile(outputFilePath,data,(err)=> {if (err) console.log(err)});
}

const nthIndex = (str, char, n) => {
    let index;
    let charCounter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            charCounter++;
            if (charCounter === n) {
                index = i;
                break; // Exit the loop once the nth occurrence is found
            }
        }
    }
    return index;
}



processFile(inputFilePath);

