const timerWorker = new Worker('timerWorker.js');
const timerPromises = new Map();

function workerDelay(ms) {
    return new Promise((resolve) => {
        const id = Math.random().toString(36).substring(2); // Unique ID for the timer
        timerPromises.set(id, resolve);

        // Send delay request to the worker
        timerWorker.postMessage({ id, delay: ms });
    });
}

timerWorker.onmessage = function (event) {
    const { id } = event.data;
    const resolve = timerPromises.get(id);
    if (resolve) {
        resolve(); // Resolve the corresponding promise
        timerPromises.delete(id); // Clean up
    }
};

async function delay(ms) {
    return workerDelay(ms);
}
//

const cars=document.querySelector('.cars');
const trafficLightOne=document.querySelector('.tl-one');
const trafficLightTwo=document.querySelector('.tl-two');
const trafficLightThree=document.querySelector('.tl-three');
const trafficLightFour=document.querySelector('.tl-four');




let carCount=0;
let carInstances=[];
function generateCar(rotation,top,left,color){
    let car=document.createElement('div');
    car.className="car";
    car.style.backgroundColor=color;
    let partsClassNames=["right-mirror","left-mirror","front-wind-shield","rear-wind-shield","car-top"];
    let part;
    partsClassNames.forEach(partsClassName => {
        part=document.createElement("div");
        part.className=partsClassName;
        car.append(part);
        // console.log(partsClassName);
    });

    car.id=`car-{1}`;
   
    
    
    if(rotation){
        car.style.transform=`rotate(${rotation}deg)`;
    }
    if(top){
        car.style.top=`${top}px`;
    }
    if(left){
        car.style.left=`${left}px`;
    }
    cars.append(car);
    carCount+=1;
    return car;
}





async function moveCarRightToLeft(car,start,end) {
    for (let i = start; i <= end; i++) {
        car.style.left = `${i}px`; 
        await delay(10); 
    }

    car.style.display='none';
}

async function moveCarLeftToRight(car,start,end) {
    for (let i = start; i>=end; i--) {
        car.style.left = `${i}px`; 
        await delay(10); 
    }

    car.style.display='none';
}

async function moveCarTopToBottom(car,start,end) {
    for (let i = start; i <= end; i++) {
        car.style.top = `${i}px`; 
        await delay(10); 
    }

    car.style.display='none';
}

async function moveCarBottomToTop(car,start,end) {
    for (let i = start; i>=end; i--) {
        car.style.top = `${i}px`; 
        await delay(10); 
    }

    car.style.display='none';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    if (color === '#000000') {
        color = '#FF0000';
    }
    return color;
}





function southToNorth(){
    let car=generateCar(0,1000,700,getRandomColor());
    carInstances.push(car);
    moveCarBottomToTop(car,1000,-100);
}

function northToSouth(){
    let car=generateCar(180,0,950,getRandomColor());
    carInstances.push(car);
    moveCarTopToBottom(car,-100,1000);
}

function eastToWest(){
    let car=generateCar(-90,520,1800,getRandomColor());
    carInstances.push(car);
    moveCarLeftToRight(car,1800,-100);
}

function westToEast(){
    let car=generateCar(90,330,0,getRandomColor());
    carInstances.push(car);
    moveCarRightToLeft(car,-100,1880);
}

function turnOnRedTrafficLight(trafficLight){
    const redLight = trafficLight.querySelector('.red');
    redLight.style.backgroundColor="#f01313";
    const greenLight = trafficLight.querySelector('.green');
    greenLight.style.backgroundColor="#054f05";
}

function turnOffRedTrafficLight(trafficLight){
    const redLight = trafficLight.querySelector('.red');
    redLight.style.backgroundColor="#550909";
    const greenLight = trafficLight.querySelector('.green');
    greenLight.style.backgroundColor="#01ff01";
}



//persons
let personInstances=[]

const persons=document.querySelector(".persons");

function generatePerson(rotate,top,left,color){
    const person=document.createElement("div");
    person.className="person";

    const head=document.createElement("div"); 
    head.className="head";
    const shoulder=document.createElement("div"); 
    shoulder.className="shoulder";
    
    const leftHand=document.createElement("div"); 
    leftHand.className="left-hand";
    const rightHand=document.createElement("div"); 
    rightHand.className="right-hand";

    shoulder.append(leftHand);
    shoulder.append(rightHand);

    person.append(head);

    person.append(shoulder);
    
    if(top){
        person.style.top=`${top}px`;
    }
    
    if(left){
        person.style.left=`${left}px`;
    }
    
    if(rotate){
        person.style.transform=`rotate(${rotate}deg)`;
    }

    if(color){
        person.style.backgroundColor=color;
    }
    
    
    persons.append(person);
    personInstances.push(person);
    return person; 
}


