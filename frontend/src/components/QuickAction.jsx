import { useNavigate } from "react-router-dom";

function QuickAction({ title, link }) {

  const navigate = useNavigate();

  return (
    <button
      className="quick-btn"
      onClick={() => navigate(link)}
    >
      {title}
    </button>
  );
}

export default QuickAction; 
