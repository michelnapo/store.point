import { MainTitle, SettingsHeader } from "../components";
import { ProductList } from "../appComponents";

import PageLayout from "../layouts/PageLayout";

const Products = () => (
  <PageLayout>
    <SettingsHeader />
    <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
      <MainTitle>Trending Index</MainTitle>
      <section className="mb-8 mt-10">
        <ProductList />
      </section>
    </main>
  </PageLayout>
);

export default Products;
