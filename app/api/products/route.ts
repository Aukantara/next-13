import { Product } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Product = await request.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            brandId: body.brandId
        }
    })
    return NextResponse.json(product, { status: 201 }); 
}