// JavaScript Document

function getBaseURL () {
   return location.protocol + '//' + location.hostname + 
      (location.port && ':' + location.port) + '/';
}

(function() {
    tinymce.create('tinymce.plugins.is_button', {
        init : function(ed, url) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", url + '/render.php?Cat=', false);
			xmlhttp.send();
		    var data = JSON.parse(xmlhttp.responseText);
		    for (var count = 0; count < data.length; count++) {
		    	for (var subcount = 0; subcount < data[count].menu.length; subcount++) {
		    		if (data[count].menu[subcount] !== undefined && data[count].menu[subcount] !== null) {
			    		var val = [], getClickFunc = function (paste) {
		    					return function(e) {
				      				ed.selection.setContent('{' + paste + '}');
		      					}
			    			}, getMenuClickFunc = function (v) {
					    		return function () {
				      				ed.windowManager.open({
				      					title: 'Choose Items',
				      					body: v
				      				});
				      			}
					    	};
				    	for (var pancount = 0; pancount < data[count].menu[subcount].values.length; pancount++) {
				    		if (data[count].menu[subcount].values[pancount] !== null) {
					    		val.push({type: 'panelbutton', name: 'category' + pancount, image: url + '/render.php?Size=100&Font=' + data[count].menu[subcount].values[pancount].font + '&Char=' + data[count].menu[subcount].values[pancount].char, onclick: getClickFunc(data[count].menu[subcount].text + ";" + 'Font=' + data[count].menu[subcount].values[pancount].font + '&Char=' + data[count].menu[subcount].values[pancount].char)
					    			});
		                    }
				    	}
				    	data[count].menu[subcount].onclick = getMenuClickFunc(val);
				    }
			    }
		    }
            ed.addButton('is_button', {
                title : 'Islam Source',
                image : url+'/render.php?Size=32&Char=22&Font=AGAIslamicPhrases',
                icon: true,
                type: 'menubutton',
                //text: 'Islam Source',
                menu: data
			});
        },
        createControl : function(n, cm) {
            return null;
        },
    });
    tinymce.PluginManager.add('is_button', tinymce.plugins.is_button);
})();