// Validate company name
function convertDates(dateString) {
    let day, month, year;
    let answer = dateString.split('-');

    // Day
    day = answer[0];

    // Month
    switch (answer[1]) {
        case "JAN":
            month = 01;
            break;
        case "FEB":
            month = 02;
            break;
        case "MAR":
            month = 03;
            break;
        case "APR":
            month = 04;
            break;
        case "MAY":
            month = 05;
            break;
        case "JUN":
            month = 06;
            break;
        case "JUL":
            month = 07;
            break;
        case "AUG":
            month = 08;
            break;
        case "SEP":
            month = 09;
            break;
        case "OCT":
            month = 10;
            break;
        case "NOV":
            month = 11;
            break;
        case "DEC":
            month = 12;
            break;
    }

    // Year
    year = "20" + answer[2];

    return new Date(`${year}-${month}-${day}`);
}

module.exports = {
    convertDates
}