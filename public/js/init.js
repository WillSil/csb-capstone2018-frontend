$.fn.right = function () {
    return $(document).width() - (this.offset().left + this.outerWidth());
};

var createEngagements = 'Engagements_create';
var editEngagements = 'Engagements_edit';
var deleteEngagements = 'Engagements_del';
var createClients = 'Clients_create';
var editClients = 'Clients_edit';
var deleteClients = 'Clients_del';

(function ($) {
    $(function () {
        // Handlebars Templates
        const $body = $('body');

        var headerTemplate = Handlebars.templates["header.hb.html"]();
        $body.prepend(headerTemplate);

        var footerTemplate = Handlebars.templates["footer.hb.html"]();
        $body.append(footerTemplate);

        var progressDialogTemplate = Handlebars.templates["progress-dialog.hb.html"]();
        $('main').append(progressDialogTemplate);

        $(".dropdown-button").dropdown({});
        setUpDropdown();

        $('.modal').modal();

        $('#homeButton').click(function () {
            redirectToHome();
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space


$('#companies').click(function () {
    databaseRedirect();
});

$('#progress').click(function () {
    progressRedirect();
});

$('#mail').click(function () {
    mailRedirect();
});


$('#engagementOne').click(function () {
    engagementRedirect();
});

$('#signout').click(function () {
    signoutRedirect();
});

//I added this
$('#do_something').click(function () {
    webFormRedirect();
});

function redirectToHome() {
    window.location.href = "dailyDigest.html";
}

function progressRedirect() {
    window.location.href = "progressPage.html";
}


function mailRedirect() {
    var win = window.open(href = 'https://mail.google.com/mail/u/?authuser=csb.capstoneprojects@gmail.com', '_blank'); //this opens in a new tab, but we want to pass it an email so she can
    //directly access CSB Email
    win.focus();

}

//I added this
function webFormRedirect() {
    window.location.href = "webForm.html";
}


function databaseRedirect() {
    window.location.href = "companies.html";
}


function engagementRedirect() {
    window.location.href = "engagementPage.html";
}

function signoutRedirect() {
    window.location.href = "index.html";
}


function setUpDropdown() {
    $('.dropdown-content > li > a.dropdown-button').on("mouseover", function () {
        const $menu = $('#' + $(this).attr("data-activates"));

        if ($(this).right() < $menu.width()) {
            $menu.css("margin-left", "-100%");
        } else {
            $menu.css("margin-left", "100%");
        }
    });
}
var x = 'phase one';
var y = 'phase two';
var z = 'phase three';

$('#dropdown2').click(function () {
    statusPhaseOne();
});

function statusPhaseOne() {

    $("#statusButton").text(x);
    $("#companyStatus").text(x);
    $("#engagement1").addClass('redBG');


}

$('#dropdown3').click(function () {
    statusPhaseTwo();
});

function statusPhaseTwo() {

    $("#statusButton").text(y);
    $("#engagement1").addClass('yellowBG');
}

$('#dropdown4').click(function () {
    statusPhaseThree();
});

function statusPhaseThree() {

    $("#statusButton").text(z);
    $("#engagement1").addClass('greenBG');
}

function onEngagementActiveChange(engagementId) {
    var json = {
        isActive: $('#active-' + engagementId).is(":checked")
    };

    doPostRequest("/engagements/edit/" + engagementId, json,
        function () {

            if (json.isActive) {
                Materialize.toast("Engagement is now active");
                $("#active-" + engagementId).closest('.engagementBox').data('status', 'true');
            } else {
                Materialize.toast("Engagement is now inactive");
                $("#active-" + engagementId).closest('.engagementBox').data('status', 'false');
            }
        });

}

function savePhaseForEngagement(engagementId) {

    var json = {
        "child_status_type": $("#eng_" + engagementId.toString()).val()
    };

    console.log($(engagementId).data('eng'));

//        console.log(_url);
    // var formData = JSON.stringify($("#frm_business").serializeArray());
    doPostRequest("/engagements/updateStatus/" + engagementId, json,
        function () {
            Materialize.toast("Phase saved!", 3000);
        });
}

/**
 * @param $pagination jQuery selector for pagination
 * @param $collection jQuery selector for the collection
 * @param pagedList  The pagedList that the server returned, with the data.
 * @param nextPageFunction Function that takes the next/previous index as the parameter.
 */
function createPagination($pagination, $collection, pagedList, nextPageFunction) {
    var numberOfPages;
    if (pagedList.totalItemCount % pagedList.rowCount === 0 && pagedList.totalItemCount !== 0) {
        numberOfPages = pagedList.totalItemCount / pagedList.rowCount;
    } else {
        numberOfPages = parseInt(pagedList.totalItemCount / pagedList.rowCount) + 1;
    }

    $pagination.empty();

    for (var i = 1; i <= numberOfPages; i++) {
        var active = (i === pagedList.currentPage + 1) ? "active" : "waves-effect";
        var html = '<li class="' + active + '"> <a id = "pagination-' + i + '">' + i + '</a></li>';
        $pagination.append(html);

        const nextPage = i - 1;
        $('#pagination-' + i).click(function () {

            nextPageFunction(nextPage);

            $pagination.children().each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).addClass("waves-effect");
                }
            });

            $(this).parent().removeClass("waves-effect");
            $(this).parent().addClass("active");

            $("html, body").animate({scrollTop: 0}, "slow");
        })
    }
}

/**
 * @param rawStringDate A date string, formatted as "mm/dd/yyyy"
 * @return {Number} A UNIX timestamp if the date is valid or -1 otherwise.
 */
function formatDateAsUnixTimestamp(rawStringDate) {
    var dateMoment = moment(rawStringDate, "MM/DD/YYYY");
    if (dateMoment.isValid()) {
        return parseInt(dateMoment.format("x"));
    } else {
        return -1;
    }
}

/**
 * @param rawStringYear A date string, formatted as "yyyy"
 * @return {Number} A UNIX timestamp if the date is valid or -1 otherwise.
 */
function formatYearAsUnixTimestamp(rawStringYear) {
    var dateMoment = moment(rawStringYear, "YYYY");
    if (dateMoment.isValid()) {
        return parseInt(dateMoment.format("x"));
    } else {
        return -1;
    }
}


/**
 * @param unixDate The unix date, parsed as a long
 * @returns {*} The date, formatted as "mm/dd/yyyy" or "Invalid Date" if the date is invalid
 */
function formatUnixDateForUi(unixDate) {
    var dateMoment = moment(parseInt(unixDate), "x");
    if (!dateMoment.isValid()) {
        return "Invalid Date";
    } else {
        return dateMoment.format("MM/DD/YYYY");
    }
}

/**
 * @param unixDate The unix date, parsed as a long
 * @returns {*} The date, formatted as "MM/DD/YYYY at hh:mma" or "Invalid Date" if the date is invalid
 */
function formatUnixDateAndTimeForUi(unixDate) {
    if (!unixDate) {
        return "";
    }

    var dateMoment = moment(parseInt(unixDate), "x");
    if (!dateMoment.isValid()) {
        return "Invalid Date";
    } else {
        return dateMoment.format("MM/DD/YYYY") + " at " + dateMoment.format("hh:mm a");
    }
}


/**
 * @param unixDate The unix date, parsed as a long
 * @returns {*} The date, formatted as "yyyy" or "Invalid Date" if the date is invalid
 */
function formatUnixYearForUi(unixDate) {
    var dateMoment = moment(parseInt(unixDate), "x");
    if (!dateMoment.isValid()) {
        return "Invalid Date";
    } else {
        return dateMoment.format("YYYY");
    }
}

function show_del() {
    $('.ndel_class').hide();
    $('.del_class').show();

}

function hide_del() {
    $('.ndel_class').show();
    $('.del_class').hide();
}

function getEngagementData(engagementId) {
    // creates the url in here..
    var _url = "/engagements/" + engagementId;
    // the ajax call for creating data
    doGetRequest("/engagements/" + engagementId, undefined, function (data) {
        console.log(data);
        document.forms['editEngagementForm'].engagementId.value = data.engagementId;
        document.forms['editEngagementForm'].engagement_name.value = data.engagementName;
        document.forms['editEngagementForm'].engagement_date_started.value = formatUnixDateForUi(data.dateStarted);
        document.forms['editEngagementForm'].engagement_date_implemented.value = formatUnixYearForUi(data.dateImplemented);

        var endDate = formatUnixDateForUi(data.dateEnded);
        document.forms['editEngagementForm'].engagement_date_ended.value = endDate === "Invalid Date" ? "" : endDate;
    }, function (e) {
        console.log(e);
        alert(errorAjaxMessageEngagements);
    });
}

function getClientData(clientId, businessId) {
    // creates the url in here..
    var _url = "/clients/" + businessId;
    // the ajax call for creating data
    doGetRequest(_url, undefined, function (data) {
        data = data.data;
        if (data && data.length) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].clientId == clientId) {
                    console.log(data[i]);
                    document.forms['editClientsForm'].clientId.value = data[i].clientId;
                    document.forms['editClientsForm'].clientName.value = data[i].clientName;
                    document.forms['editClientsForm'].clientEmail.value = data[i].clientEmail;
                    document.forms['editClientsForm'].clientPhone.value = data[i].clientPhone;
                    document.forms['editClientsForm'].clientNotes.value = data[i].clientNotes;
                    return;
                }
            }
        }

    }, function (e) {
        console.log(e);
        alert(e);
    });
}

