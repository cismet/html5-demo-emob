
/**
* @fileoverview
* new style for MSIE >= 5.5 && Firefox > 1.0
* validating form input multilingual (vfim)
*     to call over "onsubmit"-attribute in <form>-tag
* @arguments
*    [0] = formular node
*    [1] = usedLanguage [de,en,pl,cn,ru,fr]
*        [arrays as triplets]
*        [0] = name of input field, mandatory
*        [1] = function to call for validation, mandatory
*                    [empty ("")] = check only for requirement
*                    isEmail = checks, if content is valid email address
*                    isNumber = checks, if content is a number
*                    isNumberInRangeN:M = checks, if content is between N and M inclusive N and M
*                    isUrl: checks, if content is valid URL
*        [2] = true/false [required or not], optional, default: false,
* @author Sitepark GmbH - Oliver Buchholz
* @author Cynapsis Kommunikationsagentur GmbH - Frank Legge
* (c) 2007
* @version 1.0.0
* @example
*        <form onsubmit="
*                        clearDefaultValues(this);
*                        vfim(this, 'de',['inpName','',true],['inpEmailaddress','isEmail',true]);
*                        if(!document.returnValue) {
*                            setDefaultValues(this);
*                        }
*                        return document.returnValue;
*                    "
*                    method="post"
*                    action="#">
*/

oLanguages = {
    "label" : {
        "de_DE" : {
            "chkTermsConditions" : "AGB",
            "chkAddress"         : "Anrede",
            "inpAge"             : "Alter",
            "inpCity"            : "Ort",
            "inpCompany"         : "Firma",
            "inpCountry"         : "Land",
            "inpDepartment"      : "Abteilung",
            "inpEmailaddress"    : "E-Mail-Adresse",
            "inpFax"             : "Telefax",
            "inpFirstName"       : "Vorname",
            "inpLastName"        : "Nachname",
            "inpLength"          : "Größe",
            "inpMail"            : "E-Mail",
            "inpMessage"         : "Nachricht",
            "inpName"            : "Name",
            "inpNo"              : "Nein",
            "inpPhone"           : "Telefon",
            "inpSex"             : "Geschlecht",
            "inpStreet"          : "Straße",
            "inpSubject"         : "Betreff",
            "inpUrl"             : "URL",
            "inpYes"             : "Ja",
            "inpZip"             : "PLZ",
            "inpZipCity"         : "Postleitzahl und Ort",
            "sp_address"         : "Anrede",
            "sp_lastName"        : "Nachname",
            "sp_mail"            : "E-Mail"
        }
    },
    "messages" : {
        "de_DE" : {
            "mustBeEmail"          : "muss eine E-Mail-Adresse sein",
            "mustBeValidEmail"     : "muss eine gültige E-Mail-Adresse sein",
            "mustBeUrl"            : "muss eine URL sein und mit \"http://\" beginnen",
            "mustBeValidUrl"       : "muss eine gültige URL sein",
            "mustBeNumber"         : "muss eine Zahl sein",
            "mustBeNumberBetween1" : "muss eine Zahl zwischen",
            "mustBeNumberBetween2" : "und",
            "mustBeNumberBetween3" : "sein",
            "inputErrors"          : "Bitte überprüfen Sie Ihre Eingaben"
        }
    }
};

function getInputObject(sName) {
    var i, oInputObject;
    if (!(oInputObject = document[sName]) && document.all) {
        oInputObject = document.all[sName];
    }
    for (i=0; !oInputObject && i<document.forms.length; i++) {
        oInputObject = document.forms[i][sName];
    }
    return oInputObject;
}

