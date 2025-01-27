import { createCheckoutSession } from "@/helpers/stripe";
import { Button } from "./ui/button";
import { CircleArrowUp } from "lucide-react";

const CheckoutButton = () => {
  const handleCheckoutSession = async () => {
    const response = await createCheckoutSession().then((res) => {
      window.location.href = res.url;
    });
    console.log(response);
  };

  return (
    <Button
      onClick={handleCheckoutSession}
      size="sm"
      className="w-full bg-cp-gradient"
      variant="shine"
    >
      <div className="flex flex-row justify-between align-middle items-center">
        <div>
          <CircleArrowUp className="mr-1 h-4 w-4" />
        </div>
        <div>Upgrade</div>
      </div>
    </Button>
  );
};

export default CheckoutButton;