function addSubmitButtonToEditEngagement() {
    $('#editEngagementSubmitRow').children().remove();

    var html = "";
    if (sessionStorage.submit_status == editEngagements) {
        //  generating the edit and delete to the popup
        html += '<div class="input-field col" style="float: right">';
        html += '<button  style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn ">Cancel</button>';
        html += '<button  style="cursor:default" type="submit"  name="Submit" onclick="submitEditEngagement()" class="modal-action waves-effect waves-light btn">Update</button>';
        html += '</div>';
        hiding();
        hide_del()
    } else if (sessionStorage.submit_status == deleteEngagements) {
        html += '<div style="cursor:default" class="input-field col" style="float: right">';
        html += '<button  style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Cancel</button>';
        html += '<button  style="cursor:default" type="submit" name="Submit" onclick="doDelete(this)" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Delete</button>';
        html += '</div>';
        hiding();
        show_del()
    } else {
        // generating the submit button to the popup
        html += '<div class="input-field col" style="float: right">';
        html += '<button  style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Cancel</button>';
        html += '<button  style="cursor:default" type="submit" name="Submit" onclick="doCreate(this)" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Submit</button>';
        html += '</div>';
        hide_del()
    }

    // appending the generated buttons to popup
    $('#editEngagementSubmitRow').append(html);
}

