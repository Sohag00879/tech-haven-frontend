export const addDecimals = (num:number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const updateCart = (state:any) => {
    // Calculate the items price
    state.itemsPrice = addDecimals(
      state.cartItems?.reduce((acc:number, item:{price:number, qty:number, finalPrice : string}) => acc +  item.qty *  (item.finalPrice
        ? Number(item.finalPrice)
        : item.price), 0)
    );
  
    // Calculate the shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  
    // Calculate the tax price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  
    // Calculate the total price
    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(0);
  
    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };