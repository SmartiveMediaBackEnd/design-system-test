import { useState } from "react";
import { ToggleSwitch } from "src/app/components/optimized";
import { getImageUrl } from "src/app/utils";
import { AddBgIcon, DownIcon, MoreIcon, MoveIcon } from "src/app/utils/icons";

/**
 * @param {object} props - Props for the ProductCategory component
 * @param {string} props.imageUrl - The URL of the image for the product category
 * @param {string} props.title - The title of the product
 * @param {string} props.category - The category of the product
 * @param {number} props.quantity - The quantity of the product
 * @param {string} props.price - The price of the product
 */

const ProductCategory = ({ imageUrl, title, category, quantity, price }) => {
  const [availability, setAvailability] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the availability of the product
  const availabilityHandler = () => {
    setAvailability(!availability);
  };

  // Toggle the opening and closing of additional details
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-3 grid grid-cols-12 ">
      {/* [1] */}
      <div className="gap-[6px] col-span-4 flex">
        <div className="flex items-center cursor-grab">
          <MoveIcon className="fill-subtitle" />
        </div>
        <div className="flex-1 flex gap-3">
          <div className="size-10 rounded-lg border border-light-2 overflow-hidden">
            <img
              src={getImageUrl(imageUrl)}
              alt={title}
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-around">
            <h2 className="title">{title}</h2>
            <p className="paragraph text-subtitle">{category}</p>
          </div>
        </div>
      </div>
      {/* [2] */}
      <div className="col-span-5 grid grid-cols-3">
        <p className="paragraph">{quantity}</p>
        <p className="paragraph">{price}</p>
        <div className="flex items-start gap-[5px]">
          <ToggleSwitch onSwitch={availabilityHandler} />
        </div>
      </div>
      {/* [3] */}
      <div className="flex gap-3 col-span-2 justify-center items-start">
        <button>
          <AddBgIcon className="fill-subtitle" />
        </button>
        <button>
          <MoreIcon className="fill-subtitle" />
        </button>
      </div>
      {/* [4] */}
      <button
        className=" flex justify-self-end items-center"
        onClick={toggleOpen}
      >
        <DownIcon
          className={`fill-subtitle transition-all ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default ProductCategory;

// Default props
ProductCategory.defaultProps = {
  imageUrl: "images/Vector.svg", // Default image URL
  title: "Product 1", // Default product title
  category: "Category 1", // Default product category
  quantity: 10, // Default product quantity
  price: "$100", // Default product price
};

// Usage Example:
// import React from "react";
// import { ProductCategory } from "./ProductCategory";
//
// const ParentComponent = () => {
//   const demoData = [
//     {
//       imageUrl: "image-url-1",
//       title: "Product 1",
//       category: "Category 1",
//       quantity: 10,
//       price: "$100",
//     },
//     {
//       imageUrl: "image-url-2",
//       title: "Product 2",
//       category: "Category 2",
//       quantity: 20,
//       price: "$200",
//     },
//   ];
//   return (
//     <div>
//       {demoData.map((data, index) => (
//         <ProductCategory key={index} {...data} />
//       ))}
//     </div>
//   );
// };
//
// export default ParentComponent;
