// get all Nodes
const searchSectionNode = document.querySelector("#search-section");
const searchBoxNode = document.querySelector("#search-box");
const searchButtonNode = document.querySelector("#search-btn");
const cardSectionNode = document.querySelector("#card-section");
const detailsSectionNode = document.querySelector("#details-section");
const phonesNode = document.querySelector("#phones");
const noDataNode = document.querySelector("#no-data");
const loadingNode = document.querySelector("#loading");
let viewAll = false;
let tempSearchValue = "";
noDataNode.style.display = "none";

// function for search again
const searchAgain = () => {
    showLoading();
    searchSectionNode.style.display = "flex";
    cardSectionNode.style.display = "flex";
    detailsSectionNode.innerHTML = null;
    hideLoading();
};

// function for show loading status
const showLoading = () => {
    loadingNode.innerHTML = `
    <h2 class="animate-bounce text-xl font-mono">Loading...</h2>
    `;
    loadingNode.style.display = "block";
};

// function for hide loading status
const hideLoading = () => {
    loadingNode.style.display = "none";
};

// event listener for fetch phones on enter
// searchBoxNode.addEventListener("change", (e) => {
//     const value = searchBoxNode.value.toLowerCase();
//     fetchPhones(value);
// });

// event listener for fetch phones on button click
searchButtonNode.addEventListener("click", (e) => {
    const value = searchBoxNode.value.toLowerCase();
    fetchPhones(value);
});

const seeAllPhones = () => {
    viewAll = true;
    fetchPhones(tempSearchValue);
};

// function for fetch phones
const fetchPhones = (phone) => {
    phonesNode.innerHTML = null;
    tempSearchValue = phone;
    showLoading();
    if (phone) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
            .then((res) => res.json())
            .then((data) => displayPhones(data?.data))
            .catch((e) => console.log(e.message));
    } else {
        alert("please enter a brand name");
    }
    searchBoxNode.value = "";
    hideLoading();
};

// functions for display phones
const displayPhones = (phones = []) => {
    hideLoading();
    noDataNode.style.display = "none";
    phonesNode.style.display = "grid";
    console.log(phones);

    if (phones.length) {
        const shortListedPhones = viewAll ? phones : phones.slice(0, 20);
        viewAll = false;
        for (const phone of shortListedPhones) {
            const div = document.createElement("div");
            div.innerHTML = `
                    <div class="border p-4 rounded-lg shadow-lg bg-white h-[30rem]">
                        <div class="my-4 px-4">
                            <div class="flex justify-center items-center my-4 hover:scale-110 transition-transform duration-300">
                                <img class="" src="${phone.image}" alt="${phone?.phone_name}"/>
                            </div>
                            <div class="py-4">
                                <h2 class="text-2xl">
                                    <span class="font-medium capitalize"
                                        >Model: </span
                                    >${phone?.phone_name}
                                </h2>
                                <h2 class="text-xl">
                                    <span class="font-medium capitalize"
                                        >Brand: </span
                                    >${phone?.brand}
                                </h2>
                                <div class="my-4 flex items-center justify-center">
                                    <button class="px-8 py-4 bg-slate-500 hover:bg-slate-800 active:bg-slate-900 text-white rounded-md capitalize"
                                    onclick=phoneDetails("${phone?.slug}")
                                    >Explore more</button
                                </div>
                            </div>
                        </div>
                    </div>
    `;
            phonesNode.appendChild(div);
        }
        const seeAll = document.createElement("div");
        seeAll.innerHTML = `
        <div class="my-4 flex items-center justify-center">
                    <button
                        class="px-8 py-4 bg-slate-500 hover:bg-slate-800 active:bg-slate-900 text-white rounded-md capitalize"
                        onclick="seeAllPhones()"
                    >
                        see all
                    </button>
                </div>
        `;
        phonesNode.appendChild(seeAll);
    } else {
        noDataNode.style.display = "block";
        noDataNode.innerHTML = `<span class="text-2xl font-medium"> No data found</span>`;
    }
};

