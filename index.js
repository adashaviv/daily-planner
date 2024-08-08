import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"

import { 
    getDatabase, 
    ref,
    onValue,
    push,
    remove,
    child
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://productivity-daily-planner-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const priorityInDB = ref(database, "priority")
const mealInDB = ref(database, "meal")
const reminderInDB = ref(database, "reminder")


const priorityAddBtn = document.querySelector("#priority-add-btn")
const mealAddBtn = document.querySelector("#meal-add-btn")
const reminderAddBtn = document.querySelector("#reminder-add-btn")
const clearBtn = document.querySelector("#clear-btn")
const dateEl = document.querySelector("#date")

const priorityInput = document.querySelector("#priority-item")
const mealInput = document.querySelector("#meal-item")
const reminderInput = document.querySelector("#reminder-item")

const priorityUl = document.querySelector("#priorities-list")
const mealUl = document.querySelector("#meal-list")
const reminderUl = document.querySelector("#reminders-list")

let priorityList = ""
let mealList = ""
let reminderList = ""

const prioritySaved = []

const closeItemClass = document.getElementsByClassName("close-item")


function changeDate() {
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'long' })
    const day = today.getDate()

    dateEl.textContent = month + " " + day
}

changeDate()

priorityAddBtn.addEventListener("click", function() {

    if (priorityInput.value) {
        push(priorityInDB, priorityInput.value)
        priorityInput.value = ""
    } 

})

mealAddBtn.addEventListener("click", function() {
    if (mealInput.value) {
        push(mealInDB, mealInput.value)
        mealInput.value = ""
    }
})

reminderAddBtn.addEventListener("click", function() {
    if (reminderInput.value) {
        push(reminderInDB, reminderInput.value)
        reminderInput.value = ""
    }
})

onValue(priorityInDB, function(snapshot) {
    const snapshotPriorityExists = snapshot.exists()
 
    if (snapshotPriorityExists) {
        const snapshotPriority = snapshot.val()
        const prioritiesValue = Object.values(snapshotPriority)
        const prioritiesKey= Object.keys(snapshotPriority)
        render(prioritiesValue, prioritiesKey, priorityList, priorityUl)
    }

})

onValue(mealInDB, function(snapshot) {
    const snapshotMealExists = snapshot.exists()
 
    if (snapshotMealExists) {
        const snapshotMeal = snapshot.val()
        const mealValue = Object.values(snapshotMeal)
        const mealKey= Object.keys(snapshotMeal)
        render(mealValue, mealKey, mealList, mealUl)
    }

})

onValue(reminderInDB, function(snapshot) {
    const snapshotReminderExists = snapshot.exists()
 
    if (snapshotReminderExists) {
        const snapshotReminder = snapshot.val()
        const reminderValue = Object.values(snapshotReminder)
        const reminderKey= Object.keys(snapshotReminder)
        render(reminderValue, reminderKey, reminderList, reminderUl)
    }

})

function render(value, key, list, listEl) {
    list = ""


    for (let i=0; i<value.length; i++) {
        list += `
        <li class="list-item" id="${key}">${value[i]}<span class="close-item">×</span></li>
        `
    }


    listEl.innerHTML = list

    for (let i=0; i<closeItemClass.length; i++) {
        closeItemClass[i].addEventListener("click", function() {
    
            let div = this.parentNode
            div.style.display = "none"

            remove(priorityInDB, div.id)
            remove(mealInDB, div.id)
            remove(reminderInDB, div.id)
    

        })
      
    }

}

clearBtn.addEventListener("click", function() {
    remove(priorityInDB)
    remove(mealInDB)
    remove(reminderInDB)
    priorityUl.innerHTML = ""
})

// console.log(closeItemClass)

// for (let i=0; i<closeItemClass.length; i++) {
//     closeItemClass[i].addEventListener("click", function() {

//         console.log("success")

//         //  let div = this.parentNode

//         // div.style.display = "none"

//     })
  
// }