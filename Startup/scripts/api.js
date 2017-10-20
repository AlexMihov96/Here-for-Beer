(function () {
    // Mock repository
    let adverts = [
        {
            _id: 0,
            _acl: {
                creator: 0
            },
            title: "XBoss 1080",
		    description: "Modded gaming console",
            publisher: "Pesho",
            datePublished: "2017-06-04",
            price: 100,
			image: "./static/fuze-f1.png"
        }
    ];


    // User login
    $.mockjax(function (requestSettings) {
        if (requestSettings.url === "https://mock.api.com/user/kid_rk/login") {
            return {
                response: function (origSettings) {
                    if (requestSettings.headers["Authorization"] === "Basic a2lkX3JrOjczNjgwNGE2Njg=") {
                        let target = users.filter(u => u.username === requestSettings.data.username && u.password === requestSettings.data.password);
                        if (target.length === 0) {
                            this.status = 403;
                            this.responseText = "You are not authorized";
                        } else {
                            this.responseText = target[0];
                        }
                    } else {
                        this.status = 403;
                        this.responseText = "You are not authorized";
                    }
                }
            };
        }
    });
	
	// Load single advert
    $.mockjax(function (requestSettings) {
        if (requestSettings.url.match(/https:\/\/mock\.api\.com\/appdata\/kid_rk\/adverts\/(.+)/) &&
            requestSettings.method === "GET") {
            let advertId = Number(requestSettings.url.match(/https:\/\/mock\.api\.com\/appdata\/kid_rk\/adverts\/(.+)/)[1]);
            return {
                response: function (origSettings) {
                    if (requestSettings.headers["Authorization"].includes("Kinvey mock_token")) {
                        let advert = adverts.filter(a => a._id === advertId);
                        this.responseText = advert.shift();
                    } else {
                        this.status = 403;
                        this.responseText = "You are not authorized";
                    }
                }
            };
        }
    });

    // User create
    $.mockjax(function (requestSettings) {
        if (requestSettings.url === "https://mock.api.com/user/kid_rk/" &&
            requestSettings.method === "POST") {

    // Loading of adverts
    $.mockjax(function (requestSettings) {
        if (requestSettings.url==="https://mock.api.com/appdata/kid_rk/adverts" &&
            requestSettings.method === "GET") {

            return {
                response: function (origSettings) {
                    if (requestSettings.headers["Authorization"].includes("Kinvey mock_token")) {
                        this.responseText = adverts;
                    } else {
                        this.status = 403;
                        this.responseText = "You are not authorized";
                    }
                }
            };
        }
    });
})();
