const API_URL = "http://localhost:5238/api/products"; 

// DOM setup elements
const dashboardPage = document.getElementById("page-dashboard");
const formPage = document.getElementById("page-form");
const tableBody = document.getElementById("inventory-table-body");
const productForm = document.getElementById("product-form");

const inputId = document.getElementById("product-id");
const inputName = document.getElementById("product-name");
const inputCategory = document.getElementById("product-category");
const inputPrice = document.getElementById("product-price");
const inputQuantity = document.getElementById("product-quantity");
const formTitle = document.getElementById("form-title");

document.getElementById("btn-nav-add")?.addEventListener("click", () => openFormPage());
document.getElementById("btn-cancel")?.addEventListener("click", () => showDashboard());
productForm.addEventListener("submit", handleFormSubmit);

window.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load records.");
        const products = await response.json();
        renderTable(products);
    } catch (error) {
        console.error("Fetch API failure:", error);
    }
}

function renderTable(products) {
    tableBody.innerHTML = "";
    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#6c757d;">No products found in inventory database.</td></tr>`;
        return;
    }

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${escapeHtml(product.name)}</strong></td>
            <td>${escapeHtml(product.category)}</td>
            <td>$${Number(product.price).toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn btn-primary" onclick="editProduct('${product.id}')" style="padding:0.25rem 0.6rem; font-size:0.85rem;">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${product.id}')" style="padding:0.25rem 0.6rem; font-size:0.85rem;">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function validateForm() {
    let isValid = true;
    document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

    if (!inputName.value.trim()) {
        document.getElementById("err-name").textContent = "Product name is required.";
        isValid = false;
    }
    if (!inputCategory.value.trim()) {
        document.getElementById("err-category").textContent = "Category is required.";
        isValid = false;
    }
    
    const priceVal = parseFloat(inputPrice.value);
    if (isNaN(priceVal) || priceVal <= 0) {
        document.getElementById("err-price").textContent = "Price must be greater than 0.";
        isValid = false;
    }

    const qtyVal = parseInt(inputQuantity.value);
    if (isNaN(qtyVal) || qtyVal < 0) {
        document.getElementById("err-quantity").textContent = "Quantity cannot be negative.";
        isValid = false;
    }

    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const id = inputId.value;
    const payload = {
        name: inputName.value.trim(),
        category: inputCategory.value.trim(),
        price: parseFloat(inputPrice.value),
        quantity: parseInt(inputQuantity.value)
    };

    if (id) {
        payload.id = id;
    }

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            productForm.reset();
            showDashboard();
            await fetchProducts();
        } else {
            alert("An error occurred while saving the data.");
        }
    } catch (error) {
        console.error("Form Submit Error:", error);
    }
}

async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) return;
        const product = await response.json();
        openFormPage(product);
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product item?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
            await fetchProducts();
        }
    } catch (error) {
        console.error("Deletion error connection:", error);
    }
}

// Visual navigation toggles
function openFormPage(product) {
    dashboardPage.classList.add("hidden");
    formPage.classList.remove("hidden");
    document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

    if (product) {
        formTitle.textContent = "Edit Product";
        inputId.value = product.id || "";
        inputName.value = product.name;
        inputCategory.value = product.category;
        inputPrice.value = product.price.toString();
        inputQuantity.value = product.quantity.toString();
    } else {
        formTitle.textContent = "Add Product";
        inputId.value = "";
        productForm.reset();
    }
}

function showDashboard() {
    formPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Maps directly to inline click variables
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;