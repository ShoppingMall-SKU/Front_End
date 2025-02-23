import React, {useState} from "react";
import MyOrderList from "./myOrderList";
interface Order {
    date: string;
    ordernumber: string;
    brand: string;
    productname: string;
    quantity: number;
    price: number;
    status: string;
}


