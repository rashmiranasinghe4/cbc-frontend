import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
	const [cart, setCart] = useState(getCart());
	const navigate = useNavigate();
	console.log(cart);
	return (
	<div
		className="min-h-screen w-full bg-[#F3E8F7] flex flex-col items-center py-10 px-4"
	>

		{/* CART ITEMS */}
		{cart.map((item) => (
			<div
				key={item.productId}
				className="w-full max-w-4xl bg-white rounded-xl shadow-md flex items-center p-4 gap-4 mb-4"
			>

				<img
					src={item.image}
					className="w-20 h-20 object-cover rounded-lg border"
				/>

				<div className="flex-1">
					<p className="font-bold text-[#2C183E]">{item.name}</p>
					<p className="text-sm text-gray-500">
						{item.price.toLocaleString("en-US")}
					</p>
				</div>

				{/* QTY */}
				<div className="flex items-center gap-2">

					<button
						className="w-8 h-8 bg-[#7B3F8C] text-white rounded"
						onClick={() => {
							addToCart(item, -1);
							setCart(getCart());
						}}
					>
						-
					</button>

					<span>{item.quantity}</span>

					<button
						className="w-8 h-8 bg-[#7B3F8C] text-white rounded"
						onClick={() => {
							addToCart(item, 1);
							setCart(getCart());
						}}
					>
						+
					</button>

				</div>

				{/* TOTAL */}
				<div className="font-bold text-[#7B3F8C] w-24 text-right">
					{(item.quantity * item.price).toLocaleString("en-US")}
				</div>

				{/* DELETE */}
				<button
					className="text-red-600 hover:text-red-800"
					onClick={() => {
						addToCart(item, -item.quantity);
						setCart(getCart());
					}}
				>
					<TbTrash />
				</button>

			</div>
		))}

		{/* TOTAL BAR */}
		<div className="w-full max-w-4xl bg-white rounded-xl shadow p-4 flex justify-between items-center">

			<button
				onClick={() => navigate("/checkout", { state: { items: cart } })}
				className="bg-[#2C183E] text-white px-6 py-2 rounded-lg hover:bg-[#7B3F8C]"
			>
				Checkout
			</button>

			<span className="font-bold text-lg text-[#2C183E]">
				Total: {getTotal().toLocaleString("en-US")}
			</span>

		</div>

	</div>
);
}