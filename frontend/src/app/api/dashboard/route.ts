import { emptyObjectResponse } from "@/lib/empty-api";

export async function GET() {
  return emptyObjectResponse(
    {
      summary: {
        totalPaket: 0,
        totalPagu: "0",
        totalHps: "0",
        totalNilaiKontrak: "0",
        paketPerencanaan: 0,
        paketProsesPemilihan: 0,
        paketBerkontrak: 0,
        paketSelesai: 0,
        paketBermasalah: 0,
        realisasiKeuangan: "0",
      },
      charts: {
        paketBerdasarkanTahapan: [],
        paguDanKontrakPerBulan: [],
        progresDanRealisasi: [],
        paketBerdasarkanJenisPengadaan: [],
        paketBerdasarkanSatuanKerja: [],
      },
    },
    "Ringkasan dashboard berhasil diambil.",
  );
}
