// nodes
const searchBoxNode = document.querySelector("#search-box");
const searchButtonNode = document.querySelector("#search-btn");
const phonesNode = document.querySelector("#phones");

searchBoxNode.addEventListener("change", (e) => {
    const value = searchBoxNode.value.toLowerCase();
    fetchPhones(value);
});
searchButtonNode.addEventListener("click", (e) => {
    const value = searchBoxNode.value.toLowerCase();
    fetchPhones(value);
});

const fetchPhones = (phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then((res) => res.json())
        .then((data) => displayPhones(data?.data))
        .catch((e) => console.log(e.message));
};
const displayPhones = (phones) => {
    console.log(phones);
    for (const phone of phones) {
        const div = document.createElement("div");
        div.innerHTML = `
                    <div class="border p-4 font-serif rounded-lg">
                        <div class="my-4">
                            <div>
                                <img src="${phone.image}" alt="${phone.phone_name}"/>
                            </div>
                            <h2 class="text-2xl font-medium">
                                <span class="font-medium capitalize"
                                    >name: </span
                                >${phone.phone_name}
                            </h2>
                            <h2 class="text-2xl font-medium">
                                <span class="font-medium capitalize"
                                    >user name: </span
                                >@${phone?.brand}
                            </h2>
                        </div>
                        <h3 class="text-xl">
                            <span class="font-medium capitalize">email: </span
                            >${phone.slug}
                        </h3>
                    </div>
    `;
        phonesNode.appendChild(div);
    }
};
