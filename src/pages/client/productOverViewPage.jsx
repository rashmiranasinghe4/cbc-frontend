import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";




export default function ProductOverViewPage() {

	const params = useParams();
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();
	const [status, setStatus] = useState("loading"); //loading, success, error

	useEffect(() => {
        if (status === "loading") {
			axios
				.get(
					import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`
				)
				.then((res) => {
					setProduct(res.data);
					setStatus("success");
				})
				.catch(() => {
					setStatus("error");
				});
		}
	}, [status]);

	return (
	<div className="min-h-screen bg-[#F3E8F7] flex items-center justify-center p-6">

		{status === "loading" && <Loader />}

		{status === "error" && (
			<div className="text-red-600 font-semibold">
				Error loading product
			</div>
		)}

		{status === "success" && (
			<div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-8">

				{/* TITLE MOBILE */}
				<h1 className="text-2xl font-bold text-[#2C183E] md:hidden text-center">
					{product.name}
					<span className="font-light text-gray-500 ml-2">
						{product.altNames.join(" | ")}
					</span>
				</h1>

				{/* IMAGE */}
				<div className="w-full md:w-1/2 flex justify-center items-center">
					<ImageSlider images={product.images} />
				</div>

				{/* DETAILS */}
				<div className="w-full md:w-1/2 flex flex-col justify-center gap-4">

					{/* TITLE DESKTOP */}
					<h1 className="hidden md:block text-3xl font-bold text-[#2C183E]">
						{product.name}
						<span className="font-light text-gray-500 ml-2">
							{product.altNames.join(" | ")}
						</span>
					</h1>

					<p className="text-gray-600">{product.description}</p>

					{/* PRICE */}
					<div className="text-center md:text-left">

						{product.labelledPrice > product.price ? (
							<div className="flex gap-4 items-center">
								<span className="line-through text-gray-400 text-xl">
									{product.labelledPrice.toLocaleString("en-LK", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>

								<span className="text-3xl font-bold text-[#7B3F8C]">
									{product.price.toLocaleString("en-LK", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
						) : (
							<span className="text-3xl font-bold text-[#7B3F8C]">
								{product.price.toLocaleString("en-LK", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						)}

					</div>

					{/* BUTTONS */}
					<div className="flex gap-4 mt-4">

						<button
							onClick={() => {
								navigate("/checkout", {
									state: {
										items: [
											{
												productId: product.productId,
												quantity: 1,
												name: product.name,
												image: product.images[0],
												price: product.price,
											},
										],
									},
								});
							}}
							className="flex-1 h-12 rounded-xl bg-[#2C183E] text-white hover:bg-[#7B3F8C] transition"
						>
							Buy Now
						</button>

						<button
							className="flex-1 h-12 rounded-xl bg-[#7B3F8C] text-white hover:bg-[#5a2a68] transition"
							onClick={() => {
								addToCart(product, 1);
								toast.success("Added to cart");
							}}
						>
							Add to Cart
						</button>

					</div>

				</div>

			</div>
		)}
	</div>
);
}