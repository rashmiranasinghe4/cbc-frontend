import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#F3E8F7] p-6">
			<div className="bg-white rounded-xl shadow-lg p-6">
				<h1 className="text-2xl font-bold text-[#2C183E] mb-6">
					Products Management
				</h1>

				{isLoading ? (
					<Loader />
				) : (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-[#F3E8F7] text-[#2C183E]">
									<th className="p-3">Image</th>
									<th className="p-3">ID</th>
									<th className="p-3">Name</th>
									<th className="p-3">Price</th>
									<th className="p-3">Category</th>
									<th className="p-3">Stock</th>
									<th className="p-3">Actions</th>
								</tr>
							</thead>

							<tbody>
								{products.map((product) => (
									<tr
										key={product.productId}
										className="border-b hover:bg-gray-50"
									>
										<td className="p-3">
											<img
												src={product.images?.[0]}
												alt={product.name}
												className="w-12 h-12 rounded-md object-cover"
											/>
										</td>

										<td className="p-3">{product.productId}</td>
										<td className="p-3 font-medium">{product.name}</td>
										<td className="p-3 text-[#7B3F8C] font-semibold">
											${product.price}
										</td>
										<td className="p-3">{product.category}</td>
										<td className="p-3">{product.stock}</td>

										<td className="p-3 flex gap-3">
											<BiEdit
												onClick={() =>
													navigate("/admin/updateProduct", { state: product })
												}
												className="text-white bg-[#7B3F8C] p-2 text-3xl rounded-full cursor-pointer"
											/>

											<BiTrash
												onClick={() => {
													const token = localStorage.getItem("token");
													if (!token) return navigate("/login");

													axios
														.delete(
															`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`,
															{ headers: { Authorization: `Bearer ${token}` } }
														)
														.then(() => {
															toast.success("Deleted");
															setIsLoading(true);
														})
														.catch(() => toast.error("Delete failed"));
												}}
												className="text-white bg-red-500 p-2 text-3xl rounded-full cursor-pointer"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<Link
				to="/admin/newProduct"
				className="fixed bottom-8 right-8 bg-[#7B3F8C] text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
			>
				<BiPlus className="text-2xl" />
			</Link>
		</div>
	);
}