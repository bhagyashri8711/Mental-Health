export default function StatCard({ title, value, subtitle, icon: Icon, gradient, badge }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-md relative overflow-hidden bg-gradient-to-tr ${gradient || 'from-teal-600 to-emerald-600'}`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-85">{title}</p>
          <h3 className="text-3xl font-extrabold mt-1">{value}</h3>
          {subtitle && <p className="text-xs font-medium opacity-90 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
            <Icon size={24} />
          </div>
        )}
      </div>

      {badge && (
        <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-md">
          {badge}
        </span>
      )}

      {/* Subtle Background Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
    </div>
  );
}