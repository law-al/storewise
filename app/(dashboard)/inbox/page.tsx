import ProductSection from "@/components/sections/ProductSection";
import StatCard from "@/components/utils/StatCard";
import { ShoppingBag, Users2 } from "lucide-react";
import { products } from "@/lib/data";

export default function HomePage() {
  return (
    <section>
      <ProductSection products={products}>
        <StatCard title="Total Revenue" value="$17,987" />
        <StatCard
          // borderBottom
          title="Total Sales"
          value="1,987"
          Icon={ShoppingBag}
          iconBgColor="bg-black"
        />
        <StatCard
          title="Total Product"
          value="17,187"
          Icon={Users2}
          iconBgColor=" bg-themeInfo-300"
        />
      </ProductSection>
    </section>
  );
}
