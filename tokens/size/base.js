const baseSize = 8;

let sizeObject = {}
let sizesArray= [0,25,50,75,100,125,150,175,200];

sizesArray.forEach(element => {
    let sizeName = `${element}`;
    let sizeValue = (baseSize * (element/100));
    sizeObject = {...sizeObject, [sizeName] : {
        "value": sizeValue,
        "type": "sizing"
      },} 
});
console.log("👾 Generating sizes 👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾")
console.log(sizeObject)
console.log("👾 DONE 👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾")
module.exports = {"size": {...sizeObject}};