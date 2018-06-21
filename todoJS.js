// Function Used to clean the DOM
function clean(node) {
    for (var n = 0; n < node.childNodes.length; n++) {
        var child = node.childNodes[n];
        if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
            node.removeChild(child);
            n--;
        } else if (child.nodeType === 1) {
            clean(child);
        }
    }
}
clean(document); //executing DOM cleaning


// Getting Saved Todo-Tasks from the Local Storage
if (JSON.parse(window.localStorage.getItem("a")) != null && JSON.parse(window.localStorage.getItem("a")) != undefined) {
    var array = JSON.parse(window.localStorage.getItem("a"));
} else {
    var array = [];
}

generator();

// Function to Generate Todos.
function generator() {
    var table = document.getElementById("tbl");
    table.innerHTML = "";
    for (var i = 0; i < (array.length); i++) {
        var rows = "";
        var tr = document.createElement("tr");
        tr.setAttribute("index", i);
        if (array[i].check == true) {
            rows += "<td><input class=\"cur\" style=\"text-decoration:line-through;color:red;\"value=\"" + array[i].text + "\"/ disabled=\"\">" + "<button class=\"edit-btn btn\">Edit</button><button class=\"del-btn btn\">Delete</button><button class='mark'>Unmark</button></td>";
        }
        else {
            rows += "<td><input class=\"cur\" style=\"text-decoration:none;color:black;\"value=\"" + array[i].text + "\"/ disabled=\"\">" + "<button class=\"edit-btn btn\">Edit</button><button class=\"del-btn btn\">Delete</button><button class='mark'>Mark as Done</button></td>";
        }

        tr.innerHTML = rows;
        table.appendChild(tr);
        if (array[i].edit == true) {
            tr.getElementsByClassName('edit-btn')[0].setAttribute("disabled", "disabled");
        } else {
            tr.getElementsByClassName('edit-btn')[0].removeAttribute("disabled");
        }
        document.getElementById("task").value = "";
        var ind = i;
        tr.getElementsByClassName('edit-btn')[0].addEventListener("click", function () {
            this.parentNode.getElementsByClassName('cur')[0].focus();
            this.parentNode.getElementsByClassName('mark')[0].setAttribute("disabled", "disabled");
            edit(this);
        });
        tr.getElementsByClassName('del-btn')[0].addEventListener("click", function () {
            deleteTodo(this);
        });
        tr.getElementsByClassName('mark')[0].addEventListener("click", function () {
            markTodo(this);
        });
    }
}

// Function to set 
function setLocalStorage() {
    window.localStorage.setItem('a', JSON.stringify(array));
    console.log(window.localStorage);
}

// Function to mark todo
function markTodo(todo) {
    var input_field = todo.parentNode.getElementsByClassName('cur')[0];
    var style_value = input_field.getAttribute("style");
    var index = todo.parentNode.parentNode.getAttribute("index");
    console.log(style_value);
    if (style_value == "text-decoration:none;color:black;") {
        input_field.setAttribute("style", "text-decoration:line-through;color:red;");
        array[index].check = true;
        todo.parentNode.getElementsByClassName('edit-btn')[0].setAttribute('disabled', 'disabled');
        array[index].edit = true;
        todo.innerHTML = "Unmark";
    }
    if (style_value == "text-decoration:line-through;color:red;") {
        input_field.setAttribute("style", "text-decoration:none;color:black;");
        todo.innerHTML = "Mark as Done";
        array[index].check = false;
        array[index].edit = true;
        todo.parentNode.getElementsByClassName('edit-btn')[0].removeAttribute('disabled');
    }
    setLocalStorage();
}

// Function to Delete Todo
function deleteTodo(todo) {
    todo.parentNode.parentNode.parentNode.removeChild(todo.parentNode.parentNode);
    var index = todo.parentNode.parentNode.getAttribute("index");
    for (var i = 0; i < array.length; i++) {
        if (i == index) {
            array.splice(i, 1);
            setLocalStorage();
            break;
        }
    }
    generator();
}


// Function to edit Todo
function edit(todo) {
    todo.previousSibling.removeAttribute("disabled");
    var newbtn = document.createElement('button');
    todo.parentNode.getElementsByClassName('cur')[0].focus();
    if (document.getElementById('btnn') == undefined) {
        newbtn.setAttribute("id", "btnn");
        newbtn.innerHTML = "Done";
        var index = todo.parentNode.parentNode.getAttribute("index");
        var newdata = {
            text: "",
            check: array[index].check
        };

        function editbtn(){
            todo.parentNode.getElementsByClassName('cur')[0].setAttribute("disabled", "disabled");
            newbtn.parentNode.getElementsByClassName('mark')[0].removeAttribute('disabled');
            newbtn.parentNode.removeChild(newbtn);
            newdata.text = todo.parentNode.getElementsByClassName('cur')[0].value;
            array.splice(index, 1, newdata);
            setLocalStorage();
            generator();
        }
        
        todo.parentNode.getElementsByClassName('cur')[0].addEventListener('keypress',function(e){
            if(e.keyCode === 13)
            editbtn();
        });
        newbtn.addEventListener("click", function () {
            editbtn();
        });
        todo.parentNode.appendChild(newbtn);
    }  
}

// Function to Add Todo.
function todo() {
    var todo = {
        text: "",
        check: false,
        edit: false
    };
    todo.text = document.getElementById("task").value;
    if (todo.text != "" && todo.text != null && todo.text != undefined) {
        array.push(todo);
        setLocalStorage();
        generator();
    }
}

// Eventlistener to add Task on enter.
document.getElementById("task").addEventListener("keypress", function (e) {
      if(e.keyCode === 13){
          todo();
      }
});

//Event Listener to add task on click.
document.getElementById('add').addEventListener('click',function(){
    todo();
});