// functions for fetch phone details
const phoneDetails = (slug) => {
    cardSectionNode.style.display = "none";
    searchSectionNode.style.display = "none";
    phonesNode.innerHTML = null;
    showLoading();
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then((res) => res.json())
        .then((data) => displayPhoneDetails(data?.data))
        .catch((e) => console.log(e.message));
    searchBoxNode.value = "";
};

// functions for display phone details
const displayPhoneDetails = (details) => {
    hideLoading();
    console.log(details);
    detailsSectionNode.style.display = "flex";
    const div = document.createElement("div");
    detailsSectionNode.innerHTML = `
   <div class="sm:w-2/4 ">
                    <div class="my-4 flex items-center justify-center">
                        <button
                            class="px-8 py-4 bg-slate-500 hover:bg-slate-800 active:bg-slate-900 text-white rounded-md capitalize"
                            onclick="searchAgain()"
                        >
                            Search New
                        </button>
                    </div>
                    <div
                        class="my-8 border-2 px-4 py-8 border-slate-200 rounded-lg"
                    >
                        <div
                            class="flex justify-center items-center my-8 hover:scale-110 transition-transform duration-300"
                        >
                            <img class="h-96" src="${details?.image}" alt="${
        details?.name
    }"/>
                        </div>
                        <h5 class="text-xl font-mono py-8 text-center">
                            Released on ${
                                details?.releaseDate || "Not Available"
                            }
                        </h5>

                        <table class="table-fixed w-full">
                            <thead>
                                <tr class="bg-slate-500 text-white py-2">
                                    <th class="font-semibold" colspan="2">
                                        <h3 class="text-lg font-mono">
                                            Specifications
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="space-y-4">
                                <tr>
                                    <td class="font-semibold">Model:</td>
                                    <td>${details?.name || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Brand:</td>
                                    <td>${
                                        details?.brand || "Not Available"
                                    }</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table-fixed my-8 w-full">
                            <thead>
                                <tr class="bg-slate-500 text-white py-2">
                                    <th class="font-semibold" colspan="2">
                                        <h3 class="text-lg font-mono">
                                            Features
                                        </h3>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="space-y-4">
                                <tr>
                                    <td class="font-semibold">Storage:</td>
                                    <td>
                                        ${
                                            details?.mainFeatures?.storage ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Display Size:</td>
                                    <td>
                                        ${
                                            details?.mainFeatures
                                                ?.displaySize || "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">ChipSet:</td>
                                    <td>
                                        ${
                                            details?.mainFeatures?.chipSet ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Memory:</td>
                                    <td>
                                        ${
                                            details?.mainFeatures?.memory ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <table class="table-fixed w-full">
                            <thead>
                                <tr class="bg-slate-500 text-white py-2">
                                    <th class="font-semibold" colspan="2">
                                        <h3 class="text-xl font-mono">
                                            Others
                                        </h3>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="space-y-4">
                                <tr>
                                    <td class="font-semibold">WLAN:</td>
                                    <td>
                                        ${
                                            details?.others?.WLAN ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Bluetooth:</td>
                                    <td>
                                        ${
                                            details?.others?.Bluetooth ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">GPS:</td>
                                    <td>
                                        ${
                                            details?.others?.GPS ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">NFC:</td>
                                    <td>
                                        ${
                                            details?.others?.NFC ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">Radio:</td>
                                    <td>
                                        ${
                                            details?.others?.Radio ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">USB:</td>
                                    <td>
                                        ${
                                            details?.others?.USB ||
                                            "Not Available"
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="my-8">
                        <div class="w-full my-8 bg-slate-500 text-white py-2">
                            <h3 class="text-xl font-mono font-semibold text-center">Sensors</h3>
                            </div>
                            <div id="sensors"  class="gap-2 flex flex-wrap justify-evenly items-center">
                            </div>
                        </div>
                    </div>
                </div>
    `;

    // mapping the sensors the join to be string and set the value in sensor div
    const sensors = details?.mainFeatures?.sensors
        ?.map(
            (v) => `<span class="px-4 py-2 rounded-xl bg-slate-200">${v}</span>`
        )
        .join(" ");
    document.querySelector("#sensors").innerHTML = sensors || "Not Available";
    console.log(sensors);
};

// phoneDetails("apple_iphone_13_pro_max-11089");
