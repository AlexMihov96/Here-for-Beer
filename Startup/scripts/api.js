(function () {
    // Mock repository
    let adverts = [
        {
            _id: 0,
            _acl: {
                creator: 0
            },
            title: "XBoss 1080",
            publisher: "Pesho",
            datePublished: "2017-06-04",
            price: 100
        }
    ];

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
