import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient();
const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return res;
};

const getBrands = () => {
  const res = prisma.brand.findMany();
  return res;
};
const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <th>{product.title}</th>
              <th>{product.price}</th>
              <th>{product.brand.name}</th>
              <th className="flex justify-center space-x-1">
                <UpdateProduct brands={brands} product={product} />
                <DeleteProduct product={product} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
