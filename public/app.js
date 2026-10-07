/* =========================================================
   EMERGENCY ASSISTANCE APP
   COMPLETE APP.JS
========================================================= */


/* =========================================================
   1. PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    // Get all pages
    const pages = document.querySelectorAll(".page");

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Find requested page
    const selectedPage =
        document.getElementById(pageId);

    // Show requested page
    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Move screen to top
    window.scrollTo(0, 0);
}



/* =========================================================
   2. SEND LOGIN OTP
========================================================= */

function sendOTP() {

    const countryCode =
        document.getElementById("countryCode").value;

    const phone =
        document
        .getElementById("phoneNumber")
        .value
        .trim();


    // Check mobile number
    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    // Save phone number
    localStorage.setItem(
        "phoneNumber",
        countryCode + phone
    );


    // Open OTP page
    showPage("otpPage");


    /*
       TEMPORARY DEVELOPMENT OTP

       Later this will be replaced
       with Firebase real OTP.
    */

    alert(
        "Testing OTP is: 123456"
    );
}



/* =========================================================
   3. VERIFY OTP
========================================================= */

function verifyOTP() {

    const otp =
        document
        .getElementById("otp")
        .value
        .trim();


    // Check OTP
    if (otp !== "123456") {

        alert(
            "Incorrect OTP. Please enter 123456."
        );

        return;
    }


    // Save login status
    localStorage.setItem(
        "verified",
        "true"
    );


    // Get phone number
    const phone =
        localStorage.getItem(
            "phoneNumber"
        );


    // Display user phone on dashboard
    const userName =
        document.getElementById(
            "userName"
        );


    if (userName) {

        userName.innerText =
            phone || "User";

    }


    // Go to dashboard
    showPage("dashboardPage");
}



/* =========================================================
   4. LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        "verified"
    );

    showPage(
        "loginPage"
    );
}



/* =========================================================
   5. SAVE TWO EMERGENCY CONTACTS
========================================================= */

function saveContacts() {

    // Contact 1
    const name1 =
        document
        .getElementById("contact1Name")
        .value
        .trim();


    const number1 =
        document
        .getElementById("contact1Number")
        .value
        .trim();


    // Contact 2
    const name2 =
        document
        .getElementById("contact2Name")
        .value
        .trim();


    const number2 =
        document
        .getElementById("contact2Number")
        .value
        .trim();


    // Validate Contact 1
    if (
        name1 === "" ||
        !/^[0-9]{10}$/.test(number1)
    ) {

        alert(
            "Please enter a valid name and 10 digit number for Contact 1."
        );

        return;
    }


    // Validate Contact 2
    if (
        name2 === "" ||
        !/^[0-9]{10}$/.test(number2)
    ) {

        alert(
            "Please enter a valid name and 10 digit number for Contact 2."
        );

        return;
    }


    // Save Contact 1
    localStorage.setItem(
        "contact1Name",
        name1
    );

    localStorage.setItem(
        "contact1Number",
        number1
    );


    // Save Contact 2
    localStorage.setItem(
        "contact2Name",
        name2
    );

    localStorage.setItem(
        "contact2Number",
        number2
    );


    alert(
        "Both emergency contacts saved successfully."
    );


    // Return to dashboard
    showPage(
        "dashboardPage"
    );
}



/* =========================================================
   6. SAVE MEDICAL CARD
========================================================= */

