import OrderSection from "@/components/features/orders/OrderSection";
import { orders } from "@/lib/data";

export default function HomePage() {
  return (
    <section>
      <OrderSection orders={orders} />
    </section>
  );
}
