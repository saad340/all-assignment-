async function getData() {
  let data = await fetch("https://dummyjson.com/products");
  let jsonData = await data.json();
  let { products } = jsonData;

  let allCards = document.getElementById("card_1");

  let cardsHTML = products
    .map((product) => {
      let { title, description, price, images } = product;
      return `
        <div class="col">
            <div class="card h-100">
                <img src="${images[0]}" class="card-img-top" alt="${title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description.slice(0, 100)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success fs-5">$${price}</span>
                        <a href="#" class="btn btn-sm btn-outline-primary">Buy Now</a>
                        <a href="./production/index.html?id=${product.id}" target="_blank" class="btn btn-sm btn-outline-secondary">View Details</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    .join("");

  // Wrap all cards in one Bootstrap row
  allCards.innerHTML = `
        <div class="row row-cols-1 row-cols-md-4 g-4">
            ${cardsHTML}
        </div>
    `;

  console.log(jsonData);
}

getData();




function showLogin(){
  let showLog =  document.getElementById("authContainer")
  showLog.style.display = showLog.style.display === "none" ? "block" : "none"
}
showLogin()



class Person {
    fullName
    email
    password
    constructor(fullName, email, password) {
        this.fullName = fullName,
            this.email = email,
            this.password = password
    }
}
let users = JSON.parse(localStorage.getItem("users")) || []
let userName = document.getElementById("username")
let userEmail = document.getElementById("useremail")

function registerUser(event) {
    event.preventDefault()

    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    let usersFromStorage = JSON.parse(localStorage.getItem("users")) || []; 

    let savedUser = usersFromStorage.find((element) => element.email === email.value)

    if (savedUser?.email) {
        alert("user already register he ")
    } else {
        let newUser = new Person(fullName.value, email.value, password.value)
        usersFromStorage.push(newUser)
        localStorage.setItem("users", JSON.stringify(usersFromStorage))
    }

    fullName.value = ""
    email.value = ""
    password.value = ""
}


function loginUser(event) {
    event.preventDefault()
    let email = document.getElementById("loginEmail")
    let password = document.getElementById("loginPassword")
    let usersFromStorage = JSON.parse(localStorage.getItem("users"))
    let savedUser = usersFromStorage.find((element) => element.email === email.value)

    if (savedUser?.email === email.value && savedUser?.password === password.value) {
        alert("you have logged in successfully!")
        localStorage.setItem("loggedinUser" , JSON.stringify(savedUser))
        userName.innerHTML = savedUser.fullName
        userEmail.innerHTML = savedUser.email
    } else {
        alert("Invalid credientials")
    }
    email.value = ""
    password.value = ""

}

function logoutUser(){
    localStorage.removeItem("loggedinUser")
     userName.innerHTML = ''
        userEmail.innerHTML = ''
}