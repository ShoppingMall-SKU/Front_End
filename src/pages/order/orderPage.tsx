import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OrderFormComp from "./orderFormComp";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  deliveryFee: number;
}

const OrderPage = () => {
  const location = useLocation();
  const items: OrderItem[] = location.state?.items || [];

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalShipping = items.reduce((sum, item) => sum + item.deliveryFee, 0);
  const finalPrice = totalPrice + totalShipping;

  // 주소 상태를 여기서 관리
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">주문 / 결제</h1>
      <OrderFormComp address={address} setAddress={setAddress} setPostcode={setPostcode} />

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">배송지</h2>
          <span className="text-sm text-gray-400">
            <span className="text-red-500">*</span> 필수입력사항
          </span>
        </div>

        <div className="grid grid-cols-[7rem_1fr] gap-y-4 gap-x-4">
          {/* 받는사람 */}
          <label className="text-sm font-semibold flex items-center">
            받는사람 <span className="text-red-500 ml-1">*</span>
          </label>
          <input className="input input-bordered w-full" />

          {/* 주소 */}
          <label className="text-sm font-semibold flex items-center">
            주소 <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <input className="input input-bordered w-full" value={address} readOnly />
            <button
              className="btn btn-outline whitespace-nowrap"
              onClick={() => {
                new window.daum.Postcode({
                  oncomplete: (data: any) => {
                    const full = data.address;
                    const extra = data.buildingName ? ` (${data.buildingName})` : "";
                    setAddress(full + extra);
                    setPostcode(data.zonecode);
                  },
                }).open();
              }}
            >
              주소검색
            </button>
          </div>

          <div />
          <input className="input input-bordered w-full" placeholder="상세주소" />

          {/* 휴대전화 */}
          <label className="text-sm font-semibold flex items-center">
            휴대전화 <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <input className="input input-bordered w-1/3" />
            <input className="input input-bordered w-1/3" />
            <input className="input input-bordered w-1/3" />
          </div>

          {/* 이메일 */}
          <label className="text-sm font-semibold flex items-center">
            이메일 <span className="text-red-500 ml-1">*</span>
          </label>
          <input className="input input-bordered w-full" />

          {/* 요청사항 */}
          <label className="text-sm font-semibold flex items-center">요청사항</label>
          <select className="select select-bordered w-full">
            <option disabled selected>
              메시지 선택(선택사항)
            </option>
            <option>문 앞에 두고 가주세요</option>
            <option>오시기 전에 연락주세요</option>
            <option>경비실에 맡겨주세요</option>
          </select>
        </div>
      </div>

      {/* 주문 상품 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">주문상품</h2>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 mb-4 border-b pb-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <p className="font-bold">{item.name}</p>
              <p>수량: {item.quantity}</p>
              <p className="text-sm text-gray-500">
                {(item.price * item.quantity).toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 결제 정보 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">결제정보</h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex justify-between">
            <span>총 상품금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>{totalShipping.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between font-bold text-red-500 text-lg pt-2 border-t">
            <span>최종 결제 금액</span>
            <span>{finalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 결제 수단 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">결제수단</h2>
        <select className="select select-bordered w-full">
          <option disabled selected>
            결제수단 선택
          </option>
          <option>카드 결제</option>
          <option>무통장 결제</option>
        </select>
      </div>

      {/* 결제 버튼 */}
      <button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600">
        {finalPrice.toLocaleString()}원 결제하기
      </button>
    </div>
  );
};

export default OrderPage;