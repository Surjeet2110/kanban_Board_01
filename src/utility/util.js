const capitalizeWords = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

const priorityToName = (str)=>{
    const val = parseInt(str);
    if(val===0){
        return "No priority"
    }else if(val===1){
        return "Low"
    }else if(val===2){
        return "Medium"
    }else if(val===3){
        return "High"
    }else{
        return "Urgent"
    }
}

function processString(inputString) {
    const str = inputString.toUpperCase()
    const words = str.split(" ");
  
    if (words.length >= 2) {
      return words[0].charAt(0) + words[1].charAt(0);
    } else if (words.length === 1) {
      return words[0].substring(0, 2);
    } else {
      return "QS";
    }
  }
  
export {capitalizeWords, priorityToName, processString}