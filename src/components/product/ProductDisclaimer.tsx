import { AlertCircle } from "lucide-react";

export default function ProductDisclaimer() {
  return (
    <section className="py-8 bg-[#F8F5EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-[#FAF7F0] border border-[#E8E1CE] flex items-start gap-4 text-[#5C665F]">
          <div className="w-9 h-9 rounded-full bg-[#FAF0E6] border border-[#EBD7BF] flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-[#A47128]" />
          </div>
          <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
            <h4 className="font-serif font-bold text-[#174A3A] text-sm">
              Ayurvedic Advisory & Medical Disclaimer
            </h4>
            <p>
              The statements and products displayed on AyuBazaar are based on classical Ayurvedic
              literature and traditional wellness practices. These products are herbal dietary
              supplements and are not intended to diagnose, treat, cure, or prevent any medical
              disease.
            </p>
            <p className="text-[11px] text-[#7C887E]">
              If you are pregnant, nursing, taking prescription medications, or under medical
              supervision for a chronic condition, please consult a licensed healthcare practitioner
              or qualified Ayurvedic Vaidya before beginning any new herbal regimen. Individual
              results may vary based on unique Prakriti (body constitution).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
