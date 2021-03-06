console.log('js');
$(document).ready(handleReady);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

function handleReady() {
    console.log('jQ is here!');
    $('#taskBtn').on('click', submitTask)
    $('#target').on('click', '.deleteBtn', deleteTask)
    $('#target').on('click', '.completeBtn', completeTask)
    getTasks();
}

// takes user input and sets it to a new object
function submitTask() {
    let newTask = {
        task: $('#taskInput').val(),
        completed: false
    }
    if (newTask.task === '') {
        swal('Please input a task!');
    } else {
        console.log('Added new task:', newTask);
        sendTasks(newTask);
    }
}

// takes user input object and tells server to send to databse
function sendTasks(newTask) {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then((response) => { 
        swal("Added new task!", {
        buttons: false,
        timer: 1000,
    });
    $('#taskInput').val('');
    getTasks();
    }).catch(function (error){ 
        console.log(error);
    })
}

// ask server to send the database
function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        appendTasks(response);
    }).catch(function(error){
        console.log('error in getTasks', error);
    });
}

// writes the database tasks to the DOM, and genderates buttons for delete and complete tasks
function appendTasks(response) {
    $('#target').empty();
    for(let i = 0; i < response.length; i += 1) {
        let task = response[i];
        console.log('Adding tasks:', task);
        let $tr = $('<tr></tr>');
        $tr.data('task', task.id);
        $tr.append(`<td>${task.task}</td>`);
        if (task.completed === 'false') {
            $tr.append(`
                <td><button class="completeBtn btn btn-outline-info">Mark as Completed</button></td>`
            );
        } else if (task.completed === 'true') {
            $tr.append(`<td><button class="uncompleteBtn btn btn-success">Task Completed at ${task.time}!</button></td>`);
        }
        $tr.append(`<td><button class="deleteBtn btn btn-outline-danger">DELETE</button></td>`);      
        $('#target').append($tr);      
    }
}

// tells server to remove a task from the database
function deleteTask() {
    swal({
        title: "Are you sure?",
        text: "Your task will be removed permanently!",
        icon: "warning",
        buttons: true,
    }).then((toDelete) => {
        if (toDelete) {
            swal("Your task has been deleted", {
                icon: "success",
            });
          let id = $(this).closest('tr').data('task');
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${id}`
        })
        .then(function(){
            getTasks();
        })
        .catch(function(error) {
            alert('Error in deleteTasks', error);
        })
        } else {
            swal("Your task was not deleted!");
        }
    })    
}

// tells server to mark a task as compeleted
function completeTask() {
    let idToComplete = $(this).closest('tr').data('task');
    let currentTime = {
        time: dateTime
    };
    $.ajax({
        method: 'PUT',
        url: `/tasks/C/${idToComplete}`
    }).then(function() {
    }).catch(function(error) {
        console.log('Error in completeTask', error);
    })
    $.ajax({
        method: 'PUT',
        url: `/tasks/T/${idToComplete}`,
        data: currentTime
    }).then(function() {
        getTasks();
    }).catch(function(error) {
        console.log('Error in updateTime', error);
    })
}
