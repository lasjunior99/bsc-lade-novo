import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r">
      {/* Branding */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black">
            L
          </div>
          <div>
            <div className="font-extrabold">BSC-LADE</div>
            <div className="text-[10px] uppercase text-slate-400">
              Plataforma Estratégica
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-2 space-y-1">
        {MENU_ITEMS.map(item => (
          <Link
            key={item.key}
            to={item.route}
            className={`flex items-center gap-3 px-3 py-2 rounded
              ${location.pathname === item.route ? 'bg-slate-100 font-bold' : ''}
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
