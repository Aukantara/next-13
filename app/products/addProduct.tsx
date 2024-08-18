"use client";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", {
        title: title,
        price: Number(price),
        brandId: Number(brand),
      });
      setTitle("");
      setPrice("");
      setBrand("");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message: ', error.message);
        // You can show this message in the UI or do further debugging
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };
    
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn">
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
