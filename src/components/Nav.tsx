interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Nav = ({ activeTab, onTabChange }: NavProps) => {
  return (
    <nav className="flex justify-around items-center bg-white dark:bg-gray-800 h-20 w-full fixed bottom-0 left-0 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <button
        type="button"
        className={`flex flex-col justify-center items-center flex-1 py-4 transition-all ${
          activeTab === 'atLeastOne'
            ? 'text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-700'
            : 'text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onTabChange('atLeastOne')}
        aria-pressed={activeTab === 'atLeastOne'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-medium">確率計算</span>
      </button>
      <button
        type="button"
        className={`flex flex-col justify-center items-center flex-1 py-4 transition-all ${
          activeTab === 'trialsNeeded'
            ? 'text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-700'
            : 'text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onTabChange('trialsNeeded')}
        aria-pressed={activeTab === 'trialsNeeded'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium">回数計算</span>
      </button>
    </nav>
  );
};

export default Nav;
