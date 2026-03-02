
 import { icons } from "./icons.js";
 //prevent page to reload

 let form = document.querySelector(".input-form");

 let overlay = document.querySelector("#overlay");
 let fullText = document.querySelector("#fulltext")
 let btnclose= document.querySelector("#btnclose")
 
 btnclose.addEventListener("click",()=>{
    

    overlay.classList.add("hidden")

 })


 //delete event
 

 //create a object array

 let nextID=1;
 let Todo=[]

 form.addEventListener("submit",(e)=>{e.preventDefault()
   add();

 })


//function to add task
function add(){
   
    let raw=document.getElementById("input").value 

    let dateLine= document.getElementById("date").value

    let deadlineValue = dateLine===""?null: new Date(dateLine).getTime()

    new Date(dateLine).getDate()

    //remove white space from the input
    const input_user= raw.trim()
   
    if(input_user==="" || !isNaN(input_user))
    {
       let clear_input=document.getElementById("input").value="" 

      return clear_input
      

    }
    
    let taskObject={
      id:nextID++,
      task_name:input_user,
      deadline:null,
      complete:false,
      deadline: deadlineValue 
    }

    //test for duplicate task 

    let duplicate = Todo.some(item=>item.task_name===input_user)

    if(duplicate){
       alert("task already exist")
       document.getElementById("input").value="" ;

       return
    }
    
     

    Todo.push(taskObject)

    document.getElementById("input").value="";

     //screanRender();
    
    render()
    document.getElementById("date").value="";
}

// create a render to build all the view UI

function render(){

  const tasklist= document.getElementById("task-list");
  //clear the element so not duplicate 
   tasklist.innerHTML=""
  Todo.forEach( (task)=>{
    let li=document.createElement("li");
    li.dataset.id=task.id
    li.classList.toggle("done",task.complete);

    let textContent=document.createElement("div")
        textContent.className = "text-content"
    
    let span = document.createElement("span");
    span.className="task-text"
    span.textContent=task.task_name
    

    let btnDelete= document.createElement("button")
    btnDelete.className="btnDelete"
    btnDelete.type="button"
    btnDelete.innerHTML=icons.delete

    let checkbox = document.createElement("input")
    checkbox.type="checkbox"
    checkbox.className="complete"
    checkbox.checked=task.complete

    let div = document.createElement("div");
    div.className="task-action"
    div.append(checkbox);
    div.append(btnDelete);
    let small = document.createElement("small")
    
    
   // li.append(checkbox)
   // li.append(span)
    textContent.append(span)
    if (task.deadline) textContent.append(small)
      small.textContent = new Date(task.deadline).toLocaleString()
      
       
    li.append(textContent)
    li.append(div)
    tasklist.appendChild(li)

requestAnimationFrame(()=>{
  const isTruncate = span.scrollWidth > span.clientWidth
  span.classList.toggle("is-truncate" , isTruncate)

    })

   

  })


}
/*
function screanRender(span){

  if(span.scrollWidth> span.clientWidth)
     {
       span.style.cursor="pointer"
       span.addEventListener("click",()=>{
          
          fullText.textContent=span.textContent

          overlay.classList.remove("hidden")
          
       })
     
      }

}
      */

function deletion(){
  
  document.getElementById("task-list").addEventListener("click",(e)=>{
  const btnDelete = e.target.closest(".btnDelete");
   

  if (!btnDelete) return

  const li =btnDelete.closest("li")
  const id= Number(li.dataset.id)

  Todo=Todo.filter(task=>task.id!==id)

  render()


})

}

deletion();

document.getElementById("task-list").addEventListener("change",(e)=>{
  if(!e.target.matches(".complete"))return

  const li = e.target.closest("li")
  const id = Number(li.dataset.id) 
  const task = Todo.find(t=>t.id===id)
  if(!task)return
  task.complete = e.target.checked
  li.classList.toggle("done",task.complete)
   
})

document.getElementById("task-list").addEventListener("click",(e)=>{
  let span = e.target.closest(".task-text")
  if(!span)return

  //only open the model if test if truncate
  const isTruncate = span.scrollWidth > span.clientWidth;
  if(!isTruncate)return

  //finds the li that span belong to
  let li = span.closest("li")
  if(!li)return

  //find the task id 
  let id = Number(li.dataset.id)

  //find the task in array

  let task = Todo.find(t=>t.id===id)

  if(!task)return;
  //display the full text
  fullText.textContent= task.task_name

  overlay.classList.remove("hidden")
  console.log("task clickes overflow")

})