// Polyfill for JSON.parse
if (!window.JSON) {
    window.JSON = {
        parse: function (sJSON) {
            return eval('(' + sJSON + ')'); // Not recommended for production, but works for simple cases
        }
    };
}

function commonsearch(searchType, searchString, searchParam, stype) {
    var xmlhttp;
    if (window.ActiveXObject) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser does not support XMLHTTP.");
                return;
            }
        }
    } else if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        alert("Your browser does not support XMLHTTP.");
        return;
    }

    xmlhttp.onreadystatechange = function () {
        console.log("ReadyState: ", xmlhttp.readyState, " Status: ", xmlhttp.status);
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                console.log("Response Text: ", xmlhttp.responseText); // Debugging line
                try {
                    var resultData = JSON.parse(xmlhttp.responseText); // Try to parse JSON
                    if (resultData !== false) {
                        getBasicDetails(stype, resultData[0]['id'], '');
                        var selectdropdown = document.createElement("select");
                        selectdropdown.id = "select" + stype + "_code";
                        selectdropdown.attachEvent("onclick", function () { selectdropdownHandler(stype, 'code'); });
                        
                        var selectdropdown2 = document.createElement("select");
                        selectdropdown2.id = "select" + stype + "_name";
                        selectdropdown2.attachEvent("onclick", function () { selectdropdownHandler(stype, 'name'); });

                        var txtCode = document.getElementById("txt" + stype + "_code");
                        var txtName = document.getElementById("txt" + stype + "_name");
                        if (txtCode && txtName) {
                            txtCode.parentNode.replaceChild(selectdropdown, txtCode);
                            txtName.parentNode.replaceChild(selectdropdown2, txtName);
                        }
                        var resetButton = document.getElementById("reset" + stype);
                        if (resetButton) {
                            resetButton.attachEvent("onclick", function () { resetHandler(stype); });
                        }
                    } else {
                        alert("Invalid JSON response.");
                    }
                } catch (e) {
                    alert("Error parsing JSON response: " + e.message);
                }
            } else {
                alert("Failed to retrieve data. Status: " + xmlhttp.status);
            }
        }
    };

     xmlhttp.open("POST", "dbe_cfl_ModifyCurrency_Save.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
}

// function getBasicDetails(stype, id, param) {
//     // TO DO: Implement this function
// }

// function selectdropdownHandler(stype, type) {
//     // TO DO: Implement this function
// }

// function resetHandler(stype) {
//     // TO DO: Implement this function
// }
