🛒 Amazon-Test E-commerce Project  

Built by Skino Josh (Uduakobong Ebong)  

This project is a recreation of the Amazon front-end experience, inspired by SuperSimpleDev's YouTube course. It marked the very first milestone in my JavaScript journey, where I started from zero — building a rock-paper-scissors game, a to-do list, and finally this e-commerce simulation.  

It was through this hands-on process that I discovered the joy of DOM manipulation, localStorage, loops, and making things feel interactive.  

> Big thanks to SuperSimpleDev for making JavaScript easy to learn and fun to explore!

---

🧠 Tech Stack  

- HTML5 + CSS3  
- JavaScript (ES6+)  
- LocalStorage API  

---

🔥 Features  

- 🛍 Product grid layout with static product data  
- ➕ Add to cart with quantity selector  
- 🧾 Order summary and placement logic  
- ❤ Wishlist toggle using localStorage  
- 🚚 Order tracking simulation with progress bar  
- 🧹 Clear cart / Reorder system  
- 📱 Responsive UI built without frameworks  
- ✨ Custom toast notifications (no alert() used!)

---

🚀 Live Demo  

[Try the Live Demo](https://skinojosh22.github.io/amazon-test/amazon.html)

---

🛠 How It Works (Code Overview)  

1. **HTML & CSS**  
   The page layout is built from scratch using semantic HTML. Products are displayed in a grid layout styled with CSS flexbox and media queries for mobile responsiveness.  

2. **JavaScript Core Logic**  
   - **Product Rendering:** JS dynamically creates product cards by looping through an array of objects.  
   - **Cart System:** When you click 'Add to cart', it updates a local cart object and saves it in localStorage.  
   - **Wishlist:** Items can be toggled to/from a wishlist, also saved using localStorage.  
   - **Order Flow:** There's logic to simulate placing an order and tracking delivery with a progress bar.  
   - **Toasts:** All actions (like add/remove) show animated toast messages instead of alert().  

---

💬 Final Note  

This may look simple, but it’s where I wrote some of my first real JavaScript. It’s proof that learning by building works — and I’ll always look back at this as the day everything clicked.  

Thanks for checking it out! 🙌

---

📦 What’s Coming Next  

This is just the beginning. I'm actively working on turning this into a fully functional e-commerce platform with **Supabase as the backend**. Here's what's planned:  

- 🔐 **Supabase Auth:** Separate sign-up and login systems for customers and sellers  
- 📦 **Supabase Database:** Replace static data with real-time product data  
- 🛒 **Buyers’ Dashboard:** Customers can browse by category, add items to cart, and checkout  
- 🛍 **Sellers’ Dashboard:** Authenticated sellers can upload products, images, and track sales  
- 🔍 **Search & Navigation:** A live search bar and category filters will help users find products faster  
- 🖼 **Image Upload:** Product images will be stored in Supabase Storage with preview and upload progress  
- 📊 **Order History:** Users will be able to view past orders, shipping status, and reorder  

This project will evolve into a real-world, cloud-connected marketplace — fully built in JavaScript, powered by Supabase.

