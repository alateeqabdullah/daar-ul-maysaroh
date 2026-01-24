export default function TransferInstructions() {
  return (
    <main className="pt-40 pb-20 container mx-auto px-6">
      <div className="max-w-2xl mx-auto glass-surface p-12 rounded-[3rem] text-center border shadow-2xl">
        <h1 className="text-4xl font-black mb-6">Payment Instructions</h1>
        <p className="text-muted-foreground mb-8 font-medium">
          Your admission request is received. Please transfer the enrollment fee
          to the account below to activate your portal.
        </p>

        <div className="bg-muted/50 p-8 rounded-2xl text-left space-y-4 border-2 border-dashed border-primary-700/30">
          <div>
            <p className="text-[10px] font-black uppercase opacity-50">
              Bank Name
            </p>
            <p className="font-bold text-lg">Islamic International Bank</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-50">
              Account Number
            </p>
            <p className="font-bold text-lg tracking-widest">1234-5678-9012</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-50">
              Account Name
            </p>
            <p className="font-bold text-lg">Al-Maysaroh Institute</p>
          </div>
        </div>

        <p className="mt-8 text-xs font-bold text-primary-700 uppercase tracking-widest">
          Once paid, please email your receipt to: admissions@almaysaroh.com
        </p>
      </div>
    </main>
  );
}
