import { useEffect } from "react";
import { useNavigate } from "zmp-ui";
import { Box, Icon, Page, List } from "zmp-ui";

import bg from "@/static/bg.svg";
import { useLoanProducts } from "@/hooks/useLoanProducts";

function HomePage() {
  const { products, fetchByType } = useLoanProducts();
  const navigate = useNavigate();

  useEffect(() => {
    fetchByType("CARD");
  }, []);

  return (
    <Page
      className="flex flex-col justify-center min-h-screen space-y-6 bg-cover bg-center bg-no-repeat bg-white dark:bg-black"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <List>
        {products.map((product) => (
          <List.Item
            key={product.id}
            title={product.title}
            prefix={
              product.pathIcon ? (
                <img
                  src={product.pathIcon}
                  alt={product.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <Icon icon="zi-more-grid" />
              )
            }
            subTitle={product.mpcCode}
            onClick={() => navigate(`/loan-product/${product.id}`)}
          />
        ))}
      </List>
    </Page>
  );
}

export default HomePage;