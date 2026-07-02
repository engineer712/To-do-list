let arr = [];
if(localStorage.getItem("list")){
    arr = JSON.parse(localStorage.getItem("list"));
    addhtml();
}
taskcounter();
let bodyhtml = '';
function Add(){
    let inp = document.getElementById('task').value;
    let date = document.querySelector(".date").value;
    if (inp == ''){
        alert("Please Enter Task");
        return;
    }
    if(date == ''){
        alert("please Enter due date");
        return;
    }
    arr.push({input: `${inp}`,dates: `${date}`,marking : false});
    console.log(arr);
    addhtml();
    savetodo();
    document.getElementById('task').value = '';
    document.querySelector(".date").value = '';
    
}
function addhtml(){
    let bodyhtml = '';
    
    for(let i =0 ; i< arr.length; i++){
        let html;
        html = `<div class = "todolist">
                    <input type = "checkbox" id = "markasdone" 
                        ${arr[i].marking ? 'checked' : ''}
                        onchange = "clicked(${i});
                        taskcounter();"
                        addhtml();
                        "                    
                    >
                    <div>${arr[i].input}</div>
                    
                    <div>${arr[i].dates}</div>
                    <button onclick="
                        arr.splice(${i},1);
                        savetodo();
                        addhtml();
                        taskcounter();">      
                        Delete 
                    </button>
                </div>`;
        bodyhtml += html;
    }
    
    document.getElementById('html').innerHTML = bodyhtml; 
    taskcounter();  
}
function savetodo(){
    localStorage.setItem("list",JSON.stringify(arr));
}
function clicked(i){
    arr[i].marking = !arr[i].marking;
    savetodo();
    addhtml();
}
function taskcounter(){
    let number = 0;
    let taskhtml;
    if (arr.length > 0){
        for(let task of arr){
            if (task.marking){
                number += 1;
            }
        }
        document.getElementById("taskcounter").innerText = `Task Counter: ${number} tasks completed.`;
    }
    else{
        document.getElementById("taskcounter").innerText = "No tasks are added Yet!"
    }
}

function clearCompleted(){
        for (let i = arr.length-1; i >= 0 ; i--){
            if(arr[i].marking){
                arr.splice(i,1);
            }
        }
    savetodo();
    addhtml();
    console.log(arr);
}