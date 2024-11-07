document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = ''; // Clear the cart items
        let total = 0;
    
        cart.forEach((item, index) => {
            if (item.quantity > 0) {
                const li = document.createElement('li');
                li.classList.add('cart-item');
    
                // Add item image
                const itemImage = document.createElement('img');
                itemImage.src = item.image;
                itemImage.alt = item.name;
                itemImage.classList.add('cart-item-image');
    
                const itemDetails = document.createElement('span');
                itemDetails.textContent = `${item.name} PHP ${item.price} Quantity: ${item.quantity}`;
    
                // Add "Add" button
                const addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.classList.add('quantity-button');
                addButton.addEventListener('click', () => {
                    item.quantity += 1; // Increase quantity
                    updateCart(); // Recalculate totals with new quantity
                });
    
                // Add "Remove" button
                const removeButton = document.createElement('button');
                removeButton.textContent = '-';
                removeButton.classList.add('quantity-button');
                removeButton.addEventListener('click', () => {
                    if (item.quantity > 0) {
                        item.quantity -= 1; // Decrease quantity
                        if (item.quantity === 0) {
                            cart.splice(index, 1); // Remove item if quantity is zero
                        }
                        updateCart(); // Recalculate totals with new quantity
                    }
                });
    
                // Append elements to the list item
                li.appendChild(itemImage);
                li.appendChild(itemDetails);
                li.appendChild(addButton);
                li.appendChild(removeButton);
                cartItems.appendChild(li);
    
                total += item.price * item.quantity;
            }
        });
    
        cartTotal.textContent = total.toFixed(2);
    }
    

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            const itemImage = button.getAttribute('data-image');
            
            console.log('Item Image:', itemImage);
            // Check if item is already in the cart
            const existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item is in the cart
            } else {
                // Add new item with quantity 1
                cart.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
            }

            updateCart();
            alert(`${itemName} added to cart!`);
        });
    });

    cartButton.addEventListener('click', () => {
        updateCart(); // Update cart each time it opens
        cartSidebar.classList.add('open'); // Slide in sidebar
    });

    closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove('open'); // Slide out sidebar
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your purchase!');
            cart.length = 0;  // Clear cart
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });

    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            header.style.top = "-80px"; // Adjust this value to the header height
        } else {
            // Scrolling up
            header.style.top = "0";
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
});
