import { z } from "zod";
import { emptyListResponse } from "@/lib/empty-api";
import { apiError } from "@/lib/response";

const createBarangSchema = z.object({
  kodeBarang: z.string().trim().min(1, "Kode barang wajib diisi."),
  namaBarang: z.string().trim().min(1, "Nama barang wajib diisi."),
  kategori: z.string().trim().min(1, "Kategori wajib diisi."),
  satuan: z.string().trim().min(1, "Satuan wajib diisi."),
  stok: z.coerce.number().int().min(0, "Stok tidak boleh negatif."),
  stokMinimum: z.coerce
    .number()
    .int()
    .min(0, "Stok minimum tidak boleh negatif."),
  lokasi: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  return emptyListResponse("Data barang berhasil diambil.");
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createBarangSchema.safeParse(json);

  if (!parsed.success) {
    return apiError(
      "Data barang tidak valid.",
      422,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    );
  }

  return apiError(
    "Penyimpanan data barang menunggu implementasi model database pada Tahap 2.",
    409,
  );
}
