import { getCurrentUser } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/response";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return apiError("Belum login.", 401);
  }

  return apiSuccess({ user }, "Data pengguna aktif berhasil diambil.");
}
