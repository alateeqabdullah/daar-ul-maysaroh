import { Button } from "@/components/ui/button";

export default function BursarMemoPage() {
  return (
    <main className="pt-40 pb-20 container mx-auto px-6">
      <div className="max-w-3xl mx-auto glass-academic p-12 lg:p-20 rounded-[4rem] shadow-3xl text-center border-beam">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-6">
          Official Bursar's Memo
        </h1>
        <p className="text-muted-foreground font-medium mb-12">
          Your admission request is logged. Please settle your tuition through
          one of our international accounts to activate your scholarly portal.
        </p>

        <div className="space-y-6 text-left">
          <div className="p-8 rounded-3xl bg-primary/5 border-2 border-primary/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">
              Account Holder: Al-Maysaroh Institute
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold opacity-40 uppercase">
                  IBAN / SWIFT
                </p>
                <p className="font-black text-lg tracking-widest">
                  ALMA9876543210
                </p>
              </div>
              <div>
                <p className="text-xs font-bold opacity-40 uppercase">
                  Bank Name
                </p>
                <p className="font-black text-lg">Islamic Global Bank</p>
              </div>
            </div>
          </div>

          {/* REAL WORLD FEATURE: RECEIPT UPLOAD */}
          <div className="pt-8 border-t">
            <h4 className="font-black text-sm uppercase mb-4">
              Submit Evidence of Transfer
            </h4>
            <div className="w-full h-32 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all">
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest">
                Click to upload Receipt (PDF/JPG)
              </p>
            </div>
            <Button className="w-full mt-6 h-14 rounded-xl bg-primary font-black uppercase text-xs tracking-widest shadow-xl">
              SUBMIT FOR APPROVAL
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
