// Gestion du menu responsive
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});
// Ajout au panier
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        // Récupérer les éléments actuels du panier dans le localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Ajouter le nouveau produit au panier
        cart.push({ name: productName, price: productPrice });
        // Stocker le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Afficher une alerte
        alert(`${productName} a été ajouté au panier!`);
    });
});

// Affichage du panier
document.getElementById('Cart').addEventListener('click', () => {
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    // Vider le contenu actuel du panier
    cartItems.innerHTML = '';
    // Récupérer le panier du localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Variable pour calculer le total
    let total = 0;
    // Générer le HTML pour chaque produit
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        // Calculer le total
        total += parseFloat(item.price);
    });
    // Afficher le total
    cartTotal.textContent = total.toFixed(2);
    // Afficher le conteneur du panier
    cartContent.style.display = 'block';
});
// fermeture du panier
// Sélectionner le bouton pour fermer le panier
const closeCartButton = document.getElementById('close-cart');
// Ajouter un événement de clic pour fermer le panier
closeCartButton.addEventListener('click', () => {
    document.getElementById('cart-content').style.display = 'none';
});
// J'ai ajouté un évenement au scroll pour que le panier se ferme
window.addEventListener('scroll',() => {   
    document.getElementById('cart-content').style.display = 'none';
});
// Sélectionner le bouton pour vider le panier
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    // Vider le localStorage
    localStorage.removeItem('cart');
    // Mettre à jour l'affichage du panier
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total').textContent = '0.00';
});
// Sélectionner le bouton pour valider la commande
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    // Vérifier si le panier n'est pas vide dans le localStorage
    if (localStorage.getItem('cart')) {
        // Générer un ID aléatoire pour le bon de commande (juste pour l'exemple)
        const orderId = Math.floor(Math.random() * 1000000);
        // Afficher un message avec l'ID de commande
        alert(`Commande validée! Numéro de commande: ${orderId}`);
        // Vider le localStorage
        localStorage.removeItem('cart');
        // Mettre à jour l'affichage du panier
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('cart-total').textContent = '0.00';
    } else {
        // Si le panier est vide, afficher un message d'erreur ou une notification
        alert("Votre panier est vide. Ajoutez des articles avant de valider la commande.");
    }
});