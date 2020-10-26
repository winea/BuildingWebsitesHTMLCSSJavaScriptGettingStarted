window.addEventListener("DOMContentLoaded", (e) => {
    const orderButton = document.querySelectorAll("button[data-order]");

    orderButton.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const button = e.currentTarget;
            const container = button.parentNode;

            const order = {
                id: button.getAttribute("data-order"),
                title: container.querySelector(".title").innerText,
                price: container.querySelector(".price").innerText,
                desc: container.querySelector(".desc").innerText
            };

            localStorage.setItem("order", JSON.stringify(order));

            // mudar a pagina
            const url = window.location.href.replace("pies.html", "order.html");
            window.location.href = url;
        });
    });


    // choice
    const order = localStorage.getItem("order");

    let locationBox = document.querySelector("#location");

    let location = {
        latitude: "unknown",
        longitude: "unknown"
    };

    window.navigator.geolocation.getCurrentPosition(
        function(position) {
            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            locationBox.value = JSON.stringify(location);
        },
        //unknown
        function(error) {
            locationBox.value = JSON.stringify(location);
        }
    );

    if(order) {
        const pieOrder = JSON.parse(order);

        const orderInput = document.querySelector("#pie-order");
        orderInput.value = order;

        const pie = document.querySelector(".pie");
        const title = pie.querySelector(".title");
        const price = pie.querySelector(".price");
        const desc = pie.querySelector(".desc");

        title.innerText = pieOrder.title;
        price.innerText = pieOrder.price;
        desc.innerText = pieOrder.desc;
     
        const image = pie.querySelector("img");
        image.setAttribute("src", `images/${pieOrder.id}.png`);


        
    }
});