function addSubmitButtonToEditClients() {
    $('#editClientsSubmitRow').children().remove();

    var html = "";
    if (sessionStorage.submit_status == editClients) {
        //  generating the edit and delete to the popup
        html += '<div class="input-field col" style="float: right">';
        html += '<button  style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn ">Cancel</button>';
        html += '<button  style="cursor:default" type="submit"  name="Submit" onclick="submitEditClients()" class="modal-action waves-effect waves-light btn">Update</button>';
        html += '</div>';
        hiding();
        hide_del()
    } else if (sessionStorage.submit_status == deleteClients) {
        html += '<div class="input-field col" style="float: right">';
        html += '<button  style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Cancel</button>';
        html += '<button  style="cursor:default" type="submit" name="Submit" onclick="doDelete_cli(this)" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Delete</button>';
        html += '</div>';
        hiding();
        show_del()
    } else {
        // generating the submit button to the popup
        html += '<div class="input-field col" style="float: right">';
        html += '<button style="cursor:default" name="Close" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Cancel</button>';
        html += '<button style="cursor:default" type="submit" name="Submit" onclick="doCreate(this)" class="modal-action modal-close waves-effect waves-light btn modal-trigger">Submit</button>';
        html += '</div>';
        hide_del()
    }

    // appending the generated buttons to popup
    $('#editClientsSubmitRow').append(html);
}

