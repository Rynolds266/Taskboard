
 import { icons } from "./icons.js";
 //prevent page to reload

 let form = document.querySelector(".input-form");

 let overlay = document.querySelector("#overlay");
 let fullText = document.querySelector("#fulltext")
 let btnclose= document.querySelector("#btnclose")
 
 btnclose.addEventListener("click",()=>{
    console.log("add clicked!")

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
      complete:false
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
    div.append(btnDelete)

   // li.append(checkbox)
    li.append(span)
    li.append(div)
    tasklist.appendChild(li)

    requestAnimationFrame(()=>screanRender(span))

  })


}

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