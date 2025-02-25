// import PlaceOrder from "./PlaceOrder";

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),
//   };

//   const errors = {};

//   const newOrder = await PlaceOrder(order);

//   //deactivates some of the redux optimizations(DO NOT OVERUSE)
//   store.dispatch(clearCart());

//   return redirect(`/order/${newOrder.id}`);
// }