function submitEditEngagement() {
    var engagementId = document.forms['editEngagementForm'].engagementId.value;
    var formData = {
        "engagementName": document.forms['editEngagementForm'].engagement_name.value,
        "dateStarted": document.forms['editEngagementForm'].engagement_date_started.value,
        "dateImplemented": document.forms['editEngagementForm'].engagement_date_implemented.value,
        "dateEnded": document.forms['editEngagementForm'].engagement_date_ended.value
    };

    if (formatDateAsUnixTimestamp(formData.dateStarted) === -1) {
        Materialize.toast("The entered date started is invalid");
        return;
    } else {
        formData.dateStarted = formatDateAsUnixTimestamp(formData.dateStarted);
    }

    if (formatYearAsUnixTimestamp(formData.dateImplemented) === -1) {
        Materialize.toast("The entered date implemented is invalid", 3000);
        return;
    } else {
        formData.dateImplemented = formatYearAsUnixTimestamp(formData.dateImplemented);
    }

    if (formData.dateEnded !== "" && formatDateAsUnixTimestamp(formData.dateEnded) === -1) {
        Materialize.toast("The entered date ended is invalid", 3000);
        return;
    } else {
        formData.dateEnded = formatDateAsUnixTimestamp(formData.dateEnded);
    }

    console.log(formData);
    doPostRequest("/engagements/edit/" + engagementId, formData, function (data) {
        $('.modal').modal("close");
        console.log('suucess');
        console.log(data);
        Materialize.toast('Engagement Updated successfully !', 3000, '');
    }, function (data) {
        console.log(data);
    });
}

function submitEditClients() {
    var clientId = $("#clientId").val();//document.forms['editClientForm'].clientId.value;
    var businessId_cl = $("#businessId_cl").val();//document.forms['editClientForm'].businessId_cl.value;
    var formData = {
        "clientName": $("#clientName").val(),//document.forms['editClientForm'].clientName.value,
        "clientEmail": $("#clientEmail").val(),//document.forms['editClientForm'].clientEmail.value,
        "clientPhone": $("#clientPhone").val(),//document.forms['editClientForm'].clientEmail.value,
        "clientNotes": $("#clientNotes").val()//document.forms['editClientForm'].clientNotes.value
    };
    console.log(formData);
    doPostRequest("/clients/edit/" + businessId_cl + "/" + clientId, formData, function (data) {
        $('.modal').modal("close");
        console.log('suucess');
        console.log(data);
        Materialize.toast('Client Updated successfully !', 3000, '');
    }, function (data) {
        console.log(data);
    });
}

function startEditEngagement(engagementId) {
    $('#editEngagementModal').modal('open');
    sessionStorage.submit_status = editEngagements;
    addSubmitButtonToEditEngagement();
    getEngagementData(engagementId);
}

function startEditClients(clientId, businessId) {
    $('#editClientsModal').modal('open');
    sessionStorage.submit_status = editClients;
    addSubmitButtonToEditClients();
    getClientData(clientId, businessId);
}


function setTab(tab_sel) {
    sessionStorage.tab_sel = tab_sel;
}


