import { emptyListResponse } from "@/lib/empty-api";
import { apiError } from "@/lib/response";

export async function GET() {
  return emptyListResponse("Data kontrak berhasil diambil.");
}

export async function POST() {
  return apiError(
    "Penyimpanan kontrak menunggu implementasi model database pada Tahap 4.",
    409,
  );
}
