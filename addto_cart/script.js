document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
  
    // Function to fetch and display products
    function displayProducts() {
      // Clear the product list
      productList.innerHTML = "";
  
      // Fetch products from the API
      fetch("https://crudcrud.com/api/e0515d6f7f6f48fb9bfacd4859085f34/products")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((product) => {
            const productBox = document.createElement("div");
            productBox.classList.add("product-box");
            productBox.dataset.id = product._id; // Store the product ID as a data attribute
  
            const productName = document.createElement("p");
            productName.textContent = `Name: ${product.name}`;
  
            const productPrice = document.createElement("p");
            productPrice.textContent = `Price: $${product.price}`;
  
            const productCategory = document.createElement("p");
            productCategory.textContent = `Category: ${product.category}`;
  
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
              // Call the deleteProduct function with the product ID
              deleteProduct(product._id);
            });
  
            productBox.appendChild(productName);
            productBox.appendChild(productPrice);
            productBox.appendChild(productCategory);
            productBox.appendChild(deleteButton);
  
            productList.appendChild(productBox);
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  
    // Call the displayProducts function on page load
    displayProducts();
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get the product data from the form
      const productName = document.getElementById("product-name").value;
      const productPrice = parseFloat(document.getElementById("product-price").value);
      const productCategory = document.getElementById("product-category").value;
  
      // Create a JavaScript object with the product data
      const productData = {
        name: productName,
        price: productPrice,
        category: productCategory,
      };
  
      // Send a POST request to the API
      fetch("https://crudcrud.com/api/e0515d6f7f6f48fb9bfacd4859085f34/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add the newly created product to the product list
          const productBox = document.createElement("div");
          productBox.classList.add("product-box");
          productBox.dataset.id = data._id; // Store the product ID as a data attribute
  
          const productName = document.createElement("p");
          productName.textContent = `Name: ${data.name}`;
  
          const productPrice = document.createElement("p");
          productPrice.textContent = `Price: $${data.price}`;
  
          const productCategory = document.createElement("p");
          productCategory.textContent = `Category: ${data.category}`;
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", () => {
            // Call the deleteProduct function with the product ID
            deleteProduct(data._id);
          });
  
          productBox.appendChild(productName);
          productBox.appendChild(productPrice);
          productBox.appendChild(productCategory);
          productBox.appendChild(deleteButton);
  
          productList.appendChild(productBox);
  
          // Clear the form fields
          document.getElementById("product-name").value = "";
          document.getElementById("product-price").value = "";
          document.getElementById("product-category").value = "";
        })
        .catch((error) => {
          console.error("Error saving the product:", error);
        });
    });
  
    // Function to delete a product by ID
    function deleteProduct(productId) {
      // Send a DELETE request to the API
      fetch(`https://crudcrud.com/api/e0515d6f7f6f48fb9bfacd4859085f34/products/${productId}`, {
        method: "DELETE",
      })
        .then(() => {
          // Remove the deleted product from the product list
          const productToDelete = document.querySelector(`[data-id="${productId}"]`);
          if (productToDelete) {
            productList.removeChild(productToDelete);
          }
        })
        .catch((error) => {
          console.error("Error deleting the product:", error);
        });
    }
  });
  