async function movePersonRightToLeft(person,start,end,speed) {
    return new Promise(async (resolve) => {
    for (let i = start; i <= end; i++) {
        person.style.left = `${i}px`; 
        await delay(speed); 
    }
    resolve();
    });
    
}

async function movePersonLeftToRight(person,start,end) {
    return new Promise(async (resolve) => {
        for (let i = start; i>=end; i--) {
            person.style.left = `${i}px`; 
            await delay(10); 
        }
    resolve();
    });
}
    

async function movePersonTopToBottom(person,start,end,callback) {
    return new Promise(async (resolve) => {
        for (let i = start; i <= end; i++) {
            person.style.top = `${i}px`; 
            await delay(10); 
        }
        if(callback){
            callback();
        }
    resolve();
    });
   
}

async function movePersonBottomToTop(person,start,end) {
    return new Promise(async (resolve) => {
        for (let i = start; i>=end; i--) {
            person.style.top = `${i}px`; 
            await delay(10); 
        }

    resolve();
    });
}    

async function rotatePerson(person,rotate) {
    return new Promise(async (resolve) => {
        person.style.transform = `rotate(${rotate/2}deg)`; 
        await delay(10);
        person.style.transform = `rotate(${rotate}deg)`; 
    resolve();
    });
    
}



async function crossPedestrianOne(person,top,from,to){
    
    await movePersonTopToBottom(person,0,top,async() => {
    await rotatePerson(person, 90);
    await delay(20);

    await movePersonLeftToRight(person,from,to);
    await delay(100);
    await rotatePerson(person, -90/2);
    await delay(50);
    await rotatePerson(person, -90);
    movePersonTopToBottom(person,top,top+50,()=>{
        return;
    });
})
}


let toValue=500;


async function stepOne(){
    toValue=500;
    return new Promise(async (resolve) => {
        for(let i=0;i<7;i++){

            const person1=generatePerson(0,100,540,getRandomColor());
            crossPedestrianOne(person1,720,540,toValue);
            toValue-=40;
            await delay(8000);
        }
    resolve();
    
    });
}
   



async function crossPedestrianTwo() {
    let toValue = 500;
    const promises = []; // Array to hold animation promises

    // Iterate through all person instances and create animation promises
    for (let i = 0; i < 7; i++) {
        if (!personInstances[i]) {
            console.error(`Person instance not found at index ${i}`);
            continue;
        }

        let person = personInstances[i];
        console.log(`Starting animation for person ${i}:`, person);

        
        promises.push(
            movePersonRightToLeft(person, toValue, 1800, 20).then(() => {
                console.log(`Animation complete for person ${i}`);
                person.style.display = 'none'; 
            })
        );

        toValue -= 40; 
    }

    // Wait for all animations to complete
    await Promise.all(promises);
    console.log('All pedestrians have crossed.');
    personInstances=[];
}



async function execute(){
    let count =2;
    turnOnRedTrafficLight(trafficLightOne);
    turnOnRedTrafficLight(trafficLightThree);

    turnOffRedTrafficLight(trafficLightTwo);
    turnOffRedTrafficLight(trafficLightFour);
    stepOne();
    for(let i=1;i<=count;i++){

        southToNorth();
        northToSouth();
        await delay(14000); 
        southToNorth();
        northToSouth();
        if(i<count){
            await delay(22000); 
        }else{
            await delay(10000);  
            turnOffRedTrafficLight(trafficLightOne);
            turnOffRedTrafficLight(trafficLightThree);

            turnOnRedTrafficLight(trafficLightTwo);
            turnOnRedTrafficLight(trafficLightFour);

            crossPedestrianTwo();
        }
    }
    for(let i=1;i<=count;i++){
        eastToWest();
        westToEast();
        await delay(12000); 
        eastToWest();
        if(i<count){
            await delay(18000); 
        }
        else{
            await delay(15000);  
            turnOffRedTrafficLight(trafficLightTwo);
            turnOffRedTrafficLight(trafficLightFour);

            turnOnRedTrafficLight(trafficLightOne);
            turnOnRedTrafficLight(trafficLightThree);            
        }
    }
    execute();
}

execute();