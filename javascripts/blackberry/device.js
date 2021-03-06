window.device = {
    isIPhone: false,
    isIPod: false,
    isBlackBerry: true,

    init: function() {
		this.exec("initialize");
		this.poll(function() {
			device.available = typeof device.name == "string";
		});
    },
    exec: function(command, params, sync) {
        if (device.available || command == "initialize") {
            try {
                var cookieCommand = "PhoneGap=" + command;
                if (params) cookieCommand += "/" + params.join("/");
                document.cookie = cookieCommand;
                if (sync) this.poll();
            } catch(e) {
                console.log("Command '" + command + "' has not been executed, because of exception: " + e);
                alert("Error executing command '" + command + "'.")
            }
        } else {
        	alert("Device not available YET - still loading.");
        }
    },
    poll: function(callback) {
    	eval(document.cookie + (callback ? ";callback();" : ""));
    }
};
window.device.init();