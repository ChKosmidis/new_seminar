export default function CTA() {
  return (
    <section className="w-full bg-[#FF4500] py-32 px-6 text-center mt-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] uppercase">
          Хотите провести<br/>семинар для<br/>своей команды?
        </h2>

        <p className="text-white/80 text-xl max-w-xl leading-relaxed">
          Напишите организаторам, чтобы согласовать дату, фокус встречи и запросы по материалам.
        </p>

        {/* STANDALONE BUTTON */}
        <div className="mt-4">
          <button className="bg-white text-black px-12 py-5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors rounded-none shadow-xl">
            Запросить участие
          </button>
        </div>
      </div>
    </section>
  );
}
