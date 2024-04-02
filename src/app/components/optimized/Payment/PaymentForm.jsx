import { TooltipIcon } from "src/app/utils/icons";
import { InputRow } from "..";
import { getImageUrl } from "src/app/utils";

const PaymentForm = ({ data, onDataChange, errors }) => {

  const handleInputChange = (fieldName, value) => {
    onDataChange(fieldName, value); // Call the callback function with field name and value
  };

  return (
    <section>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-2">
          <InputRow
            label={QuantityLable}
            errors={errors.quantity}
            // value={data.quantity}
            onChange={(value) => handleInputChange("quantity", value)}
          />
        </div>
        <div className="col-span-1">
          <InputRow
            label="Expiry date"
            errors={errors.expiryDate}
            // value={data.expiryDate}
            onChange={(value) => handleInputChange("expiryDate", value)}

          />
        </div>
        <div className="col-span-1">
          <InputRow
            label={CvvLable}
            errors={errors.cvv}
            // value={data.cvv}
            onChange={(value) => handleInputChange("cvv", value)}

          />
        </div>
      </div>
    </section>
  );
};
export default PaymentForm;

const CreditTransactions = () => {
  return (
    <div className="flex gap-1">
      <img src={getImageUrl("companies/mada.svg")} className="w-5 h-4" />
      <img src={getImageUrl("companies/visa.svg")} className="w-5 h-4" />
      <img src={getImageUrl("companies/amex.svg")} className="w-5 h-4" />
      <img src={getImageUrl("companies/masterCard.svg")} className="w-5 h-4" />
    </div>
  );
};
const CvvLable = (
  <span className="flex">
    CVV&nbsp;
    <TooltipIcon className="fill-secondary" />
  </span>
);
const QuantityLable = (
  <span className="flex justify-between">
    <p>Quantity</p>
    <CreditTransactions />
  </span>
);


