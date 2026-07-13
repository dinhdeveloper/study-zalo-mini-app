// src/pages/loan-product-detail/index.tsx
import { useEffect } from "react";
import { useParams } from "zmp-ui";
import { Box, Text, Header, Icon, Page } from "zmp-ui";
import bg from "@/static/bg.svg";
import { useLoanProductDetail } from "@/hooks/useLoanProductDetail";

function LoanProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { details, fetchDetail } = useLoanProductDetail();

  useEffect(() => {
    if (id) fetchDetail(id);
  }, [id]);

  return (
    <Page
      className="flex flex-col py-10 min-h-screen space-y-6 bg-cover bg-center bg-no-repeat bg-white dark:bg-black"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header title="Chi tiết sản phẩm" className="overflow-hidden bg-transparent"/>

      <div className="px-4 pt-5 space-y-4">
        {details.map((item) => (
          <Box key={item.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <Box className="flex items-start justify-between">
              <Text.Title className="text-lg font-semibold">{item.title}</Text.Title>
              {item.pathIcon && (
                <img
                  src={item.pathIcon}
                  alt={item.title}
                  className="w-10 h-10 object-contain"
                />
              )}
            </Box>

            {item.contents && item.contents.length > 0 && (
              <Box className="space-y-1">
                {item.contents.map((point: string, idx: number) => (
                  <Box key={idx} className="flex items-center gap-2">
                    <Icon icon="zi-check-circle" className="text-blue-500 w-4 h-4 shrink-0" />
                    <Text className="text-sm text-gray-800">{point}</Text>
                  </Box>
                ))}
              </Box>
            )}

            {/* {item.description && (
              <Text className="text-sm text-gray-600">{item.description}</Text>
            )} */}

            <Box className="flex items-center justify-between pt-2 border-t border-gray-100">
              <Box
                className="flex items-center gap-1"
                onClick={() => {
                  // TODO: mở link/tìm hiểu thêm
                }}
              >
                <Text className="text-sm text-gray-400">Tìm hiểu thêm</Text>
              </Box>

              <Box
                className="flex items-center gap-1"
                onClick={() => {
                  // TODO: navigate sang flow đăng ký/mở thẻ, dùng item.id
                }}
              >
                <Text className="text-sm text-blue-600 font-medium">Mở thẻ ngay</Text>
                <Icon icon="zi-chevron-right" className="text-blue-600 w-4 h-4" />
              </Box>
            </Box>
          </Box>
        ))}
      </div>
    </Page>
  );
}

export default LoanProductDetailPage;