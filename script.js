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


