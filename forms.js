// form
const form = document.querySelector('#form');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
// ///////////////////////////////////////////////////////////

// form2
const form2 = document.querySelector('#form_2');
const filterInput = document.querySelector('#filter');

// section with products
const sectionProducts = document.querySelector('#products');
const sectionText = document.createElement('h2');
sectionText.innerText = 'The cart is empty!';
sectionText.style = 'font-size: 40px; text-align: center';
sectionProducts.append(sectionText);
// //////////////////////////////////////////////////////////////

// button for sort
const sortBtn = document.querySelector('#sort_price');
// ///////////////////////////////////////////////////////////////

let products = [];
titleInput.setAttribute('required', 'true');
priceInput.setAttribute('required', 'true');

form.addEventListener('submit', event => {
  event.preventDefault();

  const title = titleInput.value.toLowerCase();

  products.push({ title: title, price: priceInput.value });

  newProducts(products);

  titleInput.value = '';
  priceInput.value = '';
});

function createNode(index, title, price) {
  let div = document.createElement('div');
  div.classList.add('product');
  let titleP = document.createElement('p');
  let priceP = document.createElement('p');

  titleP.innerText = title;
  priceP.innerText = price;

  let close = closeBtn();
  close.addEventListener('click', () => {
    close.removeEventListener('dblclick', () => {
      alert(title);
    });
    sectionProducts.removeChild(div);
    let result = [];
    if (products.length > 1) {
      for (let i = 0; i < products.length; i++) {
        if (i !== index) {
          result.push(products[i]);
        }
      }
    }
    products = result;
    if (!products.length) {
      sectionProducts.append(sectionText);
    }
  });

  div.append(titleP, priceP, close);

  div.addEventListener('mouseover', () => {
    close.style.opacity = '1';
  });
  div.addEventListener('mouseleave', () => {
    close.style.opacity = '0';
  });

  sectionProducts.append(div);
  div.addEventListener('dblclick', () => {
    alert(title);
  });
}

function newProducts(array) {
  sectionProducts.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    createNode(i, array[i].title, array[i].price);
  }
}

function closeBtn() {
  let btn = document.createElement('button');
  btn.innerText = 'X';
  btn.classList.add('close_btn');

  return btn;
}

form2.addEventListener('submit', event => {
  event.preventDefault();
  let filterValue = filterInput.value;
  filterValue.toLowerCase();
  // sectionProducts.innerHTML = '';
  // for (let i = 0; i < products.length; i++) {
  //   if (products[i].title === filterValue) {
  //     createNode(i, products[i].title, products[i].price);
  //   }
  // }

  let filteredArray = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === filterValue) {
      filteredArray.push(products[i]);
    }
  }
  newProducts(filteredArray);
});

// let clickCounter = 0;
// sortBtn.addEventListener('click', () => {
// sort
//   clickCounter++;
//   if (clickCounter % 2 !== 0) {
//     products.sort((a, b) => a.price - b.price);
//     newProducts(products);
//   } else if (clickCounter % 2 === 0) {
//     products.sort((a, b) => b.price - a.price);
//     newProducts(products);
//     console.log(clickCounter);
//   }
// });

// 2 solution

let counter = true;
sortBtn.addEventListener('click', () => {
  if (counter) {
    products.sort((a, b) => a.price - b.price);
    newProducts(products);
  } else {
    products.sort((a, b) => b.price - a.price);
    newProducts(products);
  }
  counter = counter === true ? false : true;
});