function saveMedicalCard() {

    const name =
        document
        .getElementById("medicalName")
        .value
        .trim();


    const age =
        document
        .getElementById("medicalAge")
        .value
        .trim();


    const gender =
        document
        .getElementById("medicalGender")
        .value;


    const blood =
        document
        .getElementById("bloodGroup")
        .value;


    const allergies =
        document
        .getElementById("allergies")
        .value
        .trim();


    const conditions =
        document
        .getElementById("conditions")
        .value
        .trim();


    const medicines =
        document
        .getElementById("medicines")
        .value
        .trim();


    // Required fields
    if (
        name === "" ||
        age === "" ||
        gender === "" ||
        blood === ""
    ) {

        alert(
            "Please fill Name, Age, Gender and Blood Group."
        );

        return;
    }


    // Save medical information
    localStorage.setItem(
        "medicalName",
        name
    );

    localStorage.setItem(
        "medicalAge",
        age
    );

    localStorage.setItem(
        "medicalGender",
        gender
    );

    localStorage.setItem(
        "bloodGroup",
        blood
    );

    localStorage.setItem(
        "allergies",
        allergies
    );

    localStorage.setItem(
        "conditions",
        conditions
    );

    localStorage.setItem(
        "medicines",
        medicines
    );


    alert(
        "Medical card saved successfully."
    );


    // Return to dashboard
    showPage(
        "dashboardPage"
    );
}



/* =========================================================
   7. GET CURRENT LOCATION
========================================================= */

function getLocation() {

    const result =
        document.getElementById(
            "resultText"
        );


    // Show loading message
    result.innerHTML = `
        📍 <b>Getting your current location...</b>
        <br><br>
        Please allow location permission.
    `;


    // Check browser GPS support
    if (!navigator.geolocation) {

        result.innerHTML = `
            ❌ Location is not supported
            by this browser.
        `;

        return;
    }


    // Get GPS
    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            // Google Maps location
            const locationURL =
                `https://www.google.com/maps?q=${latitude},${longitude}`;


            // Display location
            result.innerHTML = `

                📍 <b>YOUR CURRENT LOCATION</b>

                <br><br>

                Latitude:
                ${latitude}

                <br>

                Longitude:
                ${longitude}

                <br><br>

                <a
                    href="${locationURL}"
                    target="_blank"
                >
                    🗺️ OPEN MY LOCATION IN MAPS
                </a>

            `;

        },


        function(error) {

            console.log(error);


            result.innerHTML = `

                ❌ <b>Unable to get location.</b>

                <br><br>

                Please allow location permission
                in your browser.

            `;

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
}



/* =========================================================
   8. FIND NEARBY HOSPITALS
========================================================= */

