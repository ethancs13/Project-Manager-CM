var time_header = $('#time-header')
var project_type = $('#project-type')
var project_name = $('#project-name')
var table_body = $('#table-body')
var table = $('#table')
var due_date = $('#project-date').datepicker()

var type;

var projectList = []

setInterval(time, 1000)

function time(){
    time_header.text(dayjs().format('MMM, DD YYYY [ : ] HH:mm:ss a'))
}

function setup_table() {
    
    console.log("setup table")
    var row = 
    $('<tr><td scope="row">' +
    projectList[i].name +
    '</td><td>' + projectList[i].type +
    '</td><td>' + projectList[i].date +
    '</td><td></td></tr>')
    
    var th = $('<th><button class="del-btn">delete</button></h>')

    row.append(th)
    table_body.append(row)
    $('#reg-modal').modal('hide')
}

$('#reg-modal').on('click', '.btn-primary', () => {
    if ((project_name.val()
    &&project_type.val()
    &&due_date.val()) !== ""){ // check to see if they entered all information

        switch (project_type.val()){
            case '1':
                type = 'CSS'
                setup_table()
                break;
            case '2':
                type = 'HTML'
                setup_table()
                break;
            case '3':
                type = 'JS'
                setup_table()
                break;
            case '4':
                type = 'ALL'
                setup_table()
                break;
            default:
                alert("Please select a project type")
                break;
        }
    } else {
        alert("please check your " + 
        "answers and try again") // not entered correctly
        return;
    }
    var project = {
        name: project_name.val(),
        type: type,
        date: due_date.val()
    }
    projectList.push(project)
    localStorage.setItem('projects', JSON.stringify($(projectList)))
})

$( function retrieveProjects(){

    if(localStorage.getItem('projects')){ // if it exists
        var array = JSON.parse(localStorage.getItem('projects'))
        console.log(array)
        

        for (f=0;f<array.length;f++){ // populate projectList[]
            projectList.push(array[f])
        }

    } else { // if doesnt exist

    }

    for (i=0;i<projectList.length;i++){
        
        var row = $('<tr><td scope="row">' +
        projectList[i].name +
        '</td><td>' + projectList[i].type +
        '</td><td>' + projectList[i].date +
        '</td><td></td></tr>')
        var th = $('<th><button class="del-btn">delete</button></h>')

        row.append(th)
        table_body.append(row)
    }
})

var del_btn = $('.del-btn')
del_btn.on('click', () => {
    this.parent().remove()
    console.log("hello")
})