/*!
 * afPopUp v1.0
 * https://github.com/angelorodriigors/afPopUp
 *
 *
 * Copyright Angelo Silva e Fernando Moraes
 * Released under the MIT license
 *
 * Date: 2017-02-24T15:48Z
 */
var afPopUp = {
	image: null,
	expirateCacheTime: null,
	haveLink: null,
	link:null,
	target:null,
	element: null,
	controlTimeCookie: null,

	validateNull: function(data) {
		return(data != null && data != '' && data != ' ');
	},

	validateTarget: function(target){
		if(target != '_blank' && target != "_self" && target != undefined) {
			this.target = "_self";
			return true;
		} else {
			return true;
		}
	},

	getCloseClickButton: function(element) {
		var closeButton = document.getElementsByClassName('popup-close');
		var indentifier = this.validateIndentifier(element);
		var length = element.length;
		var selectName = element.substring(1, length);

		var html = this.preparePopUpHTMLToPrint();		

		closeButton[0].onclick = function(e) {
			if (indentifier == '#') {
				document.getElementById(selectName).style = "display: none";
			} else if(indentifier == '.') {
				var selector = document.getElementsByClassName(selectName);

				selector[0].style = "display: none";
			}
		}
	},

	setTimeCookie: function() {
		if (document.cookie.indexOf('afPopUp') > -1 ) {
			this.controlTimeCookie = false;
		} else {
			this.controlTimeCookie = true;
		}

		 var now = new Date();
		 var time = now.getTime();
		 time += this.expirateCacheTime * 60 * 1000;
		 now.setTime(time);
		 document.cookie = 'afPopUp=1; expires=' + now.toUTCString() + '; path=/';
	},

	validateImage: function(image) {
		if ( this.validateNull(image) && this.checkType(image, 'string') ) {
			var imageExtension = image.split('.').pop();
			var permitedExtensions = ["jpg", "gif", "png", "jpeg"];

			if (permitedExtensions.indexOf(imageExtension) === -1) {
				return false;				
			} else {
				return true;
			}
		} else {
			return false;				
		}			
	},

	validateNullAndType: function(data, expected) {
		return(this.validateNull(data) && this.checkType(data, expected));
	},

	checkType: function(data, expected) {
		var type = typeof data;

		return(type == expected);
	},

	validateIndentifier: function(element) {
		var indentifier = element.slice(0,1);

		return indentifier;
	},

	preparePopUpHTMLToPrint: function() {
		var html = "<div style='top: 10px;left: 20px;position: fixed;z-index: 9999;cursor: pointer;' class='popup-close'><img style='width: 35px;' src='images/close.svg' alt='Icon Close afPopUp'></div><div class='popup-content' style='position:fixed;top: 50%;left: 50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);z-index: 9998;'>";

		if(this.haveLink) {
			var html = html + "<a href='" + this.link + "' target='" + this.target + "'><img style='border: 2px solid #FFF;max-width: 100%' src='" + this.image + "' width='550px'/></a></div>";
		} else {
			var html = html + "<img style='border: 2px solid #FFF;max-width: 100%' src='" + this.image + "' width='550px'/></div>";
		}

		return html;
	},

	printPopUp: function(element) {
		var indentifier = this.validateIndentifier(element);
		var length = element.length;
		var selectName = element.substring(1, length);

		var html = this.preparePopUpHTMLToPrint();

		if (indentifier == '#') {
			document.getElementById(selectName).style = "opacity: 1;width: 100%;height: 100%;position: fixed;background: rgba(0, 0, 0, 0.75);top: 0;left: 0;z-index: 9997;";

			var selector = document.getElementById(selectName).innerHTML =  html;
		} else if(indentifier == '.') {
			var selector = document.getElementsByClassName(selectName);

			selector[0].style = "opacity: 1;width: 100%;height: 100%;position: fixed;background: rgba(0, 0, 0, 0.75);top: 0;left: 0;z-index: 9997;";

			selector[0].innerHTML =  html;
		}

		this.getCloseClickButton(this.element);
	},

	validateData: function() {
		var validateData = null;
		validateData += this.validateImage(this.image);
		validateData += this.validateTarget(this.target);
		validateData += this.validateNullAndType(this.expirateCacheTime, "number");

		if (validateData == 3) {
			this.printPopUp(this.element);
		}
	},

	init: function(param) {
		this.element = param.element;
		this.image = param.image;
		this.expirateCacheTime = param.expirateCacheTime;
		this.haveLink = param.haveLink;
		this.link = param.link;
		this.target = param.target;

		this.setTimeCookie(this.expirateCacheTime);

		if(this.controlTimeCookie) {
			this.validateData();
		}
	}
}