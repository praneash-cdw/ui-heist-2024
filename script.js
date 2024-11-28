const cars=document.querySelector('.cars');
const trafficLightOne=document.querySelector('.tl-one');
const trafficLightTwo=document.querySelector('.tl-two');
const trafficLightThree=document.querySelector('.tl-three');
const trafficLightFour=document.querySelector('.tl-four');

function north_south(){
    setInterval(()=>{
        console.log("north south");
    },1000);
}

function east_west(){
    setInterval(()=>{
        console.log("east west");
    },2000);
}

function main(){
    setInterval(()=>{
        
        console.log("end");
    },3000);
}

// north_south();
// east_west();
// main();
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




function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    return color;
}

// logical execution



// let car2=generateCar(0,90,190);
// carInstances.push(car2);

// moveCarRightToLeft(carInstances[0],0,1800);

// moveCarLeftToRight(carInstances[1],1800,0);



// moveCarTopToBottom(carInstances[0],1000,0);



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
    // person.style.display='none';
}

async function movePersonLeftToRight(person,start,end) {
    return new Promise(async (resolve) => {
        for (let i = start; i>=end; i--) {
            person.style.left = `${i}px`; 
            await delay(10); 
        }
    resolve();
    });

    // person.style.display='none';
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
    // person.style.display='none';
}

async function movePersonBottomToTop(person,start,end) {
    return new Promise(async (resolve) => {
        for (let i = start; i>=end; i--) {
            person.style.top = `${i}px`; 
            await delay(10); 
        }

    resolve();
    });
    // person.style.display='none';
}

async function rotatePerson(person,rotate) {
    return new Promise(async (resolve) => {
        person.style.transform = `rotate(${rotate/2}deg)`; 
        await delay(10);
        person.style.transform = `rotate(${rotate}deg)`; 
    resolve();
    });
    // person.style.display='none';
}



async function crossPedestrianOne(person,top,from,to){
    
    await movePersonTopToBottom(person,0,top,async() => {
    await rotatePerson(person, 90);
    await delay(20);

    await movePersonLeftToRight(person,from,to);
    await delay(100);
    await rotatePerson(person, -90);
    movePersonTopToBottom(person,top,top+50,()=>{
        return;
    });
})
}
//top,from,to

let toValue=500;


async function stepOne(){
    toValue=500;
    return new Promise(async (resolve) => {
        for(let i=0;i<7;i++){

            const person1=generatePerson(0,100,540,'green');
            crossPedestrianOne(person1,720,540,toValue);
            toValue-=40;
            await delay(1000);
        }
    resolve();
    
    });
}
   


async function crossPedestrianTwo(){
    let toValue=500;
    for(let i=0;i<7;i++){
        let person=personInstances[i];
        console.log(person);
        await movePersonRightToLeft(person,toValue,1800,2);
        toValue-=40
        // await delay(1000);
        
        person.style.display='none'
    }
}


// (async()=>{
    
    
//     await delay(10000);
   
// })()
execute();