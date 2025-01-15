/*
 * This file is where you should write your code. Remember to click
 * Run after you make changes to re-run the tests with your new code.
 */

function  sleep_in(weekday, vacation){
    if (vacation == true ){ 
        return true;
    }
    if (vacation == false){
        if (weekday == true){
            return false;
        }else{
            return true;
        }
    }
}

//change