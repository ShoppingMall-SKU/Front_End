import { useEffect } from "react";

interface Props {
  address: string;
  setAddress: (address: string) => void;
  setPostcode: (code: string) => void;
}

const OrderFormComp = ({ address, setAddress, setPostcode }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

export default OrderFormComp;