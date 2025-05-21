interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Nav = ({ activeTab, onTabChange }: NavProps) => {
  return (
    <nav className="nav">
      <button
        type="button"
        className={`nav-button ${activeTab === 'atLeastOne' ? 'active' : ''}`}
        onClick={() => onTabChange('atLeastOne')}
      >
        確率計算
      </button>
      <button
        type="button"
        className={`nav-button ${activeTab === 'trialsNeeded' ? 'active' : ''}`}
        onClick={() => onTabChange('trialsNeeded')}
      >
        回数計算
      </button>
    </nav>
  );
};

export default Nav;
