const localization_json = {
    "pt":{
        "when": "Quando?",
        "where": "Onde?",
        "why": "Porquê?",
        "title": "A Vera e o João vão casar...",
        "when-date1": "4 de Novembro de 2023 (sábado), pelas 11:00",
        "when-date2": "Adicionem ao vosso calendário ",
        "when-date3": "A festa é daqui a",
        "when-days": "dias",
        "when-hours": "horas",
        "when-minutes": "minutos",
        "when-seconds": "segundos",
        "where-ceremony1": "1. Igreja Santa Maria de Loures",
        "where-ceremony2": "Cerimónia (onde tudo começa)",
        "where-reception1": "2. Casa de Reguengos, Malveira",
        "where-reception2": "Receção (onde tudo pode acontecer...)",
        "why-description": "Basicamente, porque o João pediu a Vera em casamento e ela disse que \"Sim\"... podia ter sido ao contrário, mas foi assim que aconteceu.",
        "contribute": "🎁 Como ajudar os pombinhos a levantar voo?",
        "contribute-description": "Podem fazer o vosso contributo utilizando qualquer uma das seguintes formas (transferência bancária, MBWAY ou Revolut), quer para a Vera ou para o João.",
        "thanks": "Muito obrigado e vemo-nos em Novembro 🥳",
        "message": "Deixa uma mensagem aos noivos"
    },
    "en": {
        "when": "When?",
        "where": "Where?",
        "why": "Why?",
        "title": "Vera and João are getting married...",
        "when-date1": "November 4, 2023 (Saturday) at 11:00 am",
        "when-date2": "Add to your calendar ",
        "when-date3": "The party starts in",
        "when-days": "days",
        "when-hours": "hours",
        "when-minutes": "minutes",
        "when-seconds": "seconds",
        "where-ceremony1": "1. Igreja Santa Maria de Loures",
        "where-ceremony2": "Wedding Ceremony (where the real deal happens)",
        "where-reception1": "2. Casa de Reguengos, Malveira",
        "where-reception2": "Wedding reception (the reason why people go)",
        "why-description": "Mainly, because João proposed to Vera and she said \"Yes\"... I think that's the reason.",
        "contribute": "🎁 Contribute to this life long endeavor",
        "contribute-description": "You can contribute using the following methods (bank transfer, MBWAY or Revolut) either to Vera or to João.",
        "thanks": "Thank you so much and see you in November 🥳",
        "message": "Leave a message to our lovebirds"
    }
};

const google_calendar_event = "https://www.google.com/calendar/render?action=TEMPLATE&text=Casamento%20Vera%20⚮%20João&dates=20231104T110000/20231104T110000&details=Wedding%20Vera%20⚮%20João&location=Igreja%20de%20Santa%20Maria%20de%20Loures,%20R.%20Fria%201,%202670%20Loures,%20Portugal&sf=true&output=xml"


function translate(locale) {
    banana.setLocale(locale);

    var localizable_elements = document.querySelectorAll("[id^='banana-i18n-']");
    localizable_elements.forEach(le => {
        le.innerHTML = banana.i18n(le.dataset.i18n);  // a property data-<something> in HTML is accessible as dataset.<something>
    })
}

// initialize webpage localization
const banana = new Banana("pt");
banana.load(localization_json, banana.locale);
let localizable_elements = document.querySelectorAll("[id^='banana-i18n-']");
localizable_elements.forEach(le => {
    le.innerHTML = banana.i18n(le.dataset.i18n);  // a property data-<something> in HTML is accessible as dataset.<something>
});

// add function to language flag icons
let language_flag_elements = document.querySelectorAll("[id^='language-flag-']");
language_flag_elements.forEach(lfe => {
    lfe.addEventListener('click', () => {
        translate(lfe.dataset.lang);
    });
});


