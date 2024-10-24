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
                console.log("Response Text: ", xmlhttp.responseText);  // Debugging line
                try {
                    var resultData = JSON.parse(xmlhttp.responseText);  // Try to parse JSON
                    if (resultData !== false) {
                        getBasicDetails(stype, resultData[0]['id'], '');
                        var selectdropdown = document.createElement("select");
                        selectdropdown.id = "select" + stype + "_code";
                        if (selectdropdown.attachEvent) {
                            selectdropdown.attachEvent("onchange", function() { selectdropdownHandler(stype, 'code'); });
                        } else {
                            selectdropdown.addEventListener("change", function() { selectdropdownHandler(stype, 'code'); });
                        }
                        var selectdropdown2 = document.createElement("select");
                        selectdropdown2.id = "select" + stype + "_name";
                        if (selectdropdown2.attachEvent) {
                            selectdropdown2.attachEvent("onchange", function() { selectdropdownHandler(stype, 'name'); });
                        } else {
                            selectdropdown2.addEventListener("change", function() { selectdropdownHandler(stype, 'name'); });
                        }
                        var txtCode = document.getElementById("txt" + stype + "_code");
                        var txtName = document.getElementById("txt" + stype + "_name");
                        if (txtCode && txtName) {
                            txtCode.parentNode.replaceChild(selectdropdown, txtCode);
                            txtName.parentNode.replaceChild(selectdropdown2, txtName);
                        }
                        var resetButton = document.getElementById(stype + "_reset");
                        if (resetButton) {
                            resetButton.style.display = "block";
                        }
                        for (var i = 0; i < resultData.length; i++) {
                            var option1 = document.createElement("option");
                            option1.value = resultData[i].id;
                            option1.text = resultData[i].id;
                            selectdropdown.appendChild(option1);
                            var option2 = document.createElement("option");
                            option2.value = resultData[i].id;
                            option2.text = resultData[i].name;
                            selectdropdown2.appendChild(option2);
                        }
                        var subgroup = document.getElementById('subgroupname_id');
                        if (subgroup) {
                            subgroup.appendChild(selectdropdown);
                            subgroup.appendChild(selectdropdown2);
                        }
                        var loadingWrap = document.getElementById('loading_wrap');
                        if (loadingWrap) {
                            loadingWrap.style.display = 'none';  // Only execute if the element exists
                        }
                    } else {
                        alert("No match found.");
                    }
                } catch (e) {
                    console.error("JSON parsing error: ", e);
                    alert("Error in response format.");
                }
            } else {
                alert("Request failed with status: " + xmlhttp.status);
            }
        }
    };

    xmlhttp.open("POST", "dbe_cfl_ModifyCurrency_Save.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
}
