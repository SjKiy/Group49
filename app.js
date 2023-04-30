import {create} from './data/apartment.js';

async function main(){
    let apt 
    try{
        apt = await create("Apt 1", 1500, 16500, 800, 1,1, "Nice", true, [], [])
        console.log(apt);
    }
    catch(e){
        console.log(e);
    }
}

main();