function vfim(oFormNode, sLanguage) {
    var val = null;
    var i;
    var sErrors = "";
    var aTriplets = new Array();
    var sNewLine = "\n";

    for (i=2; i<arguments.length; i++) {
        aTriplets[i-2] = new Array();
        aTriplets[i-2] = arguments[i];
    }

    for(i=0; i<aTriplets.length; i++) {
        var sOutputName;
        var oInputObject = getInputObject(aTriplets[i][0]);
        // alert(typeof oInputObject);
        var sInputObjectValue = "";
        var sInputDescription = oLanguages.label[sLanguage][aTriplets[i][0]];
        var fnInputCheck      = aTriplets[i][1];
        var bRequired         = aTriplets[i][2];
        var bCheck;

        if (oInputObject) {
            if (sInputDescription != "") {
                sOutputName = sInputDescription;
            } else {
                sOutputName = oInputObject.name;
            }

            // various input types to handle
            // type=checkbox or type=radio and length-property exists
            if (oInputObject.length && (oInputObject[0].type == "checkbox" || oInputObject[0].type == "radio")) {
                bCheck = false;
                if (sInputDescription != "") {
                    sOutputName = sInputDescription;
                } else {
                    sOutputName = oInputObject[0].name;
                }
                for (var j=0; j<oInputObject.length; j++) {
                    if (bCheck === false) {
                        bCheck = oInputObject[j].checked;
                    }
                }
                if ((bCheck === false) && (bRequired === true)) {
                    sErrors += '- ' + sOutputName + sNewLine;
                }
                continue;
            } else if (oInputObject.type == "checkbox") { // type=checkbox and length-property does not exist = single checkbox
                bCheck = oInputObject.checked;
                if (sInputDescription != "") {
                    sOutputName = sInputDescription;
                } else {
                    sOutputName = oInputObject.name;
                }
                if ((bCheck === false) && (bRequired === true)) {
                    sErrors += '- ' + sOutputName + sNewLine;
                }
                continue;
            } else if (oInputObject.type == "select-one") {
                sInputObjectValue = oInputObject.options[oInputObject.selectedIndex].value;
            } else {
                sInputObjectValue = oInputObject.value;
            }

            if (typeof sInputObjectValue != 'undefined' && sInputObjectValue != "") {
                if (fnInputCheck == "isEmail") {
                    var at = sInputObjectValue.indexOf('@');
                    var expression = /^[_\.0-9A-Za-z-]+@([0-9A-Za-z][0-9A-Za-z-]+\.)+[A-Za-z]{2,4}$/;
                    if (at < 1 || at == (sInputObjectValue.length-1)) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeEmail"] + sNewLine;
                    } else if (expression.exec(sInputObjectValue) < 1) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeValidEmail"] + sNewLine;
                    }
                } else if (fnInputCheck == "isUrl") {
                    var url = sInputObjectValue.indexOf('http://');
                    var expression = /^http:\/\/[0-9A-Za-z-]+\.([0-9A-Za-z][0-9A-Za-z-]+\.)+[A-Za-z]{2,4}/;
                    if (url != 0) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeUrl"] + sNewLine;
                    } else if (expression.exec(sInputObjectValue)<1) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeValidUrl"] + sNewLine;
                    }
                } else if (fnInputCheck == "isNumber") {
                    var num = parseFloat(sInputObjectValue);
                    if (sInputObjectValue.replace(/^0*/,'') != ''+num) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeNumber"] + sNewLine;
                    }
                } else if (fnInputCheck.indexOf('isNumberInRange') == 0) {
                    var num = parseFloat(sInputObjectValue);
                    if (sInputObjectValue.replace(/^0*/,'') != ''+num) {
                        sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeNumber"] + sNewLine;
                    } else {
                        var colon = fnInputCheck.indexOf(":");
                        var min = fnInputCheck.substring(15,colon);
                        var max = fnInputCheck.substring(colon+1);
                        if (num < min || max < num) {
                            sErrors += '- ' + sOutputName + ' ' + oLanguages.messages[sLanguage]["mustBeNumberBetween1"] + ' ' + min + ' ' + oLanguages.messages[sLanguage]["mustBeNumberBetween2"] + ' ' + max + ' ' + oLanguages.messages[sLanguage]["mustBeNumberBetween3"] + sNewLine;
                        }
                    }
                }
            } else if (typeof oInputObject != null && sInputObjectValue.length >=0 && bRequired === true) {
                sErrors += '- ' + sOutputName + sNewLine; // required field
            }
        }
    }

  if (sErrors != "") {
      alert(oLanguages.messages[sLanguage]["inputErrors"] + sNewLine + sErrors);
  }
  document.returnValue = (sErrors == "");
}
