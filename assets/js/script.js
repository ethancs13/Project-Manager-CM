var time_header = $('#time-header')
var project_type = $('#project-type')
var project_name = $('#project-name')
var table_body = document.getElementById('table-body')
var table = $('#table')
var due_date = $('#project-date').datepicker()

var type;

var projectList = []

setInterval(time, 1000)
retrieveProjects()

function time(){
    time_header.text(dayjs().format('MMM, DD YYYY [ : ] HH:mm:ss a'))
}

function retrieveProjects(){
    if(localStorage.getItem('projects')){ // if it exists
        var array = JSON.parse(localStorage.getItem('projects'))

        for (var f=0; f<array.length; f++){ // populate projectList[]

            projectList.push(array[f])
        
            var row = $('<tr><td scope="row">' +
            projectList[f].name +
            '</td><td>' + projectList[f].type +
            '</td><td>' + projectList[f].date +
            '</td></tr>')
            var th = $('<th></th>')
            
            var button = $('<button>delete</button>')
            button.attr('data-index',f)
            button.on('click', removeEl)
        
            th.append(button)
            row.append(th)
            table_body.append(row)
            table_body.sortable()
        }}
}

function setup_table() { // setup last added element in projectList
    var row = $('<tr><td scope="row">' +
        $(projectList).last()[0].name +
        '</td><td>' + $(projectList).last()[0].type +
        '</td><td>' + $(projectList).last()[0].date +
        '</td></tr>')
        var th = $('<th></th>')
        var button = $('<button>delete</button>')
        button.on('click', removeEl)
        
        th.append(button)
        row.append(th)
        table_body.append(row)
}

$('#reg-modal').on('click', '.btn-primary', () => {
    if ((project_name.val()
    &&project_type.val()
    &&due_date.val()) !== ""){ // check to see if they entered all information

        switch (project_type.val()){
            case '1':
                type = 'CSS'
                break;
            case '2':
                type = 'HTML'
                break;
            case '3':
                type = 'JS'
                break;
            case '4':
                type = 'ALL'
                break;
            default:
                alert("Please select a project type.")
                break;
        }

        var project = {
            name: project_name.val(),
            type: type,
            date: due_date.val()
        }
        projectList.push(project)
        setup_table()
        localStorage.setItem('projects', JSON.stringify(projectList))

    } else {
        alert("please check your " + 
        "answers and try again") // not entered correctly
        return;
    }
    
    
    
})


function removeEl(e){

    var array = JSON.parse(localStorage.getItem('projects')) // get from localStorage
    var index = e.target.dataset.index
    projectList.splice(index, 1)

    localStorage.setItem('projects', JSON.stringify(projectList))

    var target = $(e.target).parent().parent() // remove from UI

    table_body[0].innerHTML = ''

    retrieveProjects() 
    
}
