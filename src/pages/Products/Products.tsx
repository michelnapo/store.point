import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../@types/enums";
import { MainTitle, PrimaryButton, SettingsHeader } from "../../components";
import { ProductList } from "../../components/Product/ProductList";
import PageLayout from "../../layouts/PageLayout";

const Products = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
        <MainTitle>
          <div className="flex">
            <div className="flex-1">Trending Index</div>
            <PrimaryButton
              onClick={() => navigate(RoutesEnum.add_product)}
            >
              Add product
            </PrimaryButton>
          </div>
        </MainTitle>
        <section className="mb-8 mt-10">
          <ProductList />
        </section>
      </main>
    </PageLayout>
  )
};

export default Products;