function findHospital() {

    const result =
        document.getElementById(
            "resultText"
        );


    result.innerHTML = `

        🏥 <b>Finding nearby hospitals...</b>

        <br><br>

        Getting your location...

    `;


    // Check GPS
    if (!navigator.geolocation) {

        result.innerHTML =
            "❌ Location is not supported.";

        return;
    }


    // Get location
    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            /*
               Google Maps hospital search
               around current coordinates.
            */

            const hospitalURL =
                `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;


            result.innerHTML = `

                🏥 <b>NEARBY HOSPITALS</b>

                <br><br>

                📍 Your current location:

                <br>

                ${latitude},
                ${longitude}

                <br><br>

                <a
                    href="${hospitalURL}"
                    target="_blank"
                >
                    🏥 FIND HOSPITALS NEAR ME
                </a>

            `;

        },


        function(error) {

            console.log(error);


            result.innerHTML = `

                ❌ <b>Location permission required.</b>

                <br><br>

                Please allow location access
                and try again.

            `;

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
}



/* =========================================================
   9. SOS FUNCTION
========================================================= */

function startSOS() {

    const result =
        document.getElementById(
            "resultText"
        );


    /*
       GET TWO EMERGENCY CONTACTS
    */

    const name1 =
        localStorage.getItem(
            "contact1Name"
        );


    const number1 =
        localStorage.getItem(
            "contact1Number"
        );


    const name2 =
        localStorage.getItem(
            "contact2Name"
        );


    const number2 =
        localStorage.getItem(
            "contact2Number"
        );


    /*
       CHECK CONTACTS
    */

    if (
        !name1 ||
        !number1 ||
        !name2 ||
        !number2
    ) {

        result.innerHTML = `

            ⚠️ <b>Emergency contacts not configured.</b>

            <br><br>

            Please add exactly 2 emergency
            contacts before using SOS.

            <br><br>

            <button
                onclick="showPage('contactsPage')"
                class="primary-button"
            >
                👥 ADD EMERGENCY CONTACTS
            </button>

        `;

        return;
    }


    /*
       SHOW SOS STATUS
    */

    result.innerHTML = `

        🚨 <b>EMERGENCY SOS ACTIVATED</b>

        <br><br>

        📍 Getting your current location...

    `;


    /*
       CHECK GPS
    */

    if (!navigator.geolocation) {

        result.innerHTML = `

            ❌ Location is not supported
            by this browser.

        `;

        return;
    }


    /*
       GET GPS
    */

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            /*
               CREATE GOOGLE MAPS LOCATION
            */

            const locationURL =
                `https://www.google.com/maps?q=${latitude},${longitude}`;


            /*
               CREATE EMERGENCY MESSAGE
            */

            const message =
                `🚨 EMERGENCY! I need help. ` +
                `Please contact me immediately. ` +
                `My current location is: ` +
                `${locationURL}`;


            /*
               Encode message for SMS
            */

            const encodedMessage =
                encodeURIComponent(
                    message
                );


            /*
               HOSPITAL SEARCH
            */

            const hospitalURL =
                `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;


            /*
               DISPLAY SOS INFORMATION
            */

            result.innerHTML = `

                <div class="emergency-result">

                    <h3>
                        🚨 EMERGENCY SOS ACTIVATED
                    </h3>


                    <p>
                        📍 <b>Location found</b>
                    </p>


                    <p>
                        Latitude:
                        ${latitude}
                    </p>


                    <p>
                        Longitude:
                        ${longitude}
                    </p>


                    <hr>


                    <!-- CONTACT 1 -->

                    <h4>
                        👤 ${name1}
                    </h4>


                    <a
                        class="emergency-action"
                        href="tel:${number1}"
                    >
                        📞 CALL ${name1}
                    </a>


                    <a
                        class="emergency-action"
                        href="sms:${number1}?body=${encodedMessage}"
                    >
                        💬 SEND EMERGENCY MESSAGE
                    </a>


                    <hr>


                    <!-- CONTACT 2 -->

                    <h4>
                        👤 ${name2}
                    </h4>


                    <a
                        class="emergency-action"
                        href="tel:${number2}"
                    >
                        📞 CALL ${name2}
                    </a>


                    <a
                        class="emergency-action"
                        href="sms:${number2}?body=${encodedMessage}"
                    >
                        💬 SEND EMERGENCY MESSAGE
                    </a>


                    <hr>


                    <!-- LOCATION -->

                    <a
                        class="emergency-action location-action"
                        href="${locationURL}"
                        target="_blank"
                    >
                        📍 OPEN MY LOCATION
                    </a>


                    <!-- HOSPITAL -->

                    <a
                        class="emergency-action hospital-action"
                        href="${hospitalURL}"
                        target="_blank"
                    >
                        🏥 FIND NEARBY HOSPITAL
                    </a>

                </div>

            `;


            /*
               REQUEST NOTIFICATION PERMISSION
            */

            requestNotification();


            /*
               NOTE:

               Browser cannot silently call or
               send SMS without user interaction.

               We therefore provide Call and SMS
               buttons.
            */

        },


        function(error) {

            console.log(error);


            result.innerHTML = `

                🚨 <b>EMERGENCY SOS ACTIVATED</b>

                <br><br>

                ❌ We could not get your location.

                <br><br>

                Please allow location permission
                and press SOS again.

                <br><br>

                <a
                    class="emergency-action"
                    href="tel:${number1}"
                >
                    📞 CALL ${name1}
                </a>

            `;

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
}



/* =========================================================
   10. BROWSER NOTIFICATION
========================================================= */

function requestNotification() {

    /*
       Check whether notifications
       are supported.
    */

    if (
        !("Notification" in window)
    ) {

        return;
    }


    /*
       Ask permission
    */

    if (
        Notification.permission === "default"
    ) {

        Notification.requestPermission()
            .then(function(permission) {

                if (
                    permission === "granted"
                ) {

                    showEmergencyNotification();

                }

            });

    }


    else if (
        Notification.permission === "granted"
    ) {

        showEmergencyNotification();

    }

}



/* =========================================================
   11. SHOW EMERGENCY NOTIFICATION
========================================================= */

function showEmergencyNotification() {

    new Notification(
        "🚨 Emergency SOS",
        {
            body:
                "Emergency SOS has been activated. Location and emergency contacts are ready."
        }
    );

}



/* =========================================================
   12. LOAD SAVED INFORMATION
========================================================= */

function loadSavedData() {

    /*
       CONTACT 1
    */

    const contact1Name =
        document.getElementById(
            "contact1Name"
        );


    const contact1Number =
        document.getElementById(
            "contact1Number"
        );


    if (contact1Name) {

        contact1Name.value =
            localStorage.getItem(
                "contact1Name"
            ) || "";

    }


    if (contact1Number) {

        contact1Number.value =
            localStorage.getItem(
                "contact1Number"
            ) || "";

    }


    /*
       CONTACT 2
    */

    const contact2Name =
        document.getElementById(
            "contact2Name"
        );


    const contact2Number =
        document.getElementById(
            "contact2Number"
        );


    if (contact2Name) {

        contact2Name.value =
            localStorage.getItem(
                "contact2Name"
            ) || "";

    }


    if (contact2Number) {

        contact2Number.value =
            localStorage.getItem(
                "contact2Number"
            ) || "";

    }


    /*
       MEDICAL NAME
    */

    const medicalName =
        document.getElementById(
            "medicalName"
        );


    if (medicalName) {

        medicalName.value =
            localStorage.getItem(
                "medicalName"
            ) || "";

    }


    /*
       MEDICAL AGE
    */

    const medicalAge =
        document.getElementById(
            "medicalAge"
        );


    if (medicalAge) {

        medicalAge.value =
            localStorage.getItem(
                "medicalAge"
            ) || "";

    }


    /*
       GENDER
    */

    const medicalGender =
        document.getElementById(
            "medicalGender"
        );


    if (medicalGender) {

        medicalGender.value =
            localStorage.getItem(
                "medicalGender"
            ) || "";

    }


    /*
       BLOOD GROUP
    */

    const bloodGroup =
        document.getElementById(
            "bloodGroup"
        );


    if (bloodGroup) {

        bloodGroup.value =
            localStorage.getItem(
                "bloodGroup"
            ) || "";

    }


    /*
       ALLERGIES
    */

    const allergies =
        document.getElementById(
            "allergies"
        );


    if (allergies) {

        allergies.value =
            localStorage.getItem(
                "allergies"
            ) || "";

    }


    /*
       CONDITIONS
    */

    const conditions =
        document.getElementById(
            "conditions"
        );


    if (conditions) {

        conditions.value =
            localStorage.getItem(
                "conditions"
            ) || "";

    }


    /*
       MEDICINES
    */

    const medicines =
        document.getElementById(
            "medicines"
        );


    if (medicines) {

        medicines.value =
            localStorage.getItem(
                "medicines"
            ) || "";

    }

}



/* =========================================================
   13. START APPLICATION
========================================================= */

window.onload = function() {

    /*
       Load previously saved data
    */

    loadSavedData();


    /*
       Check whether user already verified
    */

    const verified =
        localStorage.getItem(
            "verified"
        );


    if (
        verified === "true"
    ) {

        /*
           User already logged in
        */

        const phone =
            localStorage.getItem(
                "phoneNumber"
            );


        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.innerText =
                phone || "User";

        }


        showPage(
            "dashboardPage"
        );

    }

    else {

        /*
           New user
        */

        showPage(
            "loginPage"
        );

    }

};