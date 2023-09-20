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
    
    console.log("setup table" + i)
    console.log($(projectList).last()[0].name)

    var row = $('<tr><td id="' + i + '" scope="row">' +
        $(projectList).last()[0].name +
        '</td><td>' + $(projectList).last()[0].type +
        '</td><td>' + $(projectList).last()[0].date +
        '</td></tr>')
        var th = $('<th><button class="del-btn">delete</button></th>')
        
        row.append(th)
        table_body.append(row)

        th.on('click', removeEl)
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
                alert("Please select a project type")
                break;
        }

        var project = {
            name: project_name.val(),
            type: type,
            date: due_date.val(),
            number: i
        }
        projectList.push(project)
        i += 10
        setup_table()

    } else {
        alert("please check your " + 
        "answers and try again") // not entered correctly
        return;
    }
    
    
    localStorage.setItem('projects', JSON.stringify($(projectList)))
})
var i;
$( function retrieveProjects(){
    i = 0;
    var id = 0;
    if(localStorage.getItem('projects')){ // if it exists
        var array = JSON.parse(localStorage.getItem('projects'))

        for (f=0;f<array.length;f++){ // populate projectList[]
            // console.log(array[f].number)
            projectList.push(array[f])
            projectList[f].number = i;
            

            console.log(i)
        
            var row = $('<tr id="' + i + '"><td sfope="row">' +
            projectList[f].name +
            '</td><td>' + projectList[f].type +
            '</td><td>' + projectList[f].date +
            '</td></tr>')
            var th = $('<th><button class="del-btn">delete</button></th>')
            
            row.append(th)
            table_body.append(row)

            th.on('click', removeEl)

            i += 10
        }

    } else { // if doesnt exist
    }
})
var list = []
function removeEl(e){

    var array = JSON.parse(localStorage.getItem('projects')) // remove from localStorage
    
    // projectList = $(array).splice(($(this).parent().children()[0].id)-1, 1)
    localStorage.setItem('projects', JSON.stringify($(projectList)))

    if (projectList.length < 2) {
        list = []
        localStorage.clear()
        projectList = list
    } else {
        // remove item at that index
        // projectList.splice(($(this).nextChild().id)/10, 1)
        // update local storage
        // localStorage.setItem("projects", JSON.stringify(projectList))
    }



    var target = $(e.target).parent().parent() // remove from UI
    target.remove()
    
    
    i = i-10
}