// Calendar
function drawCalendar(year, month, event_year, event_month, event_day) {
    var month_list = ['JAN', 'FEB','MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var weekday_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var year_div = document.getElementById("calendar-year");
    var month_div = document.getElementById("calendar-month");
    year_div.innerHTML = year;
    month_div.innerHTML = month_list[month]; 

    var firstDayOfMonth = new Date(year,month, 1);
    var month_firstday_weekday = firstDayOfMonth.getDay();  // weekday from 0-6
    
    var i = 0;
    var calendar_content_div = document.getElementById("calendar-content");
    calendar_content_div.innerHTML = "";  // remove all prior content

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        i = 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        i = 30;
    }else if ((year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) {
        i = 29;
    } else {
        i = 28;
    }

    // weekday names row
    for(let j = 0; j < 7; j ++) {
        var node = document.createElement("DIV");
        var textnode = document.createTextNode(weekday_list[j]);
        node.appendChild(textnode);
        node.className = "calendar-weekday";
        calendar_content_div.appendChild(node);
    }

    // empty until finding the weekday name for the first day of the month
    for(let j = 0; j < month_firstday_weekday; j ++) {
        var node = document.createElement("DIV");
        var textnode = document.createTextNode('');
        node.appendChild(textnode);
        node.className = "calendar-weekday";
        calendar_content_div.appendChild(node);
    }

    // each day of the month
    for (let j = 1; j <= i; j ++) {
        var node = document.createElement("DIV");
        var a_el = document.createElement("a");
        a_el.textContent = j;
        node.appendChild(a_el);
        node.className = "calendar-weekday";
        calendar_content_div.appendChild(node);
        
        if (j === event_day && month == event_month && year == event_year) {
            wedding_day_div = document.getElementsByClassName("calendar-weekday")[j + 6 + month_firstday_weekday];
            wedding_day_div.style.color = "white";
            wedding_day_div.style.background = "rgb(10, 97, 107)";
            wedding_day_div.firstElementChild.href = google_calendar_event;
            wedding_day_div.firstElementChild.target = "_blank";
        }
    }   
}

var calendar_year = 2023;
var calendar_month = 10;
var event_year = 2023;
var event_month = 10;
var event_day = 4;

/* About modulo function in JS:
Note that while in most languages, '%' is a remainder operator, in some (e.g. Python, Perl) it is a modulo operator. 
Modulo is defined as k := n - d * q where q is the integer such that k has the same sign as the divisor d while being as close to 0 as possible. 
For two values of the same sign, the two are equivalent, but when the operands are of different signs, 
the modulo result always has the same sign as the divisor, while the remainder has the same sign as the dividend, 
which can make them differ by one unit of d. To obtain a modulo in JavaScript, in place of n % d, use ((n % d) + d) % d. 
In JavaScript, the modulo operation (which doesn't have a dedicated operator) is used to normalize the second operand of bitwise shift operators (<<, >>, etc.), 
making the offset always a positive value.*/

function prevShow() {
    calendar_month = (((calendar_month - 1) % 12) + 12) % 12;  // using modulo trick to be inside the array boundaries
    if (calendar_month === 11) {
        calendar_year -= 1;  // not checking year limits
    }
    console.log(calendar_month);
    drawCalendar(calendar_year, calendar_month, event_year, event_month, event_day);
}

function nextShow() {
    calendar_month = (((calendar_month + 1) % 12) + 12) % 12; // using modulo trick to be inside the array boundaries
    if (calendar_month === 0) {
        calendar_year += 1;  // not checking year limits
    }
    console.log(calendar_month);
    drawCalendar(calendar_year, calendar_month, event_year, event_month, event_day);
}

var prevMonth = document.getElementById("calendar-prev");
var nextMonth = document.getElementById("calendar-next");
prevMonth.addEventListener("click", prevShow);
nextMonth.addEventListener("click", nextShow);

drawCalendar(calendar_year, calendar_month, event_year, event_month, event_day);

// Calendar countdown
// Set the date we're counting down to
var countDownDate = new Date("Nov 4, 2023 11:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("countdown-days").innerText = days;
    document.getElementById("countdown-hours").innerText = hours;
    document.getElementById("countdown-minutes").innerText = minutes;
    document.getElementById("countdown-seconds").innerText = seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);


// map
var map = L.map('map').setView([38.934, -9.2], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var cerimony_icon = L.icon({
    iconUrl: 'res/map-icon-ring2.png',
    iconSize:     [96, 96], // size of the icon
    iconAnchor:   [48, 96], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var reception_icon = L.icon({
    iconUrl: 'res/map-icon-reception2.png',
    iconSize:     [96, 96], // size of the icon
    iconAnchor:   [48, 96], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var cerimony_marker = L.marker([38.83275398893602, -9.179308350887382], {icon: cerimony_icon}).addTo(map);
var reception_marker = L.marker([38.988585479036466, -9.250638393146573], {icon: reception_icon}).addTo(map);
cerimony_marker.bindPopup('<a href="https://goo.gl/maps/zGdJjaaADsWEmQLP6" target="_blank">Igreja de Santa Maria de Loures 🡕</a>');
reception_marker.bindPopup('<a href="https://goo.gl/maps/7NkeoRprgBF2rApQ9" target="_blank">Casa de Reguengos 🡕</a>');


// parallax effect
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;

    const layer1_scale = 1 + scrollTop * 0.0004; // Adjust scale factor
    const layer1_xPos = scrollTop * 0.005;

    const layer2_scale = 1 + scrollTop * 0.0007; // Adjust scale factor
    const layer2_xPos = -scrollTop * 0.008;

    const layer4_scale = 1 + scrollTop * 0.0005; // Adjust scale factor
    const layer4_yPos = -scrollTop * 0.002;

    layer1.style.transform = `scale(${layer1_scale}) translateX(${layer1_xPos}px)`;
    layer2.style.transform = `scale(${layer2_scale}) translateX(${layer2_xPos}px)`;
    layer4.style.transform = `scale(${layer4_scale}) translateY(${layer4_yPos}px)`;
});


// background fade-in fade-out
const background_change_el = document.querySelectorAll('.background-change');

document.addEventListener('scroll', () => {
    background_change_el.forEach(el => {
        if(el.getBoundingClientRect().top <= (document.body.scrollTop + window.innerHeight * 0.8)) {
            document.body.style.background = el.dataset.bgcolor;
        }
    })
});

// navbar background color change
const navbar_change_el = document.querySelectorAll('.navbar-change');

document.addEventListener('scroll', () => {
    navbar_change_el.forEach(el => {
        if(el.getBoundingClientRect().top <= document.body.scrollTop) {
            const navbar = document.getElementById('nb');
            navbar.style.background = el.dataset.nbcolor;
        }
    })
});

// copy IBAN to clipboard
function copyIbanToClipboard(el) {
    navigator.clipboard.writeText(el.dataset.iban);
    // alert("IBAN copied to clipboard");
}

var iban_vera = document.getElementById("iban-vera");
var iban_bits = document.getElementById("iban-bits");
iban_vera.addEventListener("click", copyIbanToClipboard.bind(null, iban_vera));
iban_bits.addEventListener("click", copyIbanToClipboard.bind(null, iban_bits));
