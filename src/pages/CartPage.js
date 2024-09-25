import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { calculateTotals } from "../utils/calculate";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCartActions } from "../hooks/useCartActions";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";


const CartPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(5);

  // const navigate = useNavigate();

  const { state: cart } = useCartContext();
  const { state: currentUser } = useCurrentUserContext();
  const { checkout, remove, increment, decrement, isLoading, error } =
    useCartActions();

  useEffect(() => {
    const { subtotal, shippingCost, total } = calculateTotals(cart);
    setSubtotal(subtotal);
    setShippingCost(shippingCost);
    setTotal(total);
  }, [cart]);

  const orderDetails = {
    email: currentUser?.currentUser?.email,
    firstName: currentUser?.currentUser?.firstName,
    lastName: currentUser?.currentUser?.lastName,
    address: address,
    province: province,
    city: city,
    phone: phone,
    order: cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size
    }))
  };

  return (
    <main className="mx-auto w-[90%] max-w-[1026px]">
      <section className="py-16 md:py-28">
        <h2 className="font-extrabold tracking-tight text-2xl mb-6">
          Cart Page
        </h2>
        <form
          onSubmit={e => checkout(e, orderDetails)}
          className="md:flex gap-12"
        >
          <div>
            <h2 className="font-bold mb-3">Contact Information</h2>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-gray-500 mb-2 block text-sm font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="focus:ring-gray-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                readOnly
                value={currentUser?.currentUser?.email || ""}
              />
            </div>
            <hr className="mb-6" />
            <h2 className="font-semibold mb-3">Shipping Information</h2>
            <div className="flex flex-col gap-4 lg:flex-row mb-4">
              <div className="grow">
                <label
                  htmlFor="firstName"
                  className="text-gray-600 mb-2 block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="focus:ring-gray-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
                  readOnly
                  value={currentUser?.currentUser?.firstName || ""}
                />
              </div>
              <div className="grow">
                <label
                  htmlFor="lastName"
                  className="text-gray-600 mb-2 block text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="focus:ring-gray-600 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2 pointer-events-none bg-gray-50 text-gray-600"
                  readOnly
                  value={currentUser?.currentUser?.lastName || ""}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="text-gray-500 mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                className="focus:ring-gray-400 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row mb-4">
              <div className="grow">
                <label
                  htmlFor="province"
                  className="text-gray-600 mb-2 block text-sm font-medium"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  name="province"
                  className="focus:ring-gray-400 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
                  required
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                />
              </div>
              <div className="grow">
                <label
                  htmlFor="city"
                  className="text-gray-600 mb-2 block text-sm font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="focus:ring-gray-400 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="text-gray-500 mb-2 block text-sm font-medium"
              >
                Phone
              </label>
              <input
                type="text"
                name="contactNumber"
                className="focus:ring-gray-400 w-full outline-none ring-1 ring-gray-300 rounded px-5 py-2"
                pattern="^(\+?\d{1,2}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="grow md:min-w-[375px]">
            <h2 className="font-bold mb-3">Order Summary</h2>
            <div>
              {cart.map(item => (
                <div
                  key={uuidv4()}
                  className="flex gap-3 border-b border-b-gray-300 mb-6 pb-6"
                >
                  <div className="aspect-square w-[100px] rounded overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="block w-full h-full object-cover"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-700">{item.name}</p>
                      <button onClick={() => remove(item)} type="button">
                        <FaRegTrashAlt />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                    </p>
                    <p className="mb-6 text-gray-500 text-sm">
                      {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">
                        ${item.price}
                      </span>
                      <div className="flex gap-3 py-2 px-4 rounded border border-gray-300">
                        <button
                          disabled={
                            item.quantity === 1 ? true : false || isLoading
                          }
                          onClick={() => decrement(item)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={isLoading}
                          onClick={() => increment(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-b border-b-gray-300 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-700">Subtotal</p>
                  <span className="font-semibold text-lg text-gray-700">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <span className="font-semibold text-gray-700">
                    ${shippingCost}
                  </span>
                </div>
              </div>
              <div className="py-4 border-b border-b-gray-300 mb-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">Total</p>
                  <span className="font-semibold text-gray-700">${total}</span>
                </div>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="text-white bg-black hover:bg-gray-950 rounded py-3 px-6 w-full false"
              >
                {"Confirm Order"}
              </button>
              {error && <div>{error}</div>}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CartPage;
