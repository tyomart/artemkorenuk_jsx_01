const log = console.log

function binarySearch(searchList, value) {

  let arrayPath = []; 
  let bingo = false;
  let arrPS= "";

  const mid = (arr) => { 
        return Math.floor(arr.reduce((acc,val) =>
          {return acc+val}, 0 )/ arr.length)
    }
   
 const toPath = (arr_s, arr_p) => {

    const lefty = (arr) => 
      { log(Math.floor((arr.length)/2+1))
         return arr.slice(0,Math.floor((arr.length)/2+1))}

    const righty = (arr) => 
      {; return arr.slice(Math.floor((arr.length)/2))}

    if (value === mid(arr_s)) { log('bingo'); return arr_p}  //bingo = true; 
     else if (value < mid(arr_s)) { 
       log('lf', lefty(arr_s), 'val',value)
       log('arr_p', arr_p)
       log('mid', mid(arr_s))
       return (lefty(arr_s).length>1)
                  ? toPath(lefty(arr_s), arr_p.push(mid(arr_s))) 
                    : arr_p.push(mid(arr_s));
       }
 }

//value > mid

  return console.log( 'm',mid(searchList),
    'arrPath', 
       toPath(searchList,arrayPath) )

}

const testArray = [
 0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13,14, 15, 16, 17, 18, 19, 20,21, 22,
  23, 49, 70]

binarySearch(testArray, 1)


