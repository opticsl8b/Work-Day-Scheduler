// Function displays current time

// display time instanly when page is loaded
var timeEl = $("#currentDay");
timeEl.text(moment().format("MMM Do YYYY,h:mm:ss a"))

// update timer every second
setInterval(function() {
    timeEl.text(moment().format("MMM Do YYYY,h:mm:ss a"));
}, 1000);

// Generate all the timeblock rows when page loads

var timeBlock = $(".timeblock");

function createRow(workHours) {

    //  Row structure
    //     <div class="row">
    //         <!-- time -->
    //         <div class="col-2"><span>9AM</span>Time</div>
    //         <!-- textarea -->
    //         <div class="col-8"><textarea cols="30" rows="10"></textarea></div>
    //         <!-- save button -->
    //         <div class="col-2"><button class="btn-main"><i class="fas fa-archive"></i></button></div>
    //     </div>

    // create a div with class "row"
    var row = $("<div>").attr("class", "row");
    // create a div with class "col-2"
    var timeCol = $("<div>").attr("class", "col-2");
    // create a span with "time:00" text
    var timeSpan = $("<span>").text(workHours + ":00");
    // display the content
    timeCol.append(timeSpan);
    row.append(timeCol);

    // resposive color
    // select current time
    var timeNow = moment();

    var isPast = workHours < Number(timeNow.format("H"));
    var isNow = workHours >= Number(timeNow.format("H")) && workHours < Number(timeNow.format("H") + 1);
    var isFuture = workHours > Number(timeNow.format("H"));

    var cssClass;

    if (isPast) { cssClass = 'past' };
    if (isNow) { cssClass = 'present' };
    if (isFuture) { cssClass = 'future' };

    // create a div with class "col-8"
    var textCol = $("<div>").attr("class", "col-8 " + cssClass);
    // create textarea 
    var textArea = $("<textarea>").attr("class", cssClass);

    // Check if there's any exisiting content in Local storage
    var exisitingContent = localStorage.getItem(workHours + ":00");
    // display corresponding content into textarea
    if (exisitingContent) {
        textArea.val(exisitingContent);
    }

    // display the content
    textCol.append(textArea);
    row.append(textCol);

    // create a div with class "col-2"
    var btnCol = $("<div>").attr("class", "col-2");
    // create a button with class "button-main"
    var buttonMain = $("<button>").attr("class", "button-main");
    // create a icon with class "fas fa-archive"
    var iconSave = $("<i>").attr({ class: "fas fa-archive", id: "save-icon" });

    buttonMain.append(iconSave);
    btnCol.append(buttonMain);
    row.append(btnCol);

    return row;

}
// generate all work hour time block
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (i = 0; i < workHours.length; i++) {
    var displayHours = workHours[i]
    var rowDisplay = createRow(displayHours);
    timeBlock.append(rowDisplay);
}

// var rowCreate = createRow(10);
// timeBlock.append(rowCreate);


// when the user click on the save button-
$(document).on("click", ".button-main", function(event) {
        // save the content in the current textarea to local storage-

        // 1. grab the content of textarea

        // jqwery button element 
        var jqButton = $(event.target);
        // locate target textarea
        var textEl = jqButton.parent().prev().children();
        // get the value from textarea
        var userInput = textEl.val()
        console.log(userInput);

        // 2. use the time as key of local Storage

        // locate corresponding span elements and its text content
        var timeSpan = jqButton.parent().prev().prev().children();
        var timeSpanText = timeSpan.text();

        // 3. Save

        localStorage.setItem(timeSpanText, userInput);





    }

);





// color background -past, present, future. from CSS

// Display Responsive Time 

// var currenthourEl = moment().format("h");

// var ampmEl = moment().format("A")


// var hourEl = $('.col-2');

// hourEl.text(ampmEl + " " + currenthourEl + ":00");
// console.log(hourEl.value);
// console.log(currenthourEl - 1);

// for (let i = 0; i < hourEl.length; i++) {
//     hourEl[i].text(ampmEl + " " + currenthourEl - 3 + [i] + ":00");

// }



// Add Input


// Save Function