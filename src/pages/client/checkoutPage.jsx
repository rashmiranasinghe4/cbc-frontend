import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setName(res.data.firstName + " " + res.data.lastName);
          console.log(user);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch user details");
          //navigate("/login");
        });
    }
  }, []);

  const [cart, setCart] = useState(location.state.items || []);
  if (location.state.items == null) {
    toast.error("Please select items to checkout");
    navigate("/products");
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
     if (name === "" || address === "" || phone === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const order = {
      address: address,
      phone: phone,
      items: [],
    };
    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        qty: item.quantity,
      });
    });

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
      return;
    }
  }

  console.log(cart);
  return (
	<div className="min-h-screen bg-[#F3E8F7] flex flex-col items-center py-10 px-4 gap-6">

		{/* CART ITEMS */}
		{cart.map((item, index) => (
			<div
				key={item.productId}
				className="w-full max-w-4xl bg-white rounded-xl shadow-md flex items-center p-4 gap-4"
			>

				{/* IMAGE */}
				<img
					src={item.image}
					className="w-20 h-20 object-cover rounded-lg border"
				/>

				{/* NAME */}
				<div className="flex-1">
					<p className="font-bold text-[#2C183E]">{item.name}</p>
					<p className="text-gray-500">
						{item.price.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</div>

				{/* QTY */}
				<div className="flex items-center gap-2">

					<button
						className="w-8 h-8 bg-[#7B3F8C] text-white rounded"
						onClick={() => {
							const newCart = [...cart];
							newCart[index].quantity -= 1;
							if (newCart[index].quantity <= 0) newCart.splice(index, 1);
							setCart(newCart);
						}}
					>
						-
					</button>

					<span>{item.quantity}</span>

					<button
						className="w-8 h-8 bg-[#7B3F8C] text-white rounded"
						onClick={() => {
							const newCart = [...cart];
							newCart[index].quantity += 1;
							setCart(newCart);
						}}
					>
						+
					</button>

				</div>

				{/* TOTAL */}
				<div className="font-bold text-[#7B3F8C]">
					{(item.quantity * item.price).toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</div>

				{/* DELETE */}
				<button
					className="text-red-600 hover:text-red-800"
					onClick={() => {
						const newCart = [...cart];
						newCart.splice(index, 1);
						setCart(newCart);
					}}
				>
					<TbTrash />
				</button>

			</div>
		))}

		{/* TOTAL BOX */}
		<div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow flex justify-between items-center">

			<span className="text-xl font-bold text-[#2C183E]">
				Total: {getTotal().toLocaleString("en-US")}
			</span>

			<button
				onClick={placeOrder}
				className="bg-[#2C183E] text-white px-6 py-2 rounded-lg hover:bg-[#7B3F8C]"
			>
				Place Order
			</button>

		</div>

		{/* INPUTS */}
		<div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3">

			<input
				className="flex-1 border p-2 rounded"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<input
				className="flex-1 border p-2 rounded"
				placeholder="Address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>

			<input
				className="flex-1 border p-2 rounded"
				placeholder="Phone"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>

		</div>

	</div>
);
}