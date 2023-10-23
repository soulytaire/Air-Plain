function fetchTemperature(cityName) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var obj = JSON.parse(req.responseText);
            document.getElementById("curtemp").innerHTML = obj.main.temp;
        }
    }
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=[city]&appid=4f944c0231428c0ac6ebf79e36eba04d&units=metric";
    apiUrl = apiUrl.replace("[city]", cityName)

    req.open("get", apiUrl, true);
    req.send();
}

function SetIndexData() {
    var destinations = [
        { price: 50, capital: "Belgrade" },
        { price: 70, capital: "London" },
        { price: 60, capital: "Paris" },
        { price: 45, capital: "Bulgaria" },
        { price: 75, capital: "Vienna" },
        { price: 60, capital: "Seoul" }
    ];

    for (var i = 0; i < destinations.length; i++) {

        document.getElementById("capital" + i).innerHTML = destinations[i].capital;
        document.getElementById("price" + i).innerHTML = destinations[i].price;
        document.getElementById("hrefDest" + i).href = "/destination.html?capital=" + destinations[i].capital;
    }
}

function validateForm() {

    //check the name
    var name = document.getElementById('name');
    if (name.value == '') {
        alert('Please enter your name');
        name.focus();
        return false;
    } else {
        var regExpName = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;
        if (!regExpName.test(name.value)) {
            alert('Name is not in the appropriate form');
            name.focus();
            return false;
        }
    }


    //check the country

    destination("from");
    destination("to");

    //check the date

    var formDate = document.getElementById("date").value;

    if (!(isValidDate(formDate))) {
        alert('Date is incorrect!');
        document.getElementById("date").focus();
        return false;

    }


    //quantity of passengers

    if (!document.getElementById('passengers')) {

        alert('Choose quantity of passengers!');
        document.getElementById('passengers').focus();
        return false;
    }

    //cabin class choice
    var cabin = document.getElementById('cabin');
    console.log(cabin)
    if (cabin.selectedIndex <= 0) {
        alert('Choose cabin!');
        cabin.focus();
        return false;
    }
    //preffered seat
    var seat = document.getElementById('seat');
    console.log(seat)
    if (seat.selectedIndex <= 0) {
        alert('Choose seat!');
        seat.focus();
        return false;
    }

    return true;
}

function destination(place) {
    var destination = document.getElementById(place);
    if (destination.value == '') {
        alert('Please enter country');
        destination.focus();
        return false;
    } else {
        var regExpName = /^[A-Z][a-z]+$/;
        if (!regExpName.test(destination.value)) {
            alert('Country is not in the appropriate form');
            destination.focus();
            return false;
        }
    }
}
function isValidDate(date) {
    var matches = /^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})$/.exec(date);
    if (matches == null) return false;
    var d = matches[3];
    var m = matches[2] - 1;
    var y = matches[1];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
        composedDate.getMonth() == m &&
        composedDate.getFullYear() == y;
}


const forms = document.querySelector(".forms"),
    passShowhide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

passShowhide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let passFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        passFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        });
    })
})
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // preventing form submit
        forms.classList.toggle("show-signup"); //switching to signup
    })
})

function validateFormLogin() {
    var email = document.getElementById('email');
    if (email.value == '') {
        alert('Please enter your name');
        email.focus();
        return false;
    } else {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!validRegex.test(email.value)) {
            alert('Email is not in the appropriate form');
            email.focus();
            return false;
        }
    }
}



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showComplete() {
    var name = getParameterByName('name');
    var from = getParameterByName('from');
    var to = getParameterByName('to');
    var date = getParameterByName('date');
    var passengers = getParameterByName('passengers');
    var seat = getParameterByName('seat');
    var cabin = getParameterByName('cabin');
    if (passengers == '1') {
        passengers += ' ticket';
        seat += ' seat'
    } else {
        passengers += ' tickets';
        seat += ' seats';
    }


    document.getElementById("h1Tag").innerHTML = "Congratulation, " + name;
    document.getElementById("info").innerHTML = `Your flight plans on ${date} from: ${from} to: ${to}. You have booked: ${passengers}. You've chosen the ${seat} in ${cabin} cabin.`;
}

