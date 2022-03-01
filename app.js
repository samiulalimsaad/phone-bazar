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
                    <div class="border p-4 rounded-lg shadow-lg ">
                        <div class="my-4 px-4">
                            <div class="flex justify-center items-center my-4 hover:scale-110 transition-transform duration-300">
                                <img class="" src="${phone.image}" alt="${phone.phone_name}"/>
                            </div>
                            <div class="py-4">
                                <h2 class="text-2xl">
                                    <span class="font-medium capitalize"
                                        >Model: </span
                                    >${phone.phone_name}
                                </h2>
                                <h2 class="text-xl">
                                    <span class="font-medium capitalize"
                                        >Brand: </span
                                    >${phone?.brand}
                                </h2>
                                <div class="my-4 flex items-center justify-center">
                                    <button class="px-8 py-4 bg-slate-500 hover:bg-slate-800 active:bg-slate-900 text-white rounded-md capitalize">Explore more</button
                                </div>
                            </div>
                        </div>
                    </div>
    `;
        phonesNode.appendChild(div);
    }
};

fetchPhones("oppo");
