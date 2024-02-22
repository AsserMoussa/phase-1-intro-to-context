

function createEmployeeRecord([fN, faN, ti, pay]){
    const emp = {
        firstName: fN,
        familyName: faN,
        title: ti,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
      };
      
      return emp;
}

function createEmployeeRecords(emps){
    let newArr = [];
    emps.forEach(element => {
        newArr.push(createEmployeeRecord(element))  
});
return newArr;
}

function createTimeInEvent(emp, stamp){
    //console.log(stamp.split(" "));
let splitStamp = stamp.split(" ");
    let timeInObj = {
    type: "TimeIn",
    hour: parseInt(splitStamp[1]),
    date: splitStamp[0]
}
emp.timeInEvents.push(timeInObj);
return emp;
}

function createTimeOutEvent(emp, stamp){
    //console.log(stamp.split(" "));
let splitStamp = stamp.split(" ");
    let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(splitStamp[1]),
    date: splitStamp[0]
}
emp.timeOutEvents.push(timeOutObj);
return emp;
}

function hoursWorkedOnDate(emp, stamp){
let timeInEvent = emp.timeInEvents.find(function(element){
    return element.date== stamp;

})
let timeOutEvent = emp.timeOutEvents.find(function(element){
    return element.date== stamp;
})
return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate(emp, stamp){
return emp.payPerHour*hoursWorkedOnDate(emp, stamp);
}

function allWagesFor(emp){
    let dates = emp.timeInEvents.map(function(element){
        return element.date;
    }) 
    let total = 0;
    for(let i=0;i<dates.length;i++){   
total = total + wagesEarnedOnDate(emp, dates[i]); 
    }
    return total;
}

function calculatePayroll(emp){
    let total = 0;
    for(let i=0;i<emp.length;i++){   
        total = total + allWagesFor(emp[i]); 
            }
            return total; 
}
