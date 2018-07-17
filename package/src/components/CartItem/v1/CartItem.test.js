import React from "react";
import renderer from "react-test-renderer";
import CartItem from "./CartItem";

test("basic snapshot with empty props", () => {
  const component = renderer.create(<CartItem item={{ price: { displayAmount: "$9.99" } }} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot with props", () => {
  const mockItem = {
    attributes: [
      { label: "Color", value: "Red" },
      { label: "Size", value: "Medium" }
    ],
    compareAtPrice: {
      displayAmount: "$45.00"
    },
    currentQuantity: 3,
    imageURLs: {
      small: "//placehold.it/150",
      thumbnail: "//placehold.it/100"
    },
    price: {
      displayAmount: "$20.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "A Great Product",
    quantity: 2
  };
  const mockComponents = {
    CartItemDetailComponent: () => "Cart Item Detail",
    CartItemStockWarningComponent: () => "Cart Item Stock Warning",
    CartItemPriceComponent: () => " Cart Item Price",
    CartItemQuantityInputComponent: () => "Cart Item Quantity Input"
  };
  const component = renderer.create(<CartItem components={mockComponents} item={mockItem} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});