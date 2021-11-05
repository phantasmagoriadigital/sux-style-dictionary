const baseSpace = 8;

let spaceObject = {}
let spacesArray= [0,25,50,75,100,125,150,175,200,225,250,275,300,350,400,800];

spacesArray.forEach(element => {
    let spaceName = `${element}`;
    let spaceValue = (baseSpace * (element/100));
    spaceObject = {...spaceObject, [spaceName] : {
        "value": spaceValue,
        "type": "spacing"
      },} 
});
console.log("👾 Generating spaces 👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾")
console.log(spaceObject)
console.log("👾 DONE 👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾")
module.exports = {"spacing": {...spaceObject}};