import React from "react";
import './ViewProducts.css';

const ViewProducts = () => {
  return (
    <div className="view-product">
      <div className="view-products-container">
        <h1>View Products</h1>

        <div className="grid-products-slides">
          {/* Left Section - Small Preview Images */}
          <div className="left">
            <img src="https://i.ibb.co/pBbXch3D/tama.jpg" alt="Product view 1" />
            <img src="https://i.ibb.co/pBbXch3D/tama.jpg" alt="Product view 2" />
            <img src="https://i.ibb.co/pBbXch3D/tama.jpg" alt="Product view 3" />
            <img src="https://i.ibb.co/pBbXch3D/tama.jpg" alt="Product view 4" />
          </div>

          {/* Middle Section - Main Product Image */}
          <div className="middle">
            <img src="https://i.ibb.co/pBbXch3D/tama.jpg" alt="Main product" />
          
          <div className="sizes">
             <label htmlFor="size">Size:</label>
           <ul className="size-options">
            <li>S</li>
            <li>M</li>
            <li>L</li>
            <li>XL</li>
            <li>XXL</li>
            <li>3XL</li>
            <li>Custom</li>
           </ul>
          </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="right">
            <p className="product-name">Venkatagiri Handloom Saree</p>
            <p className="product-price">₹1,999</p>
            <p className="product-description">
              Pure cotton handloom saree made in Venkatagiri with traditional patterns and smooth texture.
            </p>
            <p className="product-color">Color: Sky Blue</p>
            <p className="product-material">Material: Cotton</p>

           

            <div className="separates">
              <button className="btn add-cart">Add to Cart</button>
              <button className="btn buy-now">Buy Now</button>
            </div>

            <div className="contact-buttons">
              <button className="btn whatsapp">WhatsApp</button>
              <button className="btn call">Call Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
