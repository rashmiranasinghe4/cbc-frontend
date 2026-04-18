
// same style as update page (clean + consistent)

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AddProductAdminPage() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		productId: "",
		name: "",
		altNames: "",
		labelledPrice: "",
		price: "",
		description: "",
		stock: "",
		isAvailable: true,
		category: "cream",
	});

	const [images, setImages] = useState([]);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	async function handleSubmit() {
		const uploads = Array.from(images).map(uploadFile);
		const responses = await Promise.all(uploads);

		const token = localStorage.getItem("token");
		if (!token) return navigate("/login");

		const data = {
			...form,
			altNames: form.altNames.split(",").map((n) => n.trim()),
			images: responses,
		};

		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, data, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				toast.success("Product added");
				navigate("/admin/products");
			})
			.catch(() => toast.error("Failed"));
	}

	const inputClass =
		"w-full border border-gray-300 rounded-lg p-2 focus:border-[#7B3F8C]";

	return (
		<div className="min-h-screen bg-[#F3E8F7] flex justify-center items-center p-6">
			<div className="bg-white w-[650px] p-8 rounded-xl shadow-xl flex flex-wrap gap-4">
				<h2 className="text-xl font-bold text-[#2C183E] w-full">
					Add Product
				</h2>

				<input name="productId" onChange={handleChange} className={inputClass} placeholder="ID" />
				<input name="name" onChange={handleChange} className={inputClass} placeholder="Name" />
				<input name="altNames" onChange={handleChange} className={inputClass} placeholder="Alt Names" />
				<input name="labelledPrice" onChange={handleChange} className={inputClass} placeholder="Labelled Price" />
				<input name="price" onChange={handleChange} className={inputClass} placeholder="Price" />

				<input type="file" multiple onChange={(e) => setImages(e.target.files)} className={inputClass} />

				<textarea name="description" onChange={handleChange} className={inputClass} />

				<input name="stock" onChange={handleChange} className={inputClass} />

				<select name="category" onChange={handleChange} className={inputClass}>
					<option value="cream">Cream</option>
					<option value="face wash">Face Wash</option>
					<option value="soap">Soap</option>
					<option value="fragrance">Fragrance</option>
				</select>

				<div className="flex gap-4 w-full mt-4">
					<Link to="/admin/products" className="flex-1 border rounded-lg text-center py-2">
						Cancel
					</Link>

					<button onClick={handleSubmit} className="flex-1 bg-[#7B3F8C] text-white rounded-lg">
						Add
					</button>
				</div>
			</div>
		</div>
	);
}