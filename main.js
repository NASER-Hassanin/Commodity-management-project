let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood = "creade";
let tmp;

//get total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#FF862F";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }

}


//create product

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

function createproduct() {
    let protct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mood === "creade") {

        if (protct.count > 1) {
            for (let i = 0; protct.count > i; i++) {
                datapro.push(protct);

            }
        } else {
            datapro.push(protct);

        }

    } else {
        datapro[tmp] = protct;
        mood = 'creade';
        submit.innerHTML = "creade"
        count.style.display = "block"

    }

    //localStorage
    localStorage.setItem("product", JSON.stringify(datapro));
    console.log(datapro)
    clearData()
    readData()
};


//clear inputs

function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""

};



//read data
function readData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `

        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
       <td> <button onclick="updateAll(${i})" >update</button></td>
       <td><button onclick=" deleteaoll(${i})" >delete</button></td>

        

    
       </tr>

        
        `



    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll")
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
    <button onclick="deleteAll()">deleteAll (${datapro.length})</button>
    
    `
    } else {
        btnDelete.innerHTML = ""

    }
};
readData()



//delelte


function deleteaoll(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro);
    readData()

};

function deleteAll() {
    datapro.splice(0)
    localStorage.clear()
    readData()

}

//update 

function updateAll(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal()
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = "update";
    mood = 'update';
    tmp = i;

}


//search

let mods = " Title";

function getsearchMood(id) {

    let search = document.getElementById("search");
    if (id == 'searchTitle') {
        mods = " Title"
        search.placeholder = "search By Title"

    } else {
        mods = "category "
        search.placeholder = "search By category"

    }
    search.focus()

}

function searchData(value) {

    table = "";
    for (let i = 0; i < datapro.length; i++) {

        if (datapro[i].title.includes(value)) {
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
       <td> <button onclick="updateAll(${i})" >update</button></td>
       <td><button onclick=" deleteaoll(${i})" >delete</button></td>

        

    
       </tr>

        
        `
        } else {


            if (datapro[i].category.includes(value)) {
                table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
       <td> <button onclick="updateAll(${i})" >update</button></td>
       <td><button onclick=" deleteaoll(${i})" >delete</button></td>

        

    
       </tr>

        
        `
            }




        }




    }


    document.getElementById("tbody").innerHTML = table;

    }
    
