import { emptyListResponse } from "@/lib/empty-api";
import { apiError } from "@/lib/response";

export async function GET() {
  return emptyListResponse("Data paket berhasil diambil.");
}

export async function POST() {
  return apiError(
    "Penyimpanan paket menunggu implementasi model database pada Tahap 3.",
    409,
  );
}
