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
clean(document);


if (JSON.parse(window.localStorage.getItem("a")) != null && JSON.parse(window.localStorage.getItem("a")) != undefined) {
    var array = JSON.parse(window.localStorage.getItem("a"));
} else {
    var array = [];
}


generator();


function del() {
    var val = window.prompt("Enter Task no. to delete!");
    var oL = document.getElementsByClassName('cur');
    var check = false;
    for (var i = 0; i < oL.length; i++) {
        if (i == (val - 1)) {
            check = true;
            var ml = oL[i].parentNode.parentNode.parentNode.removeChild(oL[i].parentNode.parentNode);
            set_();
            break;
        }
    }
    if (check == false) {
        window.alert("Task does not exist!");
    }
}


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
            // this.parentNode.getElementsByClassName('mark')[0].innerHTML = "Mark as Done";
            this.parentNode.getElementsByClassName('mark')[0].setAttribute("disabled", "disabled");
            edit(this);
        });
        tr.getElementsByClassName('del-btn')[0].addEventListener("click", function () {
            delit(this);
        });
        tr.getElementsByClassName('mark')[0].addEventListener("click", function () {
            m_ark(this);
        });
    }
}


function set_() {
    window.localStorage.setItem('a', JSON.stringify(array));
    console.log(window.localStorage);
}


function m_ark(tii) {
    var input_field = tii.parentNode.getElementsByClassName('cur')[0];
    var style_value = input_field.getAttribute("style");
    var index = tii.parentNode.parentNode.getAttribute("index");
    console.log(style_value);
    if (style_value == "text-decoration:none;color:black;") {
        input_field.setAttribute("style", "text-decoration:line-through;color:red;");
        array[index].check = true;
        tii.parentNode.getElementsByClassName('edit-btn')[0].setAttribute('disabled', 'disabled');
        array[index].edit = true;
        tii.innerHTML = "Unmark";
    }
    if (style_value == "text-decoration:line-through;color:red;") {
        input_field.setAttribute("style", "text-decoration:none;color:black;");
        // tii.parentNode.parentNode.parentNode.setAttribute("done","text-decoration:none;color:black;");
        tii.innerHTML = "Mark as Done";
        array[index].check = false;
        array[index].edit = true;
        tii.parentNode.getElementsByClassName('edit-btn')[0].removeAttribute('disabled');
    }
    set_();
}


function delit(tis) {
    tis.parentNode.parentNode.parentNode.removeChild(tis.parentNode.parentNode);
    var index = tis.parentNode.parentNode.getAttribute("index");
    for (var i = 0; i < array.length; i++) {
        if (i == index) {
            array.splice(i, 1);
            console.log(array.text);
            set_();
            break;
        }
    }
    generator();
}


function edit(tiss) {
    tiss.previousSibling.removeAttribute("disabled");
    var nb = document.createElement('button');
    tiss.parentNode.getElementsByClassName('cur')[0].focus();
    if (document.getElementById('btnn') == undefined) {
        nb.setAttribute("id", "btnn");
        nb.innerHTML = "Done";
        var index = tiss.parentNode.parentNode.getAttribute("index");
        var newdata = {
            text: "",
            check: array[index].check
        };

        function editbtn(){
            tiss.parentNode.getElementsByClassName('cur')[0].setAttribute("disabled", "disabled");
            nb.parentNode.getElementsByClassName('mark')[0].removeAttribute('disabled');
            nb.parentNode.removeChild(nb);
            newdata.text = tiss.parentNode.getElementsByClassName('cur')[0].value;
            array.splice(index, 1, newdata);
            set_();
            generator();
        }
        
        tiss.parentNode.getElementsByClassName('cur')[0].addEventListener('keypress',function(e){
            if(e.keyCode === 13)
            editbtn();
        });
        nb.addEventListener("click", function () {
            editbtn();
        });
        tiss.parentNode.appendChild(nb);
    }  
}


function todo() {
    var todo = {
        text: "",
        check: false,
        edit: false
    };
    todo.text = document.getElementById("task").value;
    if (todo.text != "" && todo.text != null && todo.text != undefined) {
        array.push(todo);
        set_();
        generator();
    }
}


document.getElementById("task").addEventListener("keypress", function (e) {
      if(e.keyCode === 13){
          todo();
      }
});


document.getElementById('add').addEventListener('click',function(){
    todo();
});
// for(var i=0;i<ggp.length;i++);
// function fn(cb){
//     setTimeout(function(){
//         //
//         //
//         //
//         cb(false);
//     }, 3000)


// }

// fn(function(isExists){

//     alert("dsa")
// })

// document.getElementById("btn").addEventListener('click', function(){
//     alert("clicked");
// });
// alert("here");

// function fn(a){
//     return function(){
//         return function(){
//             alert(a)
//         }
//     }
// }

// var b = fn(2);

// var a = function (i) 
//     {
//         return function() 
//         {
//             console.log(i);
//         };
//     }
// for (var i = 0; i < 10; i++) 
// {
//     // function fn(val){
//     //     setTimeout(function(){
//     //         console.log(val);
//     //     }, 1000);
//     // }
//     // fn(i);

//     (function (val){
//         setTimeout(function(){
//             console.log(val);
//         }, 1000);
//     })(i);
//     // setTimeout(a(i)(), 1000);
// }