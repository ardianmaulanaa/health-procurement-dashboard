import { emptyListResponse } from "@/lib/empty-api";
import { apiError } from "@/lib/response";

export async function GET() {
  return emptyListResponse("Data sumber dana berhasil diambil.");
}

export async function POST() {
  return apiError(
    "Penyimpanan sumber dana menunggu implementasi model database pada Tahap 2.",
    409,
  );
}
