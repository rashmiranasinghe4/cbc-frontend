
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function UpdateProductPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [productId] = useState(location.state.productId);
	const [productName, setProductName] = useState(location.state.name);
	const [alternativeNames, setAlternativeNames] = useState(
		location.state.altNames.join(",")
	);
	const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
	const [price, setPrice] = useState(location.state.price);
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState(location.state.description);
	const [stock, setStock] = useState(location.state.stock);
	const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
	const [category, setCategory] = useState(location.state.category);

	async function handleSubmit() {
		const uploads = [];
		for (let i = 0; i < images.length; i++) {
			uploads.push(uploadFile(images[i]));
		}

		const responses = await Promise.all(uploads);

		const productData = {
			productId,
			name: productName,
			altNames: alternativeNames.split(",").map((n) => n.trim()),
			labelledPrice,
			price,
			images: responses.length ? responses : location.state.images,
			description,
			stock,
			isAvailable,
			category,
		};

		const token = localStorage.getItem("token");
		if (!token) return navigate("/login");

		axios
			.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
				productData,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(() => {
				toast.success("Updated successfully");
				navigate("/admin/products");
			})
			.catch(() => toast.error("Update failed"));
	}

	const inputClass =
		"w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#7B3F8C]";

	return (
		<div className="min-h-screen bg-[#F3E8F7] flex justify-center items-center p-6">
			<div className="bg-white w-[650px] rounded-xl shadow-xl p-8 flex flex-wrap gap-4">
				<h2 className="text-xl font-bold text-[#2C183E] w-full">
					Update Product
				</h2>

				<input disabled value={productId} className={inputClass} />

				<input
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className={inputClass}
					placeholder="Product Name"
				/>

				<input
					value={alternativeNames}
					onChange={(e) => setAlternativeNames(e.target.value)}
					className={inputClass}
					placeholder="Alt Names"
				/>

				<input
					type="number"
					value={labelledPrice}
					onChange={(e) => setLabelledPrice(e.target.value)}
					className={inputClass}
				/>

				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className={inputClass}
				/>

				<input
					type="file"
					multiple
					onChange={(e) => setImages(e.target.files)}
					className={inputClass}
				/>

				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className={inputClass}
				/>

				<input
					type="number"
					value={stock}
					onChange={(e) => setStock(e.target.value)}
					className={inputClass}
				/>

				<select
					value={isAvailable}
					onChange={(e) => setIsAvailable(e.target.value === "true")}
					className={inputClass}
				>
					<option value="true">Available</option>
					<option value="false">Not Available</option>
				</select>

				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className={inputClass}
				>
					<option value="cream">Cream</option>
					<option value="face wash">Face Wash</option>
					<option value="soap">Soap</option>
					<option value="fragrance">Fragrance</option>
				</select>

				<div className="flex gap-4 w-full mt-4">
					<Link
						to="/admin/products"
						className="flex-1 text-center py-2 border rounded-lg"
					>
						Cancel
					</Link>

					<button
						onClick={handleSubmit}
						className="flex-1 bg-[#7B3F8C] text-white rounded-lg"
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
}