function getEngagementHtml(engagement) {
    var businessId = engagement.businessId;
    var businessName = engagement.business.businessName;
    var engagementId = engagement.engagementId;
    var status = engagement.currentStateType.statusChildType;

    var isActive = engagement.isActive;
    var dateStarted = formatUnixDateForUi(engagement.dateStarted);
    var dateImplemented = formatUnixYearForUi(engagement.dateImplemented);
    var dateEnded = formatUnixDateForUi(engagement.dateEnded);
    var dateStatusLastUpdated = formatUnixDateAndTimeForUi(engagement.dateStatusLastUpdated);

    var phase = engagement.currentStateType.statusChildDescription;
    var html = '';
    html += '<li id="engagement-' + engagementId + '" class="collection-item avatar engagementBox" data-phase="' + phase + '" data-name="' + engagement.engagementName + engagement.businessName + engagement.engagementDateCreated + '" data-ename="' + engagement.engagementName + '" data-status="' + isActive + '" data-company="' + businessName + '" data-businessId="' + businessId + '"></a>';
    html += '<span class="title"><a href="engagementdetails.html?id=' + engagementId + '"> ' + engagement.engagementName + '</a></span>';
    html += '<p><span class="text-normal">' + businessName + '</span> <br>';
    html += '<div class="row center-align"><div class="col s6"><select class="browser-default engadgementOpt" id="' + 'eng_' + engagement.engagementId + '" data-eng="' + engagement.engagementId + '">';
    html += '<option value="phase_1" ' + (status === 'phase_1' ? "selected" : "") + '>Phase 1: Initial Contact</option>';
    html += '<option value="phase_2" ' + (status === 'phase_2' ? "selected" : "") + '>Phase 2: Formal Interest </option>';
    html += '<option value="phase_3" ' + (status === 'phase_3' ? "selected" : "") + '>Phase 3: Concept Defined</option>';
    html += '<option value="phase_4" ' + (status === 'phase_4' ? "selected" : "") + '>Phase 4: Price Finalized </option>';
    html += '<option value="phase_5" ' + (status === 'phase_5' ? "selected" : "") + '>Phase 5: Contract Approved</option>';
    html += '<option value="phase_6" ' + (status === 'phase_6' ? "selected" : "") + '>Phase 6: Contract Signed</option>';
    html += '<option value="phase_7" ' + (status === 'phase_7' ? "selected" : "") + '>Phase 7: Funds Received</option>';
    html += '<option value="phase_8" ' + (status === 'phase_8' ? "selected" : "") + '>Phase 8: Fully Engaged</option>';
    html += '</select></div><div class="col s2"> ';
    html += '<a class="waves-effect waves-light btn" data-id="' + 'eng_' + engagement.engagementId + '" onclick="savePhaseForEngagement(' + engagement.engagementId + ')">Save</a></div></div>';
    html += '<p><span class="text-normal">Phase Last Updated: ' + dateStatusLastUpdated + '</span><br>';
    html += '<span class="text-normal">Date Started: ' + dateStarted + '</span><br>';
    html += '<span class="text-normal">Implementation Year: ' + dateImplemented + '</span><br>';

    if (dateEnded !== "Invalid Date") {
        html += '<span class="text-normal">Date Ended: ' + dateEnded + '</span><br>';
    }

    html += '<div class="switch"><label>Inactive<input id="active-' + engagementId + '" onchange="onEngagementActiveChange(' + engagementId + ')" type="checkbox" ' + (isActive ? 'checked' : '') + '><span class="lever"></span>Active</label></div>';
    html += '<a  style="cursor:default" class=" secondary-content"> <i  onclick="startEditEngagement(' + engagementId + ')"  class="waves-effect waves-light modal-trigger material-icons" style="cursor:default" >edit</i> <i href="#modal1" id="delete_clickable" onclick="click_delete(' + engagementId + ')" class="material-icons left">delete</i></a></p> ';
    html += '</li>';
    return html;
}

function getClientHtml(client, businessId) {
    var clientId = client.clientId;
    var clinetName = client.clientName;
    var clientEmail = client.clientEmail;
    var clientPhone = client.clientPhone;
    var clientNotes = client.clientNotes;
    // var status = engagement.currentStateType.statusChildType;


    // var dateStarted = formatUnixDateForUi(client.dateStarted);
    // var dateImplemented = formatUnixYearForUi(client.dateImplemented);
    // var dateEnded = formatUnixDateForUi(client.dateEnded);
    // var dateStatusLastUpdated = formatUnixDateAndTimeForUi(client.dateStatusLastUpdated);

    // var phase = engagement.currentStateType.statusChildDescription;
    var html = '';
    html += '<li id="client-' + clientId + '" class="collection-item avatar engagementBox"  data-name="' + client.clientName + '" data-ename="' + clientEmail + '"  data-phone="' + clientPhone + '" data-businessId="' + businessId + '"></a>';
    html += '<p><span class="title">' + clinetName + '</span> <br>';
    html += '<p><span class="text-normal">Client Phone No: ' + clientPhone + '</span><br>';
    html += '<span class="text-normal">Client email: ' + clientEmail + '</span><br>';
    html += '<span class="text-normal">Client Notes ' + clientNotes + '</span><br>';
    html += '<a class=" secondary-content"> <i  onclick="startEditClients(' + clientId + ',' + businessId + ')" class="waves-effect waves-light modal-trigger material-icons" style="cursor:default">edit</i> <i href="#modal1" id="delete_clickable" onclick="click_delete_client(' + clientId + ',' + businessId + ')" class="material-icons left" style="cursor:default">delete</i></a></p> ';
    html += '</li>';
    return html;
}

