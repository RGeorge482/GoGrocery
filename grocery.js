"use strict";
//Selection items from the DOM
//Add items container
const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const itemName = document.getElementById("item-input");
const itemQuantity = document.getElementById("quantity-input");
const submit = document.querySelector(".addItems-submit");
const exportFiles = document.getElementById("export-items");
//Display items container
const list = document.querySelector(".grocery-list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

//Add event listeners
//Submit listener
submit.addEventListener("click", addItem);
//Check for local storage
document.addEventListener("DOMContentLoaded", displayStorage);
//Clear list
clear.addEventListener("click", removeItems);
//Listen to list to delete individual items
list.addEventListener("click", removeSingleItem);
//Download current list and clear it out of the system.
exportFiles.addEventListener("click", exportList);
//add an item
let groceryList = []; //array to receive list of items added to the list

function addItem(event) {
  event.preventDefault();
  //let value = input.value;
  let item_name = itemName.value;
  let quantity = itemQuantity.value;

  if (item_name === "") {
    showAction(addItemsAction, "Please add grocery item", false);
  } else {
    showAction(addItemsAction, `${item_name} added to the list`, true);
    createItem(item_name, quantity);
    updateStorage(item_name, quantity);

    groceryList.push({ item_name, quantity });
  }
}

// display message that item was or not add it succesfully
function showAction(element, text, value) {
  if (value === true) {
    element.classList.add("success");
    element.innerText = text;
    input.value = "";
    itemQuantity.value = "";
    setTimeout(function () {
      element.classList.remove("success");
    }, 2000);
  } else {
    element.classList.add("alert");
    element.innerText = text;
    input.value = "";
    itemQuantity.value = "";
    setTimeout(function () {
      element.classList.remove("alert");
    }, 2000);
  }
}

// create item
function createItem(item_name, quantity) {
  let parent = document.createElement("div");
  parent.classList.add("grocery-item");
  // item created dinamically
  parent.innerHTML = `<h4 id="myItem" class="grocery-item__title">${item_name}</h4>
    <h4 class="grocery-item__quantity" >${quantity}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>`;

  list.appendChild(parent);
}

//Download list
let data = "";

function exportList() {
  groceryList.forEach((item) => {
    data += `Item Description: ${item.item_name} - Quantity: ${item.quantity}\n`;
  });
  let fileName = "grocery-list.txt";
  let contentType = "text/plain";
  let a = document.createElement("a");
  let file = new Blob([data], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  removeItems();
  data = "";
  a.click();
}

//update local storage
function updateStorage(item_name, quantity) {
  let groceryList;
  groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  groceryList.push(item_name, quantity);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

//display items in local storage
function displayStorage() {
  let exists = localStorage.getItem("groceryList");
  if (exists) {
    let storageItems = JSON.parse(localStorage.getItem("groceryList"));
    storageItems.forEach(function (element) {
      createItem(element);
    });
  }
}

//remove all items
function removeItems() {
  //delete from local storage
  localStorage.removeItem("groceryList");
  let items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    //remove each item from the list
    showAction(displayItemsAction, "All items deleted", false);
    items.forEach(function (element) {
      list.removeChild(element);
    });
  } else {
    showAction(displayItemsAction, "No more items to delete", false);
  }
}

//remove single item
function removeSingleItem(event) {
  event.preventDefault();
  let link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    let text = link.previousElementSibling.innerHTML;
    let groceryItem = event.target.parentElement.parentElement;

    //remove from list
    list.removeChild(groceryItem);

    //remove from local storage
    editStorage(text);
  }
}

// edit local storage
function editStorage(item) {
  let groceryItems = JSON.parse(localStorage.getItem("groceryList"));
  let index = groceryItems.indexOf(item);

  groceryItems.splice(index, 1);
  //first delete existing list
  localStorage.removeItem("groceryList");
  //add new updated/edited list
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
}
