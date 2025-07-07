import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LogoutPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h2>마이 페이지</h2>
      <p>{user?.split("@")[0]}님 안녕하세요!</p>
      <p>이메일 주소는 {user}입니다.</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
