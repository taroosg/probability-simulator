interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Nav = ({ activeTab, onTabChange }: NavProps) => {
  return (
    <nav className="flex justify-around items-center bg-white dark:bg-gray-800 h-[60px] w-full fixed bottom-0 left-0 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] border-t border-gray-200 dark:border-gray-700">
      <button
        type="button"
        className={`flex-1 text-center py-3 transition-all ${
          activeTab === 'atLeastOne'
            ? 'text-gray-800 dark:text-white border-t-2 border-gray-800 dark:border-white bg-gray-100 dark:bg-gray-700'
            : 'text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onTabChange('atLeastOne')}
      >
        確率計算
      </button>
      <button
        type="button"
        className={`flex-1 text-center py-3 transition-all ${
          activeTab === 'trialsNeeded'
            ? 'text-gray-800 dark:text-white border-t-2 border-gray-800 dark:border-white bg-gray-100 dark:bg-gray-700'
            : 'text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onTabChange('trialsNeeded')}
      >
        回数計算
      </button>
    </nav>
  );
};

export default Nav;
